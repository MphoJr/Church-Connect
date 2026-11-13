import API from "./api";

export const createAppointment = (appointmentData) => {
  return API.post("/appointments", appointmentData);
};
