## **It’s Jeopardy!**

**Using jQuery and AJAX**, you’ll build a small, straightforward Jeopardy game.

You will be using the API listed here: https://github.com/rithmschool/jeopardy-api

~~~http
https://rithm-jeopardy.herokuapp.com/api/category?id=3
~~~

~~~htttp
https://rithm-jeopardy.herokuapp.com/api/categories?count=3
~~~

### **The API**

In order to fetch the correct data you will be using an external **API**. The "endpoint" is https://rithm-jeopardy.herokuapp.com/api.

We will need two following subsequent endpoints:

1. **GET** "https://rithm-jeopardy.herokuapp.com/api/categories?count=[integer]"
2. **GET** "[https://rithm-jeopardy.herokuapp.com/api/category?id=[integer](https://rithm-jeopardy.herokuapp.com/api/category?id=[**integer**)]"

**Retrieving Category Data**

Firstly, we will need to retrieve **Category** data for our questions. The format for the **URL** is the following:

**GET** "[https://rithm-jeopardy.herokuapp.com/api/categories?count=[integer](https://rithm-jeopardy.herokuapp.com/api/categories?count=[**integer**)]"

To review our concepts. The **API** documentation is telling us that we can plug in a number in the **count=[integer]** part of the URL and the API will fetch us the data which we need.

The **GET** request will fetch us the following data:

~~~js
let res = await axios.get(`https://rithm-jeopardy.herokuapp.com/api/categories? count=100`)
/*
[{
    "id": 2,
    "title": "baseball",
    "clues_count": 5
  },
  {
    "id": 3,
    "title": "odd jobs",
    "clues_count": 5
  },
  {
    "id": 4,
    "title": "movies",
    "clues_count": 5
  }]*/
~~~

### **Retrieving Questions in a Specific Category**

Now that you know how to retrieve all available categories, think about how you can retrieve questions in a specific category:

To review, the format for the URL is the following:

~~~txt
GET "https://rithm-jeopardy.herokuapp.com/api/category?id=[integer]"
~~~

Just like in the previous example the **API** is telling us that if we plug in a number in the **id=integer** part of the **URL** we will receive an appropriate response.

For example:

~~~js
let res = await axios.get(`https://rithm-jeopardy.herokuapp.com/api?category?id=[integer]`)
/*
{
  "id": 3,
  "title": "odd jobs",
  "clues": [
    {
      "id": 3,
      "answer": "sold flowers (flower girl accepted)",
      "question": "Eliza Doolittle did it for a living",
      "value": 100,
      "airdate": "1985-02-08T12:00:00.000Z",
      "created_at": "2014-02-11T22:47:18.841Z",
      "updated_at": "2014-02-11T22:47:18.841Z",
      "category_id": 3,
      "game_id": null,
      "invalid_count": null,
      "category": {
        "id": 3,
        "title": "odd jobs",
        "created_at": "2014-02-11T22:47:18.718Z",
        "updated_at": "2014-02-11T22:47:18.718Z",
        "clues_count": 35
      }
    },
    ...
    ],
    clues_count: 5
}
*/
~~~

##### note!

In this API there is a mistake now that the category attribute of the each clue, its clues_count is not same with the actual category we get from the API.

**Working Further with the API**

Before you begin the project, explore the **API**. What happens when you limit the responses in the first **URL**? (i.e 'count=5') or if you try to **GET** a Category which does NOT exist (i.e "id=0").



### **Requirements**

- The game board should be **6 categories** across, **5 question** down, displayed in a table. Above this should be a **header row** with the name of each category.
- At the start of the game, you should **randomly** pick 6 categories from the jService API. For each category, you should randomly select 5 questions for that category.
- Initially, the board should show with ? on each spot on the board (on the real TV show, it shows dollar amount, but we **won’t implement this**).
- When the user clicks on a clue **?**, it should replace that with the **question text**.
- When the user clicks on a visible question on the board, it should change to the **answer** (if they click on a visible answer, **nothing should happen**)
- When the user clicks the “Restart” button at the bottom of the page, it should load **new categories and questions**.

We’ve provided an HTML file and CSS for the application (you shouldn’t change the HTML file; if you want to tweak any CSS things, feel free to).

We’ve also provided a starter JS file with function definitions. Implement these functions to meet the required functionality.

<aside> 💡 **Randomly picking multiple things**

In the requirements, we’ve asked for 6 random categories. Unfortunately, the jService API doesn’t have a method that returns a random category — you’ll need to figure this out.

There are a few possible strategies here:

- Get a bunch of categories, and keep randomly choosing one, making sure you don’t choose the same one twice.
- Get a bunch of categories, **shuffle** them, then pick the first 6. Unfortunately, Javascript doesn’t have a built-in shuffle function, but you can find hints online on how to make one.
- Find a function that will pick *n* random things for you. This is often called “**sampling**”. There’s a popular library for Javascript, Lodash, which provides a function that can sample a particular number of items from a larger list, making sure there are no duplicates. </aside>