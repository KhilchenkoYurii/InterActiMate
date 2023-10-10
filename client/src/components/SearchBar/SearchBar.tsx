import "./SearchBar.scss";
import SearchIcon from "../../assets/icons/search_light.svg";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import apiService from "../../services/api.service";
import constants from "../../services/constants";
import { IRequestCard, RequestCard } from "../RequestCard/RequestCard";
import CloseIcon from '../../assets/icons/cross.svg';

export const SearchBar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [results, setResults] = useState<IRequestCard[]>([]);
  let timeout: any;

  const sendSearchRequest = async(value: string) => {
    const query = value.split(' ').join('+');

    const searchResults = await apiService.get(`posts/searchBar?search=${query}`);

    const { searchedPosts } = searchResults.data.data;

    setResults(searchedPosts);
  };

  const handleInput = async (event: ChangeEvent<HTMLInputElement>) => {
    window.clearTimeout(timeout);

    const { value } = event.target;

    if (!value) return setResults([]);

    timeout = setTimeout(() => {
      sendSearchRequest(value);
    }, 300);
  }

  const handleCloseSearch = () => {
    setShowSearch(false);
    setResults([]);
  };

  return (
    <div className="searchbar-container">
      {!showSearch && (
        <>
          <input type="text" placeholder="Search..." className="search" onChange={handleInput} onClick={() => setShowSearch(value => !value)} />
          <img src={SearchIcon} />
        </>
      )}
      {!!showSearch && (
        <div className="fixed cards-container search-results top-0 left-0 w-full flex overflow-scroll z-50">
          <div className="flex w-full">
            <input type="text" placeholder="Search..." className="search mr-2 p-2 rounded-3xl" onChange={handleInput} />
            <img src={CloseIcon} className="cursor-pointer" onClick={handleCloseSearch}  />
          </div>
          {results.map((request) => (
            <RequestCard key={request?._id} handleClick={handleCloseSearch} {...request} />
          ))}
        </div>
      )}
    </div>
  );
};