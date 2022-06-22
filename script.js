const gameBoard = document.getElementById('game-container')

function mainMenu() {
    backgroundEffects = document.createElement('img')
    backgroundEffects.src = './images/glowy_stuff.png'
    backgroundEffects.style.height = '860px'
    backgroundEffects.style.position = 'absolute'
    backgroundEffects.style.top = '0px'
    backgroundEffects.style.opacity = '0'
    backgroundEffects.style.animation = 'fadeIn 1s ease-out 1s 1 forwards';
    gameBoard.append(backgroundEffects)

    menuBoard = document.createElement('img')
    menuBoard.src = './images/menu_background.png'
    menuBoard.style.height = '815px'
    menuBoard.style.position = 'absolute'
    menuBoard.style.top = '0px'
    menuBoard.style.marginLeft = '20px'
    menuBoard.style.animation = '1s ease-out 0s 1 slideInFromTop';
    gameBoard.append(menuBoard)

    menuTitle = document.createElement('img')
    menuTitle.src = './images/game_title.png'
    menuTitle.style.height = '125px'
    menuTitle.style.position = 'absolute'
    menuTitle.style.top = '90px'
    menuTitle.style.right = '50%'
    menuTitle.style.transform = 'translate(50%, 0px)'
    menuTitle.style.opacity = '0'
    menuTitle.style.animation = 'fadeIn 1s ease-out 1s 1 forwards';
    gameBoard.append(menuTitle)


    birdGraphic = document.createElement('img')
    birdGraphic.src = './images/bird_character.png'
    birdGraphic.style.height = '300px'
    birdGraphic.style.position = 'relative'
    birdGraphic.style.top = '425px'
    birdGraphic.style.right = '50px'
    gameBoard.append(birdGraphic)

    startGameButton = document.createElement('img')
    startGameButton.src = './images/start_game_button.png'
    startGameButton.style.height = '75px'
    startGameButton.style.position = 'absolute'
    startGameButton.style.top = '325px'
    startGameButton.style.right = '50%'
    startGameButton.style.transform = 'translate(50%, 0px)'
    startGameButton.style.opacity = '0'
    startGameButton.style.animation = 'fadeIn 1s ease-out 1s 1 forwards';
    gameBoard.append(startGameButton)

    menuTitleShadow = document.createElement('h1')
    menuTitleShadow.textContent = 'Main Menu'
    menuTitleShadow.style.color = '#d8b366'
    menuTitleShadow.style.fontSize = '46px'
    menuTitleShadow.style.position = 'absolute'
    menuTitleShadow.style.right = '50%'
    menuTitleShadow.style.transform = 'translate(50%, 0px)'  
    menuTitleShadow.style.top = '200px'
    menuTitleShadow.style.opacity = '0'
    menuTitleShadow.style.animation = 'fadeIn 1s ease-out 1s 1 forwards';
    gameBoard.append(menuTitleShadow)

    menuTitle = document.createElement('h1')
    menuTitle.textContent = 'Main Menu'
    menuTitle.style.color = '#69251c'
    menuTitle.style.fontSize = '46px'
    menuTitle.style.position = 'absolute'
    menuTitle.style.right = '50%'
    menuTitle.style.transform = 'translate(50%, 0px)'
    menuTitle.style.top = '195px'
    menuTitle.style.opacity = '0'
    menuTitle.style.animation = 'fadeIn 1s ease-out 1s 1 forwards';
    gameBoard.append(menuTitle)
}

mainMenu()