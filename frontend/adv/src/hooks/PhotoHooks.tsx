import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../api/axios'; // Assuming BASE_URL is where your backend server is hosted
const CREATE_PHOTO_ENDPOINT = 'photos/';
const GET_PHOTOS_BY_POST_ENDPOINT = '/post/';

interface PhotoResponse {
  // Define the structure based on the response you expect from your backend
  id: number;
  photoData: string;
  postId: number;
}

export const useCreatePhoto = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [photoResponse, setPhotoResponse] = useState<PhotoResponse | null>(null);

  const token = localStorage.hasOwnProperty("token")
    ? localStorage.getItem("token")
    : "";

  const createPhoto = async (postId: number, photo: File) => {
    setIsLoading(true);
    setError(null);
    console.log("photo")
    const formData = new FormData();
    formData.append('image', photo);

    try {
      const response = await axios.post<PhotoResponse>(BASE_URL + CREATE_PHOTO_ENDPOINT + postId, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    

      setPhotoResponse(response.data);
      setIsLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error);
      } else {
        setError(new Error('An unknown error occurred'));
      }
      setIsLoading(false);
    }
  };

  return { createPhoto, isLoading, error, photoResponse };
};

export const useGetPhotosByPost = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [photos, setPhotos] = useState<PhotoResponse[] | null>(null);

    const token = localStorage.hasOwnProperty("token")
    ? localStorage.getItem("token")
    : "";
  
    const getPhotosByPost = async (postId: number) => {
      setIsLoading(true);
      setError(null);
  
      try {
        const response = await axios.get<PhotoResponse[]>(BASE_URL + GET_PHOTOS_BY_POST_ENDPOINT + '/' + postId, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
  
        setPhotos(response.data);
        setIsLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error);
        } else {
          setError(new Error('An unknown error occurred'));
        }
        setIsLoading(false);
      }
    };
  
    return { getPhotosByPost, isLoading, error, photos };
  };