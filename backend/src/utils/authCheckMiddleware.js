const jwt = require("jsonwebtoken");

const authCheckMiddleware = (req, res, next) => {
  let { token } = req.headers;

  try {
    jwt.verify(token, process.env.PRIVATE_KEY , function (err, decoded) {
      if(err){
        return res.status(400).json({success: false, message: "Unauthorize"})
      }else{
        req.data = decoded
        next()
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

const adminCheckMiddleware = (req, res, next) => {
  try {
    if (req.data.role == "admin") {
      next();
    } else {
      return res.status(400).json({ success: false, message: "Access Denied" });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


module.exports = { authCheckMiddleware, adminCheckMiddleware };
