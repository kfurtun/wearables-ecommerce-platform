import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ProjectContext } from "./ProjectContext";
import { breakpoints } from "./GlobalStyles";

const Product = () => {
  const [item, setItem] = React.useState(null);
  const [quantity, setQuantity] = React.useState(null);
  const [category, setCategory] = React.useState(null);
  const [bodyLocation, setBodyLocation] = React.useState(null);
  const { shoppingBag, setShoppingBag } = React.useContext(ProjectContext);
  const [error, setError] = React.useState(false);

  const { id } = useParams();

  let navigate = useNavigate();

  // UseEffect with a dependency array (id). We fetch the product with our 'company' endpoint to get company info.
  React.useEffect(() => {
    const findItem = async () => {
      const response = await fetch(`/api/item-with-company/${id}`);
      const data = await response.json();
      setItem({ ...data.data[0], quantity: 0 });
      setCategory(data.data[0].category);
      setBodyLocation(data.data[0].body_location);
    };
    findItem();
  }, [id]);

  // When the user clicks on the product category or the body location, we apply a filter.
  const handleClickCategory = () => {
    navigate(`/catalogue/categories/${category}`);
  };

  const handleClickBodyLocation = () => {
    navigate(`/catalogue/body-locations/${bodyLocation}`);
  };

  // We track the quantity onChange
  const handleQuantity = (e) => {
    setQuantity(e.target.value);
  };

  const handleAddToCart = (e) => {
    // Prevent default to prevent reload and keep the state info.
    e.preventDefault();
    let itemIndex = 0;
    if (parseInt(quantity) > item.numInStock) {
      return setError(true);
    } else {
      setError(false);
    }

    // We look if the item is already in the shopping bag
    // and track its index in the shopping bag array
    // to be able to adjust its quantity in the cart.
    const foundItem = shoppingBag.find((product, index) => {
      itemIndex = index;
      return product._id === item._id;
    });

    // If the item is in the shopping bag, we adjust the quantity
    // and make sure to keep the other items in the shopping (if any)
    // with the slice method.

    if (foundItem) {
      if (
        shoppingBag[itemIndex].quantity + parseInt(quantity) >
        item.numInStock
      ) {
        return setError(true);
      }
      setError(false);
      setShoppingBag([
        ...shoppingBag.slice(0, itemIndex),
        {
          ...shoppingBag[itemIndex],
          quantity: shoppingBag[itemIndex].quantity + parseInt(quantity),
        },
        ...shoppingBag.slice(itemIndex + 1),
      ]);
    } else {
      setShoppingBag([
        ...shoppingBag,
        { ...item, quantity: parseInt(quantity) }, // Adding quantity property to items in the shopping bag
      ]);
    }
  };

  // Loading spinner to make sure we don't render if the fetch is not completed.
  if (!item || !category || !bodyLocation) {
    return (
      <Loading>
        <img src="/Eclipse-1s-200px.svg" alt="eclipse" />
      </Loading>
    );
  }

  return (
    <div>
      <CategoryName>
        <Category onClick={handleClickCategory}>{item.category}</Category>
        <span>&nbsp;/</span>
        <BodyLocation onClick={handleClickBodyLocation}>
          {item.body_location}
        </BodyLocation>
      </CategoryName>

      <Container>
        <ProductImage src={item.imageSrc}></ProductImage>
        <div>
          <Title>{item.name}</Title>
          <SoldBy>
            By: &nbsp;
            <a style={{ color: "#2980b9" }} href={item.companyDetails[0].url}>
              {item.companyDetails[0].name}
            </a>
          </SoldBy>

          <Price>{item.price}</Price>

          {item.numInStock > 0 ? (
            <QuantityContainer>
              <form>
                <label htmlFor="quantity">Quantity: </label>
                <QuantityInput
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  onChange={handleQuantity}
                />

                <BuyButton onClick={handleAddToCart} quantity={quantity}>
                  Add to cart
                </BuyButton>
              </form>
            </QuantityContainer>
          ) : (
            <NoStock>Out of stock</NoStock>
          )}
          {item.numInStock === 1 && (
            <LastOne>Only 1 in stock.. Order soon!</LastOne>
          )}
          {error && <Error>Not enough stock for this item. 😭.</Error>}
        </div>
      </Container>
    </div>
  );
};

const Loading = styled.div`
  width: 100vw;
  height: 100vh;
  text-align: center;
  margin-top: 25vh;
`;

const BuyButton = styled.button`
  border-radius: 8px;
  padding: 6px 20px;
  width: 200px;
  margin-top: 8px;
  border-style: none;
  background-color: ${(props) =>
    props.quantity > 0 ? "#2980b9" : "rgb(133, 133, 133)"};
  color: white;
  cursor: pointer;
  font-size: 18px;
  :hover {
    background-color: #079992;
  }
  pointer-events: ${(props) => (props.quantity > 0 ? "auto" : "none")};

  @media (max-width: 1268px) {
    padding: 6px 18px;
  }
`;

const QuantityInput = styled.input`
  width: 40px;
  height: 20px;
  margin-right: 10px;
  @media (max-width: 1268px) {
    width: 45px;
    height: 20px;
  }
`;

const QuantityContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

const SoldBy = styled.div`
  font-style: italic;
`;

const Category = styled.div`
  margin-left: 30px;
  :hover {
    color: #079992;
  }
`;

const BodyLocation = styled.div`
  margin-left: 5px;
  :hover {
    color: #079992;
  }
`;

const Price = styled.div`
  font-size: 25px;
  color: #2c3e50;
  margin-top: 30px;
  margin-bottom: 10px;
`;

const ProductImage = styled.img`
  padding: 40px;
  border-style: solid;
  border-radius: 30px;
  border-color: #ecf0f1;
  border-width: 3px;
  height: 40vh;
  @media (max-width: 1368px) {
    height: 300px;
    width: 300px;
  }
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 900;
  margin-bottom: 10px;
`;

const CategoryName = styled.div`
  font-family: "Open Sans", sans-serif;
  background-color: #f6f6f6;
  padding: 10px 0;
  color: #253846;
  display: flex;
  cursor: pointer;
  margin-top: 22px;
  @media (min-width: ${breakpoints.tablet}) {
    max-width: calc(100vw - 24vw);
  }
`;

const NoStock = styled.div`
  color: #b71540;
`;

const Container = styled.div`
  margin-top: 50px;
  margin-right: 10vw;
  margin-left: 10vw;
  gap: 20px;
  display: flex;
  font-family: "Open Sans", sans-serif;
  @media only screen and (max-width: 1368px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const LastOne = styled.span`
  color: red;
  font-style: oblique;
  margin-left: 20px;
`;

const Error = styled.div`
  color: red;
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 15px;
`;

export default Product;
