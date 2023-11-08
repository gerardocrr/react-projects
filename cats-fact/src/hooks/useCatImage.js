import { useState, useEffect } from "react";

export function useCatImage({ fact }) {
  const [imageUrl, setImageUrl] = useState();

  //Para obtener la imagen cuando tenemos un nuevo fact
  useEffect(() => {
    if (!fact) return;

    const threeFirstWords = fact.split(" ", 3).join(" ");
    const url = `https://cataas.com/cat/says/${threeFirstWords}?fontSize=50&fontColor=red`;

    setImageUrl(url);
  }, [fact]);

  return { imageUrl };
}
