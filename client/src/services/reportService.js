import API from "./api";

export const getStats = () => API.get("/reports/stats");

export const getAttendanceReport = (startDate, endDate) =>
  API.get(`/reports/attendance?startDate=${startDate}&endDate=${endDate}`);
