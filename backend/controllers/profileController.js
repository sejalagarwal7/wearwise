import User from "../models/User.js";

//get profile
export const getProfile = async (
req, res) => {
try {
const user = await User.findById(req.userId).select("-password");

res.status(200).json(user);
} catch(error) {
res.status(500).json({
message: error.message,
});
}
}
//update profile
export const updateProfile = async (req, res) => {
try {
const updatedUser = await User.findByIdAndUpdate(
    req.userId,
    req.body,
    {
        new: true,
    }
).select("-password");
 res.status(200).json(
        updatedUser
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };