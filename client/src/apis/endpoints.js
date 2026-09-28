import api from "./axios.js";

export const shortenUrl = ( url, length ) => api.post("/shorten", {
    "url": url,
    "length": length
});
export const fetchUrl = () => api.get(`/${code}`);