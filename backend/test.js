const prisma = require("./prisma");

(async () => {
  const savedUser = await prisma.bill.create({
    data: {},
  });
  console.log(savedUser);
})();
