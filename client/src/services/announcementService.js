import API from "./api";

export const createAnnouncement = (data) => API.post("/announcements", data);

export const getAnnouncements = () => API.get("/announcements");
