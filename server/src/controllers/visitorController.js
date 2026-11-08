const Visitor = require("../models/Visitor");

exports.getVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.json(visitors);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch visitors",
    });
  }
};

exports.createVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.create(req.body);

    res.status(201).json(visitor);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to create visitor",
    });
  }
};

exports.updateVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findByPk(req.params.id);

    if (!visitor) {
      return res.status(404).json({
        message: "Visitor not found",
      });
    }

    await visitor.update(req.body);

    res.json(visitor);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to update visitor",
    });
  }
};

exports.deleteVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findByPk(req.params.id);

    if (!visitor) {
      return res.status(404).json({
        message: "Visitor not found",
      });
    }

    await visitor.destroy();

    res.json({
      message: "Visitor deleted",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to delete visitor",
    });
  }
};
