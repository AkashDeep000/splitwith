const bcrypt = require("bcrypt");
const prisma = require("../../prisma");
const loginSchema = require("../../schema/auth/loginSchema");
const { signAccessToken } = require("../../helper/jwtHelper");
const createError = require("http-errors");

const login = async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    const verifiedData = await loginSchema.validateAsync({
      email,
      password,
    });
    
    const user = await prisma.user.findUnique({
      where: {
        email: verifiedData.email,
      },
    });
    
    if (!user) {
      return next(createError(422, "Invalid email or password"));
    }
    console.log(user);

    bcrypt.compare(password, user.hashedPassword, async (err, isMatched) => {
      if (isMatched === true) {
        console.log("matched");
        const accessToken = await signAccessToken(user.id);
        res.send({
          id: user.id,
          name: user.name,
          email: user.email,
          profileImg: user.profileImg,
          accessToken,
        });
        return;
      } else {
        return next(createError.BadRequest("Invalid email or password"));
      }
    });
  } catch (error) {
    console.log(error);
    if (error.isJoi === true)
      return next(createError.BadRequest("Invalid email or password"));
    next(error);
  }
};

module.exports = login;
