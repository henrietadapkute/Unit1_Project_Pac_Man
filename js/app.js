function init() {
  // ! VARIABLES & ELEMENTS

  // create grid
  const grid = document.querySelector(".grid");
  console.log(grid);

  // config
  const width = 19;
  const height = 19;
  const cellCount = width * height;
  let cells = [];
  let fruitAte = false
  let lives = 3

  /// CHARACTER CONFIG
  const startingPosition = 237;
  let currentPosition = startingPosition;
  // Ghost movements
  const ghostNextMove = ["up", "down", "left", "right"];
  const ghostAllMovements = [];

  //score
  let score = 0;

  // my ghosts object
  class Ghost {
    constructor(className, startingPosition, speed) {
      this.className = className;
      this.startingPosition = startingPosition;
      this.time = NaN;
      this.speed = speed;
      this.currentPosition = startingPosition;
      this.paused = false;
      this.previousMove = "";
  }
}

  const myGhosts = [
    new Ghost("ghostOne", 122, 500),
    new Ghost("ghostTwo", 123, 500),
    new Ghost("ghostThree", 85, 500),
    new Ghost("ghostFour", 124, 500),
  ];

  // ! Functions

  // checking next available move for ghost
  function moveGhost(ghost) {

    const availableMoves = [];

    if (!gridWalls(ghost.currentPosition - width)) {
      availableMoves.push("up");
    }
    if (
      !gridWalls(ghost.currentPosition + width) &&
      ghost.currentPosition !== 85
    ) {
      availableMoves.push("down");
    }
    if (!gridWalls(ghost.currentPosition - 1)) {
      availableMoves.push("left");
    }
    if (!gridWalls(ghost.currentPosition + 1)) {
      availableMoves.push("right");
    }

    const moveToRemove = availableMoves.indexOf(ghost.previousMove);
    if (
      moveToRemove !== -1 &&
      ghost.currentPosition !== 85 &&
      ghost.currentPosition !== 104 &&
      ghost.currentPosition !== 123 &&
      ghost.currentPosition !== 122 &&
      ghost.currentPosition !== 124
    ) {
      availableMoves.splice(moveToRemove, 1);
    }

    const direction = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    cells[ghost.currentPosition].classList.remove(ghost.className, "ghost");

    switch (direction) {
      case "up":
        ghost.currentPosition -= width;
        ghost.previousMove = "down";
        break;
      case "down":
        ghost.currentPosition += width;
        ghost.previousMove = "up";
        break;
      case "left":
        ghost.currentPosition -= 1;
        if (ghost.currentPosition === 152) {
          ghost.currentPosition = 170;
        }
        ghost.previousMove = "right"
        break
      case "right":
        ghost.currentPosition += 1;
        if (ghost.currentPosition === 170) {
          ghost.currentPosition = 152;
        }
        ghost.previousMove = "left";
        break;
    }
    cells[ghost.currentPosition].classList.add(ghost.className, "ghost");
  }

  function stopGhosts() {
  // Pause ghost movements
  ghostAllMovements.forEach((singleMove) => clearInterval(singleMove));
  setTimeout(function() {
    myGhosts.forEach((ghost) => {
      const singleMove = setInterval(() => moveGhost(ghost), 500);
          ghostAllMovements.push(singleMove);
      })
    fruitAte = false
  }, 5000);
}

  function getHighScore() {
    const storedHighscore = localStorage.getItem("highScore");
    // checking if
    return storedHighscore ? parseInt(storedHighscore) : 0;
  }
  // adding new high score to html
  function newHighScore() {
    const currHighScore = getHighScore();
    if (score > currHighScore) {
      localStorage.setItem("highScore", score.toString());
      document.querySelector(".highscorenum").innerHTML = score;
    } else {
      document.querySelector(".highscorenum").innerHTML = currHighScore;
    }
  }
  // updating a score with adding 10 points
  function updatecurrScore(currentPosition) {
    score += 10;
    document.querySelector(".score").innerHTML = score;
    return;
    }
  // food dots
  function Food(index) {
    foodDots = [
      20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 32, 33, 34, 35, 36, 39, 58,
      78, 79, 80, 81, 99, 118, 137, 156, 175, 194, 213, 232, 251, 270, 153, 154,
      155, 172, 191, 210, 229, 248, 286, 305, 324, 325, 326, 327, 328, 329, 330,
      331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 268, 269, 271, 272, 291,
      292, 293, 176, 177, 214, 215, 216, 217, 179, 181, 183, 184, 185, 188, 198,
      200, 204, 207, 219, 220, 221, 222, 223, 226, 236, 238, 242, 245, 255, 257,
      261, 264, 274, 276, 278, 279, 280, 281, 282, 295, 296, 297, 302, 310, 316,
      321, 89, 90, 91, 92, 55, 74, 52, 71, 48, 67, 46, 65, 42, 61, 166, 167,
      168, 169, 109, 128, 147
    ];
    return foodDots.includes(index);
  }
  // fruit
  function fruit(index) {
    foodFruit = [77, 267, 93, 283];
    return foodFruit.includes(index);
  }
  // Walls
  function gridWalls(index) {
    mywalls = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 28,
      38, 57, 76, 95, 133, 171, 190, 209, 228, 247, 266, 285, 304, 323, 342, 260,
      343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357,
      358, 359, 360, 37, 56, 75, 94, 113, 151, 189, 208, 227, 246, 265, 284, 241,
      303, 322, 341, 47, 66, 49, 50, 51, 68, 69, 70, 53, 54, 72, 73, 40, 41, 59,
      60, 43, 44, 45, 62, 63, 64, 96, 97, 98, 117, 136, 134, 135, 100, 119, 138,
      157, 173, 174, 193, 212, 211, 192, 230, 231, 102, 103, 105, 106, 125, 121,
      140, 141, 142, 143, 144, 108, 127, 146, 165, 110, 111, 112, 129, 148, 149,
      150, 186, 187, 205, 206, 224, 225, 243, 244, 262, 263, 300, 301, 320, 319,
      318, 299, 317, 298, 180, 199, 218, 256, 178, 196, 197, 195, 233, 234, 235,
      252, 253, 254, 249, 250, 287, 273, 288, 289, 290, 275, 294, 313, 312, 311,
      306, 307, 308, 309, 314, 315, 277, 258, 259, 239, 240, 201, 202, 203, 182
    ];
    return mywalls.includes(index);
  }

  function createGrid() {
    // create grid cells
    // use cellcount to create grid cells
    for (let i = 0; i < cellCount; i++) {
      // create div cell
      const cell = document.createElement("div");
      // add index to div element
      // cell.innerText = i
      // add index as an attribute
      cell.dataset.index = i;
      // add the height & width to each grid cell (div) dynamic
      cell.style.height = `${100 / height}%`;
      cell.style.width = `${100 / width}%`;
      // check if cell is a wall
      if (gridWalls(i)) {
        cell.classList.add("wall");
      } // adding dots to the grid
      if (Food(i)) {
        cell.classList.add("dots");
      } // adding fruit to the grid
      if (fruit(i)) {
        cell.classList.add("fruit");
      }
      // add cell to grid
      grid.appendChild(cell);
      // add newly created div cell to cells array
      cells.push(cell);
    }

    // add pac character class to starting position
    addPac(startingPosition);

    myGhosts.forEach((ghost) => {
      cells[ghost.startingPosition].classList.add(ghost.className, "ghost");
      addToMovements(ghost);
    });

    function addToMovements(ghost) {
      const singleMove = setInterval(() => moveGhost(ghost), 500);
      ghostAllMovements.push(singleMove);
    }

    // add ghosts to the grid
    myGhosts.forEach((ghost) => {
      cells[ghost.startingPosition].classList.add(ghost.className, "ghost");
    });
  }

  // ? ADD PAC CLASS
  function addPac(position) {
    cells[position].classList.add("pac");
  }

  // ? REMOVE PAC
  function removePac() {
    cells[currentPosition].classList.remove("pac");
  }

  // ! HANDLE MOVEMENT
  function handleMovement(event) {
    const key = event.keyCode;

    const up = 38;
    const down = 40;
    const left = 37;
    const right = 39;

    removePac(currentPosition);
    // check which key was pressed and execute code
    if (key === up && !gridWalls(currentPosition - width)) {
      console.log("UP");
      currentPosition -= width;
    } else if (key === down && !gridWalls(currentPosition + width)) {
      console.log("DOWN");
      currentPosition += width;
    } else if (key === left && !gridWalls(currentPosition - 1)) {
      console.log("LEFT");
      currentPosition -= 1;
      if (currentPosition === 152) {
        currentPosition = 170;
      }
    } else if (key === right && !gridWalls(currentPosition + 1)) {
      console.log("RIGHT");
      currentPosition += 1;
      if (currentPosition === 170) {
        currentPosition = 152;
      }
    } else {
      console.log("INVALID KEY");
    }
    addPac(currentPosition);

    function dotseaten() {
    if (cells[currentPosition].classList.contains("dots")) {
    cells[currentPosition].classList.remove("dots");
    updatecurrScore();
    }
  }

    function fruitsEaten() {
    if (cells[currentPosition].classList.contains("fruit")) {
    cells[currentPosition].classList.remove("fruit");
    score += 200;
    updatecurrScore();
    stopGhosts();
    fruitAte = true

  }

}
  dotseaten()
  fruitsEaten()
}

  // ENDGAME
  function Endgame() {
    if (score >= 2150) {
      console.log("Level complete!!!");
      newHighScore();
      setTimeout(function () {
        location.reload();
      }, 2000);
      document.querySelector(".lostgame").innerHTML = `Level complete!`;
    } 
      for (let i = 0; i < myGhosts.length; i++) {
        if (myGhosts[i].currentPosition === currentPosition && fruitAte) {
          cells[myGhosts[i].currentPosition].classList.remove(myGhosts[i].className, "ghost");
          myGhosts[i].currentPosition = myGhosts[i].startingPosition
          score += 200;
          cells[myGhosts[i].currentPosition].classList.add(myGhosts[i].className, "ghost");
        }
        else if (myGhosts[i].currentPosition === currentPosition) {
          lives --
          removePac()
          currentPosition = startingPosition
          addPac(currentPosition);

        }
        if (lives <= 0) {
          console.log("You lost!");
          document.querySelector(".lostgame").innerHTML = `GAME OVER`;
          setTimeout(function () {
            location.reload();
          }, 1500);

          ghostAllMovements.forEach((singleMove) => clearInterval(singleMove));
          newHighScore();
          return;
        }
      }
const livesContainer = document.querySelector(".lives-container");
  livesContainer.innerHTML = `${Array.from({ length: lives }, () => '<div class="lives"></div>')}`;
  }

  // ! Page load
  createGrid(); // create grid
  myGhosts.forEach((ghost) => {
    cells[ghost.startingPosition].classList.add(ghost.className, "ghost");
  });

  // ! Events
  document.addEventListener("keydown", handleMovement);

  //

  setInterval(Endgame, 1);
  document.querySelector(".highscorenum").innerHTML = getHighScore();
}
window.addEventListener("DOMContentLoaded", init);
