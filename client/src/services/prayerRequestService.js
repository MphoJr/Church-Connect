import API from "./api";

export const submitPrayerRequest = (data) => API.post("/prayer-requests", data);

export const getPrayerRequests = () => API.get("/prayer-requests");

export const updatePrayerRequest = (id, status) =>
  API.put(`/prayer-requests/${id}`, { status });
