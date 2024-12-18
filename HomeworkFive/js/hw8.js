/*
    Name: Anthony Klimas 
    School Email: Anthony_Klimas@student.uml.edu
    Description: Scrabble Game Homework 5
*/

// Scrabble associative array
var scrabbleTiles = [];
scrabbleTiles["A"] = { "value": 1, "remaining": 9, "src": "img/Scrabble_Tile_A.jpg" };
scrabbleTiles["B"] = { "value": 3, "remaining": 2, "src": "img/Scrabble_Tile_B.jpg" };
scrabbleTiles["C"] = { "value": 3, "remaining": 2, "src": "img/Scrabble_Tile_C.jpg" };
scrabbleTiles["D"] = { "value": 2, "remaining": 4, "src": "img/Scrabble_Tile_D.jpg" };
scrabbleTiles["E"] = { "value": 1, "remaining": 12, "src": "img/Scrabble_Tile_E.jpg" };
scrabbleTiles["F"] = { "value": 4, "remaining": 2, "src": "img/Scrabble_Tile_F.jpg" };
scrabbleTiles["G"] = { "value": 2, "remaining": 3, "src": "img/Scrabble_Tile_G.jpg" };
scrabbleTiles["H"] = { "value": 4, "remaining": 2, "src": "img/Scrabble_Tile_H.jpg" };
scrabbleTiles["I"] = { "value": 1, "remaining": 9, "src": "img/Scrabble_Tile_I.jpg" };
scrabbleTiles["J"] = { "value": 8, "remaining": 1, "src": "img/Scrabble_Tile_J.jpg" };
scrabbleTiles["K"] = { "value": 5, "remaining": 1, "src": "img/Scrabble_Tile_K.jpg" };
scrabbleTiles["L"] = { "value": 1, "remaining": 4, "src": "img/Scrabble_Tile_L.jpg" };
scrabbleTiles["M"] = { "value": 3, "remaining": 2, "src": "img/Scrabble_Tile_M.jpg" };
scrabbleTiles["N"] = { "value": 1, "remaining": 6, "src": "img/Scrabble_Tile_N.jpg" };
scrabbleTiles["O"] = { "value": 1, "remaining": 8, "src": "img/Scrabble_Tile_O.jpg" };
scrabbleTiles["P"] = { "value": 3, "remaining": 2, "src": "img/Scrabble_Tile_P.jpg" };
scrabbleTiles["Q"] = { "value": 10, "remaining": 1, "src": "img/Scrabble_Tile_Q.jpg" };
scrabbleTiles["R"] = { "value": 1, "remaining": 6, "src": "img/Scrabble_Tile_R.jpg" };
scrabbleTiles["S"] = { "value": 1, "remaining": 4, "src": "img/Scrabble_Tile_S.jpg" };
scrabbleTiles["T"] = { "value": 1, "remaining": 6, "src": "img/Scrabble_Tile_T.jpg" };
scrabbleTiles["U"] = { "value": 1, "remaining": 4, "src": "img/Scrabble_Tile_U.jpg" };
scrabbleTiles["V"] = { "value": 4, "remaining": 2, "src": "img/Scrabble_Tile_V.jpg" };
scrabbleTiles["W"] = { "value": 4, "remaining": 2, "src": "img/Scrabble_Tile_W.jpg" };
scrabbleTiles["X"] = { "value": 8, "remaining": 1, "src": "img/Scrabble_Tile_X.jpg" };
scrabbleTiles["Y"] = { "value": 4, "remaining": 2, "src": "img/Scrabble_Tile_Y.jpg" };
scrabbleTiles["Z"] = { "value": 10, "remaining": 1, "src": "img/Scrabble_Tile_Z.jpg" };
scrabbleTiles["_"] = { "value": 0, "remaining": 2, "src": "img/Scrabble_Tile_Blank.jpg" };


// Board Tiles
var scrabbleBoard = [];
scrabbleBoard[0] = { "letter": "-", "wordMultiplier": 1 };
scrabbleBoard[1] = { "letter": "-", "wordMultiplier": 2 };
scrabbleBoard[2] = { "letter": "-", "wordMultiplier": 1 };
scrabbleBoard[3] = { "letter": "-", "wordMultiplier": 1 };
scrabbleBoard[4] = { "letter": "-", "wordMultiplier": 1 };
scrabbleBoard[5] = { "letter": "-", "wordMultiplier": 2 };
scrabbleBoard[6] = { "letter": "-", "wordMultiplier": 1 };

