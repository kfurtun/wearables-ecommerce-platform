import styled from "styled-components";
import Category from "./Category";
import React, { useContext } from "react";
import { ProjectContext } from "../ProjectContext";
import { breakpoints } from "../GlobalStyles";
import { Link } from "react-router-dom";

const Homepage = () => {
  const { allItems, allCategories } = useContext(ProjectContext);

  // Loading spinner to make sure we don't render if the fetch is not completed.
  if (!allItems) {
    return (
      <Loading>
        <img src="/Eclipse-1s-200px.svg" alt="eclipse" />
      </Loading>
    );
  }

  const fitnessItem = allItems.find((item) => {
    return item._id === 6543;
  });

  const fitnessImgSrc = fitnessItem.imageSrc;

  return (
    <>
      <div>
        <NewArrivalsWrapper>
          <div>
            <Img src={fitnessImgSrc} />
          </div>
          <NewArrivalsDescription>
            <NewArrivalsTitle>Be ready for this summer!</NewArrivalsTitle>
            <NewArrivalsSubTitle>
              Brand new watches, accessories & more.
            </NewArrivalsSubTitle>
            <Link to="/catalogue/categories/Fitness">
              <Button>Shop Fitness</Button>
            </Link>
          </NewArrivalsDescription>
        </NewArrivalsWrapper>
        <OnSale>
          <OnSaleTitle>See our complete catalog</OnSaleTitle>
          <Link to="/catalogue">
            <Button>Click here</Button>
          </Link>
        </OnSale>

        <FeaturedTitle>FEATURED ITEMS</FeaturedTitle>

        {allItems !== null && allCategories !== null && (
          // Map to go over the different categories to show
          <Wrapper>
            {allCategories.map((category) => {
              return (
                <Category
                  key={`key-${category}`}
                  category={category}
                  allItems={allItems}
                />
              );
            })}
          </Wrapper>
        )}
      </div>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: 50px 0 0 0;
`;

const Img = styled.img`
  height: 250px;
  width: 250px;
  @media (max-width: ${breakpoints.tablet}) {
    height: 150px;
    width: 150px;
  }
`;

const Button = styled.button`
  color: white;
  text-align: center;
  margin-top: 15px;
  background-color: #2980b9;
  width: 200px;
  border-style: none;
  padding: 8px;
  text-align: center;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  :hover {
    background-color: #079992;
  }
  @media (max-width: ${breakpoints.tablet}) {
    width: 140px;
    font-size: 15px;
  }
`;

const NewArrivalsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 80px;
  margin-right: 15px;
  margin-left: 15px;
  margin-top: 50px;
  @media (max-width: ${breakpoints.tablet}) {
    gap: 20px;
    flex-direction: column;
  }
`;

const NewArrivalsTitle = styled.h2`
  color: #2f3542;
  @media (max-width: ${breakpoints.tablet}) {
    font-size: 24px;
  }
`;

const NewArrivalsSubTitle = styled.p`
  font-style: italic;
  @media (max-width: ${breakpoints.tablet}) {
    font-size: 16px;
  }
`;

const NewArrivalsDescription = styled.div`
  text-align: center;
  background-color: #dfe4ea;
  height: 250px;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: ${breakpoints.tablet}) {
    width: 80%;
  }
`;

const OnSale = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  margin-top: 100px;
  margin-bottom: 100px;
  text-align: center;
  margin-right: 15px;
  margin-left: 15px;
  color: #2f3542;
`;

const OnSaleTitle = styled.p`
  text-align: center;
  font-size: 25px;
  padding-top: 20px;
  padding-bottom: 20px;
  font-weight: 900;
  padding-bottom: 0px;
`;

const FeaturedTitle = styled.div`
  color: #2f3542;
  text-align: center;
  font-size: 25px;
  background-color: #dfe4ea;
  padding-top: 20px;
  padding-bottom: 20px;
  font-weight: 900;
  margin-bottom: 50px;
  margin-right: 15px;
  margin-left: 15px;
`;

const Loading = styled.div`
  width: 100vw;
  height: 100vh;
  text-align: center;
  margin-top: 25vh;
`;

export default Homepage;
