
"use strict";

class GameEngine{
    constructor(x,y) {
        this.entidades=[];
        this.entidadesInimigas=[];
        this.canvasH=y;
        this.canvasW=x;
        this.money=200;
        this.frame=0;
    }
    update(){
        for (let i = 0; i < this.entidades.length; i++) {
            let closest=this.findClosestEnemy(this.entidades[i]);
            if(this.entidades[i].dieing==0) {
                if (this.entidades[i].isInRange(closest) == true) {
                    this.entidades[i].attack(closest);
                } else {
                    this.entidades[i].update();
                }
            }else{
                if(this.entidades[i].die()==true){
                    this.entidades.splice(i,1);
                }
            }
            }
        for (let i = 0; i < this.entidadesInimigas.length; i++) {
            let closest=this.findClosest(this.entidadesInimigas[i]);
            if(this.entidadesInimigas[i].dieing==0) {
                if (this.entidadesInimigas[i].isInRange(closest) == true) {
                    this.entidadesInimigas[i].attack(closest);
                } else {
                    this.entidadesInimigas[i].update();
                }
            }
            else{
                if(this.entidadesInimigas[i].die()==true){
                    this.entidadesInimigas.splice(i,1);
                }
            }

        }
        if(this.frame==60){
            this.money+=80;
            document.getElementById("dinheiro").textContent=this.money.toString()+"g";
            this.frame=0;
        }

        this.frame++;
    }
    addEntity(type,enemy,modifier){
        console.log(modifier);
        if(enemy==0){
            if(type==="melee") this.entidades.push(new Melee(this.canvasW,this.canvasH-30,0,modifier));
            else if(type==="archer")this.entidades.push(new Ranged(this.canvasW,this.canvasH-30,0,modifier))
        }
        if(enemy==1){
            if(type==="melee")this.entidadesInimigas.push(new MeleeInimigo(this.canvasW,this.canvasH-30,1,modifier));
            else if(type==="archer")this.entidadesInimigas.push(new RangedInimigo(this.canvasW,this.canvasH-30,modifier))

        }

    }
    enemySpawn(modifier){
        let chance=Math.floor(Math.random()*750);
        if(chance<5){
            chance=Math.floor(Math.random()*101);
            console.log(chance);
            if(chance<51){
                this.addEntity("melee",1,modifier);
            }else{
                this.addEntity("archer",1,modifier);
            }

        }
    }

    findClosestEnemy(entidade){
        let closest=null;
        let distancia=5000;
        for (let i = 0; i < this.entidadesInimigas.length; i++) {
            let aux = Math.abs(entidade.x-this.entidadesInimigas[i].x);
            if(aux<distancia&&this.entidadesInimigas[i].dieing!=1){
                closest=this.entidadesInimigas[i];
                distancia=aux;
            }
        }
        return closest;
    }
    findClosest(entidade){
        let closest=null;
        let distancia=5000;
        for (let i = 0; i < this.entidades.length; i++) {
            let aux = Math.abs(entidade.x-this.entidades[i].x);
            if(aux<distancia&&this.entidades[i].dieing!=1){
                closest=this.entidades[i];
                distancia=aux;
            }
        }
        return closest;
    }
    initSources(ctx){
        var nLoaded=0;
        var nTot=120;
        var toLoad= new Image();

        var aux2=new Ranged(-1000,-1000,0,[0,0,0]);
        var aux3=new RangedInimigo(-1000,-1000,0,0);
        var aux4=new MeleeInimigo(-1000,-1000,0,0);
        var aux1=new Melee(-1000,-1000,0,[0,0,0]);


        var auxSources=[];
        var auxSprites=[aux1,aux2,aux3,aux4];
        for (let i = 0; i < auxSprites.length; i++) {
            for (let j = 0; j < 10; j++) {
                auxSources.push(auxSprites[i].sourcesAttack[j]);
                auxSources.push(auxSprites[i].sourcesWalk[j]);
                auxSources.push(auxSprites[i].sourcesDie[j]);
            }
        }
        toLoad.addEventListener("load",imgLoadedHangler);
        toLoad.src=auxSources[nLoaded];

        function imgLoadedHangler(ev) {
            nLoaded++;

            if(nLoaded==nTot){
                var ev1=new Event("initend");
                ctx.canvas.dispatchEvent(ev1);
                return;
            }
            toLoad.src=auxSources[nLoaded];
        }

    }


}

