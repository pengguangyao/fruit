(function(){
    var Scene = window.Scene = function(){
        
    }
    Scene.prototype.enter = function(num){
        game.changjing = num;
        switch(game.changjing){
            case 0:
            this.frame = 0;
            break;
            case 1:
                this.w1 = 640;
                this.h1 = 183;
                this.dy12 = 0;
                this.dy3 = 0;
                this.dx = 0;
                this.rad = 0;
                this.rad1 = 0;
                this.new = 215;
                this.isMove = true;
                this.frame = 0;
                this.yy = 0;
                this.bool = true;
                this.dx1 = 0;
                this.dx2 = 0;
                this.dy112 = 0;
            break;
            case 2:
                game.arr = [];
                this.frame = 0;
            break;
            case 3:
                this.yyy = 0;
                this.frame = 0;
            break;
        }
    }
    Scene.prototype.renderAndupdate = function(){
        this.bindEvent();
        switch(game.changjing){
            case 0:
                this.frame++;
                game.ctx.font = "14px Arial";
                game.ctx.fillStyle = "white";
                if(this.frame>=10){
                    game.ctx.fillText("正在加载鼠标控制脚本",10,20);
                }
                if(this.frame>= 20){
                    game.ctx.fillText("正在加载图像资源",10,40);
                }
                if(this.frame>=30){
                    game.ctx.fillText("正在加载游戏脚本",10,60);
                }
                if(this.frame>=40){
                    game.ctx.fillText("正在加载剧情",10,80);
                }
                if(this.frame>=50){
                    game.ctx.fillText("正在初始化",10,100);
                }
                if(this.frame>=60){
                    game.ctx.fillText("正在启动游戏....",10,120);
                }
                if(this.frame>=70) this.enter(1);
            break;
            case 1:
                this.frame ++;
                game.audios[0].play();
                if(game.x2>296 && game.x2<384 && game.y2>294.5 && game.y2<369.5){
                    if(this.frame>50){
                        game.audios[1].play();
                        this.bool = false;
                    }
                }
                if(this.bool){
                    this.dy12+=20; 
                    if(this.dy12>=183) this.dy12 =183;
                    this.dy3 +=20;
                    if(this.dy3>=293) this.dy3 = 293;
                    this.dx += 20;
                    if(this.dx>443) this.dx = 443;
                    game.ctx.drawImage(game.josn["home-mask"],0,-183+this.dy12);
                    game.ctx.drawImage(game.josn["logo"],10,-183+this.dy12);
                    game.ctx.drawImage(game.josn["ninja"],350,-263+this.dy3);
                    game.ctx.drawImage(game.josn["home-desc"],-443+this.dx,135);
                    this.rad += 0.03;
                    this.rad1 += 0.04;
                    this.frame++;
                    if(this.frame>=33){
                        game.ctx.save();
                        game.ctx.translate(130,330);
                        game.ctx.rotate(this.rad);
                        game.ctx.drawImage(game.josn["dojo"],-87.5,-87.5);
                        game.ctx.rotate(this.rad1);
                        game.ctx.drawImage(game.josn["peach"],-31,-29.5);
                        game.ctx.restore();
                        game.ctx.save();
                        game.ctx.translate(340,332);
                        game.ctx.rotate(this.rad);
                        game.ctx.drawImage(game.josn["new-game"],-97.5,-97.5);
                        game.ctx.rotate(this.rad1);
                        game.ctx.drawImage(game.josn["sandia"],-49,-42.5);
                        game.ctx.restore();
                        game.ctx.save();
                        game.ctx.translate(565,380);
                        game.ctx.rotate(this.rad);
                        game.ctx.drawImage(game.josn["quit"],-70.5,-70.5);
                        game.ctx.drawImage(game.josn["boom"],-33,-34);
                        game.ctx.restore();
                        if(this.isMove){
                            this.new+=4;
                            game.ctx.drawImage(game.josn["new"],160,this.new)
                            if(this.new>225) this.isMove = !this.isMove;
                        }else{
                            this.new-=4;
                            game.ctx.drawImage(game.josn["new"],160,this.new)
                            if(this.new<215) this.isMove = !this.isMove;
                        }
                    }
                }else{
                    this.dx1 -=4;
                    this.dx2 +=2;
                    this.yy+=16;
                    this.rad -= 0.02;
                    this.rad1 += 0.02;
                    this.dy112 -=18;
                    game.ctx.drawImage(game.josn["home-mask"],0,this.dy112);
                    game.ctx.drawImage(game.josn["logo"],10,this.dy112);
                    game.ctx.drawImage(game.josn["ninja"],350,30+this.dy112);
                    game.ctx.drawImage(game.josn["home-desc"],this.dy112,135);
                    game.ctx.drawImage(game.josn["peach"],99,300.5+this.yy)
                    game.ctx.save()
                    game.ctx.translate(271+49+this.dx1,289.5+42.5+this.yy);
                    game.ctx.rotate(this.rad);
                    game.ctx.drawImage(game.josn["sandia-2"],-49,-42.5);
                    game.ctx.restore();
                    game.ctx.save()
                    game.ctx.translate(311+49+this.dx2,289.5+42.5+this.yy+3);
                    game.ctx.rotate(this.rad1);
                    game.ctx.drawImage(game.josn["sandia-1"],-49,-42.5);
                    game.ctx.restore();
                    game.ctx.drawImage(game.josn["boom"],532,346+this.yy);
                    if(this.yy>=300) this.enter(2);
                }    
            break;
            case 2:
                game.audios[0].pause();
                if(game.count == 0){
                    game.ctx.drawImage(game.josn["x"],553,5);
                    game.ctx.drawImage(game.josn["xx"],577,5);
                    game.ctx.drawImage(game.josn["xxx"],606,5);
                }
                if(game.count == 1){
                    game.ctx.drawImage(game.josn["xf"],553,5);
                    game.ctx.drawImage(game.josn["xx"],577,5);
                    game.ctx.drawImage(game.josn["xxx"],606,5);
                }
                if(game.count == 2){
                    game.ctx.drawImage(game.josn["xf"],553,5);
                    game.ctx.drawImage(game.josn["xxf"],577,5);
                    game.ctx.drawImage(game.josn["xxx"],606,5);
                }
                if(game.count == 3){
                    game.ctx.drawImage(game.josn["xf"],553,5);
                    game.ctx.drawImage(game.josn["xxf"],577,5);
                    game.ctx.drawImage(game.josn["xxxf"],606,5);
                }
                game.ctx.drawImage(game.josn["score"],10,10);
                game.ctx.font = "24px Arial";
                game.ctx.fillStyle = "orange";
                game.ctx.fillText(game.score,50,35)
                this.frame++;
                if(this.frame<=10){
                    game.audios[2].play();
                }

                if(this.frame>40 && this.frame%25==0){
                    game.fruit = new Fruit();
                }
                for(var i=0;i<game.arr.length;i++){
                    game.arr[i].update();
                    game.arr[i]&&game.arr[i].render();
                }          
            break;
        }
    }
    Scene.prototype.bindEvent = function(){
        switch(game.changjing){
            case 0:
            break;
            case 1:
            case 2:
            game.bindEvent();
            break;
        }
        
    }
})()