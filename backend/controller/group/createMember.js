const prisma = require("../../prisma");
const { createMemberSchema } = require("../../schema/member");
const createError = require("http-errors");

const createMember = async (req, res, next) => {
  const { name } = req.body;
  const { groupId } = req.params;
  try {
    const verifiedData = await createMemberSchema.validateAsync({
      name,
    });

    const group = await prisma.group.findUnique({
      where: {
        id: groupId,
      },
      select: {
        createdBy: true,
        
      },
    });

    if (group.createdBy === req.payload.aud) {
      return next(createError.Unauthorized());
    }

    const savedMember = await prisma.user.create({
      data: {
        name: verifiedData.name,
        groups: {
          connect: [{ id: groupId }],
        },
      },
    });

    console.log(savedMember);

    res.send(savedMember);
  } catch (error) {
    console.log(error);
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

module.exports = createMember;
