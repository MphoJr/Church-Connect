const members = [];

exports.getMembers = (req, res) => {
  res.json(members);
};

exports.createMember = (req, res) => {
  const member = {
    id: Date.now(),
    ...req.body,
  };

  members.push(member);

  res.status(201).json(member);
};

exports.deleteMember = (req, res) => {
  const id = parseInt(req.params.id);

  const index = members.findIndex((member) => member.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Member not found",
    });
  }

  members.splice(index, 1);

  res.json({
    message: "Member deleted",
  });
};
