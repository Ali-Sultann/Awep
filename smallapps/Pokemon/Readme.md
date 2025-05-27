### NOTE

```js
const data = response.json();
```

You're not getting the actual JSON data yet. Instead, you're getting a `Promise` that will eventually resolve to the parsed JSON after the response body has been read and processed.

So if you don't use await, data is just a pending Promise — not the actual JSON object.

```js
try {
    let response = await Promise.all(
        Array.from({length: 4}, () => fetch(`${numbersAPI}${favNumbers}?json`))
    );
    facts.forEach((response) => {
        console.log(response);
    });
} catch (error) {
    console.error("Error fetching data for part3:", error);
}
```

1. fetch only returns response, we need response.json to get the data.

```js
let responses = await fetch(`${numbersAPI}${favNumbers}?json`);
```

> remember that this is one request so it will only return one response too.

```js
let responses = await Promise.all(
    Array.from({length: 4}, () => fetch(`${numbersAPI}7?json`))
);
let facts = await Promise.all(responses.map((res) => res.json()));
```

-   `Promise.all()` operate promises arrays, waiting all of them of resolve.

-   Asynchronous would be difficult when we miss where it return response/promise and where we should keep async. Especially when it comes to Promise.all(), arrays operation and its concept would be mixed and make me confused.
-   Notice that element we are processing return what type of value is the key here. So that we can figure out how should we deal with it.

## Deck of Cards

1. Make a `request` to the Deck of Cards API to request a `single card` from a newly shuffled deck. Once you have the card, `console.log` the `value` and the `suit` (e.g. “5 of spades”, “queen of diamonds”).

```js
async function getOneDeckOfCard() {
    let response = await axios.get(`${baseAPI}${shuffleCardAPI}1`);
    let deck_id = response.data.deck_id;
    response = await axios.get(`${baseAPI}${deck_id}/draw/?count=1`);
    let card = response.data.cards[0];
    console.log(`Card on hand -  ${card.value} of ${card.suit}`);
}
```

2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the `same API` to get one more card from the same deck.Once you have both cards, `console.log` the values and suits of both cards.

```js
const baseAPI = "https://deckofcardsapi.com/api/deck/";
const shuffleCardAPI = "new/shuffle/?deck_count=";

async function getCardsFromDeck(deck_id, count) {
    let response = await axios.get(`${baseAPI}${deck_id}/draw/?count=${count}`);
    let cards = response.data.cards;
    for (let card of cards)
        console.log(`Card on hand -  ${card.value} of ${card.suit}`);
    console.log("Remaining Card count: " + response.data.remaining);
}

async function getCards() {
    let response = await axios.get(`${baseAPI}${shuffleCardAPI}1`);
    let deck_id = response.data.deck_id;
    console.log(response.data);
    getCardsFromDeck(deck_id, 2);
}
```

3. Build an HTML page that lets you draw cards from a deck. When the page `loads`, go to the Deck of Cards API to `create a new deck`, and show a `button` on the page that will let you draw a card. Every time you click the button, display a `new card`, until there are `no cards left` in the deck.

```js
const baseAPI = "https://deckofcardsapi.com/api/deck/";
const shuffleCardAPI = "new/shuffle/?deck_count=";

async function getCardsFromDeck(deck_id, count) {
    let response = await axios.get(`${baseAPI}${deck_id}/draw/?count=${count}`);
    let cards = response.data.cards;
    for (const card of cards) {
        console.log(`Card on hand -  ${card.value} of ${card.suit}`);
        console.log(`Remaining cards - ${response.data.remaining}`);
    }

    return response.data;
}

async function getCards() {
    let response = await axios.get(`${baseAPI}${shuffleCardAPI}1`);
    let deck_id = response.data.deck_id;
    let remaining = response.data.remaining;

    let button = document.querySelector("button");
    button.addEventListener("click", clickAndDrawCard);
    let cardsContainer = document.querySelector(".deckContainer");

    async function clickAndDrawCard() {
        let image = document.createElement("img");
        image.setAttribute("class", "cardImg");
        const rotate = Math.random() * 60 - 30;
        const x = Math.random() * 40 - 20;
        const y = Math.random() * 10 - 5;
        image.style.transform = `rotate(${rotate}deg) translate(${x}%, ${y}%)`;
        let data = await getCardsFromDeck(deck_id, 1);
        if (remaining) {
            image.src = data.cards[0].image;
            cardsContainer.appendChild(image);
        } else {
            console.log("No more cards left in the deck!");
        }
        remaining = data.remaining;
    }
}

getCards();
```

### NOTE

    Problem I have here is I always forget to Use try/catch for web request which I should to do.

## Pokemon

1. Figure out how to make a single request to the Pokemon API to get names and URLs for every pokemon in the database.

`https://pokeapi.co/api/v2/{endpoint}/` -> list `limit=20&offset=20`
`https://pokeapi.co/api/v2/{endpoint}/id`

Getting all Pokemon names and URLs

```js
const response = await axios.get(`${baseUrl}pokemon?limit=10000`);
console.log(response.data.results);
return response.data.results;
```

