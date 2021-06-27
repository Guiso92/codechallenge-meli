import React, { useEffect, useState, useRef } from "react";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";

import logo from "../shared/assets/Logo_ML.png";
import searchIcon from "../shared/assets/ic_Search.png";
import "../styles/search-bar.scss";

export default function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const searchInput = useRef(null);
  let history = useHistory();
  const search = new URLSearchParams(useLocation().search).get("search");

  const handleSearch = () => {
    if (!searchText) {
      history.push("/");
    } else {
      history.push(`/items?search=${searchText}`);
    }
  };

  useEffect(() => {
    searchInput.current.focus();
    !!search ? setSearchText(search) : setSearchText("");
  }, [search]);

  return (
    <div className="search-bar">
      <div className="search-container">
        <Link to={"/"} className="search-logo-link">
          <img src={logo} alt="Logo de MercadoLibre" className="search-logo" />
        </Link>
        <input
          value={searchText}
          type="text"
          placeholder="Nunca dejes de buscar"
          className="search-input"
          name="search-input"
          ref={searchInput}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
        <button type="button" className="search-button" onClick={handleSearch}>
          <img
            src={searchIcon}
            alt="Icono de busqueda"
            className="search-icon"
          />
        </button>
      </div>
    </div>
  );
}
