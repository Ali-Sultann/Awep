function Pokecard({pokemon}) {
    return (
        <div className="pokemonCard">
            <h2>{pokemon.name}</h2>
            <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
            />
            <p>type: {pokemon.type}</p>
            <p>EXP: {pokemon.base_experience}</p>
        </div>
    );
}
