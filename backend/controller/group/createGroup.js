const prisma = require("../../prisma");
const { createGroupSchema } = require("../../schema/group");

const createGroup = async (req, res, next) => {
  const { name, category } = req.body;
  try {
    const verifiedData = await createGroupSchema.validateAsync({
      name,
      category
    });

    const savedGroup = await prisma.group.create({
      data: {
        name: verifiedData.name,
        createdBy: req.payload.aud,
        category: verifiedData.category,
        members: {
          connect: [{ id: req.payload.aud }],
        },
      },
    });
    console.log(savedGroup);
    res.send(savedGroup);
  } catch (error) {
    console.log(error);
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

module.exports = createGroup;
