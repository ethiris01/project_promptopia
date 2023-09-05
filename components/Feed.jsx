"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

// this is for promptCard functionality
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
  );
};

// this is for feed page
const Feed = () => {
  // state for searchText
  const [allPosts, setAllPosts] = useState([]); // allPosts state with array items. main one
  //1. implement search
  const [searchText, setSearchText] = useState(""); // searchText used for handelTagClick
  const [searchTimeout, setSearchTimeout] = useState(null); // timeout state used for search -timeout
  const [searchResults, setSearchResults] = useState([]); // this state used to finalize with search and results states. (handle these two)

  // fetch posts to fetch prompts from db.
  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    // setPosts
    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts(); // final function called here
  }, []);

  // filterPrompts functionality - with 3 types of search
  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search

    // using filter to find search values.
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) || // search by username
        regex.test(item.tag) || // search by tag
        regex.test(item.prompt)
    );
  };

  // handleSearchChange functionality with target the key strokes
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout); // clearTimeOut is set to this state.
    setSearchText(e.target.value); // setSearchText will get key values.

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchResults(searchResult);
      }, 1000)
    );
  };

  // 2. implement click on tag

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    // searchResult
    const searchResult = filterPrompts(tagName);
    setSearchResults(searchResult);
  };

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

      {/* All prompts */}
      {searchText ? (
        // if any search exits this will line will run with handle tag functionality
        <PromptCardList data={searchResults} handleTagClick={handleTagClick} />
      ) : (
        // if not this line run as main with handle tag functionality
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};
export default Feed;
