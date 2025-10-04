const baseAPI = "https://deckofcardsapi.com/api/deck/";
const shuffleCardAPI = "new/shuffle/?deck_count=";

async function getCardsFromDeck(deck_id, count) {
    try {
        let response = await axios.get(
            `${baseAPI}${deck_id}/draw/?count=${count}`
        );
        let cards = response.data.cards;
        for (const card of cards) {
            console.log(`Card on hand -  ${card.value} of ${card.suit}`);
            console.log(`Remaining cards - ${response.data.remaining}`);
        }
        return response.data;
    } catch (error) {
        console.error("Error fetching card data:", err);
    }
}

async function getCards() {
    try {
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
                alert("No cards left in the dect!!!")
            }
            remaining = data.remaining;
        }
    } catch (err) {
        console.error("Error drawing card:", err);
    }
}

getCards();
