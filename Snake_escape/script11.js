var girl=document.getElementById("girl");
IdleImageNumber=1;
idleanimationnum=0;

function idleanimation(){

    IdleImageNumber=IdleImageNumber+1;

    if(IdleImageNumber == 11){
        IdleImageNumber=1;
    }

    girl.src = "freeknight/png/Idle ("+IdleImageNumber+").png";
    //girl.src = "freeknight/png/idle ("+IdleImageNumber+")".png;

}

function idleanimationstart(){
    idleanimationnum=setInterval(idleanimation,200);
}

runImageNumber=1;
runanimationnum=0;

function runanimation(){

    runImageNumber=runImageNumber+1;

    if(runImageNumber == 11){
        runImageNumber=1;
    }

    girl.src = "freeknight/png/run ("+runImageNumber+").png";
    //girl.src = "freeknight/png/idle ("+IdleImageNumber+")".png;

}

function runanimationstart(){
    runanimationnum=setInterval(runanimation,100);
    clearInterval(idleanimationnum);
}

jumpanimationnum=0;
jumpImageNumber=1;
girlMarginTop=400;

function jumpanimation(){
    jumpImageNumber=jumpImageNumber+1;

    if(jumpImageNumber<=6){
        girlMarginTop=girlMarginTop-35;
        girl.style.marginTop=girlMarginTop+"px";
    }

    if(jumpImageNumber>=7){
        girlMarginTop=girlMarginTop+35;
        girl.style.marginTop=girlMarginTop+"px";
    }
    
    if(jumpImageNumber== 11){
        jumpImageNumber=1;
        clearInterval(jumpanimationnum);
        jumpanimationnum=0;
        runImageNumber=0;
        runanimationstart();
    }

    girl.src = "freeknight/png/jump ("+jumpImageNumber+").png";
}

function jumpanimationstart(){
    clearInterval(idleanimationnum);
    runImageNumber=0;
    clearInterval(runanimationnum);
    jumpanimationnum=setInterval(jumpanimation,100);
}

function keycheck(event){
    var keycode=event.which;
    if(keycode==13){
        if(runanimationnum==0){
            runanimationstart();
        }
    
        if(movebackgroundanimationonid==0){
            movebackgroundanimationonid=setInterval(movebackground,100);
        }
        if(boxanimationid==0){
            boxanimationid=setInterval(boxanimation,100);
        }
    }
    if(keycode==32){
        if(jumpanimationnum==0){
            jumpanimationstart();
        }
    
        if(movebackgroundanimationonid==0){
            movebackgroundanimationonid=setInterval(movebackground,100);
        }
        if(boxanimationid==0){
            boxanimationid=setInterval(boxanimation,100);
        }
    }
}


var backgroundimgposX=0;
var movebackgroundanimationonid=0;

var score=0;

function movebackground() {
    backgroundimgposX=backgroundimgposX-20;
    document.getElementById('background').style.backgroundPositionX=backgroundimgposX+"px";

    score=score+1;
    document.getElementById('score').innerHTML=score;
}

boxmarginleft=1540;

function createboxes(){

    for(var i=0;i<=10;i++){
    var box=document.createElement("div");
    box.className="box";
    document.getElementById('background').appendChild(box);
    box.style.marginLeft=boxmarginleft+"px";
    box.id="box"+i;

    //boxmarginleft=boxmarginleft+500;
    if(i<5){
        boxmarginleft=boxmarginleft+2000;
    }
    if(i>=5){
        boxmarginleft=boxmarginleft+1000;
    }
    }
}
var boxanimationid=0;
function boxanimation(){
    for(var i=0;i<10;i++){
        var box=document.getElementById("box"+i);
        var currentmarginleft=getComputedStyle(box).marginLeft;
        var newmarginleft=parseInt(currentmarginleft)-35;
        box.style.marginLeft=newmarginleft+"px";

        if(newmarginleft>=-110 & newmarginleft<=110){
            if(girlMarginTop>300){
                clearInterval(boxanimationid);
                clearInterval(runanimationnum);
                runanimationnum=-1;
                clearInterval(jumpanimationnum);
                jumpanimationnum=-1;
                clearInterval(movebackgroundanimationonid);
                movebackgroundanimationonid=-1;

                deadanimationnum=setInterval(deadanimation,100);
            }
        }
    }
}


deadimagenum=1;
deadanimationnum=0;
function deadanimation(){
    deadimagenum=deadimagenum+1;

    if(deadimagenum==11){
        deadimagenum=10;
        
        document.getElementById('end').style.visibility="visible";
        document.getElementById('endscore').innerHTML=score;
        
    }
    girl.src = "freeknight/png/dead ("+deadimagenum+").png";
}

function reload(){
    location.reload();
}
 