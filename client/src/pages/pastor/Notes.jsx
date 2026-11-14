import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

import { createNote, getNotes, deleteNote } from "../../services/noteService";

function Notes() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [notes, setNotes] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    category: "General",
    content: "",
  });

  const [loading, setLoading] = useState(false);

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

      await createNote({
        ...formData,
        userId: user.id,
      });

      setFormData({
        title: "",
        category: "General",
        content: "",
      });

      loadNotes();
    } catch (error) {
      console.error("Failed to create note:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this note?");

    if (!confirmed) return;

    try {
      await deleteNote(id);

      loadNotes();
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

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
            placeholder="Write your ministry notes here..."
            value={formData.content}
            onChange={handleChange}
            required
          />

          <button type="submit">{loading ? "Saving..." : "Save Note"}</button>
        </form>

        <div className="notes-grid">
          {notes.length === 0 ? (
            <div className="empty-notes">
              <h3>No Notes Yet</h3>

              <p>Start creating sermon, counselling or leadership notes.</p>
            </div>
          ) : (
            notes.map((note) => (
              <div key={note.id} className="note-card">
                <span className="note-category">{note.category}</span>

                <h3>{note.title}</h3>

                <p>{note.content}</p>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(note.id)}
                >
                  Delete Note
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default Notes;
