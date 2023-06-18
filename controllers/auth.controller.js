import User from "../models/user.model.js";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  const findUserByUsername = await User.findOne({
    username: req.body.username,
  });
  const findUserByEmail = await User.findOne({ email: req.body.email });
  const findUserByPhone = await User.findOne({ phone: req.body.phone });
  if (findUserByUsername) {
    return next(createError(404, "Username này đã được đăng kí!"));
  }
  if (findUserByEmail) {
    return next(createError(404, "Email này đã được đăng kí!"));
  }
  if (findUserByPhone) {
    return next(createError(404, "Số điện thoại này đã được đăng kí!"));
  }
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(201).send("User được tạo thành công");
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return next(createError(404, "Không tìm thấy tài khoản này!"));

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect)
      return next(createError(400, "Tài khoản hoặc mật khẩu không đúng!"));

    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_KEY,
      { expiresIn: 60 * 60 * 5 }
    );
    const { password, ...info } = user._doc;
    res.status(200).send({ user, token });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User đã đăng xuất.");
};
