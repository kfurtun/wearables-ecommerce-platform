import styled from "styled-components";
import React from "react";
import Coupon from "./Coupon";

// Checkout component in the shopping cart page
export const Checkout = ({ total, setIsModalOpen, shoppingBag }) => {
  const isCartEmpty = shoppingBag.length < 1 && true; // Checks if the cart is empty

  return (
    <Wrapper>
      <Coupon />
      <TotalContainer>
        <Subtotal>
          <strong>Subtotal: ${total.toFixed(2)} CAD</strong>
        </Subtotal>

        <Taxes>Taxes: ${(total * 0.15).toFixed(2)} CAD</Taxes>
        <Total>
          <strong>Total: ${(total * 1.15).toFixed(2)} CAD</strong>
        </Total>
      </TotalContainer>
      <Button onClick={() => setIsModalOpen(true)} isCartEmpty={isCartEmpty}>
        CHECKOUT
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #f6f6f6;
  border-radius: 5px;
  padding: 0px 30px;
  width: 75vw;
  height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (min-width: 768px) {
    width: 50vw;
    margin-top: 30px;
    padding: 0px 20px;
  }
`;

const Button = styled.button`
  margin-top: 10px;
  height: 50px;
  width: 100%;
  border-radius: 5px;
  background: ${(props) =>
    props.isCartEmpty ? "rgb(133, 133, 133)" : "#079992"};
  border: none;
  cursor: pointer;
  color: white;
  pointer-events: ${(props) => (props.isCartEmpty ? "none" : "auto")};
  :hover {
    background-color: #025753;
  }
  @media (min-width: 768px) {
    width: 50%;
  }
`;

const TotalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 5px;
`;

const Subtotal = styled.div`
  font-size: 15px;
`;

const Total = styled.div`
  margin-top: 12px;
  margin-bottom: 12px;
  font-size: 20px;
  @media (max-width: 756px) {
    font-size: 15px;
  }
`;

const Taxes = styled.div`
  font-size: 15px;
  @media (max-width: 756px) {
    font-size: 12px;
  }
`;
