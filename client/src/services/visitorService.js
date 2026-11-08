import API from "./api";

export const getVisitors = () => API.get("/visitors");

export const createVisitor = (data) => API.post("/visitors", data);

export const updateVisitor = (id, data) => API.put(`/visitors/${id}`, data);

export const deleteVisitor = (id) => API.delete(`/visitors/${id}`);
