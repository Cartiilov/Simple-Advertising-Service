import axios from "axios";
import { BASE_URL } from "../api/axios";
const TOKEN_ENDPOINT = "/api/auth/signup";
const USER_ENDPOINT = "/api/users";
const YOUR_DATA_ENDPOINT = "/api/auth/user";

const tokenEncodingHeader = {
  "Content-Type": "application/json",
  charset: "utf-8",
};

const axiosToken = axios.create({
  headers: { ...tokenEncodingHeader },
});

export const useCreateToken = async (email: string, password: string) => {
  const data = {
    email: email,
    password: password,
  };

  const res = await axiosToken.post(BASE_URL + TOKEN_ENDPOINT, data);

  if (res.status != 200) {
    throw new Error("Not Authorized");
  }

  return res.data;
};

export const useGetData = async (id: number) => {
  const res = await axios.get(BASE_URL + USER_ENDPOINT + "/" + id);

  if (res.status != 200) {
    throw new Error("Not Authorized");
  }

  return res.data;
};

export const useGetUserData = async () => {
  const token = localStorage.hasOwnProperty("token")
    ? localStorage.getItem("token")
    : "";

  const res = await axios.get(BASE_URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.data.hasOwnProperty("email")) {
    throw new Error("User not found");
  }

  return res.data.email;
};

export const useGetYourData = async () => {
  const token = localStorage.hasOwnProperty("token")
    ? localStorage.getItem("token")
    : "";

  const res = await axios.get(BASE_URL + YOUR_DATA_ENDPOINT, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status != 200) {
    throw new Error("Not Authorized");
  }

  return res.data;
};

export const useLogout = () => {
  localStorage.removeItem("token");
};
