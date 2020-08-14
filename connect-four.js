import { Game } from "./game.js";
import { GameJsonSerializer } from "./game-json-serializer.js";

let game = undefined;
const clickTarget = document.getElementById("click-targets");

function updateUI() {
  const board = document.getElementById("board-holder");
  const gameName = document.getElementById("game-name");
  if (game === undefined) {
    board.setAttribute("class", "is-invisible");
  } else {
    board.classList.remove("is-invisible");
    gameName.innerHTML = game.getName();
    game.updateUI();
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const playerOne = document.getElementById("player-1-name");
  const playerTwo = document.getElementById("player-2-name");
  const newGame = document.getElementById("new-game");
  const playerForm = document.getElementById("form-holder");

  playerForm.addEventListener("keyup", (e) => {
    if (playerOne.value && playerTwo.value) {
      newGame.removeAttribute("disabled");
    }
  });

  newGame.addEventListener("click", (e) => {
    game = new Game(playerOne.value, playerTwo.value);
    playerOne.value = "";
    playerTwo.value = "";
    newGame.setAttribute("disabled", "true");
    updateUI();
  });

  clickTarget.addEventListener("click", (e) => {
    if (e.target.id.includes("column-")) {
      const id = e.target.id;
      const num = Number.parseInt(id[id.length - 1]);
      game.playInColumn(num);
    }
    updateUI();
    const saveGame = new GameJsonSerializer(game);
    localStorage.setItem("save-data", saveGame.serialize());
  });
  // deserializer goes here
});
