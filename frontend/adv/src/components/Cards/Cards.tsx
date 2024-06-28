import CardItem from '../CardItem';
import './Cards.css';
import React, { useEffect, useState } from 'react';
import { useGetAllPosts, useGetAllUserPosts } from '../../hooks/PostHooks';
import { useNavigate, useParams  } from 'react-router-dom';  

function Cards({ postsLoad, loadUserPosts = false, managePosts = false}) {
  const [posts, setPosts] = useState([]);
  const { id } = useParams<{id?: string}>();

  if (!postsLoad) {
    useEffect(() => {
      const fetchPosts = async () => {
        const response = loadUserPosts ? await useGetAllUserPosts(id) : await useGetAllPosts();
        setPosts(response);
      };
  
      fetchPosts();
    }, []);

    return (
      <div>
        <div className='cards'>
          <h1>Check out these new posts!</h1>
          <div className='cards__container'>
              <div className="cards__wrapper">
                  <ul className="cards__items">
                      {posts.map((post) => (
                        <CardItem
                          key={post.id}
                          id={post.id}
                          src='images/img-1.jpg'
                          text={post.content}
                          label={post.title}
                          path={'/post/' + post.id}
                        />
                      ))}
                  </ul>
              </div>
          </div>
        </div>
      </div>
    )
  }
  else{
    return (
      <div className='cards'>
        <div className='cards__container'>
          <div className="cards__wrapper">
            <ul className="cards__items">
              {postsLoad.map((post) => (
                <CardItem
                  key={post.id}
                  id={post.id}
                  src='images/img-1.jpg'
                  text={post.content}
                  label={post.title}
                  path={'/post/' + post.id}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

}

export default Cards;



