const prisma = require("../../prisma");
const { addBillSchema } = require("../../schema/bill");
const createError = require("http-errors");

const addBill = async (req, res, next) => {
  const { groupId } = req.params;
  const { title, paidById, paidFor, amount } = req.body;

  const verifiedData = await addBillSchema.validateAsync({
    title,
    paidById,
    paidFor,
    amount,
  });
  const calTotal = () => {
    let total = 0;
    for (var i = 0; i < verifiedData.paidFor.length; i++) {
      total = total + verifiedData.paidFor[i].amount;
    }
    return total;
  };

  const total = calTotal();
  console.log({ total, amount });
  if (total !== amount) {
    return next(
      createError(422, "Splited amount doesn't matched with total amount.")
    );
  }

  const bill = await prisma.bill.create({
    data: {
      title: verifiedData.title,
      amount: verifiedData.amount,

      paidFor: {
        set: verifiedData.paidFor,
      },
      group: {
        connect: { id: groupId },
      },
      paidBy: {
        connect: { id: verifiedData.paidById },
      },
    },
  });

  console.log(bill);

  res.send(bill);
};

module.exports = addBill;
