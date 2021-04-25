document.addEventListener('DOMContentLoaded', ()=> {
    
    const grid = document.querySelector('.grid');
    let squares = Array.from(grid.querySelectorAll('div'));
    const scoreDisplay = document.querySelector('#score');
    const startBtn = document.querySelector('#start-button')
    const width = 10;
    
    

    const lTetromino = [
        [1, 2, width+1, width*2+1],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ];

    const zTetromino = [
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1],
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1]
    ];

    const tTetromino  = [
        [1, width, width+1, width+2],
        [1, width+1, width+2, width*2+1],
        [width, width+1, width+2, width*2+1],
        [1, width, width+1, width*2+1]
    ];

    const oTetromino = [
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1]
    ];

    const iTetromino = [
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3]
    ]

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];
   
    let currentPosition = 4;
    let currentRotation = 0;
    let random = Math.floor(Math.random()*theTetrominoes.length);
    
    let current = theTetrominoes[random][currentRotation];
    
    //Draw the Tetromino

    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino')
        })
    }

    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
        })
    }

    //make the tetromino move down every second

    timerId = setInterval(moveDown, 1000);
   
    //assign function to keyCodes

    function control(e) {
        if(e.keyCode === 37) {
            moveLeft()
        } else if (e.keyCode === 38) {
            rotate()
        } else if (e.keyCode === 39) {
            moveRight()
        } else if (e.keyCode === 40) {
            moveDown()
        }
    }
    document.addEventListener('keyup', control)

    //move down function

    function moveDown() {
        undraw();
        currentPosition += width;
        draw();
        freeze();
    }

    //freeze function

    function freeze() {
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'));
            //new tetromino falling
            random = Math.floor(Math.random() * theTetrominoes.length);
            current = theTetrominoes[random][currentRotation];
            currentPosition = 4;
            draw();
        }
    }

    //move the tetromino left, unless is at the edge or there is a blockage

    function moveLeft() {
        undraw();
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);

        if(!isAtLeftEdge) currentPosition -= 1;

        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition +=1;
        }
        
        draw();
    }

    //move the tetromino right, unless is at the edge or there is a blockage

    function moveRight() {
        undraw();
        const isAtRightEdge = current.some( index => (currentPosition + index) % width === width -1);

        if(!isAtRightEdge) currentPosition += 1;

        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -=1;
            }

            draw();
    }

    //rotete the termonio

    function rotate() {
        undraw();
        currentRotation++;
        if(currentRotation === current.length) {
            currentRotation = 0;
        }
        current = theTetrominoes[random][currentRotation];
        draw()
    }

    //show up next teromino

    const displaySquares = document.querySelectorAll('mini-grid div');
    const displayWidth = 4;
    let displayIndex = 0;

    //the Tetrominos without rotations

    const upNextTetrominoes = [
        [1, displayWidth+1, displayWidth*2+1,2],    //lTetromino
        [0, displayWidth, displayWidth+1, displayWidth*2+1],    //zTetromino
        [1, displayWidth, displayWidth+1, displayWidth+2],     //tTermonio
        [0, 1, displayWidth, displayWidth+1]    //oTetromino
        [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1]     //iTetromino
    ]

    //display the Shape in the mini-grid display

    function displayShape() {
        //remove any trace of a tetromino class from the entire grid
        displaySquares.forEach(square => {
            square.classList.remove('tetromino')
        })
    }

})