import API from "./api";

export const getAttendance = () => API.get("/attendance");

export const saveAttendance = (attendanceData) =>
  API.post("/attendance", attendanceData);
