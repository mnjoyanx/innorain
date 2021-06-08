import axios from "@/api/axios";

export const login = (data) => axios.post("/login", data);
