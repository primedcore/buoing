var c = document.getElementById('box'), // canvas
		ctx = c.getContext('2d'), // canvas context
		cBig = document.getElementById('screen'), // second canvas
		ctxBig = cBig.getContext('2d'); // large canvas context

cBig.style.visibility = 'none'; // hide larger canvas to draw box

var ballPosX = c.width / 2 - 15, // horizontal ball position value
  ballPosY = 559, // vertical ball position value
  ballVelX = 5.9, // horizontal ball speed (velocity) value
  ballVelY = 20, // vertical ball speed (velocity) value
  onGround = true, // ball touching ground (boolean)
  ballSize = 30, // ball size value
  ballGrav = 0.55; // game gravity (does not affect points due to randomization)

// point1 position
var x = Math.floor(Math.random() * 595),
  y = Math.floor(Math.random() * -500),
  x2 = Math.floor(Math.random() * 595),
  y2 = Math.floor(Math.random() * -1000);
// point1 velocity
var pointVelX = Math.random(),
  pointVelY = Math.random() * 10,
  pointVelX2 = Math.random(),
  pointVelY2 = Math.random() * 6,
  pointSize = 5; // point size, feel free to change to make it easier (or harder)

window.addEventListener("mousedown", startJump, false); // event listener for a mouse press
window.addEventListener("mouseup", endJump, false); // event listener for a mouse release

loop(); // update function, async

function startJump() { // function ran on click
  if (onGround) { // if the ball is on the ground
    ballVelY = -20.0; // change the ball velocity (speed) to -20 so that it "floats"
    onGround = false; // and it's not on ground anymore
  }
}

function endJump() { // function ran on mouse release
  if (ballVelY < -10.0) // if the vertical velocity is lower than -10
    ballVelY = -10.0; // change it to -10
}

function loop() { // canvas updating function
	if (ballSize >= 120) { // if the ball size is bigger than or equal to 120
		newPhysics(); // call newPhysics function
		newRender(); // and newRender function
	} else { // otherwise
  update(); // call logic math function
  render(); // and drawing function
	}
  window.setTimeout(loop, 16.5); // call loop() again in 16.5 milliseconds (60fps relative display)
}

function update() { // update function
  ballVelY += ballGrav; // core game physics, gravity
  ballPosY += ballVelY; // core game physics, vertical acceleration
  ballPosX += ballVelX; // core game physics, horizontal acceleration
  if (ballPosY > 600 - (ballSize + 40)) {
    onGround = true; // double jump function
  }
  if (ballPosY <= ballSize + 0.1 * ballSize) {
    ballVelY = 4;
  }
  if (ballPosY >= 600 - ballSize) {
    ballPosY = 600 - ballSize;
    ballVelY = 0.0;
  }
  if (ballPosX <= ballSize + 0.01 * ballSize || ballPosX >= 600 - ballSize) {
    ballVelX *= -1;
  }
  // point1 Physics
  x += pointVelX;
  y += pointVelY;
  if (x > 600 || x < 0) {
    x = Math.floor(Math.random() * 595);
    y = Math.floor(Math.random() * -500);
    pointVelX *= -1;
  }
  if (y > 600) {
    x = Math.floor(Math.random() * 595);
    y = Math.floor(Math.random() * -1000);
  }
  // point2 Physics
  x2 += pointVelX2;
  y2 += pointVelY2;
  if (x2 > 600 || x2 < 0) {
    x2 = Math.floor(Math.random() * 595);
    y2 = Math.floor(Math.random() * -1000);
    pointVelX2 *= -1;
  }
  if (y2 > 600) {
    x2 = Math.floor(Math.random() * 595);
    y2 = Math.floor(Math.random() * -1500);
  }
  // collision physics

  if (x < ballPosX + ballSize && x + pointSize > ballPosX - ballSize && y < ballPosY + ballSize && y + pointSize > ballPosY - ballSize) {
    if (ballSize >= 100) { // if the ball is bigger than 100
      ballSize += 20; // increase the size by 20
			ballVelX += 1; // and increase the horizontal velocity by 1
    } else if (ballSize >= 50) { // else, if the ball is bigger than 50
      ballSize += 10;
    } else {
      ballSize += 5;
    }
    x = Math.floor(Math.random() * 595);
    y = Math.floor(Math.random() * -1000);
    pointVelX = Math.random() * 2;
    pointVelY = Math.random() * 6;
  }
  if (x2 < ballPosX + ballSize && x2 + pointSize > ballPosX - ballSize && y2 < ballPosY + ballSize && y2 + pointSize > ballPosY - ballSize) { // 
    if (ballSize >= 100) { // if the ball is bigger than 100
      ballSize += 20; // increase the size by 20
			ballVelX += 1; // and increase the horizontal velocity by 1
    } else if (ballSize >= 50) { // else, if the ball is bigger than 50
      ballSize += 10;
    } else {
      ballSize += 5;
    }
    console.log("2 " + pointVelY2 + " " + ballSize);
    x2 = Math.floor(Math.random() * 595);
    y2 = Math.floor(Math.random() * -1000);
    pointVelX2 = Math.random();
    pointVelY2 = Math.random() * 6;
  }
}

