import React, { createContext, useState } from "react";
import getWeb3 from "../utils/getWeb3";

// Create Context
export const DataContext = React.createContext()
export const DataProvider = DataContext.Provider
export const DataConsumer = DataContext.Consumer


// Provider Component
const DataContextProvider = (props) => {
  const [account, setAccount] = useState();
  const [web3Instance, setWeb3] = useState();
  const [object, setObject] = useState();

  const getAccount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();

      if (accounts && accounts.length > 0) setAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DataContext.Provider
      value={{ account, getAccount, object, setObject, web3Instance, setWeb3 }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;