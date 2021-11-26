var x = 0;
var y = 0;
var nb_mine = 0;

var terrain = new Array();
var affTerrain = new Array();
var continuerJeu = false;
const DEFAUT = "N";
const CLICK_GAUCHE = "G";
const CLICK_DROIT = "D";
const MINE = "&loz;";
const VIDE = "&nbsp;";
const DRAPEAU = "&times;";
const COULEUR_MINE = "#ff7f7f";
const COULEUR_VIDE = "#bcc4c4";
const COULEUR_DRAPEAU = "#87c4c2";
const COULEUR_CHIFFRE = "#beffc0";


var init = function () {

    var select = document.getElementById('select');
    var level = select.options[select.selectedIndex].value;

    switch (level) {
        case "easy":
            x = 10;
            y = 10;
            nb_mine = 3;
            break;
        case "medium":
            x = 15;
            y = 15;
            nb_mine = 8;
            break;
        default:
            x = 20;
            y = 20;
            nb_mine = 19;
            break;

    }
    for (var i = 0; i < x; i++) {
        terrain[i] = new Array();
        affTerrain[i] = new Array();
    }


    console.log("x =>", x);
    console.log("y =>", y);
    console.log("nb_mine =>", nb_mine);
    draw();
};


var draw = function () {
    var grid = document.getElementById("game-grid");
    grid.innerHTML = "";

    for (var i = 0; i < x; i++) {
        for (var j = 0; j < y; j++) {
            grid.innerHTML += "\
									<button 	class='field-button' \
												onClick='clicBouton(this)' \
												id='" + i + "" + j + "' \
												data-x='" + i + "' \
												data-y='" + j + "' \
												onContextMenu='clicDroitBouton(" + i + ", " + j + ")'>\
										" + VIDE + "\</button>";

            document.getElementById(i + "" + j).style.backgroundColor = COULEUR_VIDE;
        }
        grid.innerHTML += "<br/>";
    }

};


init();
