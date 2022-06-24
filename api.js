////create
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

function convertData(data) {
  const gameBoardNumbers = data.output.raw_data;
  console.log(gameBoardNumbers);

  //solve
  setTimeout(() => {
    fetch(
      `https://sudoku-all-purpose-pro.p.rapidapi.com/sudoku?solve=${gameBoardNumbers}`,
      options
    )
      .then((response) => response.json())
      .then((response) => convertSolveData(response))
      .catch((err) => console.error(err));
  }, 5000);

  function convertSolveData(data) {
    const gameBoardSolved = data.output.raw_data;
    console.log(gameBoardSolved);
  }
}

//POST data into JSON
let startingBoardVariable = "007090030030000009900403006012007008040005060060901000070009600000004197095716004"
let solutionVariable = "657198432431652789928473516512367948749285361863941275174829653286534197395716824"

function makeNewGameBoard(startingBoardVariable, solutionVariable) {
  console.log(startingBoardVariable);
  console.log(solutionVariable);
  const postData = {
    gameBoards: {
      startingBoard: `${startingBoardVariable}`,
      solution: `${solutionVariable}`,
    },
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
    .then((parsed) => console.log(parsed.id))
    .catch((error) => console.log(error));
}

makeNewGameBoard()