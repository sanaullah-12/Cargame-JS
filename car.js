const score = document.querySelector('.score')
const startscreen= document.querySelector('.startscreen');
const gameArea = document.querySelector('.gameArea')
console.log(gameArea)
let keys = {ArrowUp:false , ArrowDown:false , ArrowLeft: false, ArrowRight: false}
let player ={speed: 5 , score:  0}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
document.addEventListener('click' ,start)

function keyDown(e){
    e.preventDefault()
    keys[e.key] = true;
    // console.log(e.key)
    // console.log(keys)
}
function keyUp(e){
    e.preventDefault()
    keys[e.key] = false;
    // console.log(e.key)
}

function movelines(){
    let lines = document.querySelectorAll('.lines')
    lines.forEach(function(item){
        if(item.y >= 700){
            item.y -= 750
        }
      item.y += player.speed;
      item.style.top = item.y + 'px'
    })
}

  function endGame(){
    player.start = false;
    startscreen.classList.remove('hide')
  }


function moveEnemy(car){
    let enemey = document.querySelectorAll('.enemey')
    enemey.forEach(function(item){
        if(Iscolidde(car,item)){
            console.log('boom hit car')
            endGame();
        }
        if(item.y >= 750){
            item.y = -300
            item.style.left = Math.floor(Math.random() * 350 )+ 'px'
        }
      item.y += player.speed;
      item.style.top = item.y + 'px'
    })


}

function Iscolidde(a,b){
     aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();
       return !((aRect.bottom < bRect.top)|| (aRect.top > bRect.bottom)||
       (aRect.right < bRect.left)||(aRect.left > bRect.right))

}


function gamePlay(){
    // console.log('hy i am clicked')
    let road = gameArea.getBoundingClientRect()
    // console.log(road)
    let car = document.querySelector('.car')
    if(player.start){
        movelines();
        moveEnemy(car);
        if(keys.ArrowUp && player.y >(road.top+70)) {player.y -=player.speed}
        if(keys.ArrowDown && player.y<(road.height -70)) {player.y +=player.speed}
        if(keys.ArrowLeft && player.x > 0) {player.x -=player.speed}
        if(keys.ArrowRight && player.x <(road.width -50)) {player.x +=player.speed}

        car.style.top = player.y + 'px'
        car.style.left = player.x + 'px'

        window.requestAnimationFrame(gamePlay);
        console.log(player.score++)
        player.score++
        score.innerHTML = 'Score:' + "  " + player.score
    }
   
}

function start(){
    // gameArea.classList.remove('hide')
    startscreen.classList.add('hide')
     gameArea.innerHTML = "";

    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);
   

    for(x=0; x<5; x++){
        let roadline =  document.createElement('div')
    roadline.setAttribute('class', 'lines')
    roadline.y = (x*150)
    roadline.style.top = (x*150) + 'px'
    gameArea.appendChild(roadline)
    }

    let roadline =  document.createElement('div')
    roadline.setAttribute('class', 'lines')
    gameArea.appendChild(roadline)


    let car = document.createElement('div')
    car.setAttribute('class','car')
    // car.innerText= 'this is car div'
    gameArea.appendChild(car) 
    
    player.x = car.offsetLeft
    player.y = car.offsetTop

    // console.log('left postision', +car.offsetLeft)
    // console.log('top position' , +car.offsetTop)

    for(x=0; x<3; x++){
        let enemeyCar =  document.createElement('div')
    enemeyCar.setAttribute('class', 'enemey')
    enemeyCar.y = ((x+1) * 350) * -1;
    enemeyCar.style.top = (x*150) + 'px'
    // enemeyCar.style.backgroundColor='red'
    enemeyCar.style.left = Math.floor(Math.random() * 350 )+ 'px'
    gameArea.appendChild(enemeyCar)
    }
}