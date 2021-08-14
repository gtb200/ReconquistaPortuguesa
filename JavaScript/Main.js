"use strict";

(function()
{
    window.addEventListener("load", main);
}());

function main(){
    var aux=JSON.parse(localStorage.getItem("contas"));
    var contas=[];
    if(aux==null){
        contas=[];

    }else {
        for (let i=0;i<aux.length;i++){
            contas.push(new Jogador(aux[i].nome));
            contas[i].dinheiro=aux[i].dinheiro;
            contas[i].upgradesRanged=aux[i].upgradesRanged;
            contas[i].upgradesMelee=aux[i].upgradesMelee;
            contas[i].niveisFeitos=aux[i].niveisFeitos;
        }
    }
    var selecionado;

    var musica=0;
    var som=0;

    var frame=document.getElementsByTagName("iframe")[0];
    window.addEventListener("message",handleMessage);


    async function handleMessage(ev) {
            window.removeEventListener("message",handleMessage);

            let frame = document.getElementsByTagName("iframe")[0];
            let contentFrame = document.getElementById("frame1").contentWindow;
            let mensagem = ev.data + "";
            let comparador = mensagem.split(" ");
            if (comparador[0] == parseInt(ev.data, 10)) {
                let mensagem = comparador[0] + " ";
                for (let i = 0; i < 3; i++) mensagem += selecionado.upgradesRanged[i] + " ";
                for (let i = 0; i < 3; i++) mensagem += selecionado.upgradesMelee[i] + " ";
                frame.src = "Game.html";
                await sleep(100);
                contentFrame.postMessage(mensagem, "*");
            } else if (comparador[0] == "feito") {

                if (!(comparador[1] in selecionado.niveisFeitos))
                    selecionado.niveisFeitos.push(parseInt(comparador[1]));
                frame.src = "menuBatalhar.html";
                console.log(selecionado.constructor.name);
                selecionado.apagarRepetidos();
                await sleep(100);
                selecionado.dinheiro += (45 + 25 * (parseInt(comparador[1])));
                contentFrame.postMessage(selecionado.niveisFeitos, "*");
            } else if (comparador[0] == "menuBatalhar.html") {
                if(selecionado==null){promptSelecione()}else {
                    frame.src = "menuBatalhar.html";
                    await sleep(100);
                    contentFrame.postMessage(selecionado.niveisFeitos, "*");
                }
            } else if (comparador[0] == "mercado.html") {
                if(selecionado==null){promptSelecione()}else {
                    frame.src = "mercado.html";
                    let mensagem = selecionado.dinheiro.toString() + " ";
                    for (let i = 0; i < 3; i++) mensagem += selecionado.upgradesRanged[i] + " ";
                    for (let i = 0; i < 3; i++) mensagem += selecionado.upgradesMelee[i] + " ";

                    await sleep(100);
                    contentFrame.postMessage(mensagem, "*");
                }
            }else if (comparador[0] =="compra"){
                if(comparador[1]==0){
                    selecionado.dinheiro-=20*selecionado.upgradesRanged[comparador[2]]+30;
                    selecionado.upgradesRanged[comparador[2]]++;
                }else {
                    selecionado.dinheiro-=20*selecionado.upgradesMelee[comparador[2]]+30;
                    selecionado.upgradesMelee[comparador[2]]++;
                }


            }
            else if (comparador[0] == "selecionador.html") {
                frame.src = "selecionador.html";
                await sleep(100);
                contentFrame.postMessage([contas,selecionado], "*");

            }
            else if (comparador[0]=="novaConta"){
                contas.push(new Jogador(comparador[1]));
            }
            else if(comparador[0]=="selecionar"){
                if(comparador[1]==null)selecionado=null;
                else selecionado=contas[comparador[1]];
            }
            else if(comparador[0]=="apagar"){
                contas.splice(parseInt(comparador[1]-1),1);
            }
            else if(comparador[0]=="sair"){
                localStorage.setItem("contas",JSON.stringify(contas));
                alert("Guardado!");
            }

            else {
                frame.src = ev.data;
            }
        window.addEventListener("message",handleMessage);

        }
}

function loaded(ev) {

    document.getElementsByTagName("iframe")[0].src+="";
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function promptSelecione() {
    alert("Porfavor selecione uma conta");
}
