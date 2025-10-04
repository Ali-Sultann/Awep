function Card({cardCode}) {
    const cardAPI = "https://deckofcardsapi.com/static/img/";
    return <img src={`${cardAPI}${cardCode}.png`}/>;
    
}