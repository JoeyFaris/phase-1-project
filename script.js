const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "apikeygoeshere",
      "X-RapidAPI-Host": "sudoku-all-purpose-pro.p.rapidapi.com",
    },
};
const gameBoard = document.getElementById('game-container') 
let gameBoardNumbers = ''
let gameBoardSolution = ''
let draggedPlayTile = null;

function makeNewGameBoard(){

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
    }, 1001);
  }
  
  function convertSolveData(data) {
    gameBoardSolution = data.output.raw_data;
    let gameBoardID = setGameBoardToAPI(gameBoardNumbers, gameBoardSolution)
    console.log(gameBoardID)
  }
  
  function setGameBoardToAPI(startingBoardVariable, solutionVariable) {
    const postData = {
      "startingBoard": startingBoardVariable,
      "solution": solutionVariable,
    };
    const configurationObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(postData),
    };
  
    return fetch("http://localhost:3000/gameBoards", configurationObject)
      .then((data) => data.json())
      .then((parsed) => createGameBoard(parsed.startingBoard))
      .catch((error) => console.log(error));
  }
  

function handleDragStart(e) {
    setTimeout(function(){
        e.target.style.visibility = "hidden"
    }, 0);
    draggedPlayTile = e.target
}

function handleDragOver(e){
    e.preventDefault()
}

function handleDragEnd(e){
    e.target.style.visibility = "visible"
}

function handleDrop(e){
    e.preventDefault()
    lockedTile = e.target.getAttribute('lockedtile')
    isBoardTile = e.target.className
    numberToPlace = draggedPlayTile.getAttribute('tiledata')
    const targetRow = e.target.id[0]
    const targetColumn = e.target.id[2]
    
    e.target.addEventListener('click', () => {
        if(lockedTile != '1'){
            e.target.style.backgroundImage = ''
            e.target.classList.remove('duplicate-tile')
            e.target.setAttribute('tiledata', '0')
            setTimeout(checkGameBoardForDuplicates(numberToPlace, targetRow, targetColumn), 10)    
        }
    })

    if(lockedTile != '1' && isBoardTile == 'board-tile'){
        e.target.style.backgroundImage = `url('./images/${numberToPlace}_gameboard.png')`
        e.target.setAttribute('tiledata', numberToPlace)
        setTimeout(checkGameBoardForDuplicates(numberToPlace, targetRow, targetColumn), 10)      
    }
}

function checkForWin(){
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            const checkTiles = document.getElementById(`${(i+1)}-${(j+1)}`)
            if(checkTiles.getAttribute('tiledata') == '0'){
                return false
            }
            else if(checkTiles.classList.contains('duplicate-tile')){
                return false
            }
        }
    }
    return true
}

function winnerScreen(){
    const menuBoard = document.getElementById('menu-background')
    const gameTiles = document.getElementsByClassName('board-tile')
    console.log(gameTiles.length)
    for(let gameTile of gameTiles){
        setTimeout(() => {
                gameTile.remove()
        }, 10)
    }
    gameBoard.style.backgroundImage = 'url("./images/main_menu_bg.png")'
    menuBoard.style.animation = 'slideInFromTop 0.5s ease-out 0s 1 forwards'

    const gameMainMenuTitle = document.getElementById('game-main-menu-title')
    gameMainMenuTitle.src = './images/completed_text.png'
    gameMainMenuTitle.style.opacity = '0'
    gameMainMenuTitle.style.animation = 'fadeIn 0.5s ease-out 0.5s 1 forwards'

    const gameWinnerTextShadow = document.getElementById('menu-title-shadow')
    gameWinnerTextShadow.textContent = 'You Win!'
    gameWinnerTextShadow.style.opacity = '0'
    gameWinnerTextShadow.style.animation = 'fadeIn 0.5s ease-out 1s 1 forwards'

    const gameWinnerText = document.getElementById('menu-title')
    gameWinnerText.textContent = 'You Win!'
    gameWinnerText.style.opacity = '0'
    gameWinnerText.style.animation = 'fadeIn 0.5s ease-out 1s 1 forwards'

    const gameWinnerPlayAgainButton = document.getElementById('start-game-button')
    gameWinnerPlayAgainButton.src = './images/play_again_button.png'
    gameWinnerPlayAgainButton.style.opacity = '0'
    gameWinnerPlayAgainButton.style.animation = 'fadeIn 0.5s ease-out 1s 1 forwards'
}

