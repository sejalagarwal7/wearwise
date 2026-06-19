import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(
      "https://res.cloudinary.com/demo/image/upload/sample.jpg"
    );

    res.json(result);
  } catch (error) {
    console.log("CLOUDINARY UPLOAD ERROR:");
    console.dir(error, { depth: null });

    res.status(500).json({
      message: error.message,
    });
  }
};