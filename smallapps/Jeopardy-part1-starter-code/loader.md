# loader css design

![loader](C:\Users\alisu\OneDrive\Desktop\loader.gif)

~~~css
.loader {
    position: relative;
    margin: auto;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    display: inline-block;
    border-top: 20px solid #fff;
    border-right: 20px solid transparent;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}
.loader::after {
    content: "";
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    border-left: 20px solid #ff3d00;
    border-bottom: 20px solid transparent;
    animation: rotation 0.5s linear infinite reverse;
}
@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
~~~

## 1. `::after`

creates a [pseudo-element](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements) that is the last child of the selected element. It is often used to add cosmetic content to an element with the `content` property. It is inline by default.

## 2. border-top, -right

## 3. animation & transform