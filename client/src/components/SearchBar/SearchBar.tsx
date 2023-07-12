import "./SearchBar.scss";
import SearchIcon from "../../assets/icons/search_light.svg";

export const SearchBar = () => {
  return (
    <div className="searchbar-container">
      <input type="text" placeholder="Search..." className="search" />
      <img src={SearchIcon} />
    </div>
  );
};