window.addEventListener("DOMContentLoaded", function() {

    const nbCoup = "";
    
    const grid = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
    
    function plateau(nbCol, nbRow) {
        let section = document.querySelector('#grid');
        //creation lignes et colonnes
        for(let r = 0; r < nbRow; r++) {
            for(let c = 0; c < nbRow; c++) {
                let div = document.createElement("div");
                let name = "row"+r+"-col"+c;
                div.className = name;
                section.appendChild(div);
            }
        }
    }
    
    function createDecor(nbCol, nbRow, grid) {
        //1 pour mur en pierre
        //2 pour centre
        //3 pour bonhomme de face
        //4 pour la caisse
        //5 pour la zone de livraison
        for(let r = 0; r < nbRow; r++) {
            for(let c = 0; c < nbCol; c++) {
                let name = ".row"+r+"-col"+c;
                let div = document.querySelector(name);
                if(grid[r][c] === 1) {
                    div.classList.add('stone');
                } else {
                    div.classList.add('wood');
                }
            }
        }
        bonhomme(grid);
        caisse(grid);
        winBlock(grid);
    }
    
    
    function bonhomme(grid) {
        //on le place aléatoirement dans la grille
        //il lui faut une ligne et une colonne
        let col = Number(Math.ceil(Math.random() * (8 - 1) + 1));
        let row = Number(Math.ceil(Math.random() * (8 - 1) + 1));
        let name = ".row"+row+"-col"+col;
        let div = document.querySelector(name);
        div.classList.add('face');
        grid[row][col] = 3;
    }
    
    function caisse(grid) {
        //étant donné que l'alien est déjà placé, il ne faudrait pas placer la caisse dessus (ça fait mal)
        //on vérifie donc si la casse est prise
        let verif = 0;
        while(verif !== 1) {
            let col = Math.ceil(Math.random() * (8 - 1) + 1);
            let row = Math.ceil(Math.random() * (8 - 1) + 1);
            if(grid[row][col] === 2) {
                verif = 1;
                let name = ".row"+row+"-col"+col;
                let div = document.querySelector(name);
                div.classList.add('box');
                grid[row][col] = 4;
            }
        }
    }
    
    function winBlock(grid) {
        //étant donné que l'alien est déjà placé, il ne faudrait pas placer la caisse dessus (ça fait mal)
        //pareil pour la caisse sinon aucun interet de jouer si on a gagné dès le début
        //on vérifie donc si la casse est prise
        let verif = 0;
        while(verif !== 1) {
            let col = Math.ceil(Math.random() * (8 - 1) + 1);
            let row = Math.ceil(Math.random() * (8 - 1) + 1);
            if(grid[row][col] === 2) {
                verif = 1;
                let name = ".row"+row+"-col"+col;
                let div = document.querySelector(name);
                div.classList.add('goal');
                grid[row][col] = 5;
            }
        }
    }
    
    function deplacementAlien(action, grid, nbCoup) {
        console.log(nbCoup);
        let testDeplacement = true;
        //on regarde où est l'alien
        let x = 0;
        let y = 0;
        for(let r=0;r<10;r++) {
            for(let c=0;c<10;c++) {
                if(grid[r][c] === 3) {
                    x = r;
                    y = c;
                }
            }
        }
        let oldX = x;
        let oldY = y;
        let val = "row"+x+"-col"+y;
        let div = document.querySelector('.'+val);
        //on enlève son ancien emplacement (les 4 faces dans le doute)
        div.classList.remove("face");
        div.classList.remove("back");
        div.classList.remove("left");
        div.classList.remove("right");
        grid[x][y] = 2;
        switch(action) {
            case 'ArrowUp':
                x -= 1
                if(x < 1) {
                    x = 1;
                }
                testDeplacement = deplacementCaisse(x, y, grid, action);
                if(!testDeplacement) { // erreur retour à l'emplacement précédent
                    val = "row"+oldX+"-col"+oldY;
                    div = document.querySelector('.'+val);
                    div.classList.add("face");
                    grid[oldX][oldY] = 3;
                } else { // c'est ok on met le nouvel emplacement
                    val = "row"+x+"-col"+y;
                    div = document.querySelector('.'+val);
                    div.classList.add("back");
                    grid[x][y] = 3;
                    nbCoup = 5;
                }
                break;
            case 'ArrowDown':
                x += 1
                if(x > 8) {
                    x = 8;
                }     
                testDeplacement = deplacementCaisse(x, y, grid, action);
                if(!testDeplacement) { // erreur retour à l'emplacement précédent
                    val = "row"+oldX+"-col"+oldY;
                    div = document.querySelector('.'+val);
                    div.classList.add("face");
                    grid[oldX][oldY] = 3;
                } else { // c'est ok on met le nouvel emplacement
                    val = "row"+x+"-col"+y;
                    div = document.querySelector('.'+val);
                    div.classList.add("face");
                    grid[x][y] = 3;
                    nbCoup = 5;
                }
                break;
            case 'ArrowLeft':
                y -= 1
                if(y < 1) {
                    y = 1;
                }
                testDeplacement = deplacementCaisse(x, y, grid, action);
                if(!testDeplacement) { // erreur retour à l'emplacement précédent
                    val = "row"+oldX+"-col"+oldY;
                    div = document.querySelector('.'+val);
                    div.classList.add("face");
                    grid[oldX][oldY] = 3;
                } else { // c'est ok on met le nouvel emplacement
                    val = "row"+x+"-col"+y;
                    div = document.querySelector('.'+val);
                    div.classList.add("left");
                    grid[x][y] = 3;
                    nbCoup = 5;
                }
                break;
            case 'ArrowRight':
                y += 1
                if(y > 8) {
                    y = 8;
                }
                testDeplacement = deplacementCaisse(x, y, grid, action);
                if(!testDeplacement) { // erreur retour à l'emplacement précédent
                    val = "row"+oldX+"-col"+oldY;
                    div = document.querySelector('.'+val);
                    div.classList.add("face");
                    grid[oldX][oldY] = 3;
                } else { // c'est ok on met le nouvel emplacement
                    val = "row"+x+"-col"+y;
                    div = document.querySelector('.'+val);
                    div.classList.add("right");
                    grid[x][y] = 3;
                    nbCoup = 5;
                }
                break;
        }
        console.log(nbCoup);
        nbCoup = 6;
        return nbCoup;
    }
    
    function deplacementCaisse(xAlien, yAlien, grid, direction) {
        switch(direction) {
            case 'ArrowUp':
                if(grid[xAlien][yAlien] === 4) { //l'alien arrive sur la caisse donc on déplace la caisse
                    let x = xAlien - 1;
                    if(x < 1) {
                        x = 1;
                        return false;
                    }
                    //on enlève ancienne position
                    let val = "row"+xAlien+"-col"+yAlien;
                    let div = document.querySelector('.'+val);
                    div.classList.remove("box");
                    //on ajoute new position
                    val = "row"+x+"-col"+yAlien;
                    div = document.querySelector('.'+val);
                    div.classList.add("box");
                    victoire(x, yAlien, grid);
                    grid[x][yAlien] = 4;
                    //si on ne peut pas déplacer la caisse on retourne une erreur pour ne pas que l'alien chevauche la caisse
                }
                break;
            case 'ArrowDown': 
                if(grid[xAlien][yAlien] === 4) { //l'alien arrive sur la caisse donc on déplace la caisse
                    let x = xAlien + 1;
                    if(x > 8) {
                        x = 8;
                        return false;
                    }
                    //on enlève ancienne position
                    let val = "row"+xAlien+"-col"+yAlien;
                    let div = document.querySelector('.'+val);
                    div.classList.remove("box");
                    //on ajoute new position
                    val = "row"+x+"-col"+yAlien;
                    div = document.querySelector('.'+val);
                    div.classList.add("box");
                    victoire(x, yAlien, grid);
                    grid[x][yAlien] = 4;
                }
                break;
            case 'ArrowLeft':
                if(grid[xAlien][yAlien] === 4) { //l'alien arrive sur la caisse donc on déplace la caisse
                    let y = yAlien - 1;
                    if(y < 1) {
                        y = 1;
                        return false;
                    }
                    //on enlève ancienne position
                    let val = "row"+xAlien+"-col"+yAlien;
                    let div = document.querySelector('.'+val);
                    div.classList.remove("box");
                    //on ajoute new position
                    val = "row"+xAlien+"-col"+y;
                    div = document.querySelector('.'+val);
                    div.classList.add("box");
                    victoire(xAlien, y, grid);
                    grid[xAlien][y] = 4;
                }
                break;
            case 'ArrowRight':
                if(grid[xAlien][yAlien] === 4) { //l'alien arrive sur la caisse donc on déplace la caisse
                    let y = yAlien + 1;
                    if(y > 8) {
                        y = 8;
                        return false;
                    }
                    //on enlève ancienne position
                    let val = "row"+xAlien+"-col"+yAlien;
                    let div = document.querySelector('.'+val);
                    div.classList.remove("box");
                    //on ajoute new position
                    val = "row"+xAlien+"-col"+y;
                    div = document.querySelector('.'+val);
                    div.classList.add("box");
                    victoire(xAlien, y, grid);
                    grid[xAlien][y] = 4;
                }
                break;
        }
        return true;
    }
    
    function victoire (x, y, grid) {
        if(grid[x][y] === 5) {
            console.log("Victoire");
            alert("Vous avez gagné");   
        }
    }

    //function restart si partie gagnée
    
    
    plateau(10, 10);
    createDecor(10, 10, grid);
    document.addEventListener( 'keydown', (e) => deplacementAlien(e.key, grid, nbCoup));
    
    //quand on gagne ne pas pouvoir continuer la partie
    //compter le nombre de coup pour gagner
});