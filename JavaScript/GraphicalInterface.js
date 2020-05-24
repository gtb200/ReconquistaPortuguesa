"use strict";

class Interface{
    constructor(ctx,canvas) {
        this.ctx=ctx;
        this.canvas=canvas;
    }
    draw(entidade)
    {
        for (let i = 0; i < entidade.length; i++) {
            this.ctx.drawImage(entidade[i].img, entidade[i].x, entidade[i].y, entidade[i].largura, entidade[i].altura);
            if(entidade[i].constructor.name=="Melee"||entidade[i].constructor.name=="MeleeInimigo"){
                this.ctx.fillStyle="#00FF00";
                this.ctx.fillRect(entidade[i].x+111, entidade[i].y+110, ((entidade[i].health)/entidade[i].maxHealth)*60, 10);

            }
            if(entidade[i].constructor.name=="Ranged"||entidade[i].constructor.name=="RangedInimigo"){
                this.ctx.fillStyle="#00FF00";
                this.ctx.fillRect(entidade[i].x+55, entidade[i].y+93, ((entidade[i].health)/entidade[i].maxHealth)*60, 10);

            }
            if(entidade[i].constructor.name=="Castelo"||entidade[i].constructor.name=="CasteloInimigo"){
                this.ctx.fillStyle="#00FF00";
                this.ctx.fillRect(entidade[i].x, entidade[i].y-20, ((entidade[i].health)/entidade[i].maxHealth)*entidade[i].largura, 10);
            }
        }
    }
    clear(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

}


