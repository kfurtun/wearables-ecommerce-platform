import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { ItemInOrderSummary } from "./ItemInOrderSummary";

// Shows order summary page
export const OrderSummary = () => {
  const [data, setData] = React.useState(undefined);
  let params = useParams();

  // Gets order summary from DB
  React.useEffect(() => {
    fetch(`/api/order/${params.orderId}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [params.orderId]);

  return (
    <Wrapper>
      {data && (
        <InfoSummary>
          <div style={{ textAlign: "center" }}>
            <strong>Order Summary</strong>
          </div>
          <div>
            <strong>Order #:</strong> {data.result._id}
          </div>
          <div>
            <strong>Name: </strong>
            {`${data.result.firstName} ${data.result.lastName}`}
          </div>
          <div>
            <strong>Shipping Address:</strong>

            {`${data.result.address}, ${data.result.optional}, ${data.result.city}, ${data.result.province} ${data.result.postalCode}`}
          </div>
          <div>
            <strong>Total:</strong> ${data.result.price.toFixed(2)} CAD
          </div>
        </InfoSummary>
      )}

      {data &&
        data.itemData.map((item, index) => (
          <ItemInOrderSummary
            item={item}
            index={index}
            quantity={data.result.purchasedItems[index].quantity}
            key={item._id}
          />
        ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  padding-bottom: 40px;
  font-family: "Open Sans", sans-serif;
  @media (max-width: 837px) {
    flex-direction: column;
    font-size: 14px;
    border-bottom: none;
    margin-left: auto;
    margin-right: auto;
  }
`;

const InfoSummary = styled.div`
  background: #f6f6f6;
  width: 563px;
  margin-left: 30px;
  height: 250px;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  @media (max-width: 837px) {
    font-size: 14px;
    width: 237px;
    margin-left: auto;
    margin-right: auto;
  }
`;
