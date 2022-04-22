import React from "react";

import { Item } from "./Item";
import { ProjectContext } from "../ProjectContext";
import { Checkout } from "./Checkout";
import styled from "styled-components";
import { PurchaseModal } from "./PurchaseModal";
import { ConfirmationModal } from "./ConfirmationModal";

// Shows shopping cart page
export const ShoppingCartPage = () => {
  const { shoppingBag, couponApplied } = React.useContext(ProjectContext);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = React.useState(false);
  const [result, setResult] = React.useState(undefined);
  let total = 0; // Cart total amount in CAD

  return (
    <div>
      {shoppingBag.length === 0 && (
        <EmptyCart>
          Oh no! Your cart is empty.
          <br />
          Click&nbsp;
          <a
            style={{ textDecoration: "none", color: "#2980b9" }}
            href="/catalogue"
          >
            here
          </a>
          &nbsp;to start shopping.
        </EmptyCart>
      )}
      <Wrapper isModalOpen={isModalOpen}>
        <LeftCont>
          {shoppingBag.length > 0
            ? shoppingBag.map((item, index) => {
                if (couponApplied && item.numInStock === 1) {
                  total += parseFloat(
                    (item.price.slice(1) * item.quantity) / 2 // Adjusting the total if a coupon has been applied
                  );
                } else {
                  total += parseFloat(item.price.slice(1) * item.quantity); // Calculating the total
                }

                return <Item item={item} key={index} index={index} />;
              })
            : undefined}
        </LeftCont>
        {shoppingBag.length > 0 && (
          <RightCont>
            <Checkout
              total={total}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              shoppingBag={shoppingBag}
            />
          </RightCont>
        )}
      </Wrapper>
      {isModalOpen && (
        <PurchaseModal
          setIsModalOpen={setIsModalOpen}
          setIsConfirmationOpen={setIsConfirmationOpen}
          setResult={setResult}
          total={total}
        />
      )}
      {isConfirmationOpen && <ConfirmationModal result={result} />}{" "}
      {/*Passing the result state to the confirmation page*/}
    </div>
  );
};

const Wrapper = styled.div`
  margin: 30px 0;
  display: flex;
  width: 100%;
  gap: 60px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Open Sans", sans-serif;
  @media (max-width: 1145px) {
    flex-direction: column;
    gap: 0px;
  }
`;

const LeftCont = styled.div``;

const RightCont = styled.div`
  padding-left: 50px;
  margin-right: 10px;
  @media (max-width: 837px) {
    margin-left: 40px;
  }
`;

const EmptyCart = styled.div`
  font-size: 22px;
  font-family: "Open Sans", sans-serif;
  margin: 30px;
`;
