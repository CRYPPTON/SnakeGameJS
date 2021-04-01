const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
var control = [false,false,false,false]

class DrawElmGame{
    constructor(x,y,size,color){
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
    }   
    drawR(){
        var size = this.size
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, size, size);
    }
    drawF(){
        ctx.beginPath();
        var img = document.getElementById("food");
        ctx.drawImage(img, this.x, this.y);
        ctx.stroke();
    }
    drawHead(){
        ctx.beginPath();   
        var img = document.getElementById("snakeHeadRight");   
        if(control[0]==true){
            var img = document.getElementById("snakeHeadUp");
        }
        if(control[1]==true){
            var img = document.getElementById("snakeHeadRight");
        }
        if(control[2]==true){
            var img = document.getElementById("snakeHeadDown");
        }
        if(control[3]==true){
            var img = document.getElementById("snakeHeadLeft");
        }     
        ctx.drawImage(img, this.x, this.y);
        ctx.stroke();
    }
    drawTail(){
        ctx.beginPath();
        var img = document.getElementById("tailRight");
        if(this.direction[0]==true){
            var img = document.getElementById("tailUp");
        }
        if(this.direction[1]==true){
            var img = document.getElementById("tailRight");
        }
        if(this.direction[2]==true){
            var img = document.getElementById("tailUp");
        }
        if(this.direction[3]==true){
            var img = document.getElementById("tailLeft");
        }     
        ctx.drawImage(img, this.x, this.y);
        ctx.stroke();
    }
}

class Snake extends DrawElmGame {
    constructor(x,y,size,color,d,tail = [], score = 0,direction = control){
        super(x,y,size,color)
            this.score = score;
            this.tail = tail;
            this.d = d;
            this.direction = direction
    } 
}

class Food extends DrawElmGame {
    constructor(x,y,size,color){
        super(x,y,size,color)
    } 
}

function RandFoodPos(size,tail){
    var x = Math.floor(Math.random()*500)+20;
    var y = Math.floor(Math.random()*500)+20;

    var pos = {
        x : x-(x%size),
        y : y-(y%size)
    }
    for(var i = 0; i<tail.length; i++){
        if(tail[i].x == pos.x && tail[i].y == pos.y){
            pos = RandFoodPos(size,tail)
        }
    }

    return pos
}

var snake = new Snake(canvas.height/2-200,canvas.width/2,20,"red",20)
var food = new Food(canvas.height/2,canvas.width/2,20,"Yellow")


window.addEventListener('keydown',function(e){
    var key = e.keyCode;
    switch (key) {
        case 87:
            if(control.indexOf(true)!=2){
                control = [true,false,false,false]
                }
            break;
        case 68 :
            if(control.indexOf(true)!=3){
                control = [false,true,false,false]
            }
            break;
        case 83 :
            if(control.indexOf(true)!=0){
                control = [false,false,true,false]
            }
            break;
        case 65 :
            if(control.indexOf(true)!=1){
                control = [false,false,false,true]   
            }
            break;        
        default:
            break;
    }
})

function game(){
    ctx.clearRect(0,0,canvas.height,canvas.width)
   
    for(var i = 0; i<snake.tail.length-1; i++){ 
        snake.tail[i] = snake.tail[i+1] 
        snake.tail[i].drawTail()   
    }
    
    if(control[0]){
        snake.direction = "Up"
        snake.y-=snake.d
    }
    if(control[1]){
        snake.direction = "Right"
        snake.x+=snake.d
    }
    if(control[2]){
        snake.direction = "Down"
        snake.y+=snake.d
    }
    if(control[3]){
        snake.direction = "Left"
        snake.x-=snake.d
    }

    checkGameOver(snake)

    var eat = eatFood(snake.x,snake.y,food.x,food.y)
    if(eat){
        var pos = RandFoodPos(food.size,snake.tail)
        food = new Food(pos.x,pos.y,20,"Yellow")
        snake.score+=1
        $(".score").html(`Score : ${snake.score}`);
    }
    

    snake.tail[snake.score] = new Snake(snake.x, snake.y, 20,"green",20) //ADD tail
 
    food.drawF()
    snake.drawHead()

}

function eatFood(sx,sy,fx,fy){
    if(sx == fx && fy == sy){
        return true
    }
    return false
}


function checkGameOver(snake){
    var head = {
                x : snake.x,
                y : snake.y
            }
    for(var i = 0; i<snake.tail.length-1; i++){
        if(snake.tail[i].x == head.x && snake.tail[i].y == head.y){
            location.reload();
            alert("Game Over")
        }
    }
    if(snake.x>600-snake.size || snake.y>600-snake.size || snake.x<0 || snake.y<0){
        location.reload();
        alert("Game Over")     
        } 
}

  
  setInterval(game,100)



