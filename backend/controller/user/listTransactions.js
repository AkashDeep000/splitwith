const prisma = require("../../prisma");

const listTransactions = async (req, res, next) => {
  const limit = req.query.limit;
  try {
    const transactions = await prisma.bill.findMany({
      where: {
        OR: [
          { paidById: req.payload.aud },
          {
            paidFor: {
              some: {
                id: req.payload.aud,
              },
            },
          },
        ],
      },
      include: {
        group: {
          select: {
            id: true,
            name: true,
          },
        },
        paidBy: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
      take: limit || 99999999999,
    });

    console.log(transactions);

    res.send(transactions);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = listTransactions;
