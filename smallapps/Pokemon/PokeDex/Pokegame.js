function Pokegame({pokemonList}) {
    let counter = 0;
    const pokemonGroups = 
        _.chunk(_.shuffle(pokemonList),4);
        
    const groupEXs = pokemonGroups.map(pokeList => 
        (pokeList.reduce((totalEX, pokemon) => {
           return  totalEX + pokemon.base_experience
        },0
    )
    ));
    console.log(groupEXs);
    const leftWin = groupEXs[0] > groupEXs[1];

    return (
        <section id="gameBoard">
            <Pokedex pokemonList={pokemonGroups[0]} isWinner={leftWin}/>
            <Pokedex pokemonList={pokemonGroups[1]} isWinner={!leftWin}/>
        </section>
    );
}