// Scrabble object, keeps track of score, current tiles in bag,
var scrabble = {
    remainingTileString: "",
    remainingTileCount: 93
};

// Update the current word being spelled by the Player
function updateWord() {
    var word = "";

    for (var i = 0; i < scrabbleBoard.length; i++) {
        word = word.concat(scrabbleBoard[i].letter);
    }

    console.log("Current word being spelled is: " + word);
    document.getElementById("currentWord").innerHTML = word;
}

// Calculate and update the score when tiles are placed or removed from the board by the Player, including current and total score
function updateCurrentScore() 
{
    var currentScore = 0;
    var multiplier = 2;
    for (var i = 0; i < scrabbleBoard.length; i++) 
        {
        if (scrabbleBoard[i].letter == "-") 
            {
            currentScore += 0;
        } else 
        {
            multiplier *= scrabbleBoard[i].wordMultiplier;
            currentScore += (scrabbleTiles[scrabbleBoard[i].letter].value);
        }
    }

    currentScore *= multiplier;
    console.log("Multiplier is:" + multiplier);
    console.log("Current score is: " + currentScore);
    document.getElementById("currentScore").innerHTML = currentScore;
}

// Update the total score to the Player when they submit their word
function submitWord() 
{
    var totalScore = +(document.getElementById("totalScore").innerHTML);
    var currentScore = +(document.getElementById("currentScore").innerHTML);

    totalScore += currentScore;
    document.getElementById("totalScore").innerHTML = totalScore;
    document.getElementById("currentScore").innerHTML = 0;

    $(".tileOnBoard").remove();
    $(".boardSlot-droppable").each(function () {
        $(this).droppable("option", "accept", ".letterTile-draggable");
    });
    for (var i = 0; i < scrabbleBoard.length; i++) 
    {
    scrabbleBoard[i].letter = "-";
    }
    updateWord();
    addLetterTiles();
}

// Functionality for NewGame button so player can start newGame (Could not figure out why the draggable on the board stops working after button is pressed.)
function newGame() 
{
    console.log("New game starting.");

    for (var i = 0; i < scrabbleBoard.length; i++) 
    {
     scrabbleBoard[i].letter = "-"; 
    }
    $(".tileOnBoard").remove();
    document.getElementById("currentWord").innerHTML = "";
    document.getElementById("currentScore").innerHTML = 0;
    document.getElementById("totalScore").innerHTML = 0;
    updateRemainingTilesCount();
    document.getElementById("playerResult").innerHTML = "";
    console.log("New game has been reset.");
    addLetterTiles();
}


// Randomize tiles for Player, also refills rack after submission
function addLetterTiles() 
{
    var rackTileCount = $("#letterRack img").length;
    console.log("Number of tiles on the rack before adding: " + rackTileCount);
    console.log(scrabble.remainingTileCount);
    if (rackTileCount == 0 && scrabble.remainingTileCount == 0) 
        {
        document.getElementById("playerResult").innerHTML = "you win! :)";
        $("#submitWordButton").prop("disabled", true).addClass("disabled");
    } else 
    {
        var tilesToFillRack = 7 - rackTileCount;
        console.log("Number of tiles to fill the rack: " + tilesToFillRack);
        console.log("REMAINING OVERALL AMOUNT: " + scrabble.remainingTileCount);
        if (scrabble.remainingTileCount <= tilesToFillRack ) 
        {
        addToRack(scrabble.remainingTileCount);
        } else 
        {
            shuffleTiles();
            addToRack(tilesToFillRack);
        }
    }
}

// Function that shuffles the Tiles once the game starts
function shuffleTiles() 
{
    scrabble.remainingTileString = "";
    for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) 
        {
        var letter = String.fromCharCode(i);
        if (scrabbleTiles[letter].remaining != 0) 
            {
            scrabble.remainingTileString = scrabble.remainingTileString.concat(letter.repeat(scrabbleTiles[letter].remaining));
            }
    }
    if (scrabbleTiles["_"].remaining != 0) 
    {
        scrabble.remainingTileString = scrabble.remainingTileString.concat("_".repeat(scrabbleTiles["_"].remaining));
    }
    var remainingTilesArr = [];
    remainingTilesArr = scrabble.remainingTileString.split("");
    remainingTilesArr.sort(function ()
     {
        return 0.5 - Math.random();
    });
    console.log("Shuffled remaining tiles: " + remainingTilesArr);
    scrabble.remainingTileString = remainingTilesArr.join("");
}

