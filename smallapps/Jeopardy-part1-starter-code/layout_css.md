# How to layout the table

## The final layout![](C:\Users\alisu\AppData\Roaming\Typora\typora-user-images\image-20250930220515707.png)

## Related source code

~~~css
body {
    margin: 0;
    height: 100vh;
    display: flex;
    flex-direction: column;
}
/* Table layout */
#start {
    display: block;
    margin: 20px auto;
    font-size: 24px;
}
/* the table */
#jeopardy {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    margin: auto;
    text-align: center;
    width: 1100px;
    height: 80%;
    table-layout: fixed;
    font-size: 18px;
}
/* table cells */
#jeopardy th,
#jeopardy td {
    border: 2px solid black;
    text-align: center;
    padding: 3px;
}
#jeopardy td {
    height: 95px;
    font-size: 0.9em;
}
#jeopardy th {
    font-size: 24px;
    height: 70px;
}
~~~

## Point

### 1. `vt`

`vh`: viewport height.

`1vh`: 1% of the height of the browser's visible window(the viewport).

`100vh`: 100% of the height of the viewpoint(fills the entire visible vertical space).

The **differences** with 100%:

- `height: 100%`: Make the body 100% of the height of its parent. But the **parent of `body` is `<html>`**, and by default `<html>` doesn’t have an explicit height.
- So unless you also set `html { height: 100%; }`, the browser doesn’t know what `100%` really means → the `body` collapses to the height of its content. 
- If the body doesn’t have a definite height, then your `margin: auto` (for centring) won’t work properly, because auto margins need a defined parent size to calculate from.
- `100vh` doesn’t care about parents. It directly means “take up 100% of the viewport height.”
- That gives the body a definite height immediately.

### 2. centring by `margin: auto`