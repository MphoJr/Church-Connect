import API from "./api";

export const getMembers = () => {
  return API.get("/members");
};

export const createMember = (memberData) => {
  return API.post("/members", memberData);
};

export const deleteMember = (id) => {
  return API.delete(`/members/${id}`);
};
export const updateMember = (id, memberData) => {
  return API.put(`/members/${id}`, memberData);
};
