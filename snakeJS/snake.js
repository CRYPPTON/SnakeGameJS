const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

class DrawElmGame{
    constructor(x,y,size,color){
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
    }   
    draw(){
        var size = this.size
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, size, size);
    }
}

class Snake extends DrawElmGame {
    constructor(x,y,size,color,d,tail = [], score = 0){
        super(x,y,size,color)
            this.score = score;
            this.tail = tail;
            this.d = d;
    } 
}

class Food extends DrawElmGame {
    constructor(x,y,size,color){
        super(x,y,size,color)
    } 
}

function RandPos(size){
    var rand = Math.floor(Math.random()*400)+40
    return rand-(rand%size)
}

var snake = new Snake(canvas.height/2-200,canvas.width/2,20,"red",20)
var food = new Food(canvas.height/2,canvas.width/2,20,"Yellow")
var control = [false,false,false,false]

window.addEventListener('keydown',function(e){
  
    var key = e.keyCode;
    switch (key) {
        case 87:
            control = [true,false,false,false]
            break;
        case 68 :
            control = [false,true,false,false]
            break;
        case 83 :
            control = [false,false,true,false]
            break;
        case 65 :
            control = [false,false,false,true]   
            break;        
        default:
            break;
    }
})

function game(){
    ctx.clearRect(0,0,canvas.height,canvas.width)
   
    for(var i = 0; i<snake.tail.length-1; i++){ 
        snake.tail[i] = snake.tail[i+1] 
        snake.tail[i].draw()   
    }
    
    if(control[0]){
        snake.y-=snake.d
    }
    if(control[1]){
        snake.x+=snake.d
    }
    if(control[2]){
        snake.y+=snake.d
    }
    if(control[3]){
        snake.x-=snake.d
    }
    var eat = eatFood(snake.x,snake.y,food.x,food.y)
    if(eat){
        food = new Food(RandPos(food.size),RandPos(food.size),20,"Yellow")
        snake.score+=1
    }

        snake.tail[snake.score] = new Snake(snake.x, snake.y, 20,"red",20) //ADD tail 

    food.draw()
    snake.draw() 
}

function eatFood(sx,sy,fx,fy){
    if(sx == fx && fy == sy){
        return true
    }
    return false
}

 setInterval(game,100)



