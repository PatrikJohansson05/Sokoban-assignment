var myDiv = document.getElementById("myDiv");

myDiv.innerHTML = "";

var myBody = document.getElementsByTagName("body")[0];

myBody.style.backgroundColor = "white";
console.log(myDiv);
myDiv.style.width = "950px";
myDiv.style.height = "800px";

var pos_X = -1;
var pos_Y = -1;

for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 19; x++) {
        const element = document.createElement("div");
        element.className = "divBox";

        if (tileMap01.mapGrid[y][x] == "W") {
            element.classList.add("Wall");
        }
        else if (tileMap01.mapGrid[y][x] == "B") {
            element.classList.add("MovableBlock");
        }
        else if (tileMap01.mapGrid[y][x] == "G") {
            element.classList.add("Goal");
        }
        else if (tileMap01.mapGrid[y][x] == "P") {
            element.classList.add("Player");
            pos_Y = y;
            pos_X = x;
        }
        else {
            element.classList.add("Space");
        }
        element.id = "x" + x + "y" + y;
        myDiv.appendChild(element);

    }
}

console.log("x" + pos_X + "y" + pos_Y);

function myFunction(e) {
    var x = document.getElementById("name");

    if (e.keyCode == 37) {
        playerMove(-1, 0);
    }
    else if (e.keyCode == 38) {
        playerMove(0, -1);
    }
    else if (e.keyCode == 39) {
        playerMove(1, 0);
    }
    else if (e.keyCode == 40) {
        playerMove(0, 1);
    }
    console.log("x" + pos_X + "y" + pos_Y);
}

function playerMove(x_offset, y_offset) {
    var currentPlayerElement = document.getElementById("x" + pos_X + "y" + pos_Y);
    var moveToElement = document.getElementById("x" + (pos_X + x_offset) + "y" + (pos_Y + y_offset));
    var moveTwoStep = document.getElementById("x" + (pos_X + x_offset + x_offset) + "y" + (pos_Y + y_offset + y_offset));

    if (!moveToElement.classList.contains("Wall")) {
        if (!((moveToElement.classList.contains("MovableBlock") && moveTwoStep.classList.contains("MovableBlock")))) {
            if (moveToElement.classList.contains("MovableBlock") && moveTwoStep.classList.contains("Space") ||
                moveToElement.classList.contains("MovableBlock") && moveTwoStep.classList.contains("Goal")) {
                currentPlayerElement.classList.remove("Player");
                moveToElement.classList.remove("MovableBlock");
                moveToElement.classList.add("Player");
                moveTwoStep.classList.add("MovableBlock");
                if (moveTwoStep.classList.contains("Goal") && moveToElement.classList.contains("MovableBlock"));
                {
                    currentPlayerElement.classList.remove("Player");
                    moveToElement.classList.remove("MovableBlock");

                    moveToElement.classList.add("Player");
                    moveTwoStep.classList.add("MovableBlock");
                }
            }
        }
        if ((moveToElement.classList.contains("MovableBlock") && moveTwoStep.classList.contains("MovableBlock")) ||
            (moveToElement.classList.contains("MovableBlock") && moveTwoStep.classList.contains("Wall")))
        {
            return;
        }
        else
        {
            currentPlayerElement.classList.remove("Player");
            moveToElement.classList.add("Player");
            currentPlayerElement.classList.add("Grass");
        }
        pos_X = pos_X + x_offset;
        pos_Y = pos_Y + y_offset;
    }
}