const prisma = require("../../prisma");
const { createMemberSchema } = require("../../schema/member");
const createError = require("http-errors");

const createMember = async (req, res, next) => {
  const { groupId } = req.params;
  try {
    const userInfo = await prisma.user.findUnique({
      where: { id: req.payload.aud },
      select: {
        groupIDs: true,
      },
    });

    if (userInfo.groupIDs.includes(groupId)) {
      return next(createError(422, "You are already in this group."));
    }

    const user = await prisma.user.update({
      where: { id: req.payload.aud },
      data: {
        groups: {
          connect: [{ id: groupId }],
        },
      },
    });

    console.log(user);

    res.send(user);
  } catch (error) {
    console.log(error);
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

module.exports = createMember;
