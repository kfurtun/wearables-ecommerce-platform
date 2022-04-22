import React from "react";
import styled from "styled-components";
import { ProjectContext } from "../ProjectContext";
import { breakpoints } from "../GlobalStyles";

const Coupon = () => {
  const {
    setCouponApplied,
    promoCode,
    setPromoCode,
    codeApplied,
    setCodeApplied,
  } = React.useContext(ProjectContext);

  // Tracking whats the input of the coupon code
  const handleChange = (ev) => {
    setPromoCode(ev.target.value.toUpperCase());
  };

  const handleClick = (ev) => {
    if (promoCode === "CONCORDIA") {
      setCodeApplied(promoCode);
      setCouponApplied(true);
      // Resetting the promo code to an empty string once applied
      setPromoCode("");
    } else if (codeApplied !== null) {
      setCodeApplied(null);
      setCouponApplied(false);
    }
  };

  return (
    <Wrapper>
      <h3>Promotion Code</h3>
      {codeApplied === null ? (
        <div>
          <Input
            value={promoCode}
            placeholder={"CODE"}
            onChange={(ev) => handleChange(ev)}
          ></Input>
          <Button onClick={(ev) => handleClick(ev)}>Apply</Button>
        </div>
      ) : (
        <div>
          <span>
            Code: <Applied>{codeApplied}</Applied> applied!
          </span>
          <Button onClick={(ev) => handleClick(ev)}>Remove</Button>
        </div>
      )}
    </Wrapper>
  );
};

export default Coupon;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2px 0;
`;

const Button = styled.button`
  color: white;
  background-color: var(--primary-color);
  padding: 4px 20px;
  margin: 0 5px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  @media (min-width: ${breakpoints.tablet}) {
    padding: 8px 40px;
  }
`;

const Input = styled.input`
  height: 18px;
`;

const Applied = styled.span`
  color: var(--primary-color);
  font-weight: bold;
  font-style: oblique;
`;
