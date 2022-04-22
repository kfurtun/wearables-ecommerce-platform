import React, { useRef, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ProjectContext } from "./ProjectContext";
import { BsSearch } from "react-icons/bs";

const SearchBar = () => {
  const { allItems, allCategories } = useContext(ProjectContext);
  const [viewSearchBar, setViewSearchBar] = useState(false);
  const [searchBarInput, setSearchBarInput] = useState("");
  const [filteredSearchResults, setFilteredSearchResults] = useState([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);
  const searchInput = useRef(null);
  const navigate = useNavigate();

  // Focus the search bar each time after it renders
  useEffect(() => {
    if (viewSearchBar && searchInput.current !== null) {
      searchInput.current.focus();
    }
  }, [viewSearchBar]);

  // Handle searchbar button
  const handleViewSearchBar = () => {
    setViewSearchBar(true);
  };
  // Handle whenever focus is lost from the searchbar
  const handleHideSearchBar = (ev) => {
    if (searchBarInput.length < 3) {
      setSearchBarInput("");
    }
    setViewSearchBar(false);
  };
  // Store text in searchBarInput and filteringResults from existing items
  const handleSearchChange = (ev) => {
    setSearchBarInput(ev.target.value);
    if (ev.target.value.length > 2) {
      setFilteredSearchResults(
        allItems.filter((item) => {
          return item.name
            .toLowerCase()
            .includes(ev.target.value.toLowerCase());
        })
      );
    } else {
      setFilteredSearchResults([]);
    }
  };

  const handleSelect = (item_id) => {
    navigate(`/product/${item_id}`);
    setSearchBarInput("");
    handleHideSearchBar();
    setSelectedSuggestionIndex(0);
  };

  const isSelected = (index) => {
    return selectedSuggestionIndex === index;
  };

  const handleKeydown = (ev) => {
    switch (ev.key) {
      case "Enter": {
        if (
          ev.target.value.length > 2 &&
          filteredSearchResults[selectedSuggestionIndex].name
            .toLowerCase()
            .includes(ev.target.value.toLowerCase())
        )
          handleSelect(filteredSearchResults[selectedSuggestionIndex]._id);
        return;
      }
      case "ArrowUp": {
        if (selectedSuggestionIndex > 0) {
          setSelectedSuggestionIndex(selectedSuggestionIndex - 1);
        }
        return;
      }
      case "ArrowDown": {
        if (selectedSuggestionIndex < filteredSearchResults.length - 1) {
          setSelectedSuggestionIndex(selectedSuggestionIndex + 1);
        }
        return;
      }
      default: {
      }
    }
  };

  return (
    <Wrapper>
      {allItems !== null && viewSearchBar && (
        <OuterWrapper>
          <SearchInput
            value={searchBarInput}
            ref={searchInput}
            onChange={(ev) => handleSearchChange(ev)}
            onFocus={(ev) => handleSearchChange(ev)}
            onKeyDown={(ev) => handleKeydown(ev)}
            // onBlur={(ev) => handleHideSearchBar(ev)}
            placeholder={" Find"}
          />
          <SearchTitle>SEARCH</SearchTitle>
          <Blocker onClick={(ev) => handleHideSearchBar(ev)} />
          {/*puts an invisible element in the whole screen to know when
          the user clicks away from the search bar and its elements*/}
        </OuterWrapper>
      )}

      {allCategories !== [] &&
        viewSearchBar &&
        filteredSearchResults.length > 0 && (
          <SuggestionContainer>
            {filteredSearchResults.map((item, index) => {
              let name = item.name;
              let matchingIndex = name
                .toLowerCase()
                .indexOf(searchBarInput.toLowerCase());

              return (
                <Suggestion
                  isSelected={isSelected}
                  index={index}
                  key={item._id}
                  onClick={() => handleSelect(item._id)}
                  onMouseEnter={() => setSelectedSuggestionIndex(index)}
                >
                  <span>
                    {name.slice(0, matchingIndex)}
                    <Prediction>
                      {name.slice(
                        matchingIndex,
                        matchingIndex + searchBarInput.length
                      )}
                    </Prediction>
                    {name.slice(matchingIndex + searchBarInput.length)}
                  </span>
                  <Divider />
                </Suggestion>
              );
            })}
          </SuggestionContainer>
        )}

      <IconWrapper>
        <InputButton name="searcButton" onClick={() => handleViewSearchBar()}>
          <BsSearch size={"24px"} />
        </InputButton>
      </IconWrapper>
    </Wrapper>
  );
};

const OuterWrapper = styled.div`
  position: relative;
  z-index: 1000;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 50px;
  width: 200px;
  border: 1px gray solid;
  padding: 5px;
  animation: expand 400ms ease-out;
  @keyframes expand {
    from {
      width: 65%;
      opacity: 0;
    }

    to {
      opacity: 1;
      width: 100%;
    }
  }

  @media (prefers-reduced-motion) {
    animation: none;
  }
`;

const SearchInput = styled.input`
  position: relative;
  z-index: 1000;
  width: 150px;
  border: none;
  outline: none;
  font-weight: 100;
  font-size: 12px;
  color: #070808;
`;

const InputButton = styled.button`
  position: relative;
  z-index: 1000;
  background-color: transparent;
  border: none;
`;

const Wrapper = styled.div`
  height: 50px;
  width: 200px;
  position: relative;
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 6px;
  top: 13px;
`;

const SearchTitle = styled.span`
  position: absolute;
  left: 10px;
  top: 10px;
  font-weight: 100;
  font-size: 10px;
  color: gray;
`;

/// result list
const SuggestionContainer = styled.ul`
  position: relative;
  z-index: 1000;
  background-color: white;
  margin-top: 5px;
  padding: 0 2px;
  box-shadow: 1px 1px 10px grey;
`;

const Suggestion = styled.li`
  position: relative;
  z-index: 1000;
  color: var(--primary-color);
  background-color: ${(props) =>
    props.isSelected(props.index)
      ? "hsla(201deg, 70%, 26%, 0.10)"
      : "transparent"};
  margin: 3px 0;
`;

const Prediction = styled.span`
  font-weight: bold;
`;

const Blocker = styled.div`
  position: fixed;
  z-index: 999;
  background-color: gray;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  opacity: 0.01;
`;

const Divider = styled.div`
  height: 2px;
  background-color: var(--primary-color);
`;

export default SearchBar;
