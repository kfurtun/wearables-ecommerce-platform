import styled from "styled-components";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { breakpoints } from "../GlobalStyles";

const delays = 10000;

const Category = ({ category, allItems }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Setting manually the first time to prevent waiting for the first image
    setProduct(handleCategoryRandomProduct(category));
    const interval = setInterval(() => {
      setProduct(handleCategoryRandomProduct(category));
    }, delays);
    // Clearing internval when component unmounts
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Made a recursive function to get a random product of the received category
  const handleCategoryRandomProduct = (category) => {
    const randomIndex = Math.floor(Math.random() * allItems.length);
    const randomCategory = allItems[randomIndex].category;
    if (category === randomCategory) {
      const randomProduct = allItems[randomIndex];
      return randomProduct;
    } else {
      return handleCategoryRandomProduct(category);
    }
  };

  return (
    <Wrapper>
      {product != null && (
        <StyledLink to={`/product/${product._id}`}>
          <CategoryDisplay>
            <CategoryImage src={product.imageSrc} />
            <ProductName>{product.name}</ProductName>
          </CategoryDisplay>
        </StyledLink>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 350px;
  width: 350px;
  @media (min-width: ${breakpoints.tablet}) {
    margin: 20px 0;
    padding: 0 40px 0 0;
  }
`;

const CategoryDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  animation: appear ${delays}ms infinite linear;
  @keyframes appear {
    0% {
      opacity: 0;
    }

    20% {
      opacity: 1;
    }

    80% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }
  @media (prefers-reduced-motion) {
    animation: none;
  }
`;

const CategoryImage = styled.img`
  height: 200px;
  width: 200px;
`;

const ProductName = styled.h3`
  display: inline-block;
  margin: 30px 0 0 0;
  color: var(--primary-color);
  font-size: 20px;
  :hover {
    color: #079992;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
export default Category;
