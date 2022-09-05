const prisma = require("../../prisma");

const getGroup = async (req, res, next) => {
  const { groupId } = req.params;
  try {
    const group = await prisma.group.findUnique({
      where: {
        id: groupId,
      },
      select: {
        id: true,
        name: true,
        category: true,
        profileImg: true,
        memberIDs: true,
      },
    });
    console.log(group);
    res.send(group);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = getGroup;