function render() {
  ctx.clearRect(0, 0, 600, 600);
  ctx.beginPath();
  ctx.arc(ballPosX, ballPosY, ballSize, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
  ctx.closePath();
  ctx.stroke();
  // point
  ctx.fillRect(x, y, pointSize, pointSize);
  // point2
  ctx.fillRect(x2, y2, pointSize, pointSize);
}
// ***************************NEW STUFF
// unused due to buggy behaviours
/* function newPhysics() {
	ballVelY += ballGrav;
  ballPosY += ballVelY;
  ballPosX += ballVelX;
  if (ballPosY <= ballSize + 0.1 * ballSize) {
    ballVelY = 4;
  }
  if (ballPosY >= cBig.height - ballSize) {
    ballPosY = cBig.height - ballSize;
    ballVelY = 0.0;
  }
  if (ballPosX <= ballSize + 0.01 * ballSize || ballPosX >= cBig.width - ballSize) {
    ballVelX *= -1;
  }
  // point1 Physics
  x += pointVelX;
  y += pointVelY;
  if (x > 600 || x < 0) {
    x = Math.floor(Math.random() * 595);
    y = Math.floor(Math.random() * -500);
    pointVelX *= -1;
  }
  if (y > 600) {
    x = Math.floor(Math.random() * 595);
    y = Math.floor(Math.random() * -1000);
  }
  // point2 Physics
  x2 += pointVelX2;
  y2 += pointVelY2;
  if (x2 > 600 || x2 < 0) {
    x2 = Math.floor(Math.random() * 595);
    y2 = Math.floor(Math.random() * -1000);
    pointVelX2 *= -1;
  }
  if (y2 > 600) {
    x2 = Math.floor(Math.random() * 595);
    y2 = Math.floor(Math.random() * -1500);
  }
  // collision physics

  if (x < ballPosX + ballSize && x + pointSize > ballPosX - ballSize && y < ballPosY + ballSize && y + pointSize > ballPosY - ballSize) {
    if (ballSize >= 100) { // if the ball is bigger than 100
      ballSize += 20; // increase the size by 20
			ballVelX += 1; // and increase the horizontal velocity by 1
    } else if (ballSize >= 50) { // else, if the ball is bigger than 50
      ballSize += 10;
    } else {
      ballSize += 5;
    }
    x = Math.floor(Math.random() * 595);
    y = Math.floor(Math.random() * -1000);
    pointVelX = Math.random() * 2;
    pointVelY = Math.random() * 6;
  }
  if (x2 < ballPosX + ballSize && x2 + pointSize > ballPosX - ballSize && y2 < ballPosY + ballSize && y2 + pointSize > ballPosY - ballSize) { // 
    if (ballSize >= 100) { // if the ball is bigger than 100
      ballSize += 20; // increase the size by 20
			ballVelX += 1; // and increase the horizontal velocity by 1
    } else if (ballSize >= 50) { // else, if the ball is bigger than 50
      ballSize += 10;
    } else {
      ballSize += 5;
		}
    x2 = Math.floor(Math.random() * 595);
    y2 = Math.floor(Math.random() * -1000);
    pointVelX2 = Math.random();
    pointVelY2 = Math.random() * 6;
	}
}

*/

function newPhysics() {
  ballVelY += ballGrav;
  ballPosY += ballVelY;
  ballPosX += ballVelX;
  if (ballPosY > 600 - (ballSize + 40)) {
    onGround = true;
  }
  if (ballPosY <= ballSize + 0.1 * ballSize) {
    ballVelY = 4;
  }
  if (ballPosY >= 600 - ballSize) {
    ballPosY = 600 - ballSize;
    ballVelY = 0.0;
  }
  if (ballPosX <= ballSize + 0.01 * ballSize || ballPosX >= 600 - ballSize) {
    ballVelX *= -1;
  }
  // point1 Physics
  x += pointVelX;
  y += pointVelY;
  if (x > 600 || x < 0) {
    x = Math.floor(Math.random() * 595);
    y = Math.floor(Math.random() * -500);
    pointVelX *= -1;
  }
  if (y > 600) {
    x = Math.floor(Math.random() * 595);
    y = Math.floor(Math.random() * -1000);
  }
  // point2 Physics
  x2 += pointVelX2;
  y2 += pointVelY2;
  if (x2 > 600 || x2 < 0) {
    x2 = Math.floor(Math.random() * 595);
    y2 = Math.floor(Math.random() * -1000);
    pointVelX2 *= -1;
  }
  if (y2 > 600) {
    x2 = Math.floor(Math.random() * 595);
    y2 = Math.floor(Math.random() * -1500);
  }
  // collision physics

  if (x < ballPosX + ballSize && x + pointSize > ballPosX - ballSize && y < ballPosY + ballSize && y + pointSize > ballPosY - ballSize) {
    if (ballSize >= 100) { // if the ball is bigger than 100
      ballSize += 20; // increase the size by 20
			ballVelX += 1; // and increase the horizontal velocity by 1
    } else if (ballSize >= 50) { // else, if the ball is bigger than 50
      ballSize += 10;
    } else {
      ballSize += 5;
    }
    x = Math.floor(Math.random() * 595);
    y = Math.floor(Math.random() * -1000);
    pointVelX = Math.random() * 2;
    pointVelY = Math.random() * 6;
  }
  if (x2 < ballPosX + ballSize && x2 + pointSize > ballPosX - ballSize && y2 < ballPosY + ballSize && y2 + pointSize > ballPosY - ballSize) { // 
    if (ballSize >= 100) { // if the ball is bigger than 100
      ballSize += 20; // increase the size by 20
			ballVelX += 1; // and increase the horizontal velocity by 1
    } else if (ballSize >= 50) { // else, if the ball is bigger than 50
      ballSize += 10;
    } else {
      ballSize += 5;
    }
    console.log("2 " + pointVelY2 + " " + ballSize);
    x2 = Math.floor(Math.random() * 595);
    y2 = Math.floor(Math.random() * -1000);
    pointVelX2 = Math.random();
    pointVelY2 = Math.random() * 6;
  }
}

function newRender() {
  ctxBig.clearRect(0, 0, cBig.width, cBig.height);
  ctxBig.beginPath();
  ctxBig.arc(ballPosX, ballPosY, ballSize, 0, Math.PI * 2, true);
  ctxBig.closePath();
  ctxBig.fill();
  ctxBig.closePath();
  ctxBig.stroke();
  // point
  ctxBig.fillRect(x, y, pointSize, pointSize);
  // point2
  ctxBig.fillRect(x2, y2, pointSize, pointSize);
}
// Problems - on ballSize = 110, the ball (and everything on the box canvas) stops and nothing else happens. Possible causes - not referencing to hide "box" canvas and show new "screen" canvas; problems in the newPhysics and newRender functions (unlikely as no error is shown in the Console in Chrome)
