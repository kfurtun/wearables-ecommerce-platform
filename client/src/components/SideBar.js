import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { breakpoints } from "./GlobalStyles";
import React, { useContext, useEffect, useState } from "react";
import { ProjectContext } from "./ProjectContext";

const SideBar = () => {
  const widthLimit = Number(breakpoints.tablet.split("px")[0]); // Removing px from the string and casting it to number
  const { allItems, allCategories } = useContext(ProjectContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth < widthLimit); // Checks window size
  const navigate = useNavigate();

  const mediaQuery = () => {
    setIsMobile(window.innerWidth < widthLimit);
  };

  useEffect(() => {
    window.addEventListener("resize", mediaQuery);
    return () => window.removeEventListener("resize", mediaQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = (cataloguePage) => {
    if (allCategories.includes(cataloguePage)) {
      navigate(`catalogue/categories/${cataloguePage}`);
    } else {
      navigate(`/catalogue/body-locations/${cataloguePage}`);
    }
  };

  return (
    <>
      {allItems !== null && (
        <Wrapper>
          {/* Showing a standard list view when not on mobile */}
          {!isMobile ? (
            <SideBarList>
              <h3>Body location</h3>
              {allItems
                .map((item) => item.body_location)
                .filter(
                  (bLocation, index, array) =>
                    array.indexOf(bLocation) === index
                )
                .map((bLocation) => (
                  <StyledLink
                    key={`sidebar-location-${bLocation}`}
                    to={`/catalogue/body-locations/${bLocation}`}
                  >
                    <SideBarItem>{bLocation}</SideBarItem>
                  </StyledLink>
                ))}
              <h3>Categories</h3>
              {allCategories !== null &&
                allCategories.map((category) => (
                  <StyledLink
                    key={`sidebar-category-${category}`}
                    to={`catalogue/categories/${category}`}
                  >
                    <SideBarItem>{category}</SideBarItem>
                  </StyledLink>
                ))}
            </SideBarList>
          ) : (
            // Showing a dropdown list view when on mobile
            <>
              <SideBarSelect
                defaultValue={"DEFAULT"}
                onChange={(event) => handleSelect(event.target.value)}
                onBlur={(event) => (event.target.value = "DEFAULT")}
              >
                <SideBarOption value={"DEFAULT"} disabled>
                  BODY LOCATION
                </SideBarOption>
                {allItems
                  .map((item) => item.body_location)
                  .filter(
                    (bLocation, index, array) =>
                      array.indexOf(bLocation) === index
                  )
                  .map((bLocation) => (
                    <SideBarOption
                      key={`select-location-${bLocation}`}
                      value={bLocation}
                    >
                      {bLocation}
                    </SideBarOption>
                  ))}
              </SideBarSelect>
              <SideBarSelect
                defaultValue={"DEFAULT"}
                onChange={(event) => handleSelect(event.target.value)}
                onBlur={(event) => (event.target.value = "DEFAULT")}
              >
                <SideBarOption value={"DEFAULT"} disabled>
                  CATEGORIES
                </SideBarOption>
                {allCategories !== null &&
                  allCategories.map((category) => (
                    <SideBarOption
                      key={`select-category-${category}`}
                      value={category}
                    >
                      {category}
                    </SideBarOption>
                  ))}
              </SideBarSelect>
            </>
          )}
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: -10px !important;
  @media (min-width: ${breakpoints.tablet}) {
    position: relative;
    flex-direction: column;
    display: flex;
    align-items: center;
    height: 100%;
    width: 10px;
    min-width: 220px;
    color: var(--primary-color);
    background-color: transparent;
    padding: 0 20px;
    h3 {
      min-width: 160px;
      margin: 25px 0 10px 0;
    }
  }
`;

const SideBarList = styled.ul`
  position: relative;
`;

const SideBarItem = styled.li`
  padding: 3px 0 3px 10px;
`;

const SideBarSelect = styled.select`
  text-align: center;
  color: var(--primary-color);
  height: 25px;
  width: 40%;
  border-radius: 5px;
`;

const SideBarOption = styled.option``;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--primary-color);
  transition: all 250ms;

  &:hover {
    position: relative;
    font-weight: bold;
    top: 1px;
    left: 3px;

    @media (prefers-reduced-motion) {
      top: 0;
      left: 0;
      font-weight: normal;
    }
  }
`;

export default SideBar;
