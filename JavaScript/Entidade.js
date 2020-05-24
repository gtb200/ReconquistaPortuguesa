"use strict";

class Entidade{
    attackRange;enemy;maxHealth;

    constructor(x,y,largura,altura,health,damage,moveSpeed){
        this.largura=largura;
        this.altura=altura;
        this.x=x;
        this.y=y;
        this.health=health;
        this.damage=damage;
        this.moveSpeed=moveSpeed;
        this.maxHealth=health;

        this.img=new Image(largura,altura);
        this.frame=0;
        this.attacking=0;
        this.sourcesWalk=[];
        this.sourcesAttack=[];
        this.sourcesDie=[];
        this.dieing=0;
        this.slowFrames=0;



    }

    update(){
        this.x=this.x+this.moveSpeed;
        this.img.src=this.sourcesWalk[this.frame];
        this.frame++;
        this.attacking=0;
        if(this.frame==10)this.frame=0;
    }
    isInRange(entidadeAComparar){
        if(entidadeAComparar==null)return false;
        if(entidadeAComparar.dieing==1)return false;

        if(this.enemy==0) {
            if(entidadeAComparar.constructor.name=="MeleeInimigo"){
                if (Math.abs(this.x - entidadeAComparar.x-50) < this.attackRange) {
                    return true;
                }
            }else if(entidadeAComparar.constructor.name=="RangedInimigo"){
                if (Math.abs(this.x - entidadeAComparar.x-20) < this.attackRange) {
                    return true;
                }
            }else if(entidadeAComparar.constructor.name=="CasteloInimigo"){
                if (this.constructor.name == "Melee") {
                    if (Math.abs(this.x - entidadeAComparar.x+50) < this.attackRange) {
                        return true;
                    }
                }
            else if (Math.abs(this.x - entidadeAComparar.x) < this.attackRange) {
                return true;
            }
        }
        }else if(this.enemy==1) {
            if (this.constructor.name == "MeleeInimigo") {
                if (entidadeAComparar.constructor.name == "Melee") {
                    if (Math.abs(this.x - entidadeAComparar.x + 50) < this.attackRange) {
                        return true;
                    }
                } else if (entidadeAComparar.constructor.name == "Ranged") {
                    if (Math.abs(this.x - entidadeAComparar.x + 120) < this.attackRange) {
                        return true;
                    }
                } else if (entidadeAComparar.constructor.name == "Castelo") {
                    if (Math.abs(this.x - entidadeAComparar.x + 50) < this.attackRange) {
                        return true;
                    }
                }
            } else if (this.constructor.name == "RangedInimigo") {
                if (entidadeAComparar.constructor.name == "Melee") {
                    if (Math.abs(this.x - entidadeAComparar.x) - 30 < this.attackRange) {
                        return true;
                    }
                } else if (entidadeAComparar.constructor.name == "Ranged") {
                    if (Math.abs(this.x - entidadeAComparar.x + 25) < this.attackRange) {
                        return true;
                    }

                } else if (entidadeAComparar.constructor.name == "Castelo") {
                    if (Math.abs(this.x - entidadeAComparar.x) - 30 < this.attackRange) {
                        return true;
                    }
                } else {
                    return false;
                }
            }
        }}
    attack(entidade){
        if(this.attacking==0){
            this.attacking=1;
            this.frame=0;
        }

        this.img.src=this.sourcesAttack[this.frame];
        this.frame++;
        if(this.frame==10){
            this.frame=0;
            entidade.health=entidade.health-this.damage;
            if(entidade.health<0)entidade.health=0;
            if(entidade.health<=0)entidade.die();
        }

    }
    die(){
        if(this.dieing==0){
            this.frame=0;
            this.dieing=1;
        }
        if(this.slowFrames==2) {
            this.img.src = this.sourcesDie[this.frame];
            this.frame++;
            this.slowFrames=0;
        }
        this.slowFrames++;
        if(this.frame==10){
            return true;
        }
        else{return false;}
    }
}


