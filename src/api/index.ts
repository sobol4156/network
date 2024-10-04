import axios from "axios"

const api = () => {
  const headers = { 'Content-Type': 'application/json' }

  return axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    withCredentials: true,
    headers: headers
  })
}

export const API_POST = async (url: string, post: unknown) => {
  try {
    const response = await api().post(url, post);
    return response; 
  } catch (error) {
    console.error("Error during POST request:", error);
    throw error; 
  }
}
