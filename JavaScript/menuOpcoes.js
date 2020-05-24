(function()
{
    window.addEventListener("load", main);
}());


var totVolume=0,totMusica=0;

function main() {
    document.getElementById("voltar").addEventListener("click",voltar);
    document.getElementById("+Som").addEventListener("click",changeSettings);
    document.getElementById("-Som").addEventListener("click",changeSettings);
    document.getElementById("+Musica").addEventListener("click",changeSettings);
    document.getElementById("-Musica").addEventListener("click",changeSettings);

}
function voltar(ev) {
    window.parent.postMessage("menuPrincipal.html","*");

}

function changeSettings(ev){
    var sources=["barras","barra1","barra2","barra3"];
    console.log(ev.currentTarget.id);
    switch (ev.currentTarget.id) {
        case "-Som":
            if(totVolume==0){
                return;
            }else {
                totVolume--;
                console.log(totVolume);
                document.getElementById("volume").src="../Resources/"+sources[totVolume]+".png";

            }break;
        case "+Som":
            if(totVolume==3){
                return;
            }else {
                totVolume++;
                document.getElementById("volume").src="../Resources/"+sources[totVolume]+".png";
            }break;
        case "-Musica":
            if(totMusica==0){
                return;
            }else {
                totMusica--;
                document.getElementById("musica").src="../Resources/"+sources[totMusica]+".png";
            }break;
        case "+Musica":
            if(totMusica==3){
                return;
            }else{
                totMusica++;
                document.getElementById("musica").src="../Resources/"+sources[totMusica]+".png";
            }break;
    }
}

