import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export async function listTransactions({ token }) {
  if (!token) {
    return Promise.reject(new Error("There is no token provided!"));
  }
  const response = await api.get("/user/transactions", {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(response);
  return response.data;
}
