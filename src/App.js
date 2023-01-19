import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import axios from "axios";
import Pagination from "./Pagination";
import style from "./style.css";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [maxPageNumber, setMaxPageNumber] = useState();

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        console.log("RES", res.data);
        const count = res.data.count;
        console.log("COUNT", count);
        const roundedPageNumber = Math.round(count / 20);
        setMaxPageNumber(roundedPageNumber);
        setLoading(false);
        setNextPageUrl(res.data.next);
        setPrevPageUrl(res.data.previous);
        setPokemons(res.data.results.map((p) => p.name));
      });
    return () => {
      cancel();
    };
  }, [currentPageUrl]);

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl);
    if (currentPageNumber <= maxPageNumber) {
      setCurrentPageNumber(currentPageNumber + 1);
    }
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl);
    if (currentPageNumber >= 1) setCurrentPageNumber(currentPageNumber - 1);
  }

  if (loading) return "Loading...";

  return (
    <>
      <PokemonList pokemons={pokemons} />
      <Pagination
        currentPageNumber={currentPageNumber}
        maxPageNumber={maxPageNumber}
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
      />
    </>
  );
}

export default App;
