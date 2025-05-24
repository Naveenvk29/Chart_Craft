import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uplaodProfiePic = async (file) => {
  try {
    const res = await cloudinary.uploader.upload(file.path, {
      folder: "Chart_craft_Profile_pic",
      resource_type: "auto",
      public_id: `${Date.now()}-${file.originalname}`,
    });
    fs.unlinkSync(file.path);
    return res;
  } catch (error) {
    console.log(error);
    // console.log(error.message);

    fs.unlinkSync(file.path);
    throw new Error("Failed to upload image to cloudinary");
  }
};

const deleteProfilePic = async (public_id) => {
  try {
    const res = await cloudinary.uploader.destroy(public_id);
    return true;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete image from cloudinary");
  }
};

export { uplaodProfiePic, deleteProfilePic };
