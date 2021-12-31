const startButton = document.getElementById('reset');
// color buttons
const redButton = document.getElementById('r');
const greenButton = document.getElementById('g');
const blueButton = document.getElementById('b');

let messageDisplay = document.querySelector("#message");

//array of squares
const squares = Array.from(document.getElementsByClassName('square'));
const allSquares = squares.length;
// array of game levels html collection
const levels = Array.from(document.getElementsByClassName('mode'));

// get the selected game level
let gameLevel = levels.find((level) => {
    let levelClasses = Array.from(level.classList);
    return levelClasses.includes("selected");
}).innerHTML


//Add event listener to start button
startButton.addEventListener("click", function () {
    // Change the text on start button
    startButton.textContent = "Re-Start";
    // Generate a color for each square
    generateColors(squares, allSquares);
    // Pick color from a rondom square
    const randomColor = randomColorPick(squares,allSquares);
    //set colors of each RGB header button
    setHeaderColor(randomColor);
    //console.log(JSON.parse(pickedColor.dataset.rgb_value))

    const correctColor = randomColor.dataset.rgb_value;
    
    // Add event listener to each game level
    levels.forEach(level => {
        level.addEventListener("click", function () {
            levels.forEach((mode) => mode.classList.remove("selected"))
                this.classList.add("selected");
        //String value of clicked level
        let gameLevel =this.innerHTML;
              
        //Conditions for each level
        let pickedColor;
        let correctColor;
        switch (gameLevel) {
            case "Easy":
                const halfSquares = squares.length/2
                //Random colors for first three squares
                generateColors(squares, halfSquares);
                  // Pick color from a rondom square
                pickedColor = randomColorPick(squares,halfSquares);
                //set colors of each RGB header button
                 setHeaderColor(pickedColor);
                //console.log(JSON.parse(pickedColor.dataset.rgb_value))
               
                correctColor = pickedColor.dataset.rgb_value;
                //Hide the bottom row
                for (let i=halfSquares; i<allSquares; i++) {
                    squares[i].classList.add("hidden");
                }    

               squareEventListener(squares,halfSquares,correctColor);
           break;
           
           case "Hard" :
                // Generate a color for each square
                generateColors(squares, allSquares);
                // Pick color from a rondom square
                pickedColor = randomColorPick(squares,allSquares);
                //set colors of each RGB header button
                setHeaderColor(pickedColor);
                //console.log(JSON.parse(pickedColor.dataset.rgb_value))

                correctColor = pickedColor.dataset.rgb_value;
                squareEventListener(squares,allSquares,correctColor);
            break;
        }
             
       
    })
});
   squareEventListener(squares,allSquares,correctColor);
   
})



// function to generate random RGB colors
function randomRGB () {
    const red = Math.floor(Math.random () *256);
    const green = Math.floor(Math.random () *256);
    const blue = Math.floor(Math.random () *256);
    const rgbArray = [red,green,blue]
    
    return rgbArray;
}

// Function to pick a random square from a list of squares.
function randomColorPick(squares,num){
        //pick a random number
        let randomIndex = Math.floor(Math.random() * num)
        return squares[randomIndex];
        }

// Function to create background color to a square from a HTML Dataset color value
function setColor(color) {
    const colors = JSON.parse(color);
    const [r,g,b] = colors;
    const rgbString = "rgb(" + r + ", " + g + ", " + b + ")";

    return rgbString;
}

// Function to set RGB color values to header elements
function setHeaderColor(pickedSquare) {
   const setElementColor = (rgbValues, element) => {
        const [r,g,b] = rgbValues;
        
        element.style.backgroundColor =  `rgb(${r}, ${g}, ${b})`;
        element.innerHTML = rgbValues.find((rgbValue) => {
            return rgbValue > 0;
        })
   }
    const rgbColors = pickedSquare.dataset.rgb_value;
    const colors = JSON.parse(rgbColors);

    const redBg = [colors[0],0,0];
    const greenBg = [0,colors[1],0];
    const blueBg = [0,0,colors[2]];

    setElementColor(redBg,redButton)
    setElementColor(greenBg,greenButton)
    setElementColor(blueBg,blueButton)
}

// Function to set the same background color to a particular number of squares
function colorAll(color,num){
            //loop through all squares
            for(let i = 0; i < num; i++){
               
                const colors = JSON.parse(color);
                const [r,g,b] = colors;
                const rgbString = "rgb(" + r + ", " + g + ", " + b + ")";
                           
                squares[i].classList.remove("hidden"); 
                //change each color to match given color
                squares[i].style.backgroundColor = rgbString;
            }

           }

// Function to set random background colors to a particular number of squares 
function generateColors (squaresList,num) {            
    for (let i=0; i<num; i++) {
        const square = squaresList[i];
        square.classList.remove("hidden");
        //set background-color of each square
        square.dataset.rgb_value = JSON.stringify(randomRGB())
        square.style.backgroundColor = setColor(square.dataset.rgb_value);
        //console.log(JSON.parse(square.dataset.rgb_value))
        }
    }

// Add event listener to each square   
function squareEventListener(squaresList,num,correctColor) {
    //add click listeners to squares    
    squaresList.forEach(square => {
        square.addEventListener("click", function(){
         //grab color of clicked square
        const clickedColor = this.dataset.rgb_value;

        if(clickedColor == correctColor){
            messageDisplay.textContent = "Correct!";
            //make background of all squares the correct color
            colorAll(clickedColor,num);
        } else {
            this.classList.add("hidden");
            messageDisplay.textContent = "Try Again";
            }

        })
    })   
}