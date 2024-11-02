import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useGetPhotosByPost } from "../../hooks/PhotoHooks";
import { useEffect, useState } from "react";
import { useLoading } from "../../hooks/PhotoHooks";

export default function MyImageList({ postId }) {
  const [isPhoto, setIsPhoto] = useState(false);
  const { getPhotos } = useGetPhotosByPost(postId);
  const [displayError, setDisplayError] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { setIsLoading, isLoading } = useLoading();
  const [photosList, setPhotosList] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        console.log("getPhotos");
        const { statusCode, photos } = await getPhotos();

        console.log("Check before anything " + statusCode);

        console.log("Lets see");
        setPhotosList(photos);
        setIsPhoto(true);
        setDisplayError(false);
      } catch (err) {
        if (statusCode === 404) {
          setIsPhoto(false);
          setDisplayError(false);
        } else {
          setIsPhoto(false);
          setDisplayError(true);
          setError(err.message);
        }
        setIsLoading(false);
        setIsPhoto(false);
      }
    };
    fetchImages();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (displayError) return <div>Error: {error}</div>;

  return (
    <div>
      {isPhoto && (
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
          {photosList.map((item) => (
            <ImageListItem key={item.id}>
              <img
                src={`${item.photoLink}?w=164&h=164&fit=crop&auto=format`}
                alt={item.name}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}
      <p></p>
    </div>
  );
}