2. Once you have names and URLs of all the pokemon, pick `three` at random and make requests to their URLs. Once those requests are complete, console.log the data for each pokemon.

-   How to pick three elements at random among thousands of elements.
    > `Math.floor(Math.random() \* results.length)

```js
async function getPokemonData() {
    try {
        // get all pokemon names and urls
        const response = await axios.get(`${baseUrl}pokemon?limit=10000`);
        let results = response.data.results;

        for (let i = 0; i < 3; i++) {
            // get each pokemon data
            let randomIndex = Math.floor(Math.random() * results.length);
            const pokemonResponse = await axios.get(results[randomIndex].url);
            console.log(pokemonResponse.data);
        }
        return results;
    } catch (error) {
        console.error("Fetch Pokemon failed: " + error);
    }
}
```

3. Start with your code from 2, but instead of logging the data on each random pokemon, store the name of the pokemon in a variable and then make another request, this time to that pokemon’s **species** URL (you should see a key of **species** in the data). Once *that* request comes back, look in the **flavor_text_entries** key of the response data for a description of the species written in English. If you find one, **console.log** the name of the pokemon along with the description you found.

    Example: “ducklett: They are better at swimming than flying, and they happily eat their favorite food, peat moss, as they dive underwater.”

-   It is not in all case that first entry of the flavor text entries is English version. So we need to find the en version by traversing the entries and check the `language.name` value, if it is en then we can confirm that this is the English version.
-   the flavor is returned with \n which will causing separate lines which is not good to show in the terminal.

    -   How to change the \n to space?

        > We can reach the goal easily by using `replace()` method. But what I should know about is Regular Expression witch is important in replacement.

    -   `[\n\f]` any `\n` or any `\f` - this is what [] do.

```js
const baseUrl = "https://pokeapi.co/api/v2/";
let pokemonName = [];

async function getPokemonFlavor() {
    try {
        // get all pokemon names and urls
        const response = await axios.get(`${baseUrl}pokemon?limit=10000`);
        let results = response.data.results;

        for (let i = 0; i < 3; i++) {
            // get each pokemon data
            let randomIndex = Math.floor(Math.random() * results.length);
            const pokemonResponse = await axios.get(results[randomIndex].url);
            pokemonName.push(pokemonResponse.data.name);
            let speciesResponse = await axios.get(
                pokemonResponse.data.species.url
            );
            // traverse the species flavor_text_entries array to find the english entry
            let entries = speciesResponse.data.flavor_text_entries;

            for (const entry of entries) {
                if (entry.language.name === "en") {
                    entry.flavor_text = entry.flavor_text.replace(
                        /[\n\f]/g,
                        " "
                    );
                    entry.flavor_text = entry.flavor_text.replace(/[]/g, " ");
                    console.log(pokemonName[i] + ": " + entry.flavor_text);
                    break; // exit the loop after finding the first English entry
                }
            }
        }
        return results;
    } catch (error) {
        console.error("Fetch Pokemon failed: " + error);
    }
}
```

### Pokemon UI

#### NOTE

> In javascript, I want to add something in the webpage, it is a pokemon UI with pokemon's name, photos and description. What I want to ask is how can I create such html tags? css style I will first set in css file don't worry about that. what I want to know is can i create something that contain the structure of the pokemon cards? and when I need to show one pokemon I just directly create this on and pass all the value in.

-   `grid` is useful for layout

-   when creating Pokemon cards, I do it by this below

```js
function createPokemonCard(name, imageUrl, description) {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = name;

    const title = document.createElement("h2");
    title.textContent = name;

    const desc = document.createElement("p");
    desc.textContent = description;

    card.appendChild(title);
    card.appendChild(img);
    card.appendChild(desc);

    return card;
}
```

Which is good but not convenient to remove the children.
here the solution does, which is simple and easy.

```js
// and this function will just make a div with the data provided //
function makePokeCard(name, imgSrc, description) {
    return `
      <div class="card">
        <h1>${name}</h1>
        <img src=${imgSrc} />
        <p>${description}</p>
      </div>
    `;
}
```

**Question: Should I put function definition inside the func which use it or outside?**

I put let pokemonUrls = []; outside of the click function which make my innerHTML dis-function.

So here is the summary: never but the variable of a func outside of the function. Always keep all variable inside except really global ones.

## Hardest part

Not too much as I have clear understanding of promise, async and await.

1. Learning about grid which I use to style my layout and it is fantastic.
2. I make one function too long I think, I should divide it into several subfunction, but as I am learning specific topic here I did not put much effort here.
3. As I am lack in many knowledge now, so I am just searching and learning what I don't know, new thing I learn:
    1. `array.prototype.map((ele)=>ele+1)`
    2. `array.prototype.find((ele)=>{return ele === b})` / `arrayA.find(({property}) => property === b)`
    3. innerHTML = `<div></div>` is very concise and readable that creating all elements one by one. Plus, easy to clear.
    4. `array.prototype.forEach((d, i) => {})` `d` value, `i` index
    5. Regular expression. `\{\n\f}\g`