class Melee extends Entidade{
    constructor(x,y,enemy,upgrades) {

        super(-50, 820-270, 270, 150, 200+(upgrades[0]*40), 7+(upgrades[1]*3), 2+(upgrades[2]*0.5));

        this.sourcesWalk=["../Resources/Knight/Knight_02__WALK_000.png","../Resources/Knight/Knight_02__WALK_001.png","../Resources/Knight/Knight_02__WALK_002.png",
            "../Resources/Knight/Knight_02__WALK_003.png","../Resources/Knight/Knight_02__WALK_004.png","../Resources/Knight/Knight_02__WALK_005.png",
            "../Resources/Knight/Knight_02__WALK_006.png","../Resources/Knight/Knight_02__WALK_007.png","../Resources/Knight/Knight_02__WALK_008.png",
            "../Resources/Knight/Knight_02__WALK_009.png"]
        this.sourcesAttack=["../Resources/Knight/Knight_02__ATTACK_000.png","../Resources/Knight/Knight_02__ATTACK_001.png","../Resources/Knight/Knight_02__ATTACK_002.png",
            "../Resources/Knight/Knight_02__ATTACK_003.png","../Resources/Knight/Knight_02__ATTACK_004.png","../Resources/Knight/Knight_02__ATTACK_005.png",
            "../Resources/Knight/Knight_02__ATTACK_006.png","../Resources/Knight/Knight_02__ATTACK_007.png","../Resources/Knight/Knight_02__ATTACK_008.png",
            "../Resources/Knight/Knight_02__ATTACK_009.png"]
        this.sourcesDie=["../Resources/Knight/Knight_02__DIE_000.png","../Resources/Knight/Knight_02__DIE_001.png","../Resources/Knight/Knight_02__DIE_002.png",
            "../Resources/Knight/Knight_02__DIE_003.png","../Resources/Knight/Knight_02__DIE_004.png","../Resources/Knight/Knight_02__DIE_005.png",
            "../Resources/Knight/Knight_02__DIE_006.png","../Resources/Knight/Knight_02__DIE_007.png","../Resources/Knight/Knight_02__DIE_008.png",
            "../Resources/Knight/Knight_02__DIE_009.png"]
        this.attackRange=this.largura/2;

        this.enemy=0;
    }

}
class MeleeInimigo extends Entidade{
    constructor(x,y,enemy,modifier) {

        super(screen.width-50 , 820-270, 270, 150, 200*(1+(modifier*0.1)), 7*(1+(modifier*0.1)), -2);
        this.sourcesWalk=["../Resources/KnightReverse/Knight_02__WALK_000.png","../Resources/KnightReverse/Knight_02__WALK_001.png","../Resources/KnightReverse/Knight_02__WALK_002.png",
            "../Resources/KnightReverse/Knight_02__WALK_003.png","../Resources/KnightReverse/Knight_02__WALK_004.png","../Resources/KnightReverse/Knight_02__WALK_005.png",
            "../Resources/KnightReverse/Knight_02__WALK_006.png","../Resources/KnightReverse/Knight_02__WALK_007.png","../Resources/KnightReverse/Knight_02__WALK_008.png",
            "../Resources/KnightReverse/Knight_02__WALK_009.png"];

        this.sourcesAttack=["../Resources/KnightReverse/Knight_02__ATTACK_000.png","../Resources/KnightReverse/Knight_02__ATTACK_001.png","../Resources/KnightReverse/Knight_02__ATTACK_002.png",
            "../Resources/KnightReverse/Knight_02__ATTACK_003.png","../Resources/KnightReverse/Knight_02__ATTACK_004.png","../Resources/KnightReverse/Knight_02__ATTACK_005.png",
            "../Resources/KnightReverse/Knight_02__ATTACK_006.png","../Resources/KnightReverse/Knight_02__ATTACK_007.png","../Resources/KnightReverse/Knight_02__ATTACK_008.png",
            "../Resources/KnightReverse/Knight_02__ATTACK_009.png"];
        this.sourcesDie=["../Resources/KnightReverse/Knight_02__DIE_000.png","../Resources/KnightReverse/Knight_02__DIE_001.png","../Resources/KnightReverse/Knight_02__DIE_002.png",
            "../Resources/KnightReverse/Knight_02__DIE_003.png","../Resources/KnightReverse/Knight_02__DIE_004.png","../Resources/KnightReverse/Knight_02__DIE_005.png",
            "../Resources/KnightReverse/Knight_02__DIE_006.png","../Resources/KnightReverse/Knight_02__DIE_007.png","../Resources/KnightReverse/Knight_02__DIE_008.png",
            "../Resources/KnightReverse/Knight_02__DIE_009.png"];
        this.attackRange=this.largura/2;

        this.enemy=1;
    }

}
class Ranged extends Entidade{
    constructor(x,y,enemy,upgrades) {
        super(10, 820-253, 170, 90, 40+(upgrades[0]*20), 4+(upgrades[1]*2), 2+(upgrades[2]*0.5));
        this.sourcesWalk=["../Resources/Archer/Warrior_03__WALK_000.png","../Resources/Archer/Warrior_03__WALK_001.png","../Resources/Archer/Warrior_03__WALK_002.png",
            "../Resources/Archer/Warrior_03__WALK_003.png","../Resources/Archer/Warrior_03__WALK_004.png","../Resources/Archer/Warrior_03__WALK_005.png",
            "../Resources/Archer/Warrior_03__WALK_006.png","../Resources/Archer/Warrior_03__WALK_007.png","../Resources/Archer/Warrior_03__WALK_008.png",
            "../Resources/Archer/Warrior_03__WALK_009.png"];

        this.sourcesAttack=["../Resources/Archer/Warrior_03__ATTACK_000.png","../Resources/Archer/Warrior_03__ATTACK_001.png","../Resources/Archer/Warrior_03__ATTACK_002.png",
            "../Resources/Archer/Warrior_03__ATTACK_003.png","../Resources/Archer/Warrior_03__ATTACK_004.png","../Resources/Archer/Warrior_03__ATTACK_005.png",
            "../Resources/Archer/Warrior_03__ATTACK_006.png","../Resources/Archer/Warrior_03__ATTACK_007.png","../Resources/Archer/Warrior_03__ATTACK_008.png",
            "../Resources/Archer/Warrior_03__ATTACK_009.png"];
        this.sourcesDie=["../Resources/Archer/Warrior_03__DIE_000.png","../Resources/Archer/Warrior_03__DIE_001.png","../Resources/Archer/Warrior_03__DIE_002.png",
            "../Resources/Archer/Warrior_03__DIE_003.png","../Resources/Archer/Warrior_03__DIE_004.png","../Resources/Archer/Warrior_03__DIE_005.png",
            "../Resources/Archer/Warrior_03__DIE_006.png","../Resources/Archer/Warrior_03__DIE_007.png","../Resources/Archer/Warrior_03__DIE_008.png",
            "../Resources/Archer/Warrior_03__DIE_009.png"];
        this.attackRange=500;
        this.enemy=0;

    }
}
class RangedInimigo extends Entidade{
    constructor(x,y,modifier) {
        super( screen.width-50, 820-253, 170, 90, 40*(1+(modifier*0.1)), 4*(1+(modifier*0.1)), -2);
        this.sourcesWalk=["../Resources/ArcherReversed/Warrior_03__WALK_000.png","../Resources/ArcherReversed/Warrior_03__WALK_001.png","../Resources/ArcherReversed/Warrior_03__WALK_002.png",
            "../Resources/ArcherReversed/Warrior_03__WALK_003.png","../Resources/ArcherReversed/Warrior_03__WALK_004.png","../Resources/ArcherReversed/Warrior_03__WALK_005.png",
            "../Resources/ArcherReversed/Warrior_03__WALK_006.png","../Resources/ArcherReversed/Warrior_03__WALK_007.png","../Resources/ArcherReversed/Warrior_03__WALK_008.png",
            "../Resources/ArcherReversed/Warrior_03__WALK_009.png"];

        this.sourcesAttack=["../Resources/ArcherReversed/Warrior_03__ATTACK_000.png","../Resources/ArcherReversed/Warrior_03__ATTACK_001.png","../Resources/ArcherReversed/Warrior_03__ATTACK_002.png",
            "../Resources/ArcherReversed/Warrior_03__ATTACK_003.png","../Resources/ArcherReversed/Warrior_03__ATTACK_004.png","../Resources/ArcherReversed/Warrior_03__ATTACK_005.png",
            "../Resources/ArcherReversed/Warrior_03__ATTACK_006.png","../Resources/ArcherReversed/Warrior_03__ATTACK_007.png","../Resources/ArcherReversed/Warrior_03__ATTACK_008.png",
            "../Resources/ArcherReversed/Warrior_03__ATTACK_009.png"];
        this.sourcesDie=["../Resources/ArcherReversed/Warrior_03__DIE_000.png","../Resources/ArcherReversed/Warrior_03__DIE_001.png","../Resources/ArcherReversed/Warrior_03__DIE_002.png",
            "../Resources/ArcherReversed/Warrior_03__DIE_003.png","../Resources/ArcherReversed/Warrior_03__DIE_004.png","../Resources/ArcherReversed/Warrior_03__DIE_005.png",
            "../Resources/ArcherReversed/Warrior_03__DIE_006.png","../Resources/ArcherReversed/Warrior_03__DIE_007.png","../Resources/ArcherReversed/Warrior_03__DIE_008.png",
            "../Resources/ArcherReversed/Warrior_03__DIE_009.png"];
        this.attackRange=500;
        this.enemy=1;

    }
}
class Castelo extends Entidade{
    constructor(x,y,modifier) {
        super(20,800-253,170,150,500,0,0);
        this.sources=["../Resources/Castles/CastleReverse/Asset 21.png","../Resources/Castles/CastleReverse/Asset 22.png","../Resources/Castles/CastleReverse/Asset 23.png"];
        this.attackRange=0;
        this.img.src=this.sources[0];
        this.runOnce=0;

    }

