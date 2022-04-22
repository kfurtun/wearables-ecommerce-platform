import React from "react";
import styled from "styled-components";

// Shows items from the completed order on confirmation page
export const ItemInOrderSummary = ({ item, quantity }) => {
  return (
    <Wrapper>
      <Img src={item.imageSrc} />
      <InfoCont>
        <div>{item.category}</div>
        <div>
          <strong>{item.name}</strong>
        </div>
        <div>{item.body_location}</div>
        <div>
          {item.companyDetails && <i>by {item.companyDetails[0].name}</i>}
        </div>
        <div>{item.price} CAD</div>
        <div>(x {quantity})</div>
      </InfoCont>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 30px;
  border-bottom: 1px solid lightgrey;
  padding-bottom: 40px;
  margin-top: 30px;
  @media (max-width: 837px) {
    flex-direction: row;
    font-size: 14px;
    border-bottom: 1px solid lightgrey;
    margin-top: 10px;
    padding-bottom: 10px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const Img = styled.img`
  height: 180px;
  width: 180px;
  @media (max-width: 1145px) {
    height: 100px;
    width: 100px;
  }
`;

const InfoCont = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30vw;
  gap: 10px;
  @media (max-width: 837px) {
    font-size: 14px;
    border-bottom: none;
    margin-top: 10px;
    padding-bottom: 10px;
  }
`;
