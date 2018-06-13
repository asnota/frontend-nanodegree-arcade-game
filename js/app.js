
'use strict';

//Randomization function

const getRandomPosition = function() {
		var number = Math.floor((Math.random() * 3) + 1);
		return number;
};

// Enemies our player must avoid
const Enemy = function() {
    this.x = 0;
	  this.y = (getRandomPosition())*100;
	  this.speed = (getRandomPosition())*90;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if(this.x >= 500){
			this.x = 0;
			this.y = (getRandomPosition())*70;
	   }
	    this.x += this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

const Player = function() {
    this.sprite = 'images/char-princess-girl.png';
	  this.x = 200;
	  this.y = 410;
	  this.speed = 20;
	  this.win = 0;
	  this.life = 10;
	  this.game = true;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

const allEnemies = [];
for(let i = 0; i <= 3; i++){
    const enemy = new Enemy();
		allEnemies.push(enemy);
};

// Place the player object in a variable called player
const player = new Player();

//Reset player's position
Player.prototype.reset = function() {
		this.x = 200;
		this.y = 410;
};

//Reset the entire game
Player.prototype.gameReset = function() {
		this.life = 10;
		this.win = 0;
		this.game = true;
		this.reset();
};

//Increment user's score by 1 if user wins
Player.prototype.won = function() {
	this.win += 1;
	alert(`Your score augmented: ${player.win}`);
	this.reset();
};

//Decrement number of lives if user looses
Player.prototype.lost = function() {
	this.life -= 1;
	alert(`Your lives decremented: ${player.life}`);
};

//Function checking collisions
Player.prototype.checkCollisions = function(){
	var len = allEnemies.length;
		 for (var i = 0; i < len; i++) {
        if ((allEnemies[i].x) <= this.x + 50 &&
            (allEnemies[i].x + 50) >= (this.x) &&
            (allEnemies[i].y)<= this.y + 50 &&
            (allEnemies[i].y + 50) >= (this.y)) {
					this.lost();
					this.reset();
        }
    }
};

//Check whether user wins
Player.prototype.checkBorder_winner = function(){
	if (this.y <=60){
		this.won();
	}
};

//Set screen borders
Player.prototype.checkBorder = function(){
	if (this.x <= 0 || this.x >= 420 || this.y <=0 || this.y >=430){
		this.reset();
	}
};

//Function to update user's state
Player.prototype.update = function() {
	this.checkCollisions();
	this.checkBorder();
	this.checkBorder_winner();

	if (this.game === true){
		this.checkGameOver();
	}
	if(this.y <= 10){
		this.reset();
		this.score();
	}
};

//Function to check whether lives are used
Player.prototype.checkGameOver = function(){
	if (this.life === 0){
				alert('Game is over');
				this.game = false;
				this.gameReset();
		}
}

//Function for drawing our princess
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

Player.prototype.handleInput = function(input) {
		if(input === 'left'){
			this.x -= this.speed;
		}
		else if(input === 'right'){
			this.x += this.speed;
		}
		else if(input === 'up'){
			this.y -= this.speed;
		}
		else if(input === 'down'){
			this.y += this.speed;
		}
};