    update() {
        return;
    }
    attack(entidade) {
        return;
    }

    die(){
        if(this.runOnce==0) {
            this.img.src = this.sources[2];

            //win();
            let buttons = document.getElementsByTagName("button");
            for (let i = 0; i < buttons.length; i++) buttons[i].disabled = true;


            document.getElementById("vitoria").style.visibility = "visible";
            document.getElementById("textoVitoria").textContent = "Derrota";
            document.getElementById("voltar").disabled = false;
            document.getElementById("voltar").addEventListener("click", function () {
                window.parent.postMessage("menuBatalhar.html", "*");

            });
            this.runOnce++;
        }
        if(this.frame==10){
            return true;
        }
        else{return false;}
    }
    isInRange(entidadeAComparar) {
        return false;
    }
}
class CasteloInimigo extends Entidade{
    constructor(x,y,modifier) {
        super(screen.width-200,800-253,170,150,500*(1+(modifier*0.1)),0,0);
        this.sources=["../Resources/Castles/png/3/Asset 21.png","../Resources/Castles/png/3/Asset 22.png","../Resources/Castles/png/3/Asset 23.png"];
        this.attackRange=0;
        this.img.src=this.sources[0];
        this.modifier=modifier;
        this.runOnce=0;
    }
    update() {
        return;
    }
    attack(entidade) {
        return;
    }

    die(){
        if(this.runOnce==0) {
            this.img.src = this.sources[2];

            //win();
            let buttons = document.getElementsByTagName("button");
            for (let i = 0; i < buttons.length; i++) buttons[i].disabled = true;


            document.getElementById("vitoria").style.visibility = "visible";
            document.getElementById("textoVitoria").textContent = "Vitória!";
            let level = this.modifier.toString();
            document.getElementById("voltar").disabled = false;
            document.getElementById("voltar").addEventListener("click", function () {
                window.parent.postMessage("feito " + level, "*");

            });
            this.runOnce++;
        }
        if(this.frame==10){
            return true;
        }
        else{return false;}
    }

    isInRange(entidadeAComparar) {
        return false;
    }
}


