const gameBoard = document.getElementById('game-container')
const testGameBoard = "000000001000060020901000000710000005000000403000000700000000089000478000060000070"

function createGameBoard() {
    for(let i=0; i<9; i++){
        for(let j=0; j<9; j++){
            gameDIV = document.createElement('div')
            gameDIV.setAttribute('id', `${i+1}-${j+1}`)
            gameDIV.setAttribute('class', 'board-tile')
            gameDIV.setAttribute('tileData', testGameBoard[(i*9)+j])

            let populateTile = gameDIV.getAttribute('tileData')
            
            if(populateTile != '0'){
                gameDIV.style.backgroundImage = `url('./images/${populateTile}_gameboard.png')`
            }


            if(i == 0){
                gameDIV.style.top = '174px'
            }
            else if(i == 1){
                gameDIV.style.top = '237px'
            }
            else if(i == 2){
                gameDIV.style.top = '302px'
            }
            else if(i == 3){
                gameDIV.style.top = '375px'
            }
            else if(i == 4){
                gameDIV.style.top = '437px'
            }
            else if(i == 5){
                gameDIV.style.top = '503px'
            }
            else if(i == 6){
                gameDIV.style.top = '578px'
            }
            else if(i == 7){
                gameDIV.style.top = '640px'
            }
            else{
                gameDIV.style.top = '706px'
            }
            
            if(j == 0){
                gameDIV.style.marginRight = '270px'
            }
            else if(j == 1){
                gameDIV.style.marginRight = '206px'
            }
            else if(j == 2){
                gameDIV.style.marginRight = '142px'
            }
            else if(j == 3){
                gameDIV.style.marginRight = '66px'
            }
            else if(j == 4){
                gameDIV.style.marginRight = '2px'
            }
            else if(j == 5){
                gameDIV.style.marginRight = '-65px'
            }
            else if(j == 6){
                gameDIV.style.marginRight = '-139px'
            }
            else if(j == 7){
                gameDIV.style.marginRight = '-204px'
            }
            else{
                gameDIV.style.marginRight = '-268px'
            }                

            gameBoard.append(gameDIV)
        }
    }
}

function startGame() {
    const gameContainer = document.getElementById('game-container')
    gameContainer.style.backgroundImage = 'url("./images/blank_game_board.png")'

    createGameBoard()
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
        mainMenuStartButton.style.animation = 'fadeOut 1s ease-out 0s 1 forwards'

        menuTitleShadow.style.opacity = '1'
        menuTitleShadow.style.animation = 'fadeOut 1s ease-out 0s 1 forwards'

        menuTitle.style.opacity = '1'
        menuTitle.style.animation = 'fadeOut 1s ease-out 0s 1 forwards'

        glowyStuff.style.opacity = '1'
        glowyStuff.style.animation = 'fadeOut 1s ease-out 0s 1 forwards'

        birdCharacter.style.opacity = '1'
        birdCharacter.style.animation = 'fadeOut 1s ease-out 0s 1 forwards'

        gameMainMenuTitle.style.opacity = '1'
        gameMainMenuTitle.style.animation = 'fadeOut 1s ease-out 0s 1 forwards'        

        menuBoard.style.animation = 'slideOutToTop 0.5s ease-out 1s 1 forwards'
        
        startGame()
    })
}

mainMenu()