const prisma = require("../../prisma");
const createError = require("http-errors");

const getGroup = async (req, res, next) => {
  const { groupId } = req.params;
  try {
    const groups = await prisma.group.findMany({
      where: {
        id: groupId,
        memberIDs: {
          has: req.payload.aud,
        },
      },
      include: {
        members: {
          select: {
            id: true,
            name: true,
            email: true,
            profileImg: true,
          },
          orderBy: {
            id: "desc",
          },
        },

        bills: {
          include: {
            paidBy: {
              select: {
                name: true,
                email: true,
              },
            },
          },
          orderBy: {
            id: "desc",
          },
        },
        settlements: true,
      },
      orderBy: {
        id: "desc",
      },
    });
    if (groups.length === 0) {
      return next(createError(422, "No group found"));
    }
    const group = groups[0];
    console.log(group.bills);
    const members = group.members;
    const floatify = (number) => {
      return parseFloat(number.toFixed(10));
    };

    let totalBill = 0;
    let yourBill = 0;
    let yourBal = 0;

    for (var i = 0; i < group.bills.length; i++) {
      totalBill = floatify(totalBill + group.bills[i].amount);
      if (group.bills[i].paidById === req.payload.aud) {
        yourBal = floatify(yourBal + group.bills[i].amount);
      }

      //calculate give
      paidByIndex = members.findIndex(
        (obj) => obj.id === group.bills[i].paidById
      );
      const currentGive = members[paidByIndex].give || 0;

      members[paidByIndex].give = floatify(currentGive + group.bills[i].amount);

      // calculate take
      const paidFor = group.bills[i].paidFor;
      for (var j = 0; j < paidFor.length; j++) {
        if (paidFor[j].id === req.payload.aud) {
          yourBal = floatify(yourBal - paidFor[j].amount);
          yourBill = floatify(yourBill + paidFor[j].amount);

          //addind my myCharge to bills
          group.bills[i].myCharge = paidFor[j].amount;
        }

        paidForIndex = members.findIndex((obj) => obj.id === paidFor[j].id);
        const currentTake = members[paidForIndex].take || 0;

        members[paidForIndex].take = floatify(currentTake + paidFor[j].amount);
      }
    }

    ////////
    for (var m = 0; m < group.settlements.length; m++) {
      if (group.settlements[m].senderId === req.payload.aud) {
        yourBal = floatify(yourBal + group.settlements[m].amount);
      } else if (group.settlements[m].receiverId === req.payload.aud) {
        yourBal = floatify(yourBal - group.settlements[m].amount);
      }

      //calculate give
      paidByIndex = members.findIndex(
        (obj) => obj.id === group.settlements[m].senderId
      );
      const currentGive = members[paidByIndex].give || 0;

      members[paidByIndex].give = floatify(
        currentGive + group.settlements[m].amount
      );

      // calculate take
      paidByIndex = members.findIndex(
        (obj) => obj.id === group.settlements[m].receiverId
      );
      const currentTake = members[paidByIndex].take || 0;

      members[paidByIndex].take = floatify(
        currentTake + group.settlements[m].amount
      );
    }

    const myDues = [];
    const otherDues = [];

    const takes = [];
    const gives = [];

    for (var i = 0; i < members.length; i++) {
      const take = members[i].take || 0;
      const give = members[i].give || 0;
      const netAmount = floatify(give - take);
      console.log(netAmount);
      if (netAmount > 0) {
        const data = {
          id: members[i].id,
          amount: netAmount,
        };
        gives.push(data);
      } else if (netAmount < 0) {
        const data = {
          id: members[i].id,
          amount: 0 - netAmount,
        };
        takes.push(data);
      }
    }

    takes.sort((a, b) => a.amount - b.amount);
    gives.sort((a, b) => a.amount - b.amount);
    console.log(gives, takes);

    const addDues = () => {
      if (gives.length) {
        let givenMemberIndex = members.findIndex(
          (obj) => obj.id === gives[0].id
        );

        let takenMemberIndex = members.findIndex(
          (obj) => obj.id === takes[0].id
        );

        let extra = floatify(gives[0].amount - takes[0].amount);

        if (extra === 0) {
          let data = {
            sender: {
              id: takes[0].id,
              name: members[takenMemberIndex].name,
            },
            receiver: {
              id: gives[0].id,
              name: members[givenMemberIndex].name,
            },
            amount: takes[0].amount,
          };
          if (
            data.sender.id === req.payload.aud ||
            data.receiver.id === req.payload.aud
          ) {
            myDues.push(data);
          } else {
            otherDues.push(data);
          }

          takes.splice(0, 1);
          gives.splice(0, 1);
        } else if (extra > 0) {
          let data = {
            sender: {
              id: takes[0].id,
              name: members[takenMemberIndex].name,
            },
            receiver: {
              id: gives[0].id,
              name: members[givenMemberIndex].name,
            },
            amount: takes[0].amount,
          };
          if (
            data.sender.id === req.payload.aud ||
            data.receiver.id === req.payload.aud
          ) {
            myDues.push(data);
          } else {
            otherDues.push(data);
          }

          gives[0].amount = extra;
          takes.splice(0, 1);
        } else {
          let data = {
            sender: {
              id: takes[0].id,
              name: members[takenMemberIndex].name,
            },
            receiver: {
              id: gives[0].id,
              name: members[givenMemberIndex].name,
            },
            amount: gives[0].amount,
          };
          if (
            data.sender.id === req.payload.aud ||
            data.receiver.id === req.payload.aud
          ) {
            myDues.push(data);
          } else {
            otherDues.push(data);
          }
          takes[0].amount = 0 - extra;
          gives.splice(0, 1);
        }
        addDues();
      }
    };
    addDues();

    const response = {
      id: group.id,
      name: group.name,
      category: group.category,
      profileImg: group.profileImg,
      totalMembers: members.length,
      totalBill,
      yourBill,
      yourBal,
      bills: group.bills,
      myDues,
      otherDues,
      members,
    };
    console.log(yourBal, yourBill);
    res.send(response);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = getGroup;
