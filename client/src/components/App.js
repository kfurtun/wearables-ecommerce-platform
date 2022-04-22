import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";
import Product from "./Product";
import Catalogue from "./Catalogue";
import Header from "./Header";
import Homepage from "./Homepage/Index";
import { ShoppingCartPage } from "./ShoppingCartPage";
import SideBar from "./SideBar";
import Banner from "./Banner";
import { OrderSummary } from "./ShoppingCartPage/OrderSummary";

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Header></Header>
      <Banner />
      <Wrapper>
        <SideBar />
        <Routes>
          <Route path="/" exact element={<Homepage />} />
          <Route path="/product/:id" element={<Product />}></Route>
          <Route path="/catalogue" element={<Catalogue />}></Route>
          <Route path="/shopping-cart" element={<ShoppingCartPage />}></Route>
          <Route
            path="/order-summary/:orderId"
            element={<OrderSummary />}
          ></Route>
          <Route
            path="/catalogue/categories/:category"
            element={<Catalogue />}
          ></Route>
          <Route
            path="/catalogue/body-locations/:bodyLocation"
            element={<Catalogue />}
          ></Route>
        </Routes>
      </Wrapper>
    </Router>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1400px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export default App;
