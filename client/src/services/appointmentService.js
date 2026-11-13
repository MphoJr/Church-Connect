import API from "./api";

export const createAppointment = (data) => API.post("/appointments", data);

export const getAppointments = () => API.get("/appointments");

export const updateAppointmentStatus = (id, status) =>
  API.put(`/appointments/${id}/status`, { status });
export const assignPastor = (id, pastorId) =>
  API.put(`/appointments/${id}/assign`, { pastorId });

export const getPastorAppointments = (pastorId) =>
  API.get(`/appointments/pastor/${pastorId}`);
