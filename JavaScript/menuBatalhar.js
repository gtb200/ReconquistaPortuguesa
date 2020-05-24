"use strict";


(function()
{
    window.addEventListener("load", main);
}());

function main(){
    var sitios=    ["Chaves","Viseu","Porto","Aveiro","Coimbra","Guarda","Santarém","Leiria","Évora","Elvas","Beja","Odemira","Faro"];
    window.addEventListener("message",levels);

    document.getElementById("voltar").addEventListener("click",voltar);
    document.getElementById("botaoDef").addEventListener("click",definicoes);
    document.getElementById("botaoAjuda").addEventListener("click",ajuda);

    var botaoJogar = document.getElementById("jogar").addEventListener("click", comecar);

    var bolinhas = document.getElementsByClassName("bolas");

    for (let i = 0; i < bolinhas.length; i++) {
        bolinhas[i].addEventListener("click",showLevel,false);

    }
    var selecionado;

    function showLevel(ev) {
        if( !(ev.currentTarget.src.indexOf("/Resources/bolaFechado.png") >-1))
        {
            let zonaNivel = document.getElementById("level");
            zonaNivel.style.visibility = "visible";
            let texto = document.getElementById("informacao");
            let texto2 = document.getElementById("informacao2")
            let recompensa=document.getElementById("recompensa");
            texto.textContent = "Nivel " + ev.currentTarget.id + ":     "+ sitios[ev.currentTarget.id-1] ;
            texto2.textContent = "Damage/Health modifier:" + (Math.round(0.1 * ev.currentTarget.id * 10) / 10).toString();
            recompensa.textContent="Recompensa: "+(45+25*ev.currentTarget.id).toString();
            let button = document.getElementById("jogar");



            if (ev.currentTarget.src == "Resources/bolaAberto.png" || ev.currentTarget.src == "Resources/bolaFeito.png") {
                button.style.visibility = "visible";
            } else {
                button.style.visibility = "visible";
            }
            selecionado = parseInt(ev.currentTarget.id);
        }
    }

    function comecar(ev) {
        window.parent.postMessage(selecionado,"*");
    }

    function levels(ev) {
        if (ev.data.length > 0) {
            let maior = 0;
            for (let i = 0; i < ev.data.length; i++) {
                if (ev.data[i] > maior) maior = ev.data[i];
            }
            for (let i = 0; i < ev.data.length; i++) {
                document.getElementById(ev.data[i].toString()).src = "../Resources/bolaFeito.png";
            }
            if(maior!=13)document.getElementById((maior+1).toString()).src = "../Resources/bolaAberto.png";
        }
    }
}

function voltar(ev) {
    window.parent.postMessage("menuPrincipal.html","*");

}
function definicoes(ev) {
    window.parent.postMessage("menuOpcoes.html","*");
}
function ajuda(ev) {
    window.parent.postMessage("ajuda.html","*");

}