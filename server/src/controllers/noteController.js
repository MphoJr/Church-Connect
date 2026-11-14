const Note = require("../models/Note");

exports.createNote = async (req, res) => {
  try {
    const note = await Note.create(req.body);

    res.status(201).json(note);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create note",
    });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.findAll({
      where: {
        userId: req.params.userId,
      },
      order: [["createdAt", "DESC"]],
    });

    res.json(notes);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch notes",
    });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    await note.destroy();

    res.json({
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.error(error);
  }
};
