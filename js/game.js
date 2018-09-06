(function(){
    var Game = window.Game = function(){
        this.dom = document.querySelector("canvas");
        this.ctx = this.dom.getContext("2d");
        this.audios = document.querySelectorAll("audio");
        this.timer = null;
        this.arrKnife = [];
        this.loadimg();
    }
    Game.prototype.loadimg = function(){
        this.josn = {
            "apple":"images/apple.png",
            "banana":"images/banana.png",
            "basaha":"images/basaha.png",
            "peach":"images/peach.png",
            "sandia":"images/sandia.png",
            "boom":"images/boom.png",
            "flash":"images/flash.png",
            "home-mask":"images/home-mask.png",
            "logo":"images/logo.png",
            "ninja":"images/ninja.png",
            "home-desc":"images/home-desc.png",
            "dojo":"images/dojo.png",
            "new-game":"images/new-game.png",
            "quit":"images/quit.png",
            "peach":"images/peach.png",
            "sandia":"images/sandia.png",
            "boom":"images/boom.png",
            "new":"images/new.png",
            "score":"images/score.png",
            "x":"images/x.png",
            "xx":"images/xx.png",
            "xxx":"images/xxx.png",
            "xf":"images/xf.png",
            "xxf":"images/xxf.png",
            "xxxf":"images/xxxf.png",
            "apple-1":"images/apple-1.png",
            "apple-2":"images/apple-2.png",
            "banana-1":"images/banana-1.png",
            "banana-2":"images/banana-2.png",
            "basaha-1":"images/basaha-1.png",
            "basaha-2":"images/basaha-2.png",
            "peach-1":"images/peach-1.png",
            "peach-2":"images/peach-2.png",
            "sandia-1":"images/sandia-1.png",
            "sandia-2":"images/sandia-2.png",
            "game-over":"images/game-over.png",
            "bao1":"images/bao1.png",
            "bao2":"images/bao2.png",
            "bao3":"images/bao3.png",
            "background":"images/background.jpg",
        }
        var amount = Object.keys(this.josn).length;
        var count = 0;
        for( k in this.josn){
            var src = this.josn[k];
            this.josn[k] = new Image();
            this.josn[k].src = src;
            var self = this;
            this.josn[k].onload = function(){
                count++;
                if(count == amount){
                    self.start();
                }
            }
        }
    }
    Game.prototype.clear = function(){
        this.ctx.clearRect(0,0,640,480);
    }
    Game.prototype.start = function(){
        var self = this;
        this.scene = new Scene();
        this.score = 0;
        this.count = 0;
        this.scene.enter(0);
        game.timer = setInterval(function(){
            self.clear();
            self.scene.renderAndupdate();
            for(var i=0;i<game.arrKnife.length;i++){
                game.arrKnife&&game.arrKnife[i].update();
                game.arrKnife[i]&&game.arrKnife[i].render();
            }
        },40)
    }
    Game.prototype.bindEvent = function(){
        var self = this;
        this.dom.onmousedown = function(event){
            var x = event.offsetX;
            var y = event.offsetY;
            self.dom.onmousemove = function(event){
                var x1 = event.offsetX;
                var y1 = event.offsetY;
                console.log(x,y,x1,y1)
                game.x1 = x;
                game.y1 = y;
                game.x2 = x1;
                game.y2 = y1;  
                game.angle = Math.atan((y1-y)/(x1-x));
                console.log(game.angle)
                game.knife = new Knife();
                x = x1;
                y = y1;
            }
        }
        document.onmouseup = function(){
            game.dom.onmousemove = null;
            game.x1 = 0;
            game.y1 = 0;
            game.x2 = 0;
            game.y2 = 0;
        }
    }
})()