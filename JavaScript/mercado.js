"use strict";


(function()
{
    window.addEventListener("load", main);
}());
var upgradesRanged=[0,0,0];
var upgradesMelee=[0,0,0];
var dinheiro;
function main() {
    window.addEventListener("message", setDinheiro);
    document.getElementById("voltar").addEventListener("click", voltar);
    var botoes = document.getElementsByTagName("button");


    function setDinheiro(ev) {
        let data = ev.data.split(" ");
        dinheiro = data[0];
        upgradesRanged = [data[1], data[2], data[3]];
        upgradesMelee = [data[4], data[5], data[6]];
        document.getElementById("dinheiro").textContent = dinheiro + " gold";

        for (let i = 0; i < 6; i++) botoes[i].addEventListener("click", compra);

        botoes[0].textContent = "lvl " + upgradesRanged[0].toString() + " Health - " + (upgradesRanged[0] * 20 + 30).toString() + "g" + " -> " + (upgradesRanged[0] * 20 + 40).toString();
        botoes[1].textContent = "lvl " + upgradesRanged[1].toString() + " Damage - " + (upgradesRanged[1] * 20 + 30).toString() + "g" + " -> " + (upgradesRanged[1] * 2 + 4).toString();
        botoes[2].textContent = "lvl " + upgradesRanged[2].toString() + " MoveSpeed - " + (upgradesRanged[2] * 20 + 30).toString() + "g" + " -> " + (upgradesRanged[2] * 0.5 + 2).toString();
        botoes[3].textContent = "lvl " + upgradesMelee[0].toString() + " Health - " + (upgradesMelee[0] * 20 + 30).toString() + "g" + " -> " + (upgradesMelee[0] * 40 + 200).toString();
        botoes[4].textContent = "lvl " + upgradesMelee[1].toString() + " Damage - " + (upgradesMelee[1] * 20 + 30).toString() + "g" + " -> " + (upgradesMelee[1] * 3 + 7).toString();
        botoes[5].textContent = "lvl " + upgradesMelee[2].toString() + " MoveSpeed - " + (upgradesMelee[2] * 20 + 30).toString() + "g" + " -> " + (upgradesMelee[2] * 0.5 + 2).toString();
        window.removeEventListener("message",setDinheiro);
    }

    function compra(ev) {
        console.log(ev.currentTarget.id);
        switch (parseInt(ev.currentTarget.id)) {
            case 1:
                if (dinheiro >= upgradesRanged[0] * 20 + 30) {
                    dinheiro -= upgradesRanged[0] * 20 + 30;
                    upgradesRanged[0]++;
                    botoes[0].textContent = "lvl " + upgradesRanged[0].toString() + " Health - " + (upgradesRanged[0] * 20 + 30).toString() + "g" + " -> " + (upgradesRanged[0] * 20 + 40).toString();
                    window.parent.postMessage("compra 0 0","*");
                }
                break;
            case 2:
                if (dinheiro >= upgradesRanged[1] * 20 + 30) {
                    dinheiro -= upgradesRanged[1] * 20 + 30;
                    upgradesRanged[1]++;
                    botoes[1].textContent = "lvl " + upgradesRanged[1].toString() + " Damage - " + (upgradesRanged[1] * 20 + 30).toString() + "g" + " -> " + (upgradesRanged[1] * 2 + 4).toString();
                    window.parent.postMessage("compra 0 1","*");
                }
                break;
            case 3:
                if (dinheiro >= upgradesRanged[2] * 20 + 30) {
                    dinheiro -= upgradesRanged[2] * 20 + 30;
                    upgradesRanged[2]++;
                    botoes[2].textContent = "lvl " + upgradesRanged[2].toString() + " MoveSpeed - " + (upgradesRanged[2] * 20 + 30).toString() + "g" + " -> " + (upgradesRanged[2] * 0.5 + 2).toString();
                    window.parent.postMessage("compra 0 2","*");

                }
                break;
            case 4:
                if (dinheiro >= upgradesMelee[0] * 20 + 30) {
                    dinheiro -= upgradesMelee[0] * 20 + 30;
                    upgradesMelee[0]++;
                    botoes[3].textContent = "lvl " + upgradesMelee[0].toString() + " Health - " + (upgradesMelee[0] * 20 + 30).toString() + "g" + " -> " + (upgradesMelee[0] * 40 + 200).toString();
                    window.parent.postMessage("compra 1 0","*");

                }
                break;
            case 5:
                if (dinheiro >= upgradesMelee[1] * 20 + 30) {
                    dinheiro -= upgradesMelee[1] * 20 + 30;
                    upgradesMelee[1]++;
                    botoes[4].textContent = "lvl " + upgradesMelee[1].toString() + " Damage - " + (upgradesMelee[1] * 20 + 30).toString() + "g" + " -> " + (upgradesMelee[1] * 3 + 7).toString();
                    window.parent.postMessage("compra 1 1","*");

                }
                break;
            case 6:
                if (dinheiro >= upgradesMelee[2] * 20 + 30) {
                    dinheiro -= upgradesMelee[2] * 20 + 30;
                    upgradesMelee[2]++;
                    botoes[5].textContent = "lvl " + upgradesMelee[2].toString() + " MoveSpeed - " + (upgradesMelee[2] * 20 + 30).toString() + "g" + " -> " + (upgradesMelee[2] * 0.5 + 2).toString();
                    window.parent.postMessage("compra 1 2","*");
                }
                break;
        }
        document.getElementById("dinheiro").textContent = dinheiro + " gold";
    }
}
function voltar(ev) {
    window.parent.postMessage("menuPrincipal.html","*");

}
