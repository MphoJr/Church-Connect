const Member = require("../models/Member");

exports.getMembers = async (req, res) => {
  try {
    const members = await Member.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.json(members);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch members",
    });
  }
};

exports.createMember = async (req, res) => {
  try {
    const member = await Member.create(req.body);

    res.status(201).json(member);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to create member",
    });
  }
};

exports.deleteMember = async (req, res) => {
  try {
    const member = await Member.findByPk(req.params.id);

    if (!member) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    await member.destroy();

    res.json({
      message: "Member deleted",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to delete member",
    });
  }
};

exports.updateMember = async (req, res) => {
  try {
    const member = await Member.findByPk(req.params.id);

    if (!member) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    await member.update(req.body);

    res.json(member);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to update member",
    });
  }
};