function checkGameBoardForDuplicates(number, row, column){
    let arrayOfRowTiles = []
    let arrayOfColumnTiles = []
    let arrayOfBoxTiles = []
    let counter = 0
    for(let i=0;i<9;i++){
        arrayOfRowTiles[i] = document.getElementById(`${row}-${i+1}`)
        arrayOfColumnTiles[i] = document.getElementById(`${i+1}-${column}`)
    }

    arrayOfRowTiles.forEach((tile) => {
        if(tile.getAttribute('tiledata') == number){
            counter++
        }
    })
    if(counter > 1){
        arrayOfRowTiles.forEach((tile) => {
            if(tile.getAttribute('tiledata') == number){
                tile.classList.add('duplicate-tile');
            }
        })
    }
    else{
        arrayOfRowTiles.forEach((tile) => {
            if(tile.getAttribute('tiledata') == number){
                tile.classList.remove('duplicate-tile');
            }
        })
    }

    counter = 0
    arrayOfColumnTiles.forEach((tile) => {
        if(tile.getAttribute('tiledata') == number){
            counter++
        }
    })
    if(counter > 1){
        arrayOfColumnTiles.forEach((tile) => {
            if(tile.getAttribute('tiledata') == number){
                tile.classList.add('duplicate-tile');
            }
        })
    }
    else{
        arrayOfColumnTiles.forEach((tile) => {
            if(tile.getAttribute('tiledata') == number){
                tile.classList.remove('duplicate-tile');
            }
        })
    }    

    let boxCounter = 0
    if(row < 4){
        if(column < 4){
            for(let i=0;i<3;i++){
                for(let j=0;j<3;j++){
                    arrayOfBoxTiles[boxCounter] = document.getElementById(`${i+1}-${j+1}`)
                    boxCounter++
                }
            }
        }
        else if(column < 7){
            for(let i=0;i<3;i++){
                for(let j=3;j<6;j++){
                    arrayOfBoxTiles[boxCounter] = document.getElementById(`${i+1}-${j+1}`)
                    boxCounter++
                }
            }            
        }
        else{
            for(let i=0;i<3;i++){
                for(let j=6;j<9;j++){
                    arrayOfBoxTiles[boxCounter] = document.getElementById(`${i+1}-${j+1}`)
                    boxCounter++
                }
            }
        }
    }
    else if(row < 7){
        if(column < 4){
            for(let i=3;i<6;i++){
                for(let j=0;j<3;j++){
                    arrayOfBoxTiles[boxCounter] = document.getElementById(`${i+1}-${j+1}`)
                    boxCounter++
                }
            }
        }
        else if(column < 7){
            for(let i=3;i<6;i++){
                for(let j=3;j<6;j++){
                    arrayOfBoxTiles[boxCounter] = document.getElementById(`${i+1}-${j+1}`)
                    boxCounter++
                }
            }            
        }
        else{
            for(let i=3;i<6;i++){
                for(let j=6;j<9;j++){
                    arrayOfBoxTiles[boxCounter] = document.getElementById(`${i+1}-${j+1}`)
                    boxCounter++
                }
            }            
        }
    }
    else{
        if(column < 4){
            for(let i=6;i<9;i++){
                for(let j=0;j<3;j++){
                    arrayOfBoxTiles[boxCounter] = document.getElementById(`${i+1}-${j+1}`)
                    boxCounter++
                }
            }
        }
        else if(column < 7){
            for(let i=6;i<9;i++){
                for(let j=3;j<6;j++){
                    arrayOfBoxTiles[boxCounter] = document.getElementById(`${i+1}-${j+1}`)
                    boxCounter++
                }
            }            
        }
        else{
            for(let i=6;i<9;i++){
                for(let j=6;j<9;j++){
                    arrayOfBoxTiles[boxCounter] = document.getElementById(`${i+1}-${j+1}`)
                    boxCounter++
                }
            }            
        }
    }

    counter = 0
    arrayOfBoxTiles.forEach((tile) => {
        if(tile.getAttribute('tiledata') == number){
            counter++
        }
    })

    if(counter > 1){
        arrayOfBoxTiles.forEach((tile) => {
            if(tile.getAttribute('tiledata') == number){
                tile.classList.add('duplicate-tile');
            }
        })
    }
    else{
        arrayOfBoxTiles.forEach((tile) => {
            if(tile.getAttribute('tiledata') == number){
                tile.classList.remove('duplicate-tile');
            }
        })
    }

    if(checkForWin() == true){
        winnerScreen()
    }
}

