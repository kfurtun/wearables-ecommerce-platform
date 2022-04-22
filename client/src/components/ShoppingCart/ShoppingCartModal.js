import React from "react";
import styled from "styled-components";
import { ProjectContext } from "../ProjectContext";
import { Item } from "./Item";
import { useNavigate } from "react-router-dom";

// Details of shopping cart modal
export const ShoppingCartModal = ({ setIsHovered }) => {
  const { shoppingBag } = React.useContext(ProjectContext);

  let navigate = useNavigate();
  let total = 0;
  let background = false;

  // Calculating the total price of all items in the shopping bag modal
  shoppingBag.forEach((item) => {
    total += parseFloat(item.price.slice(1));
  });
  return (
    <>
      <Container
        onClick={() => {
          setIsHovered(!background);
          background = !background;
        }}
      ></Container>
      {/* for background*/}
      <Wrapper onMouseLeave={() => setIsHovered(false)}>
        <UpperCont>
          <Header>
            <span>Shopping Bag</span>
            <span>Total: ${total.toFixed(2)} CAD</span>
          </Header>
          <div>
            <Button
              onClick={() => {
                setIsHovered(false);
                navigate("/shopping-cart");
              }}
            >
              View Bag
            </Button>
          </div>
        </UpperCont>
        {shoppingBag.length < 1 ? (
          <LowerContNoItem>
            There are no items in your shopping bag!
          </LowerContNoItem>
        ) : (
          <div>
            {shoppingBag.map((item, index) => (
              <span key={item._id}>
                <Item setIsHovered={setIsHovered} item={item} key={index} />
              </span>
            ))}
          </div>
        )}
        <BottomBorder></BottomBorder> {/* only for resized border*/}
      </Wrapper>
    </>
  );
};

const Container = styled.div`
  background: gray;
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  left: 0;
  top: 0;
  opacity: 0.2;
`;

const Wrapper = styled.div`
  min-width: 500px;
  min-height: 400px;
  background: #ecf0f1;
  position: absolute;
  right: 10px;
  top: 45px;
  padding: 30px;
  border-radius: 2px;
  z-index: 1;
  @media (max-width: 837px) {
    font-size: 14px;
    min-width: 320px;
    overflow: scroll;
    height: 300px;
  }
  animation: expand 300ms ease-out;
  @keyframes expand {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion) {
    animation: none;
  }
`;

const Header = styled.div`
  font-size: 20px;
  width: 440px;
  display: flex;
  justify-content: space-between;
  font-family: "Open Sans", sans-serif;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    font-size: 20px;
    width: 200px;
  }
`;

const Button = styled.button`
  width: calc(500px - 60px);
  background-color: var(--primary-color);
  background-color: #2980b9;
  color: white;
  font-size: 18px;
  border-style: none;
  border-radius: 7px;
  height: 50px;
  margin-top: 30px;
  margin-bottom: 15px;
  color: white;
  &:hover {
    cursor: pointer;
    background-color: #185277;
  }
  @media (max-width: 837px) {
    font-size: 14px;
    width: 260px;
  }
`;

const UpperCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LowerContNoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  font-family: "Open Sans", sans-serif;
`;

const BottomBorder = styled.div`
  /* border-bottom: 2px solid black; */
  position: absolute;
  bottom: 0;
  width: calc(500px - 60px);
`;
