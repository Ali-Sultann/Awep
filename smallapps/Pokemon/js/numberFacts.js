const numbersAPI = "http://numbersapi.com/";
const favNumbers = [7, 18, 23, 26];

function createP(string) {
    document.body.insertAdjacentHTML("beforeend", `<p>${string}</p>`);
}

//NOTE - Promise version
function numberFacts() {
    // get multiple random numbers from one request
    fetch(`${numbersAPI}random?min=1&max=5&json`)
        .then((response) => response.json())
        .then((json) => {
            createP(json.text);
            return fetch(`${numbersAPI}${favNumbers}?json`);
        })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            for (const e in json) {
                createP(json[e]);
            }
        })
        .catch((err) => console.log(err));
}
// numberFacts();

//NOTE - async/await
async function getNumFacts() {
    let button = document.querySelector("button");
    button.addEventListener("click", clickAndDisplaySameNum);

    async function clickAndDisplayData() {
        console.log("Click!");
        try {
            let responses = await fetch(`${numbersAPI}${favNumbers}?json`);
            let facts = await responses.json();
            for (const fact in facts) {
                document.body.insertAdjacentHTML(
                    "beforeend",
                    `<p>${facts[fact]}</p>`
                );
            }
        } catch (error) {
            console.error("Error fetching data for part3:", error);
        }
    }

    async function clickAndDisplaySameNum() {
        console.log("Click!");
        try {
            let responses = await Promise.all(
                Array.from({length: 4}, () => fetch(`${numbersAPI}7?json`))
            );
            let facts = await Promise.all(responses.map((res) => res.json()));
            for (fact of facts) {
                document.body.insertAdjacentHTML(
                    "beforeend",
                    `<p>${fact.text}</p>`
                );
            }
        } catch (err) {
            console.error("Error fetching data for part3:", error);
        }
    }
}

getNumFacts();
