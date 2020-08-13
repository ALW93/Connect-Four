export class Game {
  constructor() {
    (this.redMoves = []),
      (this.blackMoves = []),
      (this.moveArray = [0, 0, 0, 0, 0, 0, 0]),
      (this.playerIndicator = "red"); // Math.random() > 0.5
  }

  start() {
    document
      .getElementById("click-targets")
      .addEventListener("click", (event) => {
        this.playerClick(event);
      });

    // this.changeHoverColor();

    // document
    //   .getElementById("click-targets")
    //   .addEventListener("mouseover", (event) => {
    //     event.target.setAttribute("class", "click-target red");
    // event.currentTarget.removeAttribute("class");
    // if (event.currentTarget !== event.target) {
    //   // }
    // });

    // document
    //   .getElementById("click-targets")
    //   .addEventListener("mouseout", (event) => {
    //     event.stopPropagation();
    //     event.target.setAttribute("class", "click-target red");
    //   });
  }

  playerClick(event) {
    //grab the div to get the column

    const columnDiv = event.target.id;

    const colMove = columnDiv[columnDiv.length - 1];
    this.moveArray[colMove] += 1;

    const rowMove = this.moveArray[colMove];

    this.movePush(this.playerIndicator);
  }

  movePush(playerIndicator) {
    // some code.
  }

  // changeHoverColor() {
  //   const hoverList = document.querySelectorAll(".click-target");
  //   console.log(hoverList);
  //   for (let i = 0; i < hoverList.length; i++) {
  //
  //       hoverList[i].setAttribute("class", `click-target ${this.playerIndicator}`);
  //
  //   }
  // }

  playerTurn() {
    if (playerIndicator === "red") {
      playerIndicator = "black";
    } else {
      playerIndicator = "red";
    }
    return playerIndicator;
  }

  hoverColor() {
    //
  }

  dropToken() {
    // Drops token into correct div column
  }
}
