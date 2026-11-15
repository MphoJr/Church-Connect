import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

import {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
} from "../../services/noteService";

function Notes() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  const [editingId, setEditingId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    category: "General",
    content: "",
  });

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const response = await getNotes(user.id);

      setNotes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateNote(editingId, formData);

        setEditingId(null);
      } else {
        await createNote({
          ...formData,
          userId: user.id,
        });
      }

      setFormData({
        title: "",
        category: "General",
        content: "",
      });

      loadNotes();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (note) => {
    setEditingId(note.id);

    setFormData({
      title: note.title,
      category: note.category,
      content: note.content,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this note?");

    if (!confirmed) return;

    try {
      await deleteNote(id);

      loadNotes();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredNotes = notes.filter((note) => {
    const term = searchTerm.toLowerCase();

    return (
      note.title.toLowerCase().includes(term) ||
      note.category.toLowerCase().includes(term) ||
      note.content.toLowerCase().includes(term)
    );
  });

  return (
    <AdminLayout>
      <div className="notes-page">
        <h1>Ministry Notes</h1>

        <form className="note-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Note Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="General">General</option>

            <option value="Sermon">Sermon</option>

            <option value="Counseling">Counseling</option>

            <option value="Leadership">Leadership</option>

            <option value="Visitation">Visitation</option>
          </select>

          <textarea
            name="content"
            rows="6"
            placeholder="Write your notes..."
            value={formData.content}
            onChange={handleChange}
            required
          />

          <button type="submit">
            {editingId ? "Update Note" : "Save Note"}
          </button>
        </form>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="notes-grid">
          {filteredNotes.length === 0 ? (
            <div className="empty-notes">
              <h3>No Notes Found</h3>

              <p>Create your first note.</p>
            </div>
          ) : (
            filteredNotes.map((note) => (
              <div
                key={note.id}
                className="note-card"
                onClick={() => setSelectedNote(note)}
              >
                <span className="note-category">{note.category}</span>

                <h3>{note.title}</h3>

                <small>{new Date(note.createdAt).toLocaleDateString()}</small>

                <p className="note-content">
                  {note.content.length > 150
                    ? `${note.content.substring(0, 150)}...`
                    : note.content}
                </p>

                <div className="note-actions">
                  <button
                    className="edit-btn"
                    onClick={(e) => {
                      e.stopPropagation();

                      handleEdit(note);
                    }}
                  >
                    ✏️ Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();

                      handleDelete(note.id);
                    }}
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {selectedNote && (
          <div
            className="note-modal-overlay"
            onClick={() => setSelectedNote(null)}
          >
            <div className="note-modal" onClick={(e) => e.stopPropagation()}>
              <span className="note-category">{selectedNote.category}</span>

              <h2>{selectedNote.title}</h2>

              <small>
                {new Date(selectedNote.createdAt).toLocaleDateString()}
              </small>

              <div className="modal-content">{selectedNote.content}</div>

              <button
                className="close-btn"
                onClick={() => setSelectedNote(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default Notes;
