window.addEventListener("DOMContentLoaded", function() {
    
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
            for(let c = 0; c < nbRow; c++) {
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
        //étant donné que marcel est déjà placé, il ne faudrait pas placer la caisse dessus (ça fait mal)
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
        //étant donné que marcel est déjà placé, il ne faudrait pas placer la caisse dessus (ça fait mal)
        //pareil pour la caisse sinon aucun interet de joueur si on a gagné dès le début
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
    
    function deplacementMarcel(action, element, grid) {
        //on regarde où est marcel
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
        let val = "row"+x+"-col"+y;
        let div = document.querySelector('.'+val);
        //on enlève son ancien emplacement
        div.classList.remove("face");
        grid[x][y] = 2;
        switch(action) {
            case 'ArrowUp':
                x -= 1
                if(x < 1) {
                    x = 1;
                }
                val = "row"+x+"-col"+y;
                div = document.querySelector('.'+val);
                //nouvel emplcament
                div.classList.add("face");
                deplacementCaisse(x, y, grid, action);
                grid[x][y] = 3;
                break;
            case 'ArrowDown':
                x += 1
                if(x > 8) {
                    x = 8;
                }
                val = "row"+x+"-col"+y;
                div = document.querySelector('.'+val);
                //nouvel emplcament
                div.classList.add("face");
                deplacementCaisse(x, y, grid, action);
                grid[x][y] = 3;
                break;
            case 'ArrowLeft':
                y -= 1
                if(y < 1) {
                    y = 1;
                }
                val = "row"+x+"-col"+y;
                div = document.querySelector('.'+val);
                //nouvel emplcament
                div.classList.add("face");
                deplacementCaisse(x, y, grid, action);
                grid[x][y] = 3;
                break;
            case 'ArrowRight':
                y += 1
                if(y > 8) {
                    y = 8;
                }
                val = "row"+x+"-col"+y;
                div = document.querySelector('.'+val);
                //nouvel emplcament
                div.classList.add("face");
                deplacementCaisse(x, y, grid, action);
                grid[x][y] = 3;
                break;
        }
    }
    
    function deplacementCaisse(xMarcel, yMarcel, grid, direction) {
        switch(direction) {
            case 'ArrowUp':
                if(grid[xMarcel][yMarcel] === 4) { //marcel arrive sur la caisse donc on déplace la caisse
                    let x = xMarcel - 1;
                    if(x < 1) {
                        x = 1;
                    }
                    //on enlève ancienne position
                    let val = "row"+xMarcel+"-col"+yMarcel;
                    let div = document.querySelector('.'+val);
                    div.classList.remove("box");
                    //on ajoute new position
                    val = "row"+x+"-col"+yMarcel;
                    div = document.querySelector('.'+val);
                    div.classList.add("box");
                    victoire(x, yMarcel, grid);
                    grid[x][yMarcel] = 4;
                }
                break;
            case 'ArrowDown': 
                if(grid[xMarcel][yMarcel] === 4) { //marcel arrive sur la caisse donc on déplace la caisse
                    let x = xMarcel + 1;
                    if(x > 8) {
                        x = 8;
                    }
                    //on enlève ancienne position
                    let val = "row"+xMarcel+"-col"+yMarcel;
                    let div = document.querySelector('.'+val);
                    div.classList.remove("box");
                    //on ajoute new position
                    val = "row"+x+"-col"+yMarcel;
                    div = document.querySelector('.'+val);
                    div.classList.add("box");
                    victoire(x, yMarcel, grid);
                    grid[x][yMarcel] = 4;
                }
                break;
            case 'ArrowLeft':
                if(grid[xMarcel][yMarcel] === 4) { //marcel arrive sur la caisse donc on déplace la caisse
                    let y = yMarcel - 1;
                    if(y < 1) {
                        y = 1;
                    }
                    //on enlève ancienne position
                    let val = "row"+xMarcel+"-col"+yMarcel;
                    let div = document.querySelector('.'+val);
                    div.classList.remove("box");
                    //on ajoute new position
                    val = "row"+xMarcel+"-col"+y;
                    div = document.querySelector('.'+val);
                    div.classList.add("box");
                    victoire(xMarcel, y, grid);
                    grid[xMarcel][y] = 4;
                }
                break;
            case 'ArrowRight':
                if(grid[xMarcel][yMarcel] === 4) { //marcel arrive sur la caisse donc on déplace la caisse
                    let y = yMarcel + 1;
                    if(y > 8) {
                        y = 8;
                    }
                    //on enlève ancienne position
                    let val = "row"+xMarcel+"-col"+yMarcel;
                    let div = document.querySelector('.'+val);
                    div.classList.remove("box");
                    //on ajoute new position
                    val = "row"+xMarcel+"-col"+y;
                    div = document.querySelector('.'+val);
                    div.classList.add("box");
                    victoire(xMarcel, y, grid);
                    grid[xMarcel][y] = 4;
                }
                break;
        }
    }
    
    function victoire (x, y, grid) {
        console.log("ici-"+grid[x][y]+"-"+x+"-"+y);
        if(grid[x][y] === 5) {
            console.log("victoire");
            alert("Vous avez gagné");   
        }
    }
    
    
    plateau(10, 10);
    createDecor(10, 10, grid);
    marcel.dom = document.querySelector('.face');
    console.log(grid);
    document.addEventListener('keydown', (e) => deplacementMarcel(e.key, marcel, grid));
});