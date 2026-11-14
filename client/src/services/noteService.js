import API from "./api";

export const createNote = (data) => API.post("/notes", data);

export const getNotes = (userId) => API.get(`/notes/${userId}`);

export const deleteNote = (id) => API.delete(`/notes/${id}`);
export const updateNote = (id, data) => API.put(`/notes/${id}`, data);
