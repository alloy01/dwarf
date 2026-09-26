import api from "./axios.js";

export const shortenUrl = ( url ) => api.post("/shorten", { url });
export const fetchUrl = () => api.get(`/${code}`);