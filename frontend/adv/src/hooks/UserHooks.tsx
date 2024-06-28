import axios from "axios";

import { BASE_URL } from "../api/axios";
const UPDATE_USER_DATA_ENDPOINT = "/api/auth/user/update";
const UPDATE_USER_PASSWORD_ENDPOINT = "/api/auth/password";

export const useUpdateUserData = async ( email: string, username: string) => {
    const token = localStorage.hasOwnProperty("token")
        ? localStorage.getItem("token")
        : "";
    
    var data = {
        email: email,
        username: username,
    };
    
    const res = await axios.put(BASE_URL + UPDATE_USER_DATA_ENDPOINT, data, {
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        },
    });
    
    if (res.status != 200) {
        console.log(res);
        throw new Error("Not Authorized");
    }
    
    return res.data;
};

export const useUpdateUserPassword = async (password: string) => {
    const token = localStorage.hasOwnProperty("token")
        ? localStorage.getItem("token")
        : "";
    
    var data = {
        password: password,
    };
    
    const res = await axios.put(BASE_URL + UPDATE_USER_PASSWORD_ENDPOINT, data, {
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        },
    });
    
    if (res.status != 200) {
        throw new Error("Not Authorized");
    }
    
    return res.data;
}