import React, { useEffect, useState } from 'react';
import { useGetPostById, useDeletePost, useUpdatePost } from '../../hooks/PostHooks';
import { useGetData, useGetYourData } from '../../hooks/LoginHooks';
import { Button } from '../Buttons/Button';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './PostInformation.module.css';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { useGetPhotosByPost } from '../../hooks/PhotoHooks';



interface Post {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    author: string;
}

interface Author {
    id: number;
    username: string;
    email: string;
}

const PostInformation = () => {
    const [post, setPost] = useState<Post[]>([]);
    const [currentUserId, setCurrentUser] = useState<number>();
    const [author, setAuthor] = useState<Author[]>([]);
    const [isDeleted, setIsDeleted] = useState(false);
    const navigateTo = useNavigate ();
    const { id } = useParams<{id?: string}>();
    const { setIsLogged, isLogged } = useAuth();
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const { postId } = useParams();

    useEffect(() => {
        if (post) {
          setEditTitle(post.title);
          setEditContent(post.content);
        }
      }, [post]);

    useEffect(() => {
        const fetchPost = async () => {
            if (id) {
                try {
                const postData = await useGetPostById(id);
                const authorId = postData.authorId;
                const authorData = await useGetData(authorId);
                setPost(postData);
                setAuthor(authorData);
                } catch (error) {
                    console.error(error);
                }
            } else {
                console.error('Post id is undefined');
            }
        };
        fetchPost();
    }, [id]);

    useEffect(() => {
    
        const fetchUser = async () => {
            try {
                const userData = await useGetYourData();
                const userId = userData.id;
                setCurrentUser(userId);
            } catch (error) {
                console.error(error);
            }
        };
        if (isLogged) {
            fetchUser();
        }
    });

    const handleDelete = async () => {
        try {
            await useDeletePost(id);
            setIsDeleted(true);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };  

    const editModeHandler = () => {
        setEditMode(true);
    };

    const handleUpdate = async () => {
        
        if (editTitle.trim() === '' || editContent.trim() === '') {
          alert('Title and content cannot be empty.');
          return;
        }
        try {
          await useUpdatePost(id, editTitle, editContent);
          setSuccessMessage('Update successful!');
          post.title = editTitle;
          post.content = editContent;
          setTimeout(() => setSuccessMessage(''), 3000);
          setTimeout(() => {
            setEditMode(false);
          }, 3000);
        //   navigateTo(`/post/${id}`);
        } catch (error) {
          console.error(error);
          setSuccessMessage('Failed to update the post!');
          setTimeout(() => setSuccessMessage(''), 3000);
        }
      };
    
    const handleResign = () => {
        setEditMode(false);
    };
  
    if (!post) {
      return <div>Loading...</div>;
    }

    if (isDeleted) {
        return (
          <div className={styles.PostInformation}>
            <p>POST WAS DELETED</p>
          </div>
        );
    }
    else if(post.length === 0) {
        return (
            <div className={styles.PostInformation}>
              <p>POST NOT FOUND</p>
            </div>
          );
    }

    if(editMode) {
        return (
            <div className={styles.PostInformation}>
              {isLogged && author.id === currentUserId ? (
                <>
                  Title<input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                  Content<input type="text" value={editContent} onChange={(e) => setEditContent(e.target.value)} />
                  <div>
                    <div style={{ display: 'inline-block', marginRight: '10px' }}> 
                        <Button buttonStyle='btn--outline2' onClick={handleUpdate}>Confirm</Button>
                    </div>
                
                    <div style={{ display: 'inline-block', marginRight: '10px' }}> 
                        <Button buttonStyle='btn--outline2' onClick={handleResign}>Resign</Button>
                    </div>
                    {successMessage && <span>{successMessage}</span>}
                  </div>
                </>
              ) : (
                <>
                  <h1>{post.title}</h1>
                  <p>Author: <Link to={`/user/${author.id}`}>{author.username}</Link></p>
                  <p>{post.content}</p>
                </>
              )}
            </div>
          );
    }
    else
    {
        return (
            <div className={styles.PostInformation}>
              <h1>{post.title}</h1>
              <p>Author: <Link to={`/user/${author.id}`}>{author.username}</Link></p>
              <p>{post.content}</p>
              {isLogged && author.id === currentUserId && (
                  console.log("author id: " + author.id),
                  <div>
                      <div style={{ display: 'inline-block', marginRight: '10px' }}>
                          <Button buttonStyle='btn--outline2' onClick={editModeHandler}>Edit</Button>
                      </div>
                      <div style={{ display: 'inline-block' }}>
                      <Button buttonStyle='btn--outline2' onClick={handleDelete}>Delete</Button>
                      </div>
                      
                  </div>
              )}
            </div>
          );
    }
    
    
  
    
};

export default PostInformation;
