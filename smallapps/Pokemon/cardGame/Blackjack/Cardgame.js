function getTwoUniqueRandomNum(min, max){
    const num1 = Math.floor(Math.random() * (max - min + 1) + min);
    let num2;
    do{
        num2 = Math.floor(Math.random() * (max - min + 1) + min);
    }while(num1 === num2) return [num1, num2];
}
function Cardgame() {
    const cardValues = [`A` , `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `0`, `J` , `Q`, `K`];
    const cuits = [`S`, `D`, `C`, `H`];
    const [i1, i2] = getTwoUniqueRandomNum(0, 12);
    const sumV = i1 + i2 + 2;
    console.log(i1, i2);
    
    const [handLeft, handRight] = [i1,i2].map((i) => 
        cardValues[i].concat(cuits[Math.floor(Math.random()*4)]));
   console.log(handLeft, handRight);
   return (
    <div id="gameBoard">
        <div id="cardBoard">
            <Card cardCode={handLeft} />
            <Card cardCode={handRight} />
        </div>
        <h2>Score: {sumV}</h2>
            {
                sumV === 21 &&
                <p>🎉🎉🎉BlackJack!!!🎉🎉🎉</p>
            }
    </div>
   );
    
}