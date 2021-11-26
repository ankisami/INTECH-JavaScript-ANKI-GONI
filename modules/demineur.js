let x = 0;
let y = 0;
let nb_mine = 0;
let continueGame = false;

const terrain = new Array();
const affTerrain = new Array();
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


const init = function () {

    var select = document.getElementById('select');
    var level = select.options[select.selectedIndex].value;

    switch (level) {
        case "easy":
            x = 10;
            y = 10;
            nb_mine = 13;
            break;
        case "medium":
            x = 15;
            y = 15;
            nb_mine = 20;
            break;
        default:
            x = 20;
            y = 20;
            nb_mine = 30;
            break;

    }
    for (var i = 0; i < x; i++) {
        terrain[i] = new Array();
        affTerrain[i] = new Array();
    }


    console.log("x =>", x);
    console.log("y =>", y);
    console.log("nb_mine =>", nb_mine);
    continueGame= true;
    draw();
};


const draw = function () {
    var grid = document.getElementById("game-grid");
    grid.innerHTML = "";

    for (var i = 0; i < x; i++) {
        for (var j = 0; j < y; j++) {
            grid.innerHTML += "\
									<button 	class='field-button' \
												onClick='clickButton(this)' \
												id='" + i + "" + j + "' \
												data-x='" + i + "' \
												data-y='" + j + "' \
												onContextMenu='clicDroitBouton(" + i + ", " + j + ")'>\
										" + VIDE + "\</button>";

            document.getElementById(i + "" + j).style.backgroundColor = COULEUR_VIDE;
        }
        grid.innerHTML += "<br/>";
    }

    createMines();
};

const createMines = function () {
    let next = false;

    for (var i = 0; i < nb_mine; i++) {

        while (!next) {
            var tx = parseInt(Math.random() * (x));
            var ty = parseInt(Math.random() * (y));

            if (terrain[tx][ty] == undefined) {
                terrain[tx][ty] = MINE;

                next = true;
            }
        }

        next = false;
    }

    generateOtherField();
}

const generateOtherField = function () {
    for (var i = 0; i < x; i++) {
        for (var j = 0; j < y; j++) {
            terrain[i][j] = terrain[i][j] == undefined ? discover(i, j) : terrain[i][j];
            affTerrain[i][j] = DEFAUT;
        }
    }
}

const discover = function (cx, cy) {
    let res = 0;
    //check mine around
    res += cx == 0 ? 0 : terrain[cx - 1][cy] == MINE ? 1 : 0;
    res += cx == x - 1 ? 0 : terrain[cx + 1][cy] == MINE ? 1 : 0;
    res += cy == 0 ? 0 : terrain[cx][cy - 1] == MINE ? 1 : 0;
    res += cy == y - 1 ? 0 : terrain[cx][cy + 1] == MINE ? 1 : 0;
    res += cx == 0 || cy == 0 ? 0 : terrain[cx - 1][cy - 1] == MINE ? 1 : 0;
    res += cx == 0 || cy == y - 1 ? 0 : terrain[cx - 1][cy + 1] == MINE ? 1 : 0;
    res += cx == x - 1 || cy == 0 ? 0 : terrain[cx + 1][cy - 1] == MINE ? 1 : 0;
    res += cx == x - 1 || cy == y - 1 ? 0 : terrain[cx + 1][cy + 1] == MINE ? 1 : 0;

    return res;
}

const clickButton = function (item) {
    console.log("continue game =>", continueGame)
    if (continueGame) {
        var ex = item.dataset.x;
        var ey = item.dataset.y;

        checkAfterClick(ex, ey);
    }
    //TODO: coder cette fonction
    //testGameOver();
}

var checkAfterClick = function(cx, cy){
	cx = parseInt(cx);
	cy = parseInt(cy);
	
	// Check if we stay in the Array and if the button isn't display yet
	if( cx >= 0 && cy >= 0 && cx < x && cy < y && affTerrain[cx][cy] == DEFAUT){
		affTerrain[cx][cy] = CLICK_GAUCHE;
		document.getElementById(cx + "" + cy).innerHTML = terrain[cx][cy];
		document.getElementById(cx + "" + cy).style.backgroundColor = COULEUR_CHIFFRE;
		console.log(cx + "" + cy);
		
		if(terrain[cx][cy] == 0){
			// check arround
			checkAfterClick(cx-1, cy);
			checkAfterClick(cx+1, cy);
			checkAfterClick(cx, cy-1);
			checkAfterClick(cx, cy+1);
			checkAfterClick(cx-1, cy-1);
			checkAfterClick(cx-1, cy+1);
			checkAfterClick(cx+1, cy-1);
			checkAfterClick(cx+1, cy+1);
		} 
		else if(terrain[cx][cy] == MINE){
            // if the button is a bomb
			document.getElementById(cx + "" + cy).style.backgroundColor = COULEUR_MINE;
			alert("Game Over");
			continueGame = false;
		}
	}
};

init();
