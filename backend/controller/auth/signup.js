const bcrypt = require("bcrypt");
const prisma = require("../../prisma");
const signupSchema = require("../../schema/auth/signupSchema");
const { signAccessToken } = require("../../helper/jwtHelper");

const signup = async (req, res, next) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  try {
    const verifiedData = await signupSchema.validateAsync({
      name,
      email,
      password,
    });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(verifiedData.password, salt);
    const savedUser = await prisma.user.create({
      data: {
        name: verifiedData.name,
        email: verifiedData.email,
        hashedPassword,
        salt,
      },
    });
    console.log(savedUser);
    const accessToken = await signAccessToken(savedUser.id);
    res.send({
      id: savedUser.id,
      name: savedUser.name,
      email: savedUser.email,
      image: savedUser.profileImg,
      accessToken,
    });
  } catch (error) {
    console.log(error);
    if (error.isJoi === true) error.status = 422;
    if (error.code === "P2002") {
      error.status = 422;
      error.message = "This email is already registered";
      error.isAlreadyExist = true;
    }
    next(error);
  }
};

module.exports = signup;
