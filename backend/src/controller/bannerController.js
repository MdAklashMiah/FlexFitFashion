const bannerModel = require("../model/banner.model");
const fs = require("fs");
const path = require("path");

let addbannerController = async (req, res) => {
  let { link } = req.body;
  let { filename } = req.file;

  try {
    let banner = await new bannerModel({
      image: `${process.env.SERVER_URL}/${filename}`,
      link,
    });

    await banner.save();

    return res.status(201).json({
      success: true,
      message: "Banner Created Successfully",
      data: banner,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

let deleteBannerController = async (req, res) => {
  try {
    const { id } = req.params;

    let banner = await bannerModel.findOneAndDelete({ _id: id });

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    let imageurl = banner.image.split("/");
    const filePath = path.join(
      __dirname,
      "../../uploads",
      imageurl[imageurl.length - 1]
    );

    fs.unlink(filePath, (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }
      return res.status(200).json({
        success: true,
        message: "Banner deleted successfully",
        data: banner,
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

let updateBannerController = async (req, res) => {
  try {
    let { id } = req.params;
    let { filename } = req.file;

    let banner = await bannerModel.findOne({ _id: id });

    if (banner) {
      let imageurl = banner.image.split("/");
      const filePath = path.join(
        __dirname,
        "../../uploads",
        imageurl[imageurl.length - 1]
      );

      fs.unlink(filePath, (err) => {
        if (err) {
          res.send(err);
        }
      });

      banner.image = `${process.env.SERVER_URL}/${filename}`;
      await banner.save();
      res.send("banner updated");
    } else {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    // banner.image = `${process.env.SERVER_URL}/${filename}`;
    // await banner.save();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//get all banners

let allbannersController = async (req, res) => {
  try {
    let allbanners = await bannerModel.find({});

    if (allbanners.length == 0) {
      return res
        .status(404)
        .json({ success: false, message: "Banner Not Found" });
    } else {
      return res.status(200).json({
        success: true,
        message: "Banner Fetch Successfully",
        data: allbanners,
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

module.exports = {
  addbannerController,
  deleteBannerController,
  updateBannerController,
  allbannersController,
};
