function Pokedex({pokemonList}) {
    return (
        <section id="pokeCardContainer">
            {pokemonList.map((pokemon) => (
                <Pokecard pokemon={pokemon} />
            ))}
        </section>
    );
}
