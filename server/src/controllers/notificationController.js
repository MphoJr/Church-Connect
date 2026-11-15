const Notification = require("../models/Notification");

exports.createNotification = async (req, res) => {
  try {
    const notification = await Notification.create(req.body);

    res.status(201).json(notification);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create notification",
    });
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      where: {
        userId: req.params.userId,
      },
      order: [["createdAt", "DESC"]],
    });

    res.json(notifications);
  } catch (error) {
    console.error(error);
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);

    await notification.update({
      isRead: true,
    });

    res.json(notification);
  } catch (error) {
    console.error(error);
  }
};
