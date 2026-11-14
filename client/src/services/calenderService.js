export const getPastorAppointments = (pastorId) =>
  API.get(`/appointments/pastor/${pastorId}`);