function createGameBoard(theTiles) {
    for(let i=0; i<9; i++){

        for(let j=0; j<9; j++){
            let gameDIV = document.createElement('div')
            gameDIV.setAttribute('id', `${i+1}-${j+1}`)
            gameDIV.setAttribute('tileData', theTiles[(i*9)+j])
            

            let populateTile = gameDIV.getAttribute('tileData')
            
            if(populateTile != '0') {
                gameDIV.style.backgroundImage = `url('./images/${populateTile}_gameboard.png')`
                gameDIV.setAttribute('class', 'board-tile starting-tile')
                gameDIV.setAttribute('lockedTile', '1')
            }
            else {
                gameDIV.setAttribute('class', 'board-tile')
                gameDIV.setAttribute('lockedTile', '0')
            }


            if(i == 0) {
                gameDIV.style.top = '174px'
            }
            else if(i == 1) {
                gameDIV.style.top = '237px'
            }
            else if(i == 2) {
                gameDIV.style.top = '302px'
            }
            else if(i == 3) {
                gameDIV.style.top = '375px'
            }
            else if(i == 4) {
                gameDIV.style.top = '437px'
            }
            else if(i == 5) {
                gameDIV.style.top = '503px'
            }
            else if(i == 6) {
                gameDIV.style.top = '578px'
            }
            else if(i == 7) {
                gameDIV.style.top = '640px'
            }
            else {
                gameDIV.style.top = '706px'
            }
            
            if(j == 0) {
                gameDIV.style.marginRight = '270px' 
            }
            else if(j == 1) {
                gameDIV.style.marginRight = '206px'
            }
            else if(j == 2) {
                gameDIV.style.marginRight = '142px'
            }
            else if(j == 3) {
                gameDIV.style.marginRight = '66px'
            }
            else if(j == 4) {
                gameDIV.style.marginRight = '2px'
            }
            else if(j == 5) {
                gameDIV.style.marginRight = '-65px'
            }
            else if(j == 6) {
                gameDIV.style.marginRight = '-139px'
            }
            else if(j == 7) {
                gameDIV.style.marginRight = '-204px'
            }
            else {
                gameDIV.style.marginRight = '-268px'
            }                

            gameBoard.append(gameDIV)
        }
    }

    for(let k=0;k<9;k++){
        let playTileDiv = document.createElement('div')
        playTileDiv.setAttribute('tileData', `${(k+1)}`)
        playTileDiv.setAttribute('id', `play-tile-${(k+1)}`)
        playTileDiv.setAttribute('class', 'play-tile')
        playTileDiv.setAttribute('draggable', 'true')
        playTileDiv.style.backgroundImage = `url('./images/${(k+1)}_button.png')`

        if(k == '0'){
            playTileDiv.style.marginRight = '272px'
        }
        else if(k == '1'){
            playTileDiv.style.marginRight = '204px'
        }
        else if(k == '2'){
            playTileDiv.style.marginRight = '136px'
        }
        else if(k == '3'){
            playTileDiv.style.marginRight = '68px'
        }
        else if(k == '4'){
            playTileDiv.style.marginRight = '1px'
        }
        else if(k == '5'){
            playTileDiv.style.marginRight = '-66px'
        }
        else if(k == '6'){
            playTileDiv.style.marginRight = '-133px'
        }
        else if(k == '7'){
            playTileDiv.style.marginRight = '-201px'
        }
        else if(k == '8'){
            playTileDiv.style.marginRight = '-271px'
        }

        gameBoard.append(playTileDiv)
    }

    let playTiles = document.querySelectorAll('.play-tile');
    playTiles.forEach(function (playTile) {
        playTile.addEventListener('dragstart', handleDragStart, false)
        playTile.addEventListener('dragend', handleDragEnd, false)
        playTile.addEventListener('dragover', handleDragOver, false)
    });

    gameBoard.addEventListener('drop', handleDrop, false)
    gameBoard.addEventListener('dragover', handleDragOver, false)
}

