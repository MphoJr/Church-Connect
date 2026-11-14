import API from "./api";

export const createReminder = (data) => API.post("/reminders", data);

export const getReminders = (userId) => API.get(`/reminders/${userId}`);

export const completeReminder = (id) => API.put(`/reminders/${id}/complete`);
