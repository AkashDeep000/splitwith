const prisma = require("../../prisma");
const { settleUpSchema } = require("../../schema/settleUp");
const createError = require("http-errors");

const settleUp = async (req, res, next) => {
  const { groupId } = req.params;
  const { senderId, amount } = req.body;
  const verifiedData = await settleUpSchema.validateAsync({
    senderId,
    amount,
  });
  try {
    const userInfo = await prisma.user.findUnique({
      where: { id: req.payload.aud },
      select: {
        groupIDs: true,
      },
    });

    if (!userInfo.groupIDs.includes(groupId)) {
      return next(createError(422, "You are not in this group."));
    }

    const settlment = await prisma.settlement.create({
      data: {
        amount,
        group: {
          connect: { id: groupId },
        },
        sender: {
          connect: { id: senderId },
        },
        receiver: {
          connect: { id: req.payload.aud },
        },
      },
    });

    console.log(settlment);

    res.send({ success: true });
  } catch (error) {
    console.log(error);
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

module.exports = settleUp;
