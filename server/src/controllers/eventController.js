const Event = require("../models/Event");

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.json(events);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch events",
    });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);

    res.status(201).json(event);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create event",
    });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    await event.update(req.body);

    res.json(event);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update event",
    });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    await event.destroy();

    res.json({
      message: "Event deleted",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete event",
    });
  }
};
