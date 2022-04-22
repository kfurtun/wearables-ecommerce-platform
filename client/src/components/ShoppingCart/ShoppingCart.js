import React from "react";
import { GrShop } from "react-icons/gr";
import styled from "styled-components";
import { ShoppingCartModal } from "./ShoppingCartModal";
import { ProjectContext } from "../ProjectContext";

//shows shopping cart icon and details of shopping cart in a model when it's hovered
export const ShoppingCart = () => {
  const [isHovered, setIsHovered] = React.useState(false);

  const { shoppingBag } = React.useContext(ProjectContext);

  // Setting the quantity that will appear beside the shopping bag icon
  let quantity = 0;
  shoppingBag.forEach((item) => {
    quantity += item.quantity;
  });

  return (
    <Wrapper
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Button>
        <GrShop size={"24px"} />
        {quantity ? <span>{quantity}</span> : undefined}
      </Button>
      {isHovered && <ShoppingCartModal setIsHovered={setIsHovered} />}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  position: relative;
  height: 45px;
  width: 60px;
  left: 10px;
  display: flex;
  justify-content: center;
  z-index: 2;
  font-family: "Open Sans", sans-serif;
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;
