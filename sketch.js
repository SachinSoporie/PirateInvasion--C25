const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world;
var canvas, angle, tower, ground, cannon;

var backgroundImg;
var cannonball;
var balls = [];


function preload() {
  towerImage = loadImage("./assets/tower.png");
  backgroundImg = loadImage("./assets/background.gif");

}

function setup() {
  canvas = createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;
  angle = -PI/4;
  ground = new Ground(0, height - 1, width * 2, 1);
  tower = new Tower(150, 350, 160, 310);
  cannon = new Cannon(180, 110, 60, 25, angle);
  cannonball = new CannonBall(cannon.x, cannon.y);

}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);
  Engine.update(engine);

  ground.display();
  
  tower.display();

  cannon.display();

  for (var i = 0; i < balls.length; i++){
    showCannonBalls(balls[i], i);
  }
 
}

function keyPressed(){
  if(keyCode === "down"){
    cannonball = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball, index){
  ball.display();
  if(ball.body.position.x >= width || ball.body.position.y >= height-50){
    World.remove(world, ball.body);
    balls.splice(index, 1);
  }
}

function keyReleased(){
  if(keyCode === "down"){
    balls[balls.length-1].shoot();
  }
}