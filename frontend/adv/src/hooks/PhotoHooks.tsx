import { useState, useContext, createContext } from "react";
import axios from "axios";
import { BASE_URL } from "../api/axios";
const GET_PHOTO_ENDPOINT = "/api/post/photo/";
const CREATE_PHOTO_ENDPOINT = "/photos/create/";

interface PhotoDetail {
  id: number;
  name: string;
  photoLink: string;
}

interface ILoadingContextType {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
}

const LoadingContext = createContext<ILoadingContextType>({
  isLoading: false,
  setIsLoading: () => {},
});

export const useLoading = () => {
  return useContext(LoadingContext);
};

export const useCreatePhoto = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [photoResponse, setPhotoResponse] = useState<PhotoDetail | null>(null);

  const token = localStorage.hasOwnProperty("token")
    ? localStorage.getItem("token")
    : "";

  const createPhoto = async (postId: number, photo: File) => {
    setIsLoading(true);
    setError(null);
    console.log("photo");
    const formData = new FormData();
    formData.append("image", photo);
    console.log("photo 2");
    try {
      const response = await axios.post<PhotoDetail>(
        BASE_URL + CREATE_PHOTO_ENDPOINT + postId,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setPhotoResponse(response.data);
      setIsLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error);
      } else {
        setError(new Error("An unknown error occurred"));
      }
      setIsLoading(false);
    }
  };

  return { createPhoto, isLoading, error, photoResponse };
};

export const useGetPhotosByPost = (postId: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const [photos, setPhotos] = useState<PhotoDetail[]>([]);
  const [statusCode, setStatusCode] = useState<number | null>(null);

  const getPhotos = async () => {
    setIsLoading(true);
    console.log("getPhotos actually");

    console.log(BASE_URL + GET_PHOTO_ENDPOINT + postId);
    const response = await axios.get<PhotoDetail[]>(
      BASE_URL + GET_PHOTO_ENDPOINT + postId,
    );
    console.log("response is" + response.status);
    setStatusCode(response.status);
    if (response.status === 200) {
      console.log(response.data);
      setPhotos(response.data);
      console.log("whatever" + photos);
      setIsLoading(false);
    }
    setIsLoading(false);

    return { statusCode: response.status, photos: response.data };
  };
  return { getPhotos, photos, statusCode };
};
