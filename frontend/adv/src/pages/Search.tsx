import '../App.css';
import React, { useEffect, useState } from 'react';
import Footer from '../core/Footer';
import SearchBar from '../components/SearchBar/SearchBar';
import Cards from '../components/Cards/Cards';
import { useGetAllPosts } from '../hooks/PostHooks';

export default function Search() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Step 1: Add searchTerm state

  useEffect(() => {
    const fetchPosts = async () => {
      const allPosts = await useGetAllPosts();
      setPosts(allPosts);
      setFilteredPosts(allPosts); // Initially display all posts
    };
    fetchPosts();
  }, []);

  useEffect(() => { // Step 3: useEffect to filter posts based on searchTerm
    const matches = posts.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredPosts(matches);
  }, [searchTerm, posts]); // Depend on searchTerm and posts

  return (
    <>
      <SearchBar onSearch={(term) => setSearchTerm(term)} /> {/* Step 2: Update searchTerm on input change */}
      <Cards postsLoad={filteredPosts} />
      <Footer />
    </>
  );
}