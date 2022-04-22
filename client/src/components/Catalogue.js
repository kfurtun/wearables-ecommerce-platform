import React from "react";
import { useParams } from "react-router-dom";
import CatalogueItem from "./CatalogueItem";
import styled from "styled-components";

const Catalogue = () => {
  const [items, setItems] = React.useState(null);
  const [numItems, setNumItems] = React.useState(8);
  const { category, bodyLocation } = useParams();

  const findItems = async () => {
    // We want to show only 8 items on the first load. When the user clicks on 'show more', 8 more products appear.
    setNumItems(numItems + 8);

    // Depending on if the customer clicked on a category, body location or product, we do a different fetch to show the proper items.
    if (category) {
      const response = await fetch(
        `/api/items/item/0/${numItems}?category=${category}`
      );
      const data = await response.json();

      setItems(data.paginated);
    } else if (bodyLocation) {
      const response = await fetch(
        `/api/items/item/0/${numItems}?body_location=${bodyLocation}`
      );
      const data = await response.json();
      setItems(data.paginated);
    } else {
      const response = await fetch(`/api/items/0/${numItems}`);
      const data = await response.json();
      setItems(data.paginated);
    }
  };

  // Only when the category or body location states change, we call findItems to fetch items.
  React.useEffect(() => {
    findItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, bodyLocation]);

  // We call our fetch function when the users clicks on the buy now button.
  const handleClick = () => {
    findItems();
  };

  // Loading spinner to make sure we don't render if the fetch is not completed.
  if (!items) {
    return (
      <>
        <Loading>
          <img src="/Eclipse-1s-200px.svg" alt="eclipse" />
        </Loading>
      </>
    );
  }

  // We map over our list of items, which will render the CatalogueItem component for every item.
  const catalogue = items.map((item) => {
    return (
      <CatalogueItem
        key={item._id}
        item={item}
        name={item.name}
        price={item.price}
        bodyLocation={item.body_location}
        category={item.category}
        id={item._id}
        image={item.imageSrc}
        stock={item.numInStock}
        companyId={item.companyId}
      ></CatalogueItem>
    );
  });

  if (items.length > 0) {
    return (
      <Container>
        <CatalogueContainer>{catalogue}</CatalogueContainer>

        {items.length > 7 && (
          // The show more button appears only when we have more than 7 items to show.
          <ShowMore onClick={handleClick}>Show more</ShowMore>
        )}
      </Container>
    );
  } else if (items.length === 0) {
    // If no items to show.
    return <NoProducts>No products to sell in this category 😢</NoProducts>;
  }
};

const ShowMore = styled.button`
  border-style: none;
  padding: 10px 0px;
  cursor: pointer;
  width: 50%;
  opacity: 0.6;
  border-radius: 5px;
  margin-top: 10px;
  :hover {
    opacity: 1;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const NoProducts = styled.div`
  font-family: "Open Sans", sans-serif;
  text-align: center;
  height: 100vh;
  margin-top: 25vh;
  font-size: 30px;
`;

const Loading = styled.div`
  width: 100vw;
  height: 100vh;
  text-align: center;
  margin-top: 25vh;
`;

const CatalogueContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: 10vw;
  margin-left: 10vw;
  margin-top: 40px;

  justify-content: space-around;
  gap: 50px;
  font-family: "Open Sans", sans-serif;
  @media only screen and (max-width: 812px) {
    justify-content: center;
  }
`;

export default Catalogue;
