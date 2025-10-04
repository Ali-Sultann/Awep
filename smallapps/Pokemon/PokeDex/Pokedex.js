function Pokedex({pokemonList, isWinner}) {
    return (
    <div className="dexBoard">
        <div className="pokeCardContainer">
            {pokemonList.map((pokemon) => (
                <Pokecard pokemon={pokemon} />
            ))}
        </div>
        {
            isWinner &&
            <p className="winnerMessage">
                “THIS HAND WINS!”</p>
        }
        </div>
    );
}
