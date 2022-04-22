import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CatalogueItem = ({
  name,
  price,
  image,
  stock,
  category,
  id,
  bodyLocation,
}) => {
  let navigate = useNavigate();

  // When clicking on add to cart, we redirect the user to the product page
  const handleAddToCart = (e) => {
    e.preventDefault();
    navigate(`/product/${id}`);
  };

  return (
    <>
      <WrapperItem onClick={handleAddToCart}>
        <ItemDetails>
          <ImageWrapper>
            <Image src={image}></Image>
          </ImageWrapper>
          <Link
            style={{ textDecoration: "none" }}
            to={`/catalogue/categories/${category}`}
          >
            <Category>{category}</Category>
          </Link>
          <Link
            style={{ textDecoration: "none" }}
            to={`/catalogue/body-locations/${bodyLocation}`}
          >
            <BodyLocation>{bodyLocation}</BodyLocation>
          </Link>
          <Name>{name}</Name>
          <Price>{price}</Price>
          {stock > 1 ? (
            <Stock>In stock</Stock>
          ) : stock === 1 ? (
            <LastOne>Only 1 in stock.. Order soon!</LastOne>
          ) : (
            <NoStock>Out of stock</NoStock>
          )}
        </ItemDetails>
        <div>
          {stock ? (
            // We show the buy now button only if the product has stock
            <Buy onClick={handleAddToCart} type="submit">
              View Product
            </Buy>
          ) : undefined}
        </div>
      </WrapperItem>
    </>
  );
};

const BodyLocation = styled.p`
  color: #b2bec3;
  margin-top: 10px;
  font-style: italic;
  :hover {
    color: #079992;
  }
`;

const Category = styled.p`
  margin-top: 20px;
  color: #b2bec3;
  font-style: italic;
  :hover {
    color: #079992;
  }
`;

const NoStock = styled.div`
  color: #b71540;
  margin-bottom: 8px;
`;

const Stock = styled.div`
  color: #079992;
  margin-bottom: 35px;
`;

const Buy = styled.div`
  color: white;
  background-color: #2980b9;
  width: 100%;
  padding: 8px;
  text-align: center;
  border-radius: 10px;
  cursor: pointer;
  :hover {
    background-color: #079992;
  }
`;

const ImageWrapper = styled.div`
  padding: 30px;
  border-style: solid;
  border-radius: 30px;
  border-color: #ecf0f1;
  border-width: 2px;
  text-align: center;
`;

const Price = styled.p`
  margin-top: 10px;
  margin-bottom: 8px;
`;

const Name = styled.p`
  font-weight: 900;
  margin-top: 20px;
`;

const Image = styled.img`
  height: 15vh;
`;

const WrapperItem = styled.div`
  display: flex;
  align-items: space-between;
  flex-direction: column;
  justify-content: space-between;
`;

const ItemDetails = styled.div`
  width: 300px;
`;

const LastOne = styled.p`
  color: red;
  font-style: oblique;
  margin: 0 0 40px 10px;
`;

export default CatalogueItem;
