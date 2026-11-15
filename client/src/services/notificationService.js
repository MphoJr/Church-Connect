import API from "./api";

export const getNotifications = (userId) => API.get(`/notifications/${userId}`);

export const markAsRead = (id) => API.put(`/notifications/${id}/read`);

export const createNotification = (data) => API.post("/notifications", data);
