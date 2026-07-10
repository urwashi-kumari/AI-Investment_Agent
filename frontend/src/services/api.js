import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-investment-agent-7rv9.onrender.com/api",
});

export default api;