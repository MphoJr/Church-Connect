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
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [editingId, setEditingId] = useState(null);

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
      console.error("Failed to load notes:", error);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

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
      console.error("Failed saving note:", error);
    } finally {
      setLoading(false);
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
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?",
    );

    if (!confirmed) return;

    try {
      await deleteNote(id);

      loadNotes();
    } catch (error) {
      console.error("Failed deleting note:", error);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);

    setFormData({
      title: "",
      category: "General",
      content: "",
    });
  };

  const filteredNotes = notes.filter((note) => {
    const search = searchTerm.toLowerCase();

    return (
      note.title?.toLowerCase().includes(search) ||
      note.category?.toLowerCase().includes(search) ||
      note.content?.toLowerCase().includes(search)
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
            placeholder="Write your notes here..."
            value={formData.content}
            onChange={handleChange}
            required
          />

          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <button type="submit">
              {loading ? "Saving..." : editingId ? "Update Note" : "Save Note"}
            </button>

            {editingId && (
              <button type="button" onClick={cancelEdit}>
                Cancel
              </button>
            )}
          </div>
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

              <p>Create a new note or adjust your search.</p>
            </div>
          ) : (
            filteredNotes.map((note) => (
              <div key={note.id} className="note-card">
                <span className="note-category">{note.category}</span>

                <h3>{note.title}</h3>

                <small>{new Date(note.createdAt).toLocaleDateString()}</small>

                <p>{note.content}</p>

                <div>
                  <div className="note-actions">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(note)}
                    >
                      ✏️ Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(note.id)}
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default Notes;
