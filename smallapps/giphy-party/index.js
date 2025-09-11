// look back at the <readme.md> file for some hints //
// working API key //
const giphyApiKeyWeb = "KN57tpiNfx7T083oGmqfSyEFo8T1vjgh";
const gifUrl = "https://api.giphy.com/v1/gifs/";

async function giphyRequest(query, limit) {
    const response = await axios.get(
        `${gifUrl}search?api_key=${giphyApiKeyWeb}&q=${query}&limit=5&limit=${limit}`
    );
    return response.data;
}

const gifForm = document.getElementById("gifSearchForm");
const gifContainer = document.getElementById("gifContainer");
const gifQuery = document.getElementById("gifQuery");
const clearBtn = document.getElementById("clearBtn");
console.log("hello");

gifForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    // gifContainer.innerHTML = "Loading...";
    if (gifContainer.childElementCount === 0) {
        gifContainer.innerHTML = "";
    }

    const query = gifQuery.value;
    try {
        const data = await giphyRequest(query, 1);
        console.log(data);
        console.log(data.data[0].images);

        data.data.forEach((gif) => {
            const img = document.createElement("img");
            img.src = gif.images.fixed_width.url;
            img.alr = gif.title;
            gifContainer.appendChild(img);
        });
    } catch (e) {
        console.log(e);
        gifContainer.innerHTML = `${e.message}`;
    }
});

clearBtn.addEventListener("click", (e) => {
    gifContainer.innerHTML = "";
});
