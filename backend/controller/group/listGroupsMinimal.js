const prisma = require("../../prisma");

const listGroupsMinimal = async (req, res, next) => {
  const limit = req.query.limit;
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
        members: {
          select: {
            id: true,
            name: true,
            profileImg: true,
            email: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
      take: limit || 99999999999,
    });
    console.log(groups);

    res.send(groups);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = listGroupsMinimal;
