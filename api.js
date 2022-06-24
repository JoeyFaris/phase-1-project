////create
let gameBoardNumbers = ''
let gameBoardSolution = ''

function makeNewGameBoard(){

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "c34eab33acmshdd5f894180ecbdcp12bcabjsne2f2f6a1f75b",
      "X-RapidAPI-Host": "sudoku-all-purpose-pro.p.rapidapi.com",
    },
  };
  
  fetch(
    "https://sudoku-all-purpose-pro.p.rapidapi.com/sudoku?create=32&output=raw",
    options
  )
    .then((response) => response.json())
    .then((response) => convertData(response))
    .catch((err) => console.error(err));
}


function convertData(data) {
  gameBoardNumbers = data.output.raw_data;

  //solve
  setTimeout(() => {
    fetch(
      `https://sudoku-all-purpose-pro.p.rapidapi.com/sudoku?solve=${gameBoardNumbers}`,
      options
    )
      .then((response) => response.json())
      .then((response) => convertSolveData(response))
      .catch((err) => console.error(err));
  }, 1500);
}

function convertSolveData(data) {
  gameBoardSolution = data.output.raw_data;


}

function makeNewGameBoard(startingBoardVariable, solutionVariable) {

  const postData = {
    startingBoard: `${startingBoardVariable}`,
    solution: `${solutionVariable}`,
  };
  const configurationObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(postData),
  };

  return fetch("http://localhost:3000/gameBoards", configurationObject)
    .then((data) => data.json())
    .then((parsed) => parsed.id)
    .catch((error) => console.log(error));
}

let gameBoardID = makeNewGameBoard(gameBoardNumbers, gameBoardSolution)
console.log(gameBoardID)