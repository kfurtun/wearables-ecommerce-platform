import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { breakpoints } from "../GlobalStyles";

// Shows each item in the shopping cart modal
export const Item = ({ item, setIsHovered }) => {
  let navigate = useNavigate();
  const handleClick = () => {
    navigate(`/product/${item._id}`);
    setIsHovered(false);
  };
  return (
    <>
      <Wrapper>
        <ImgWrapper onClick={handleClick}>
          <Img src={item.imageSrc} alt={item._id} />
          <div style={{ marginLeft: "5px" }}> x {item.quantity}</div>
        </ImgWrapper>

        <div style={{ fontStyle: "italic", marginBottom: "5px" }}>
          {item.category}
        </div>
        <div style={{ marginBottom: "5px" }}>
          <strong>{item.name}</strong>
        </div>
        <div style={{ marginBottom: "5px" }}>
          <i>by {item.companyDetails[0].name}</i>
        </div>
        <div>
          <strong>{item.price} CAD</strong>
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.button`
  padding: 30px 0;
  width: 120px;
  font-size: 14px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  margin-right: 0;
  margin-left: 25%;
  @media (min-width: ${breakpoints.tablet}) {
    margin-right: 26px;
    margin-left: 0;
  }
`;

const ImgWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 20px;
  width: 200px;
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
  position: relative !important;
  left: 0 !important;
`;
