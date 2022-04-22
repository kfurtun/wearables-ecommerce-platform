import React from "react";
import styled from "styled-components";
import { ProjectContext } from "../ProjectContext";
import { provinces } from "./provinces";

// Shows modal to customers to fill out the form before ordering
export const PurchaseModal = ({
  setIsModalOpen,
  setIsConfirmationOpen,
  setResult,
  total,
}) => {
  const { shoppingBag, setShoppingBag } = React.useContext(ProjectContext);

  const [infoState, setInfoState] = React.useState({
    firstName: "",
    lastName: "",
    address: "",
    optional: "",
    city: "",
    province: "Alberta", // Hardcoded the province because otherwise
    //if dont change it in the form, it will stay empty and the submit button will stay disabled.
    postalCode: "",
    cardNumber: "",
    expDate: "",
    securityCode: "",
    email: "",
    phone: "",
  });
  let isReady = true;
  let isOtherConditionsMet = false;

  isReady = Object.values(infoState).some((info) => info === ""); // Checks if all the inputs are filled

  // Field validation rules
  if (
    infoState.postalCode.length === 6 &&
    infoState.cardNumber.length === 16 &&
    infoState.expDate.length === 4 &&
    infoState.securityCode.length === 3 &&
    infoState.phone.length === 10
  ) {
    isOtherConditionsMet = true;
  }

  // When there is a chanhge in one of the field, it updates the whole state and keeps
  // the data that was already 'saved' in the state
  const handleChange = (event) => {
    setInfoState({ ...infoState, [event.target.name]: event.target.value });
  };

  // Object contains itemId and purchased quantity for every item in the cart
  const purchasedItems = shoppingBag.map((item) => {
    return { itemId: item._id, quantity: item.quantity };
  });

  // Handles submit button click, sends data to DB, closes the modal and gets order
  // confirmation ID from DB
  const handleClick = () => {
    setIsModalOpen(false);
    setIsConfirmationOpen(true);
    fetch("/api/order", {
      method: "POST",
      body: JSON.stringify({ ...infoState, price: total, purchasedItems }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((data) => {
        setResult(data);
        setShoppingBag([]);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Container></Container>
      <Wrapper>
        <CloseButton onClick={() => setIsModalOpen(false)}>X</CloseButton>
        <Section>
          <Input
            placeholder="First Name"
            name="firstName"
            onChange={handleChange}
          />
          <Input
            placeholder="Last Name"
            name="lastName"
            onChange={handleChange}
          />
        </Section>
        <Section>
          <Input placeholder="Address" name="address" onChange={handleChange} />
          <Input
            placeholder="Apt, Bldg, Other"
            name="optional"
            onChange={handleChange}
          />
          <Input placeholder="City" name="city" onChange={handleChange} />

          <Province>
            <div>Province</div>
            <Select name="province" onChange={handleChange}>
              {provinces.map((province, index) => (
                <Option key={index}>{province.name}</Option>
              ))}
            </Select>
          </Province>
          <Input
            placeholder="Postal Code"
            name="postalCode"
            onChange={handleChange}
          />
        </Section>
        <Section>
          <Input
            placeholder="Card Number"
            name="cardNumber"
            onChange={handleChange}
          />
          <Input
            placeholder="Exp Date (MM/YY)"
            name="expDate"
            onChange={handleChange}
          />
          <Input
            placeholder="Security Code"
            name="securityCode"
            onChange={handleChange}
          />
        </Section>
        <Section>
          <Input placeholder="Email" name="email" onChange={handleChange} />
          <Input placeholder="Phone" name="phone" onChange={handleChange} />
        </Section>
        <Button
          onClick={handleClick}
          isReady={isReady}
          isOtherConditionsMet={isOtherConditionsMet}
        >
          SUBMIT
        </Button>
      </Wrapper>
    </>
  );
};

const Container = styled.div`
  background: gray;
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  left: 0;
  top: 0;
  opacity: 0.2;
`;

const Wrapper = styled.div`
  position: absolute;
  left: 30%;
  top: 10%;
  pointer-events: auto;
  width: 600px;
  background: white;
  z-index: 2;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 837px) {
    width: 300px;
    left: 10%;
    z-index: 10000;
  }
  border-radius: 7px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  padding: 10px 0 2px 0;
  border: 1px solid black;
  align-items: center;
  width: 500px;
  @media (max-width: 837px) {
    width: 250px;
  }
`;

const CloseButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  position: absolute;
  right: 10px;
  top: 10px;
`;

const Input = styled.input`
  width: 400px;
  height: 40px;
  margin-bottom: 10px;
  border: none;
  border-bottom: 1px solid black;
  @media (max-width: 837px) {
    width: 200px;
    height: 30px;
    &::-webkit-input-placeholder {
      font-size: 14px;
    }
  }
`;

const Select = styled.select`
  width: 400px;
  height: 40px;
  @media (max-width: 837px) {
    width: 200px;
  }
`;

const Option = styled.option``;

const Province = styled.div`
  text-align: left;
  color: rgb(133, 133, 133);
  @media (max-width: 837px) {
    width: 250px;
    margin-left: 50px;
  }
`;

const Button = styled.button`
  width: 500px;
  height: 50px;
  background: ${(props) =>
    !props.isOtherConditionsMet || props.isReady
      ? "rgb(133, 133, 133)"
      : "#079992"};
  border-radius: 5px;
  border: none;
  cursor: pointer;
  color: white;
  pointer-events: ${(props) =>
    !props.isOtherConditionsMet || props.isReady
      ? "none"
      : "auto"}; /*disabling the button */
  :hover {
    background-color: #025753;
  }
  @media (max-width: 837px) {
    width: 250px;
  }
  border-radius: 6px;
  font-size: 15px;
`;
