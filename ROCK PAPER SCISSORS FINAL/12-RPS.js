const score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

//we put the name of the the variables string in the setItem. to get its value('hello')
// console.log(localStorage.getItem('message')
// );

//goiong to convert to the JS object again

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";

  if (playerMove == "Rock") {
    if (computerMove === "Rock") {
      result = "Tie";
    } else if (computerMove === "Paper") {
      result = "You lose";
    } else if (computerMove === "Scissors") {
      result = "You win";
    }
  } else if (playerMove == "Paper") {
    if (computerMove === "Rock") {
      result = "You win";
    } else if (computerMove === "Paper") {
      result = "Tie";
    } else if (computerMove === "Scissors") {
      result = "You lose";
    }
  } else if (playerMove == "Scissors") {
    if (computerMove === "Rock") {
      result = "You lose";
    } else if (computerMove === "Paper") {
      result = "You win";
    } else if (computerMove === "Scissors") {
      result = "Tie";
    }
  }

  if (result === "You win") {
    score.wins += 1;
  } else if (result === "You lose") {
    score.losses += 1;
  } else if (result === "Tie") {
    score.ties += 1;
  }
  // in localStorage.setItem there are two string to save ('message'// as a name/variable,'hello' as the value of the 'message' ))
  //local storage only suppport strings
  //  localStorage.setItem('message', 'hello');

  const jsonString = JSON.stringify(score);
  localStorage.setItem("score", jsonString);
  

  // alert(
  //   `You pick ${playerMove}. Computer pick ${computerMove}. ${result}\nWins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`
  // );
  document.querySelector(".js-result").innerText = result;
  document.querySelector(
    ".js-picking"
  ).innerHTML = `You <img class="rps-image" src="rps-picture/${playerMove}-emoji.png" alt="error">  <img class="rps-image" src="rps-picture/${computerMove}-emoji.png" alt="error"> Computer`;
  elemScore();
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = "";
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "Rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "Paper";
  } else if (randomNumber > 2 / 3 && randomNumber <= 3 / 3) {
    computerMove = "Scissors";
  }
  return computerMove;
}
function elemScore() {
  return (document.querySelector(
    ".js-scoring"
  ).innerText = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`);
}
elemScore();

//this is the function i changed.
let isAutoPlay = false;
let intervalId;
function autoPlay() {
  if (!isAutoPlay) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
  

    isAutoPlay = true;
  } else {
    clearInterval(intervalId);
    isAutoPlay = false;
  }
}

//this is the arrow function that we can do too like the function above.
//it is personal preference so it is up to you want kind function you want to use.
/*
const autoPlay = () => {
    if (!isAutoPlay) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);

    isAutoPlay = true;
  } else {
    clearInterval(intervalId);
    isAutoPlay = false;
  }
}
*/

document.querySelector(".js-rock-button").addEventListener("click", () => {
  playGame("Rock");
});
document
  .querySelector(".js-rock-button")
  .addEventListener("keydown", (event) => {
    if (event.key === "r") {
      playGame("Rock");
    }
  });

document.querySelector(".js-paper-button").addEventListener("click", () => {
  playGame("Paper");
});

document.querySelector(".js-scissors-button").addEventListener("click", () => {
  playGame("Scissors");
});

{
  document.querySelector(".js-reset-button").addEventListener("click", () => {
    resetBut();
  });
}
const resetBut = () => {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem("score");
  elemScore();
  document.querySelector(".js-result").innerText = "Score Reset";
  document.querySelector(".js-picking").innerText = "";
};

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r" || event.key === "R") {
    playGame("Rock");
  } else if (event.key === "p" || event.key === "P") {
    playGame("Paper");
  } else if (event.key === "s" || event.key === "S") {
    playGame("Scissors");
  } else if (event.key === "a" || event.key === "A") {
    autoPlay();
  } else if (event.key === "f" || event.key === "F") {
    resetBut();
  }else if(event.key === 'i' || event.key === 'I'){
    alert(
      'RULES:\nr = rock\np = paper\ns = scissors\na = autoplay\nf = reset score'
    )
  }
 
});
