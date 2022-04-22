import React, { useState, useEffect } from "react";

export const ProjectContext = React.createContext(null);

export const ProjectProvider = ({ children }) => {
  // Global states go here and also to value object below

  //Moved this state here for all items and categories, else we have to wait 2-3 seconds eachtime the homepage loads,
  //by setting here, if we leave the homepage and return later, everything will load instantly.
  const [allCategories, setAllCategories] = useState([]);
  const [allItems, setAllItems] = useState(null);
  const [couponApplied, setCouponApplied] = useState(false);
  const [promoCode, setPromoCode] = React.useState("");
  const [codeApplied, setCodeApplied] = React.useState(null);

  const [shoppingBag, setShoppingBag] = useState([]);

  useEffect(() => {
    // Setting allitems
    const getAllItems = async () => {
      const response = await fetch("/api/items");
      const data = await response.json();

      setAllItems(data.data);
    };
    // Setting categories
    const getCategories = async () => {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setAllCategories(data.data);
    };
    getCategories();
    getAllItems();
  }, []);

  return (
    <ProjectContext.Provider
      value={{
        shoppingBag,
        setShoppingBag,
        allCategories,
        allItems,
        couponApplied,
        setCouponApplied,
        promoCode,
        setPromoCode,
        codeApplied,
        setCodeApplied,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
