var flower; 
var flowers = []
var bee
var bees = []

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	angleMode(DEGREES);
	
	for (var i=0; i<20; i++){
		let flower = generateRandomFlowra()
		// print(flower)
		flowers.push(flower)
	}
	
	for (var i=0; i<5; i++){
		bees.push(
			{ x: random(width), y: random(height), speed: random(0.01, 0.2) }
		)
	}


	// flower = {
	// 	x: width/2, //如果使用p5的參數width,height就要放在setup內
	// 	y: height/2,
	// 	size: 2,
	// 	color: "#FF758F"
	// }
	
	overAllTexture=createGraphics(width,height)
  overAllTexture.loadPixels()
  for(var i=0;i<width;i++){
      for(var o=0;o<height;o++){
          overAllTexture.set(i,o,color(100,noise(i/3,o/3,i*o/50)*random([0,50,100])))
      }
  }
  overAllTexture.updatePixels()
	
}

function generateRandomFlowra(x,y){
	return{
		x: x || random(width), // || mean or
		y: y || random(height),
		size: random(2),
		color: random(colors)
	}
}

function drawBee(bee){
	push()
	
	translate(bee.x, bee.y)
	
	noStroke()
	
	fill(254, 249, 239, 80)
	rotate(60)
	ellipse(10, -30, 55, 15)
	
	fill(254, 249, 239, 80)
	rotate(20)
	ellipse( 5, -50, 55, 15)
	
	rotate(-80)
	fill("#F9C74F")
	rect(0, 0, 80, 55, 30)
	
	stroke("#6C584C")
	strokeWeight(5)
	line(25,2,25,53)
	line(45,2,45,53)
	
	
	pop()
}

function drawFlora(flower){
	// background(0)
	push()
	
	translate(flower.x, flower.y)
	rotate(flower.size)
	
	stroke(255, 255, 63)
	
	fill(167, 201, 87)
	circle(0,0,50)
	
	ellipseMode(CORNER)
	fill(255, 221, 50)
	if(flower.color){  // 在使用function時填入clr的色彩數值則會套用此色彩
		fill(flower.color)
	}
	
	for (var i=0; i<18; i++){
		ellipse(30,-15,130*flower.size,50)
		// line(30,0,142,-10)
		rotate(30)
	}
	
	pop()
}

var colors =["#cdb4db","#ffc8dd","#ffafcc","#bde0fe","#a2d2ff"]

function mousePressed(){
	var flower = generateRandomFlowra(mouseX,mouseY)
	flowers.push(flower)
}

function draw() {
	
	background(0)
	
	for (var i=0;i<flowers.length;i++){
		let flower = flowers[i]
		drawFlora(flower)
		
		let hasBee = false
		for (var o=0; o<bees.length; o++){
			let bee = bees[o]
			if (dist(bee.x, bee.y, flower.x, flower.y)<200){
				hasBee=true
			}
		}
		if (hasBee){
			flower.size = lerp(flower.size, 2, 0.1)
		}else {
			flower.size = lerp(flower.size, 0, 0.01)
		}		
	}
	
	for (var o=0; o<bees.length; o++){
		let bee = bees[o]
			bee.x = lerp(bee.x, mouseX+o*4, bee.speed)
			bee.y = lerp(bee.y, mouseY+o*4, bee.speed)
			drawBee(bee)
		}
	
	// drawFlora( myFlower.x, myFlower.y, myFlower.color, myFlower.size)
	
	// bee.x= mouseX
	// bee.y= mouseY
	// drawBee(bee)
	
	push()
	blendMode(MULTIPLY)
	image(overAllTexture,0 ,0)
  pop()
	
}