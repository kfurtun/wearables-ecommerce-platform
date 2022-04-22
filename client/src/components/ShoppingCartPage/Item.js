import React from "react";
import styled from "styled-components";
import { ProjectContext } from "../ProjectContext";
import { useNavigate } from "react-router-dom";

// Shows every item in the shooping cart page
export const Item = ({ item, index }) => {
  let navigate = useNavigate();
  const { shoppingBag, setShoppingBag, couponApplied } =
    React.useContext(ProjectContext);

  // Error state to show an error message when the customer tries to add more qty than the
  // available stock
  const [error, setError] = React.useState(false);

  // Removes item in the cart
  const onRemoveClicked = () => {
    const shoppingBagClone = [...shoppingBag];
    shoppingBagClone.splice(index, 1);
    setShoppingBag(shoppingBagClone);
  };

  // Handles editing item count in the cart
  const handleClickQuantity = (e) => {
    if (e.target.id === "plus") {
      if (item.numInStock > item.quantity) {
        setError(false);
        item.quantity += 1;
      } else {
        setError(true);
      }
    } else if (e.target.id === "minus") {
      if (item.quantity > 1) {
        setError(false);
        item.quantity -= 1;
      } else if (item.quantity === 1) {
        return;
      }
    }

    // Looking for the product that we just modified the qty to update the shopping bag state
    const foundItem = shoppingBag.find((product) => {
      return product._id === item._id;
    });
    // Updating shopping context state when adding or removing items/updating qty
    if (foundItem) {
      setShoppingBag([...shoppingBag]);
    }
  };

  return (
    <Wrapper>
      <Img
        onClick={() => navigate(`/product/${item._id}`)}
        src={item.imageSrc}
      />
      <InfoCont>
        <div>{item.category}</div>
        <div>
          <strong>{item.name}</strong>
        </div>
        <div>{item.body_location}</div>
        <div>
          {item.companyDetails && <i>by {item.companyDetails[0].name}</i>}
        </div>

        {couponApplied && item.numInStock === 1 ? (
          <div>
            <CouponMessage>{item.price} CAD </CouponMessage>
            <span>
              {` => ${(item.price.substring(1) / 2).toFixed(2)} CAD (x ${
                item.quantity
              })`}
            </span>
          </div>
        ) : (
          <div>
            {item.price} CAD (x {item.quantity})
          </div>
        )}
        <div>
          <ActionWrapper>
            <Minus
              id="minus"
              onClick={handleClickQuantity}
              src="icons8-minus-48.png"
            />
            <Plus
              id="plus"
              onClick={handleClickQuantity}
              src="icons8-plus-48.png"
            />
            <Remove onClick={onRemoveClicked}>Remove</Remove>
          </ActionWrapper>
          {item.numInStock === 1 && (
            <LastOne>Only 1 in stock.. Order soon!</LastOne>
          )}
          {error && (
            <Error>
              Not enough stock for this item. You can't add more to your bag 😭.
            </Error>
          )}
        </div>
      </InfoCont>
    </Wrapper>
  );
};

const ActionWrapper = styled.div`
  display: flex;
  height: 30px;
  gap: 10px;
  margin-bottom: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid lightgrey;
  padding-bottom: 40px;
  @media (max-width: 837px) {
    flex-direction: row;
    font-size: 14px;
    border-bottom: none;
  }
`;

const Img = styled.img`
  height: 180px;
  width: 180px;
  @media (max-width: 1145px) {
    height: 100px;
    width: 100px;
    margin-top: 10px;
  }
`;

const Error = styled.div`
  color: red;
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 15px;
`;

const InfoCont = styled.div`
  margin: 10px 0 0 20px;
  display: flex;
  flex-direction: column;
  width: 30vw;
  gap: 10px;
  @media (max-width: 768px) {
    width: 60vw;
  }
`;

const Minus = styled.img`
  cursor: pointer;
  @media (max-width: 768px) {
    height: 30px;
    width: 30px;
  }
`;

const Plus = styled.img`
  cursor: pointer;
  @media (max-width: 768px) {
    height: 30px;
    width: 30px;
  }
`;

const Remove = styled.button`
  width: 140px;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  background-color: #b71540;
  :hover {
    background-color: #800e2c;
  }
  @media (max-width: 1145px) {
    padding: 5px 0px;
  }

  @media (max-width: 837px) {
    padding-bottom: 5px;
    padding-left: 8px;
    padding-right: 8px;
  }
`;

const CouponMessage = styled.span`
  color: red;
  text-decoration: line-through;
  margin-right: 10px;
`;

const LastOne = styled.span`
  color: red;
  font-style: oblique;
  margin-left: 20px;
`;
