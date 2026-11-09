const User = require("../models/User");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: {
        exclude: ["password"],
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to load profile",
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const { fullName, email, phone, profileImage } = req.body;

    await user.update({
      fullName,
      email,
      phone,
      profileImage,
    });

    const updatedUser = await User.findByPk(req.params.id, {
      attributes: {
        exclude: ["password"],
      },
    });

    res.json(updatedUser);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update profile",
    });
  }
};
