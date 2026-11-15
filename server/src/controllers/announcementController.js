const Announcement = require("../models/Announcement");

exports.createAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.create(req.body);

    res.status(201).json(announcement);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create announcement",
    });
  }
};

exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.json(announcements);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch announcements",
    });
  }
};
