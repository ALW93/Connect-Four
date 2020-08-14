import { Game } from "./game.js";
import { GameJsonSerializer } from "./game-json-serializer.js";
import { GameJsonDeserializer } from "./game-json-deserializer.js";

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
    localStorage.clear();
    playerOne.value = "";
    playerTwo.value = "";
    newGame.setAttribute("disabled", "true");
    updateUI();
  });

  clickTarget.addEventListener("click", (e) => {
    let num;
    if (e.target.id.includes("column-")) {
      const id = e.target.id;
      num = Number.parseInt(id[id.length - 1]);
      game.playInColumn(num);
    }
    updateUI();
    const saveGame = new GameJsonSerializer(game);
    saveGame.serialize(num);
  });

  const saveData = localStorage.getItem("save-data");
  if (saveData !== null) {
    const JSONgame = new GameJsonDeserializer(saveData);
    game = JSONgame.deserialize();
    updateUI();
  }
});