// Adding to hand
function addToRack(amount) 
{
    var tilesToAdd = "";
    var arr = [];
    arr = scrabble.remainingTileString.split("");
    console.log("Remaining tiles string: " + scrabble.remainingTileString);
    if (amount == scrabble.remainingTileCount) 
        {
        tilesToAdd += arr.join("");
        } else 
    {
        for (var i = 0; i < amount; i++) 
            {
            var chosenIndex = 0;
            console.log("Initial remaining tiles array: " + arr);
            chosenIndex = Math.floor(Math.random() * arr.length);
            tilesToAdd += arr[chosenIndex];
            console.log("Randomly chosen letters so far: " + tilesToAdd);
            arr[chosenIndex] = " ";
            arr = arr.filter(e => String(e).trim());
            console.log("Final remaining Tiles array without holes (" + arr.length + ") :" + arr);
             }
    }

    var tileRack = document.getElementById("letterRack");
    var tilesToAddArr = [];

    tilesToAddArr = tilesToAdd.split("");
    for (var i = 0; i < tilesToAddArr.length; i++) 
        {
        var tileChosen = tilesToAddArr[i];
        var newTile = document.createElement("img");
        newTile.setAttribute("class", "letterTile letterTile-draggable");
        newTile.setAttribute("id", "tile" + tileChosen);
        newTile.setAttribute("letter", tileChosen);
        newTile.setAttribute("src", scrabbleTiles[tileChosen].src);
        tileRack.appendChild(newTile);
        tileInit();
        console.log("Initial remaining " + tileChosen + ": " + scrabbleTiles[tileChosen].remaining);
        scrabbleTiles[tileChosen].remaining--;
        scrabble.remainingTileCount--;
        console.log("Final remaining " + tileChosen + ": " + scrabbleTiles[tileChosen].remaining);
        }

    updateRemainingTilesCount();
}

// Updates number of remaining tiles in the bag to the Player
function updateRemainingTilesCount() 
{
    var counter = 0;
    for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) 
    {
        var letter = String.fromCharCode(i);
        counter += scrabbleTiles[letter].remaining;
    }

    counter += scrabbleTiles["_"].remaining;
    document.getElementById("remainingTiles").innerHTML = counter;
}

// tileInit function initializes the draggable behavior for the tiles
function tileInit() 
{
    $(".letterTile-draggable").draggable(
    {
        cursor: "move",
        revert: "invalid",
        snap: ".boardTile",
        snap: ".rack",
    });
}

// jQuery document ready function, initializes the game and sets up droppable behavior
$(function () 
{
    newGame();
    $(".boardSlot-droppable").droppable(
        {
        drop: function (event, ui) 
        {
            var slot, char, boardPosition;
            ui.draggable.addClass("tileOnBoard");
            slot = $(this).attr("id");
            boardPosition = slot;
            char = ui.draggable.attr("letter");
            console.log("Tile " + char + " was dropped on slot " + slot);
            ui.draggable.position(
                {
                my: "center center",
                at: "center",
                of: $(this),
                using: function (pos) 
                {
                    $(this).animate(pos, 200, "linear");
                }
            });
            scrabbleBoard[slot].letter = char;
            updateWord();
            updateCurrentScore();
            $(this).droppable("option", "accept", ui.draggable);
        },

        out: function (event, ui) 
        {
            var char = ui.draggable.attr("letter");
            ui.draggable.removeClass("tileOnBoard");
            $(this).droppable("option", "accept", ".letterTile-draggable");
            var slot;
            slot = $(this).attr("id");
            scrabbleBoard[slot].letter = "-";
            updateWord();
            updateCurrentScore();
        }
    });
    $(".rack-droppable").droppable(
        {
        drop: function (event, ui) 
        {
            var char = ui.draggable.attr("letter");
        },
        out: function (event, ui) 
        {
            var char = ui.draggable.attr("letter");
        }
    })
});
