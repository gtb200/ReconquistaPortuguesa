(function()
{
    window.addEventListener("message",messageHandler);
    window.addEventListener("load", main);
}());

var currentLevel=0;
const backgroundSources = ["1chaves.jpg","2viseu.jpg","3porto.jpg","4aveiro.jpg","5coimbra.jpg","6guarda.jpg","7santarem.jpg","8leiria.jpg","9evora.jpg","10elvas.jpg","11beja.jpg","12odemira.jpg","13faro.jpg"];
var upgradesRanged=[];
var upgradesMelee=[];
function messageHandler(ev) {
    let data=ev.data.split(" ");

    upgradesRanged=[data[1],data[2],data[3]];
    upgradesMelee=[data[4],data[5],data[6]];
    currentLevel=parseInt(data[0]);

    document.getElementById("imagemFundo").src="../Resources/Backgrounds/"+backgroundSources[currentLevel-1];
}


function main() {
        var runOnce=0;


        var canvas = document.getElementsByTagName("canvas")[0];
        var ctx = canvas.getContext("2d");
        var canvasHeight = canvas.height;
        var canvasWidth = canvas.width;
        var dinheiroTxt=document.getElementById("dinheiro");
        document.getElementsByTagName("button")[0].addEventListener("click", addEntity);
        document.getElementsByTagName("button")[1].addEventListener("click", addEntity);
        document.getElementsByTagName("button")[2].addEventListener("click", addEntity);
        document.getElementsByTagName("button")[3].addEventListener("click", addEntity);
        document.getElementsByTagName("button")[4].addEventListener("click", addEntity);

        ctx.imageSmoothingEnabled = false;
        canvas.height = 720;
        canvas.width = screen.width;
        canvas.addEventListener("initend", initEndHandler());

        var gameEngine = new GameEngine(canvasWidth, canvasHeight);
        var interface = new Interface(ctx, canvas);
        var skipFrame = 0;
        gameEngine.initSources(ctx);

        function animate() {


            requestAnimationFrame(animate);
            if(currentLevel!=0) {
                if(runOnce==0){
                    gameEngine.entidades.push(new Castelo(this.canvasW,this.canvasH-30,currentLevel));
                    gameEngine.entidadesInimigas.push(new CasteloInimigo(this.canvasW,this.canvasH-30,currentLevel));
                    runOnce++;
                }
                if (skipFrame == 0) {

                    gameEngine.update();
                    gameEngine.enemySpawn(currentLevel);

                }
                if (skipFrame == 1) {
                    interface.clear();
                    interface.draw(gameEngine.entidades);
                    interface.draw(gameEngine.entidadesInimigas);
                    skipFrame = -1;
                }
                skipFrame++;
            }

        }

        function initEndHandler(ev) {
            animate();
        }

        function addEntity(ev) {
            if (ev.currentTarget.id === "melee") {
                if(gameEngine.money>=150) {
                    gameEngine.addEntity("melee", 0, upgradesMelee);
                    gameEngine.money-=150;
                    dinheiroTxt.textContent=gameEngine.money+"g";
                }
            }
            else if (ev.currentTarget.id === "meleeInimigo")
                gameEngine.addEntity("melee", 1,currentLevel);
            else if (ev.currentTarget.id === "archer") {
                if (gameEngine.money >= 100) {
                    gameEngine.addEntity("archer", 0, upgradesRanged);
                    gameEngine.money -= 100;
                    dinheiroTxt.textContent = gameEngine.money + "g";


                }
            }
            else if (ev.currentTarget.id === "archerInimigo")
                gameEngine.addEntity("archer", 1,currentLevel);
            else if (ev.currentTarget.id === "all") {
                gameEngine.addEntity("archer", 1,currentLevel);
                gameEngine.addEntity("archer", 0,currentLevel);
                gameEngine.addEntity("melee", 1,currentLevel);
                gameEngine.addEntity("melee", 0,currentLevel);
            }


        }

}


