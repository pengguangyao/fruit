(function(){
    var Knife = window.Knife = function(){
        this.x1 = game.x1;
        this.y1 = game.y1;
        this.x2 = game.x2;
        this.y2 = game.y2;
        this.width = 14;
        game.arrKnife.push(this);
    }
    Knife.prototype.render = function(){
        game.ctx.beginPath();
        game.ctx.moveTo(this.x1,this.y1);
        game.ctx.lineTo(this.x2,this.y2);
        // game.ctx.closePath();
        game.ctx.lineWidth = this.width;
        game.ctx.strokeStyle = "#eee";
        game.ctx.stroke();
    }
    Knife.prototype.update = function(){
        this.width -= 2;
        if(this.width<=1) this.goDie();
    }
    Knife.prototype.goDie = function(){
        game.arrKnife.splice(game.arrKnife.indexOf(this),1)
    }
})()