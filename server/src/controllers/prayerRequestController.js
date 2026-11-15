const PrayerRequest = require("../models/PrayerRequest");

exports.createPrayerRequest = async (req, res) => {
  try {
    const prayerRequest = await PrayerRequest.create(req.body);

    res.status(201).json(prayerRequest);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to submit prayer request",
    });
  }
};

exports.getPrayerRequests = async (req, res) => {
  try {
    const requests = await PrayerRequest.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.json(requests);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch prayer requests",
    });
  }
};

exports.updatePrayerRequest = async (req, res) => {
  try {
    const request = await PrayerRequest.findByPk(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Prayer request not found",
      });
    }

    await request.update({
      status: req.body.status,
    });

    res.json(request);
  } catch (error) {
    console.error(error);
  }
};
