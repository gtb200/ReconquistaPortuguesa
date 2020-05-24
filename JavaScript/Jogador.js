class Jogador {

    constructor(nome) {
        this.niveisFeitos=[];
        this.upgradesRanged=[0,0,0];
        this.upgradesMelee=[0,0,0];
        this.nome=nome;
        this.dinheiro=0;
    }

    apagarRepetidos(){
        let resultado = [];
        for (let i=0;i<this.niveisFeitos.length;i++) {
            if(!(resultado.includes(this.niveisFeitos[i]))){
                resultado.push(this.niveisFeitos[i]);

            }
        }
        this.niveisFeitos= resultado;
    }
}