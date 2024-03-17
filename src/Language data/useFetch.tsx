// import React from "react";
import { useEffect, useState } from "react";

const useFetch = (url : string) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data.responseData.translatedText);
      })
      .catch((err) => setError(err));
  }, [url]);
  return { data, error };
};

export default useFetch;
