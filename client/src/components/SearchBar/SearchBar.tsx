import "./SearchBar.scss";
import SearchIcon from "../../assets/icons/search_light.svg";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import apiService from "../../services/api.service";
import { IRequestCard, RequestCard } from "../RequestCard/RequestCard";
import CloseIcon from '../../assets/icons/cross.svg';

export const SearchBar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [results, setResults] = useState<IRequestCard[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  let timeout: any;

  useEffect(() => {
    if (!!showSearch && inputRef?.current) {
      inputRef.current.focus();
    }
  }, [showSearch]);

  const sendSearchRequest = async (value: string) => {
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Escape' && !e.shiftKey) {
      e.preventDefault();
      handleCloseSearch();
    }
  }

  const handleCloseSearch = () => {
    setShowSearch(false);
    setResults([]);
  };

  return (
    <div className="searchbar-container">
      {!showSearch && (
        <>
          <input ref={inputRef} type="text" placeholder="Пошук..." className="search" onClick={() => setShowSearch(value => !value)} />
          <img src={SearchIcon} />
        </>
      )}
      {!!showSearch && (
        <div className="fixed cards-container search-results top-0 left-0 w-full flex overflow-scroll z-50">
          <div className="flex flex-col w-full">
            <div className="flex w-full">
              <input
                ref={inputRef}
                type="text"
                placeholder="Пошук..."
                className="search mr-2 p-2 rounded-3xl"
                onChange={handleInput}
                onKeyDown={handleKeyDown}
              />
              <img src={CloseIcon} className="cursor-pointer" onClick={handleCloseSearch} />
            </div>
            <div className="flex w-full mt-10">
              {results.map((request) => (
                <RequestCard key={request?._id} handleClick={handleCloseSearch} {...request} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};