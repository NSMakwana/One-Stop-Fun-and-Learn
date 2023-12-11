window.addEventListener('load',function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 700;
    canvas.height = 500;

    class input{
        constructor(game){
            this.game = game;
            window.addEventListener('keydown', e => {
                if((    (e.key === 'ArrowUp' ) ||
                        (e.key === 'ArrowDown')
                ) && this.game.keys.indexOf(e.key) === -1){
                    this.game.keys.push(e.key);
                }
                else if(e.key === ' '){
                    this.game.player.shootTop();
                }else if (e.key === 'd'){
                    this.game.debug = !this.game.debug;
                }
                //console.log(this.game.keys);
            });
            window.addEventListener('keyup', e => {
                if(this.game.keys.indexOf(e.key)> -1){
                    this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
                }
                //console.log(this.game.keys);
            });
        }
    }
    class projtile{
        constructor(game,x,y){
            this.game=game;
            this.x=x;
            this.y=y;
            this.width=10;
            this.height=3;
            this.speed=3;
            this.markedForDeletion = false;
            this.img= document.getElementById('projtile');
        }
        update(){
            this.x += this.speed;
            if(this.x > this.game.width * 0.8 ) this.markedForDeletion = true;
        }
        draw(context){
            context.drawImage(this.img,this.x,this.y);
        }
    }
    class particle{
        constructor(game,x,y){
            this.game=game;
            this.x=x;
            this.y=y;
            this.img=document.getElementById('gears');
            this.frameX=Math.floor(Math.random()*3);
            this.frameY=Math.floor(Math.random()*3);
            this.spriteSize = 50;
            this.sizeModifier=(Math.random()*0.5 + 0.5).toFixed(1);
            this.size=this.spriteSize*this.sizeModifier;
            this.speedX=Math.random()*6 - 3;
            this.speedY=Math.random()* -15;
            this.gravity=0.5;
            this.markedForDeletion=false;
            this.angle=0;
            this.va=Math.random()*0.2 -0.1;
        }
        update(){
            this.angle+= this.va;
            this.speedY+=this.gravity;
            this.x -=this.speedX;
            this.y+=this.speedY;
            if(this.y > this.game.height+this.size || this.x < 0- this.size) this.markedForDeletion=true;
        }
        draw(context){
            context.drawImage(this.img,this.frameX*this.spriteSize,this.frameY*this.spriteSize,this.spriteSize,this.spriteSize,this.x,this.y,this.size,this.size);
        }
    }
    class player{
        constructor(game){
            this.game=game;
            this.width =120;
            this.height=190;
            this.x=20;
            this.y=100;
            this.frameX=0;
            this.frameY=0;
            this.maxframe=37;
            this.speedY = 0;
            this.maxSpeed = 3;
            this.projtile = [];
            this.img=document.getElementById('player');
            this.powerup=false;
            this.poweruptimer=0;
            this.poweruplimit=10000;
        }
        update(deltaTime){
            if(this.game.keys.includes('ArrowUp')) this.speedY = -this.maxSpeed;
            else if (this.game.keys.includes('ArrowDown')) this.speedY = this.maxSpeed;
            else this.speedY = 0;
            this.y +=this.speedY;
            if(this.y>this.game.height-this.height*0.5) this.y = this.game.height-this.height*0.5;
            else if(this.y < -this.height*0.5) this.y = -this.height *0.5;
            this.projtile.forEach(projtile =>{
                projtile.update();
            });
            this.projtile = this.projtile.filter(projtile => !projtile.markedForDeletion);
            //sprite animation
            if(this.frameX < this.maxframe){
                this.frameX++;
            }
            else{
                this.frameX = 0;
            }
            if(this.powerup){
                if(this.poweruptimer > this.poweruplimit){
                    this.poweruptimer = 0;
                    this.powerup = false;
                    this.frameY=0;
                }
                else {
                    this.poweruptimer+=deltaTime;
                    this.frameY=1;
                    this.game.ammo+=0.1;
                }
            }
        }
        draw(context){
            //context.fillStyle = 'black';
            if(this.game.debug)context.strokeRect(this.x,this.y,this.width,this.height);

            this.projtile.forEach(projtile =>{
                projtile.draw(context);
            });

            context.drawImage(this.img,this.frameX * this.width,this.frameY * this.height,this.width,this.height,this.x,this.y,this.width,this.height);
           
        }
        shootTop(){
            if (this.game.ammo > 0){
            this.projtile.push(new projtile(this.game,this.x + 80,this.y + 30));
            this.game.ammo--;
            //console.log(this.projtile);
            }
            if(this.powerup) this.shootbottom();
        }
        shootbottom(){
            if(this.game.ammo>0){
                this.projtile.push(new projtile(this.game,this.x + 80,this.y + 175));
            }
        }
        enterpowerup(){
            this.poweruptimer=0;
            this.powerup=true;
            if(this.game.ammo<this.game.maxammo) this.game.ammo=this.game.maxammo;
        }
    }
    class enemy{
        constructor(game){
            this.game=game;
            this.x = this.game.width;
            this.speedX = Math.random()* -1.5 - 0.5;
            this.markedForDeletion=false;
            this.frameX=0;
            this.frameY=0;
            this.maxframe=37;
        }
        update(){
            this.x += this.speedX - this.game.speed;
            if(this.x + this.width < 0) this.markedForDeletion = true;
            if(this.frameX < this.maxframe){
                this.frameX++;
            }
            else{
                this.frameX = 0;
            }
        }
        draw(context){
            //context.fillStyle = 'red';
            if(this.game.debug) context.strokeRect(this.x,this.y,this.width,this.height);
            context.drawImage(this.img,this.frameX * this.width,this.frameY * this.height,this.width,this.height,this.x,this.y,this.width,this.height);
            //tecontext.fillStyle='black';
            if(this.game.debug){
            context.font='20px Helvetica';
            context.fillText(this.lives,this.x,this.y);
            }
        }
    }
    class angler1 extends enemy{
        constructor(game){
            super(game);
            this.width=228;
            this.height=169;
            this.y=Math.random() * (this.game.height * 0.9 - this.height);
            this.img=document.getElementById('angler1');
            this.frameY = Math.floor(Math.random()*3);
            this.lives=2;
            this.score=this.lives;
        }
    }
    class angler2 extends enemy{
        constructor(game){
            super(game);
            this.width=213;
            this.height=165;
            this.y=Math.random() * (this.game.height * 0.9 - this.height);
            this.img=document.getElementById('angler2');
            this.frameY = Math.floor(Math.random()*2);
            this.lives=3;
            this.score=this.lives;
        }
    }
    class luckyfish extends enemy{
        constructor(game){
            super(game);
            this.width=99;
            this.height=95;
            this.y=Math.random() * (this.game.height * 0.9 - this.height);
            this.img=document.getElementById('lucky');
            this.frameY = Math.floor(Math.random()*2);
            this.lives=3;
            this.score=15;
            this.type='lucky';
        }
    }
    class layer{
        constructor(game,img,speedmodifier){
            this.game=game;
            this.img=img;
            this.speedmodifier=speedmodifier;
            this.width=1768;
            this.height=500;
            this.x=0;
            this.y=0;
        }
        update(){
            if(this.x <= -this.width) this.x =0;
            this.x -= this.game.speed*this.speedmodifier;
        }
        draw(context){
            context.drawImage(this.img,this.x,this.y);
            context.drawImage(this.img,this.x + this.width,this.y);
        }
    }
    class background{
        constructor(game){
            this.game=game;
            this.img1=document.getElementById('layer1');
            this.img2=document.getElementById('layer2');
            this.img3=document.getElementById('layer3');
            this.img4=document.getElementById('layer4');
            this.layer1= new layer(this.game,this.img1,0.2);
            this.layer2= new layer(this.game,this.img2,0.4);
            this.layer3= new layer(this.game,this.img3,1);
            this.layer4= new layer(this.game,this.img4,1.5);
            this.layers=[this.layer1,this.layer2,this.layer3];
        }
        update(){
            this.layers.forEach(layer => layer.update());
        }
        draw(context){
            this.layers.forEach(layer => layer.draw(context));
        }
    }
    class UI{
        constructor(game){
            this.game = game;
            this.fontsize = 25;
            this.fontfamily = 'Helvetica';
            this.color = 'white';

        }
        draw(context){
            context.save();
            context.fillStyle = this.color;
            context.shadowOffsetX =2;
            context.shadowOffsetY =2;
            context.shadowColor='black';
            context.font=this.fontsize +'px'+this.fontfamily;
            context.fillText('Score: '+this.game.score,20,40);
            
            
            const formattedtime = (this.game.gametime* 0.001).toFixed(1);
            context.fillText('timer: ' + formattedtime,20,100);
            if(this.game.gameover){
                context.textAlign = 'center';
                let message1;
                let message2;
                if(this.game.score > this.game.winningscore){
                    message1='you won!!';
                    message2='welldone!';
                }
                else{
                    message1='you lose!';
                    message2='better luck next time';
                }
                context.font='70px '+ this.fontfamily;
                context.fillText(message1,this.game.width * 0.5,this.game.height*0.5-40);
                context.font='25px'+ this.fontfamily;
                context.fillText(message2,this.game.width * 0.5,this.game.height*0.5+40);
            }

            if(this.game.player.powerup)  context.fillStyle ='yellow';

            for(let i =0;i< this.game.ammo;i++){
                context.fillRect(20+ 5 * i,50,3,20);
            }

            context.restore();
        }
    }
    class Game{
        constructor(width,height){
            this.width = width;
            this.height = height;
            this.Background = new background(this);
            this.player = new player(this);
            this.input = new input(this);
            this.ui = new UI(this);
            this.keys = [];
            this.enemies=[];
            this.particles=[];
            this.enemytimer = 0;
            this.enemyinterval = 1000;
            this.ammo = 20;
            this.maxammo = 50;
            this.ammotimer = 0;
            this.ammoInterval = 500;
            this.gameover=false;
            this.score=0;
            this.winningscore=10;
            this.gametime=0;
            this.timelimit=15000;
            this.speed=1;
            this.debug = true;
        }
        update(deltaTime){
            if(!this.gameover)this.gametime+=deltaTime;
            if(this.gametime>this.timelimit)this.gameover=true;
            this.Background.update();
            this.player.update(deltaTime);
            this.Background.layer4.update();
            if(this.ammotimer > this.ammoInterval){
                if(this.ammo < this.maxammo) this.ammo++;
                this.ammotimer =0;
            }
            else{
                this.ammotimer += deltaTime;
            }
            this.particles.forEach(particle => particle.update());
            this.particles = this.particles.filter(particle=>!particle.markedForDeletion);
            this.enemies.forEach(enemy => {
                enemy.update();
                if(this.checkCollision(this.player,enemy)){
                    enemy.markedForDeletion= true;
                    for(let i =0 ;i<10;i++){
                        this.particles.push(new particle(this,enemy.x + enemy.width*0.5,enemy.y+ enemy.height*0.5));
                    }
                    if(enemy.type==='lucky') this.player.enterpowerup();
                    else this.score--;
                }
                this.player.projtile.forEach(projtile => {
                    if(this.checkCollision(projtile,enemy)){
                        enemy.lives--;
                        projtile.markedForDeletion=true;
                        this.particles.push(new particle(this,enemy.x + enemy.width*0.5,enemy.y+ enemy.height*0.5));
                        if(enemy.lives <= 0){
                            enemy.markedForDeletion=true;
                            if(!this.gameover)this.score += enemy.score;
                            if(this.score > this.winningscore)this.gameover=true;
                        }
                    }
                })
            });
            this.enemies=this.enemies.filter(enemy => !enemy.markedForDeletion);
            if(this.enemytimer > this.ammoInterval && !this.gameover){
                this.addenemy();
                this.enemytimer=0;
            }
            else{
                this.enemytimer += deltaTime;
            }
        }
        draw(context){
            this.Background.draw(context);
            this.ui.draw(context);
            this.player.draw(context);
            this.particles.forEach(particle => particle.draw(context));
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });
            this.Background.layer4.draw(context);
        }
        addenemy(){
            const randomize = Math.random();
            if(randomize < 0.3) this.enemies.push(new angler1(this));
            else if(randomize < 0.6) this.enemies.push(new angler2(this));
            else this.enemies.push(new luckyfish(this));
            console.log(this.enemies);
        }
        checkCollision(rect1,rect2){
            return( rect1.x < rect2.x + rect2.width &&
                    rect1.x + rect1.width > rect2.x &&
                    rect1.y < rect2.y + rect2.height &&
                    rect1.height + rect1.y > rect2.y);
        }
    }

    const game = new Game(canvas.width,canvas.height);
    let lasttime =0;
    function animate(timeStamp){
        const deltaTime =timeStamp - lasttime;
        //console.log(deltaTime);
        lasttime = timeStamp;
        ctx.clearRect(0,0,canvas.width,canvas.height)
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate(0);
});