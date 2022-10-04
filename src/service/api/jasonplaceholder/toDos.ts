import axios from "axios";

const api = axios.create({
  baseURL: "https://api-andre-2029.herokuapp.com/sistemaRecados/recado",
});

async function get(url: string) {
  const response = await api.get(url);

  return response.data;
}

export { get, api };
