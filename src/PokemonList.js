import React from "react";
import style from "./style.css";

export default function PokemonList({ pokemons }) {
  return (
    <div className="container-card">
      <div className="lista">
        {pokemons.map((p) => (
          <div className="card" key={p}>
            {p}
          </div>
        ))}
      </div>
    </div>
  );
}
