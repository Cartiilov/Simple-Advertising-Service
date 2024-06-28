import axios from "axios";

import { BASE_URL } from "../api/axios";
const CREATE_POST_ENDPOINT = "/api/posts";
const GET_ALL_POSTS_ENDPOINT = CREATE_POST_ENDPOINT;
const GET_POST_BY_ID_ENDPOINT = CREATE_POST_ENDPOINT + "/";
const GET_ALL_USER_POSTS_ENDPOINT = "/api/posts/author/";
const UPDATE_POST_ENDPOINT = GET_POST_BY_ID_ENDPOINT;
const DELETE_POST_ENDPOINT = GET_POST_BY_ID_ENDPOINT;

export const useCreatePost = async (title: string, content: string) => {
  const token = localStorage.hasOwnProperty("token")
    ? localStorage.getItem("token")
    : "";

  var data = {
    title: title,
    content: content,
    createdAt: new Date().toISOString()
  };

  const res = await axios.post(BASE_URL + CREATE_POST_ENDPOINT, data, {
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
}

export const useGetAllPosts = async () => {
    const res = await axios.get(BASE_URL + GET_ALL_POSTS_ENDPOINT);
    
    if (res.status != 200) {
        throw new Error("Not Authorized");
    }
    
    return res.data;
}

export const useGetPostById = async (id: string) => {
    const res = await axios.get(BASE_URL + GET_POST_BY_ID_ENDPOINT + id);
    
    if (res.status != 200) {
        throw new Error("Not Authorized");
    }
    
    return res.data;
}

export const useGetAllUserPosts = async (author: string) => {
    const res = await axios.get(BASE_URL + GET_ALL_USER_POSTS_ENDPOINT + author);
    
    if (res.status != 200) {
        throw new Error("Not Authorized");
    }
    
    return res.data;
}

export const useUpdatePost = async (id: string, title: string, content: string) => {
    const token = localStorage.hasOwnProperty("token")
    ? localStorage.getItem("token")
    : "";

    var data = {
        title: title,
        content: content,
        createdAt: new Date().toISOString()
    };

    const res = await axios.put(BASE_URL + UPDATE_POST_ENDPOINT + id, data, {
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

export const useDeletePost = async (id: string) => {
    const token = localStorage.hasOwnProperty("token")
    ? localStorage.getItem("token")
    : "";

    const res = await axios.delete(BASE_URL + DELETE_POST_ENDPOINT + id, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (res.status != 204) {
        console.log(res);
        throw new Error("Not Authorized");
    }

    return res.data;
}