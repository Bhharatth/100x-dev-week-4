import React from "react";
import axios from "axios";


export const api = axios.create({
  baseURL: "http://localhost:3000/",
});

export const useTokenStorage = (storageKey, fallbackToken) => {
  const [token, setToken] = React.useState(
    JSON.parse(localStorage.getItem(storageKey)) ?? fallbackToken
  );
  const deleteToken = () => {
    localStorage.removeItem(storageKey);
    setToken(fallbackToken);
  };


  React.useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(token));
  }, [token, storageKey]);

  return [token, setToken, deleteToken];
};
