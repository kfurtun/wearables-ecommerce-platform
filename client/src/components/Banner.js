import React from "react";
import styled from "styled-components";
import Tippy from "@tippyjs/react";

const Banner = () => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isClicked, setIsClicked] = React.useState(false);
  const handleHover = (hover) => {
    setIsHovered(hover);
  };

  const handleClick = () => {
    if (!isClicked) {
      setIsClicked(true);
      navigator.clipboard.writeText("CONCORDIA");
      setTimeout(() => {
        setIsClicked(false);
      }, 5000);
    }
  };
  return (
    <Wrapper>
      <Tippy
        content={
          <TippyContent>
            Use the code "CONCORDIA" at the check out and get 50% off on items
            that display "Only 1 in stock"
          </TippyContent>
        }
      >
        <SlidingText
          onClick={() => handleClick()}
          onMouseOver={() => handleHover(true)}
          onMouseLeave={() => handleHover(false)}
        >
          {isClicked ? (
            <h3>Promotion code copied to your clipboard</h3>
          ) : isHovered ? (
            <h2>CLICK here to copy the promotion code</h2>
          ) : (
            <h2>Promotion: 50% discount on selected items</h2>
          )}
        </SlidingText>
      </Tippy>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 50px;
  width: 100%;
  color: white;
  background-color: var(--primary-color);
  padding: 0 20px;
  margin-bottom: 20px !important;
`;

const SlidingText = styled.div`
  h2 {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    color: white;
    width: 350px;
    /* wiggly text animation */
    animation: slide 10s infinite ease;
    font-size: 15px;
    &:hover {
      margin: 0;
      animation-play-state: paused;
    }
    /*disabling animation when user selects reduce
    motion in their operative system*/
    @media (prefers-reduced-motion) {
      animation: none;
    }
  }
  h3 {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    overflow: hidden;
    color: white;
    width: 350px;
    /* vanish text animation */
    animation: vanish 5s linear;
    animation-iteration-count: 1;
    font-size: 15px;

    /*disabling animation when user selects reduce
    motion in their operative system*/
    @media (prefers-reduced-motion) {
      animation: none;
    }
  }

  @keyframes slide {
    0% {
      transform: rotate(0deg);
    }

    1% {
      transform: rotate(1.5deg);
    }
    2% {
      transform: rotate(-1.5deg);
    }
    3% {
      transform: rotate(1deg);
    }
    4% {
      transform: rotate(-1deg);
    }
    5% {
      transform: rotate(0deg);
    }
  }

  @keyframes vanish {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const TippyContent = styled.div`
  margin-top: -10px;
  border: gray 3px solid;
  color: white;
  padding: 10px 8px;
  height: 80px;
  background-color: var(--primary-color);
`;

export default Banner;
