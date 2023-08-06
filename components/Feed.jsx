'use client';

import { useState, useEffect } from 'react'

import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setDisplayedPosts(filterPrompts(e.target.value));
  }

  const handleTagClick = (tag) => {
    setSearchText(tag);
    setDisplayedPosts(filterPrompts(tag));
  }

  const filterPrompts = (search) => {
    const regex = new RegExp(search, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (postItem) =>
        regex.test(postItem.creator.username) ||
        regex.test(postItem.tag) ||
        regex.test(postItem.prompt)
    );
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json();

      setPosts(data);
      setDisplayedPosts(data); // Initialize displayed posts with all posts
    }
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList 
        data={displayedPosts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed