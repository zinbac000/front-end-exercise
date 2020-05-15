// GAME CONSTANTS
const BOX_SIZE = 32;
const ARROW_LEFT = 37;
const ARROW_UP = 38;
const ARROW_RIGHT = 39;
const ARROW_DOWN = 40;
const STANDING = 0;

class Snake {
  constructor(ctx) {
    this.ctx = ctx;
    // AUDIO RESOURCES
    this.deadAudio = new Audio("./audio/dead.mp3");
    this.eatAudio = new Audio("./audio/eat.mp3");
    this.leftAudio = new Audio("./audio/left.mp3");
    this.rightAudio = new Audio("./audio/right.mp3");
    this.upAudio = new Audio("./audio/up.mp3");
    this.downAudio = new Audio("./audio/down.mp3");
    this.body = [];
    this.direction = STANDING;
    this.grew = false;
    this.initBody();

    document.addEventListener("keydown", (event) => this.direct(event));
  }

  initBody() {
    this.body[0] = {
      x: 9 * BOX_SIZE,
      y: 10 * BOX_SIZE,
    };
  }

  update() {
    this.move();
  }

  draw() {
    for (let i = 0; i < this.body.length; i++) {
      this.ctx.fillStyle = i == 0 ? "green" : "white";
      this.ctx.fillRect(this.body[i].x, this.body[i].y, BOX_SIZE, BOX_SIZE);
      this.ctx.strokeStyle = "red";
      this.ctx.strokeRect(this.body[i].x, this.body[i].y, BOX_SIZE, BOX_SIZE);
    }
  }

  direct(event) {
    if (event.keyCode === ARROW_RIGHT && this.direction !== ARROW_LEFT) {
      this.direction = ARROW_RIGHT;
      this.rightAudio.play();
    } else if (event.keyCode === ARROW_LEFT && this.direction !== ARROW_RIGHT) {
      this.direction = ARROW_LEFT;
      this.leftAudio.play();
    } else if (event.keyCode === ARROW_UP && this.direction !== ARROW_DOWN) {
      this.direction = ARROW_UP;
      this.upAudio.play();
    } else if (event.keyCode === ARROW_DOWN && this.direction !== ARROW_UP) {
      this.direction = ARROW_DOWN;
      this.downAudio.play();
    }
  }

  move() {
    let snakeX = this.body[0].x;
    let snakeY = this.body[0].y;
    if (!this.grew) {
      this.body.pop();
    } else {
      this.grew = false;
    }

    if (this.direction === ARROW_LEFT) {
      snakeX -= BOX_SIZE;
    }
    if (this.direction === ARROW_RIGHT) {
      snakeX += BOX_SIZE;
    }
    if (this.direction === ARROW_UP) {
      snakeY -= BOX_SIZE;
    }
    if (this.direction === ARROW_DOWN) {
      snakeY += BOX_SIZE;
    }

    this.body.unshift({ x: snakeX, y: snakeY });
  }

  checkEatFood(food) {
    const { x: snakeX, y: snakeY } = this.body[0];
    console.log(snakeX, snakeY);
    if (snakeX === food.x && snakeY === food.y) {
      return true;
    }
    return false;
  }

  grow() {
    this.grew = true;
    this.eatAudio.play();
  }

  collideWall(wall) {
    const { x: snakeX, y: snakeY } = this.body[0];
    if (
      snakeX > wall.right ||
      snakeX < wall.left ||
      snakeY > wall.bottom ||
      snakeY < wall.top
    ) {
      this.deadAudio.play();
      return true;
    }
    return false;
  }
}

class Game {
  ground = new Image();
  foodImg = new Image();

  constructor() {
    this.canvas = document.getElementById("game");
    this.ctx = this.canvas.getContext("2d");
    // IMAGES RESOURCE
    this.ground.src = "./img/ground.png";
    this.foodImg.src = "./img/food.png";

    this.snake = new Snake(this.ctx);

    this.food = {
      x: (Math.floor(Math.random() * 17) + 1) * BOX_SIZE,
      y: (Math.floor(Math.random() * 15) + 3) * BOX_SIZE,
    };

    this.wall = {
      top: 3 * BOX_SIZE,
      right: 17 * BOX_SIZE,
      bottom: 17 * BOX_SIZE,
      left: BOX_SIZE,
    };

    this.score = 0;
    this.endGame = false;

    this.loop();
  }
  loop() {
    let gameId = setInterval(() => {
      this.update();
      this.draw();
      if (this.endGame) {
        clearInterval(gameId);
      }
    }, 200);
  }

  update() {
    this.snake.update();
    if (this.snake.checkEatFood(this.food)) {
      this.snake.grow();
      this.score++;
      this.food = {
        x: (Math.floor(Math.random() * 17) + 1) * BOX_SIZE,
        y: (Math.floor(Math.random() * 15) + 3) * BOX_SIZE,
      };
    }
    if (this.snake.collideWall(this.wall)) {
      this.gameOver();
    }
  }

  draw() {
    if (this.endGame) {
      this.ctx.fillStyle = "green";
      this.ctx.fillRect(0, 0, 608, 608);
      this.ctx.fillStyle = "white";
      this.ctx.fillText("GAME OVER", 170, 300);
    } else {
      this.ctx.drawImage(this.ground, 0, 0);
      this.snake.draw();
      this.ctx.drawImage(this.foodImg, this.food.x, this.food.y);

      this.ctx.fillStyle = "white";
      this.ctx.font = "bold 45px Bell MT";
      this.ctx.fillText(this.score, 2.5 * BOX_SIZE, 1.6 * BOX_SIZE);
    }
  }

  gameOver() {
    this.endGame = true;
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }
}

const game = new Game();
