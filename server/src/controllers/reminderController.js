const Reminder = require("../models/Reminder");

exports.createReminder = async (req, res) => {
  try {
    const reminder = await Reminder.create(req.body);

    res.status(201).json(reminder);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create reminder",
    });
  }
};

exports.getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.findAll({
      where: {
        userId: req.params.userId,
      },
      order: [["reminderDate", "ASC"]],
    });

    res.json(reminders);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to load reminders",
    });
  }
};

exports.completeReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findByPk(req.params.id);

    await reminder.update({
      completed: true,
    });

    res.json(reminder);
  } catch (error) {
    console.error(error);
  }
};
