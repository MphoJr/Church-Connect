import API from "./api";

export const getProfile = (id) => {
  return API.get(`/users/${id}`);
};

export const updateProfile = (id, data) => {
  return API.put(`/users/${id}`, data);
};
