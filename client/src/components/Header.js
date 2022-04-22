import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { breakpoints } from "./GlobalStyles";
import logo from "./LOGO.png";
import { FiHome } from "react-icons/fi";
import { ShoppingCart } from "./ShoppingCart/ShoppingCart";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <Wrapper>
      <HomeLink to={"/"}>
        <FiHome size={"24px"} />
      </HomeLink>
      <HomeLink to={"/"}>
        <LOGO src={logo} />
        <h2>EARABLES</h2>
      </HomeLink>
      <InnerWrapper>
        <SearchBar />
        <ShoppingCart />
      </InnerWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 120px;
  width: 100%;
  margin: 0;
  padding: 20px;
  background-color: #fafdff;

  h2 {
    position: absolute;
    /*the calculation below is to keep the h2 Hcentered
    if the h2 content changes, change the px value below to half
    of the h2 element width*/
    left: calc(50% - 40px);
    top: 20px;
  }

  img {
    position: absolute;
    left: calc(50% - 90px);
    top: 5px;
    border-radius: 5px;
  }

  @media (min-width: ${breakpoints.tablet}) {
    height: 60px;
    align-items: center;
  }
`;

const InnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 280px;
  margin-bottom: -10px;
  @media (min-width: ${breakpoints.tablet}) {
    width: 300px;
  }
`;

const HomeLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const LOGO = styled.img`
  display: inline-block;
  height: 50px;
  width: 50px;
`;

export default Header;
