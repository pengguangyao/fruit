(function(){
    var Fruit = window.Fruit = function(can,s){
        game.audios[3].load();
        game.audios[3].play();
        if(can){           
            if(s == -2){
                this.allFruit = {
                    "apple-2":[33,33],                 
                    "banana-2":[63,25],                  
                    "basaha-2":[34,36],                   
                    "peach-2":[31,29.5],                  
                    "sandia-2":[49,42.5],                  
                }
                this.type = can.type + s;
                this.x = can.x;
                this.y = can.y;
                this.dx = 5;
                this.dy = 3;
                this.rad = 0.02 + game.angle;
                this.squer = -1;
            }else if(s == -1){
                this.allFruit = {
                    "apple-1":[33,33],
                    "banana-1":[63,25],
                    "basaha-1":[34,36],
                    "peach-1":[31,29.5],
                    "sandia-1":[49,42.5],
                }
                this.type = can.type + s;
                this.x = can.x+50;
                this.y = can.y+40;
                this.dx = -5;
                this.dy = 3;
                this.rad = -0.02 + game.angle;
                this.squer = 1;
            }
            game.arr.push(this);
        }else{
            this.allFruit = {
                apple:[33,33],
                banana:[63,25],
                basaha:[34,36],
                peach:[31,29.5],
                sandia:[49,42.5],
                boom:[33,34]
            }
            this.allType = ["apple","banana","basaha","peach","sandia","boom"];
            this.type = this.allType[_.random(0,5)];
            this.x = _.random(0,640);
            this.y = 480;
            this.rad = 0;
            do{
                this.squer = _.random(-1,1)
            }while(this.squer == 0);
            this.dy = _.random(15,17);
            if(this.x<200){
                this.dx = _.random(6,8);
            }else if(this.x>440){
                this.dx = -(_.random(6,8));
            }else{
                this.dx = _.random(3,6)*(this.squer);
            }
            game.arr.push(this);
        }
        
    }
    Fruit.prototype.render = function(){
        game.ctx.save();
        game.ctx.translate(this.x+this.allFruit[this.type][0],this.y+this.allFruit[this.type][1]);
        game.ctx.rotate(this.rad)
        game.ctx.drawImage(game.josn[this.type],-this.allFruit[this.type][0],-this.allFruit[this.type][1]);
        game.ctx.restore();
    }
    Fruit.prototype.goDie = function(){
        game.arr.splice(game.arr.indexOf(this),1);    
        return this;
    }
    Fruit.prototype.update = function(){
        this.rad += 0.06*this.squer;
        this.x += this.dx;
        this.dy -= 0.4;
        this.y -= this.dy
        if(this.x<-100 || this.y>481 || this.x>640){
            this.goDie();
            if(this.type=="apple"||this.type=="banana"||this.type=="basaha"||this.type=="peach"||this.type=="sandia"){
                game.count++;
                if(game.count > 3){
                    clearInterval(game.timer);
                    game.frame = 0;
                    game.yyy = 0;
                    var timer = setInterval(function(){
                        game.clear();
                        game.ctx.drawImage(game.josn["score"], 10, 10);
                        game.ctx.font = "24px Arial";
                        game.ctx.fillStyle = "orange";
                        game.ctx.fillText(game.score, 50, 35);
                        game.ctx.drawImage(game.josn["xf"], 553, 5);
                        game.ctx.drawImage(game.josn["xxf"], 577, 5);
                        game.ctx.drawImage(game.josn["xxxf"], 606, 5);
                        game.frame++;
                        game.yyy += 25;
                        game.ctx.drawImage(game.josn["game-over"],80, -85 + game.yyy);
                        if(game.yyy>280){
                            game.yyy = 280;
                            if(game.x1>0){   
                                clearInterval(timer);
                                game.scene = new Scene();
                                game.score = 0;
                                game.count = 0;
                                game.scene.enter(1);
                                game.timer = setInterval(function () {
                                    game.clear();
                                    game.scene.renderAndupdate();
                                    for(var i=0;i<game.arrKnife.length;i++){
                                        game.arrKnife&&game.arrKnife[i].update();
                                        game.arrKnife[i]&&game.arrKnife[i].render();
                                    }
                                }, 40)
                            }
                        }
                    },40)
                }
            }
        } 
        //求水果的盒子坐标
        this.x1 = this.x;
        this.x2 = this.x1 + 2*this.allFruit[this.type][0];
        this.y1 = this.y;
        this.y2 = this.y + 2*this.allFruit[this.type][1];
        //判断是否切到水果
            if(game.x2>this.x1 && game.x2<this.x2 && game.y2>this.y1 && game.y2<this.y2){
                if(this.type=="apple" || this.type=="banana" || this.type=="basaha" || this.type=="peach" || this.type=="sandia"){
                    game.score ++;
                    game.audios[1].load();
                    game.audios[1].play();
                    var qie = this.goDie();
                    new Fruit(qie,-2);
                    new Fruit(qie,-1);
                    // game.ctx.save();
                    // game.ctx.translate(game.x2,game.y2);
                    // game.ctx.rotate(game.angle)
                    // game.ctx.deawImage(game.josn["flash"],-Math.abs(game.x2-game.x1)/2,-Math.abs(game.y2-game.y1)/2);
                    // game.ctx.restore();
                }else if(this.type == "boom"){
                    game.xx = this.x;
                    game.yy = this.y;
                    clearInterval(game.timer);
                    game.frame = 0;
                    game.yyy = 0;
                    var time = setInterval(function () {
                        game.clear();
                        if (game.count == 0) {
                            game.ctx.drawImage(game.josn["x"], 553, 5);
                            game.ctx.drawImage(game.josn["xx"], 577, 5);
                            game.ctx.drawImage(game.josn["xxx"], 606, 5);
                        }
                        if (game.count == 1) {
                            game.ctx.drawImage(game.josn["xf"], 553, 5);
                            game.ctx.drawImage(game.josn["xx"], 577, 5);
                            game.ctx.drawImage(game.josn["xxx"], 606, 5);
                        }
                        if (game.count == 2) {
                            game.ctx.drawImage(game.josn["xf"], 553, 5);
                            game.ctx.drawImage(game.josn["xxf"], 577, 5);
                            game.ctx.drawImage(game.josn["xxx"], 606, 5);
                        }
                        if (game.count >= 3) {
                            game.ctx.drawImage(game.josn["xf"], 553, 5);
                            game.ctx.drawImage(game.josn["xxf"], 577, 5);
                            game.ctx.drawImage(game.josn["xxxf"], 606, 5);
                        }
                        game.ctx.drawImage(game.josn["score"], 10, 10);
                        game.ctx.font = "24px Arial";
                        game.ctx.fillStyle = "orange";
                        game.ctx.fillText(game.score, 50, 35)
                        game.frame++;
                        if(game.frame%5==0&&game.frame<35){
                            game.ctx.drawImage(game.josn["background"],20,20)
                        }
                        if(game.frame%7 == 0&& game.frame<35){
                            game.ctx.drawImage(game.josn["background"],0,0)
                        }
                        if(game.frame<35){
                            for(var i=0;i<game.arr.length;i++){
                                if(game.arr[i].type == "boom") game.arr[i].render();
                            }
                        }
                        if (game.frame > 10 && game.frame<30) {
                            game.ctx.drawImage(game.josn["bao1"],0,0,88,90, game.xx - 20, game.yy - 30,108,110);
                        }
                        if (game.frame > 10 && game.frame < 20) {
                            game.audios[4].play();
                        }
                        if (game.frame > 18 && game.frame<30) {
                            game.ctx.drawImage(game.josn["bao2"],0,0,173,157, game.xx - 80, game.yy - 90,233,217);
                        }
                        if (game.frame > 26 && game.frame<35) {
                            game.ctx.drawImage(game.josn["bao3"],0,0,199,177, game.xx - 100, game.yy - 110,299,277);
                        }
                        if(game.frame>35 &&game.frame<40){
                            game.ctx.fillStyle = "white";
                            game.ctx.fillRect(0,0,640,480);
                        }
                        if (game.frame > 40) {
                            game.yyy += 25;
                            if (game.yyy > 280) game.yyy = 280;
                            game.ctx.drawImage(game.josn["game-over"], 80, -85 + game.yyy);
                        }
                        if (game.frame > 35 && game.frame < 50) {
                            game.audios[5].play();
                        }
                        if (game.frame > 50) {
                            if (game.x1 > 0) {
                                clearInterval(time);
                                game.clear();
                                game.scene = new Scene();
                                game.score = 0;
                                game.count = 0;
                                game.scene.enter(1);
                                game.timer = setInterval(function () {
                                    game.clear();
                                    game.scene.renderAndupdate();
                                    for(var i=0;i<game.arrKnife.length;i++){
                                        game.arrKnife&&game.arrKnife[i].update();
                                        game.arrKnife[i]&&game.arrKnife[i].render();
                                    }
                                }, 40)
                            }
                        }
                    },40)
                }
            }
        
    }
})()