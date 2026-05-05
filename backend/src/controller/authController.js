const signupModel = require("../model/signup.model");
const userModel = require("../model/signup.model");
const generateOTP = require("../utils/otp");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signupController = async (req, res, next) => {
  try {
    let { name, email, password, phone, image, role } = req.body;

    let userFind = await userModel.findOne({ email });

    if (userFind) {
      return res
        .status(500)
        .json({ success: false, message: "Email Already Exist" });
    } else {
      let otp = generateOTP();
      let otpExpiresAt = new Date(Date.now() + 2 * 60000); // 2 minutes

      let user = new userModel({
        name,
        email,
        password,
        phone,
        image,
        role,
        otp,
        otpExpiresAt,
      });

      await user
        .save()
        .then(() => {
          sendEmail(email, otp);
          return res.status(201).json({
            success: true,
            message: "user created successfully",
            data: user,
          });
        })
        .catch((err) => {
          next(err);
        });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const verifyOtpController = async (req, res, next) => {
  try {
    let { email, otp } = req.body;

    let user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    } else {
      if (user.otp === otp) {
        if (user.otpExpiresAt && user.otpExpiresAt < Date.now()) {
          return res.status(400).json({ success: false, message: "OTP Expired" });
        }
        let verify = await userModel
          .findOneAndUpdate({ email }, { verify: true, otp: null, otpExpiresAt: null }, { new: true })
          .select("-password");

        return res.status(200).json({
          success: true,
          message: "OTP verified successfully",
          data: verify,
        });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "OTP Not Match" });
      }
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const loginController = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please sign up first.",
      });
    } else {
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Something went wrong.",
            error: err.message,
          });
        }

        if (result) {
          let token = jwt.sign(
            { email: user.email, role: user.role },
            process.env.PRIVATE_KEY,
            {
              expiresIn: "7d",
            }
          );

          return res.status(200).json({
            success: true,
            message: "Login Successful",
            data: user,
            token,
          });
        } else {
          return res
            .status(404)
            .json({ success: false, message: "Invalid Email or Password" });
        }
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const allusersController = async (req, res, next) => {
  try {
    let allusers = await userModel.find({}).select("-password");
    return res.status(200).json({
      success: true,
      message: "All Users Fetch Successfully",
      data: allusers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const verifyUserController = async (req, res) => {
  try {
    let { token } = req.headers;

    jwt.verify(token, process.env.PRIVATE_KEY, async function (err, decoded) {
      if (err) {
        return res.status(400).json({ success: false, message: "Unauthorize" });
      } else {
        let user = await signupModel.findOne({ email: decoded.email });

        let token = jwt.sign(
          { email: user.email, role: user.role },
          process.env.PRIVATE_KEY,
          {
            expiresIn: "7d",
          }
        );

        return res
          .status(200)
          .json({
            success: true,
            message: "User Verify Successfully",
            data: user,
            token
          });
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  signupController,
  verifyOtpController,
  loginController,
  allusersController,
  verifyUserController,
};