function startGame() {
    gameBoard.style.backgroundImage = 'url("./images/blank_game_board.png")'

    makeNewGameBoard()
}

function mainMenu() {
    const backgroundEffects = document.createElement('img')
    backgroundEffects.setAttribute('id', 'glowy-stuff')
    backgroundEffects.src = './images/glowy_stuff.png'
    gameBoard.append(backgroundEffects)

    const menuBoard = document.createElement('img')
    menuBoard.setAttribute('id', 'menu-background')
    menuBoard.src = './images/menu_background.png'
    gameBoard.append(menuBoard)

    const gameMainMenuTitle = document.createElement('img')
    gameMainMenuTitle.setAttribute('id', 'game-main-menu-title')
    gameMainMenuTitle.src = './images/game_title.png'
    gameBoard.append(gameMainMenuTitle)

    const birdGraphic = document.createElement('img')
    birdGraphic.setAttribute('id', 'bird-character')
    birdGraphic.src = './images/bird_character.png'
    gameBoard.append(birdGraphic)

    const startGameButton = document.createElement('img')
    startGameButton.setAttribute('id', 'start-game-button')
    startGameButton.src = './images/start_game_button.png'
    gameBoard.append(startGameButton)

    const menuTitleShadow = document.createElement('h1')
    menuTitleShadow.setAttribute('id', 'menu-title-shadow')
    menuTitleShadow.textContent = 'Main Menu'
    gameBoard.append(menuTitleShadow)

    const menuTitle = document.createElement('h1')
    menuTitle.setAttribute('id', 'menu-title')
    menuTitle.textContent = 'Main Menu'
    gameBoard.append(menuTitle)

    //Add click event to Start button
    const mainMenuStartButton = document.getElementById('start-game-button')
    mainMenuStartButton.addEventListener('click', () => {
        const mainMenuStartButton = document.getElementById('start-game-button')
        const menuTitleShadow = document.getElementById('menu-title-shadow')
        const menuTitle = document.getElementById('menu-title')
        const glowyStuff = document.getElementById('glowy-stuff')
        const menuBoard = document.getElementById('menu-background')
        const birdCharacter = document.getElementById('bird-character')
        const gameMainMenuTitle = document.getElementById('game-main-menu-title')

        mainMenuStartButton.style.opacity = '1'
        mainMenuStartButton.style.animation = 'fadeOut 0.5s ease-out 0s 1 forwards'

        menuTitleShadow.style.opacity = '1'
        menuTitleShadow.style.animation = 'fadeOut 0.5s ease-out 0s 1 forwards'

        menuTitle.style.opacity = '1'
        menuTitle.style.animation = 'fadeOut 0.5s ease-out 0s 1 forwards'

        glowyStuff.style.opacity = '1'
        glowyStuff.style.animation = 'fadeOut 0.5s ease-out 0s 1 forwards'

        birdCharacter.style.opacity = '1'
        birdCharacter.style.animation = 'fadeOut 1s ease-out 0s 1 forwards'

        gameMainMenuTitle.style.opacity = '1'
        gameMainMenuTitle.style.animation = 'fadeOut 0.5s ease-out 0s 1 forwards'        

        menuBoard.style.animation = 'slideOutToTop 0.5s ease-out 1s 1 forwards'
        
        startGame()

    })
}

mainMenu()