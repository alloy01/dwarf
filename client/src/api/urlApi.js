import api from "./axios";

export const createUrl = (url) => api.post("/urls", { url });
export const listUrls = () => api.get("/urls");
export const deleteUrl = (id) => api.delete(`/urls/${id}`);