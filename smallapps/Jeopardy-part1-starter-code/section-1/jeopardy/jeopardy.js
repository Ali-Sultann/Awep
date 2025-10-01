let categories = [];
const API_ENDPOINT = "https://rithm-jeopardy.herokuapp.com/api/";
const NUM_CATEGORIES = 6;
const NUM_CLUES_PER_CAT = 5;

const $jeopardy = $("<table>", {id: "jeopardy"}); // Create the jeopardy table
const $gameTitle = $("<h1>").text("Jeopardy!"); // Create the game title
$("body").prepend($gameTitle);
const $startBtn = $("<button>", {id: "start"}).text("Start Game");
const $body = $("body");
$body.append($startBtn);
$body.append($jeopardy);
/** Get NUM_CATEGORIES random category from API.
 * Returns array of category ids
 */
async function getRandomCategoryIds() {
    let res = await axios.get(`${API_ENDPOINT}categories`, {params: {count: 100}});
    let catIds = res.data.map((c) => c.id);
    // sample is a lodash function that selects random elements from an array
    return _.sampleSize(catIds, NUM_CATEGORIES);
}
/** Return object with data about a category:
 *  Returns { title: "Math", clues: clue-array }
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      ...
 *   ]
 */
async function getCategory(catId) {
    let res = await axios.get(`${API_ENDPOINT}category`, {params: {id: catId}});
    let cat = res.data;

    // return clues in the format needed by the app
    let clues = cat.clues.map((c) => ({
        question: c.question,
        answer: c.answer,
        showing: null,
    }));

    return {title: cat.title, clues: _.sampleSize(clues, NUM_CLUES_PER_CAT)};
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_CLUES_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */
async function fillTable() {
    // Create the header row
    const $thead = $("<thead>"); // table header section: contains header row <tr> with <th> cells
    const $headerRow = $("<tr>");
    try {
        // .map(...) runs only after getRandomCategoryIds() resolves, then run all requests in parallel, not waiting for one then the other
        categories = await Promise.all((await getRandomCategoryIds()).map((id) => getCategory(id)));
    } catch (e) {
        console.error("Error fetching some categories", e);
    }
    for (let category of categories) {
        const $th = $("<th>").text(category.title); // table header cell
        $headerRow.append($th);
    }
    $thead.append($headerRow);
    $jeopardy.append($thead);

    // Create the body of the table
    const $tbody = $("<tbody>"); // table body section: contains data rows <tr> with <td> cells
    for (rowIdx = 0; rowIdx < NUM_CLUES_PER_CAT; rowIdx++) {
        const $row = $("<tr>");
        for (let catIdx = 0; catIdx < NUM_CATEGORIES; catIdx++) {
            const $td = $("<td>").attr("id", `${catIdx}-${rowIdx}`).text("?");
            $row.append($td);
        }
        $tbody.append($row);
    }
    hideLoadingView();
    $jeopardy.append($tbody);
    $jeopardy.addClass("show");
    // Add the table to the body
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
    console.log("I was called, evt is:", evt.target);

    let id = evt.target.id;
    let [catIdx, clueIdx] = id.split("-"); // get category and clue indices from cell id
    let clue = categories[catIdx].clues[clueIdx];

    switch (clue.showing) {
        case null:
            $(`#${id}`).text(clue.question).addClass("question");
            clue.showing = "question";
            break;
        case "question":
            $(`#${id}`).text(clue.answer).removeClass().addClass("answer");
            clue.showing = "answer";
            break;
        default:
            break;
    }
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {
    $startBtn.text("Loading...");
    $jeopardy.empty();
    $jeopardy.removeClass("show");
    $loader = $("<div>", {class: "loader"});
    $body.append($loader);
}

/** Remove the loading spinner and update the button used to fetch data. */
function hideLoadingView() {
    $(".loader").remove();
    $startBtn.text("Restart Game");
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
    $startBtn.text("Restart Game");
    // Start game button
    showLoadingView();
    await fillTable();
}

/** On click of start / restart button, set up game. */
$startBtn.on("click", setupAndStart);

/** On page load, add event handler for clicking clues */
$jeopardy.on("click", "td", handleClick);
