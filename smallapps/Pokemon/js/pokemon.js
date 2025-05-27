const baseUrl = "https://pokeapi.co/api/v2/";

async function displayPokemon() {
    let btn = document.querySelector("button");
    btn.addEventListener("click", clickAndDisplayPokemon);

    async function clickAndDisplayPokemon() {
        let pokemonContainer = document.querySelector(".PokemonContainer");
        try {
            let pokemonUrls = [];
            pokemonContainer.innerHTML = ""; // Clear previous cards
            console.log("HTML: " + pokemonContainer.innerHTML);

            // get all pokemon names and urls
            const response = await axios.get(`${baseUrl}pokemon?limit=10000`);
            let allResults = response.data.results;

            for (let i = 0; i < 3; i++) {
                let randomIndex = Math.floor(Math.random() * allResults.length);
                pokemonUrls.push(allResults.splice(randomIndex, 1)[0].url);
            }
            const pokemonResponses = await Promise.all(
                pokemonUrls.map((url) => axios.get(url))
            );
            let speciesResponses = await Promise.all(
                pokemonResponses.map((res) => axios.get(res.data.species.url))
            );

            speciesResponses.forEach((d, i) => {
                let descriptionObj = d.data.flavor_text_entries.find(function (
                    entry
                ) {
                    return entry.language.name === "en";
                });

                let description = descriptionObj
                    ? descriptionObj.flavor_text.replace(/[\n\f]/g, " ")
                    : "";
                let name = pokemonResponses[i].data.name;
                let imgSrc = pokemonResponses[i].data.sprites.front_default;
                pokemonContainer.innerHTML += innerCardHTML(
                    name,
                    imgSrc,
                    description
                );
            });
        } catch (error) {
            console.error("Fetch Pokemon failed: " + error);
        }
    }

    function innerCardHTML(name, imageUrl, description) {
        return `
    <div class="card">
        <h2>${name}</h2>
        <img src="${imageUrl}" alt="${name}">
        <p>${description}</p>
    </div>
    `;
    }
}

displayPokemon();
