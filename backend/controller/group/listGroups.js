const prisma = require("../../prisma");

const listGroups = async (req, res, next) => {
  try {
    const groups = await prisma.group.findMany({
      where: {
        memberIDs: {
          hasSome: req.payload.aud,
        },
      },
      select: {
        id: true,
        name: true,
        category: true,
        profileImg: true,
        memberIDs: true,
        /*   bills: {
          select: {
            paidBy: true,
            paidFor: true,
          },
        },
        settlements: {
          where: {
            OR: [
              { senderId: req.payload.aud },
              { receiverId: req.payload.aud },
            ],
          },
          select: {
            senderId: true,
            receiverId: true,
            amount: true,
          },
        },
        */
      },
      orderBy: {
        id: "desc",
      },
    });

    console.log(groups);

    res.send(groups);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = listGroups;
