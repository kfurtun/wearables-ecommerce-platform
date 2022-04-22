import React from "react";
import styled from "styled-components";
import { FaCheckCircle } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useNavigate, Link } from "react-router-dom";

// Shows confirmation that the order is successfully made
export const ConfirmationModal = ({ result }) => {
  let navigate = useNavigate();
  return (
    <>
      {!result ? (
        <Container>
          {/*shows spinner until server responses*/}
          <Img src="/Eclipse-1s-200px.svg" />
        </Container>
      ) : (
        <>
          <Container></Container>
          {/*background of the modal*/}
          <Wrapper>
            <IconContext.Provider
              value={{ size: "100px", color: "var(--primary-color)" }}
            >
              <FaCheckCircle />
            </IconContext.Provider>
            <InfoCont>
              <div>{result.message}</div>
              <ConfNum>
                Your order confirmation number: {result.data.insertedId}
              </ConfNum>
            </InfoCont>
            <Button onClick={() => navigate("/")}>Home</Button>
            <Link
              to={`/order-summary/${result.data.insertedId}`}
              style={{ color: "black", marginTop: "10px" }}
            >
              Order Summary
            </Link>
          </Wrapper>
        </>
      )}
    </>
  );
};

const Wrapper = styled.div`
  width: 500px;
  height: 400px;
  background: white;
  position: absolute;
  left: 40%;
  top: 30%;
  font-size: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  @media (max-width: 837px) {
    width: 300px;
    left: 10%;
    font-size: 14px;
    height: 300px;
  }
`;

const Img = styled.img`
  height: 50px;
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 8px;
  background-color: gray;
  opacity: 0.2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InfoCont = styled.div`
  text-align: center;
  margin-top: 30px;
`;

const ConfNum = styled.div`
  margin-top: 20px;
`;

const Button = styled.button`
  height: 50px;
  width: 300px;
  margin-top: 20px;
  background: var(--primary-color);
  color: white;
  border: none;
  cursor: pointer;
  @media (max-width: 837px) {
    width: 200px;
    left: 10%;
    font-size: 14px;
  }
`;
