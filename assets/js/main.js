window.addEventListener("DOMContentLoaded", function() {
    
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
    
    function createDecor(nbCol, nbRow) {
        //1 pour mur en pierre
        //2 pour centre
        //3 pour bonhomme de face
        //4 pour la caisse
        //5 pour la zone de livraison
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
        for(let r = 0; r < nbRow; r++) {
            for(let c = 0; c < nbRow; c++) {
                let name = ".row"+r+"-col"+c;
                let div = document.querySelector(name);
                console.log(name);
                if(grid[r][c] === 1) {
                    div.classList.add('stone');
                } else {
                    div.classList.add('wood');
                }
            }
        }
        marcel(grid);
    }
    
    
    function marcel(grille) {
        //on le place aléatoirement dans la grille
        //il lui faut une ligne et une colonne
        let col = Math.ceil(Math.random() * (8 - 1) + 1);
        let row = Math.ceil(Math.random() * (8 - 1) + 1);
        let name = ".row"+row+"-col"+col;
        let div = document.querySelector(name);
        div.classList.add('face');
        grille[row][col].push(3);
        return grille;
    }
    
    function caisse(grille) {
        //étant donné que marcel est déjà placé, il ne faudrait pas placer la caisse dessus (ça fait mal)
        //on vérifie donc si la casse est prise
        let col = Math.ceil(Math.random() * (8 - 1) + 1);
        let row = Math.ceil(Math.random() * (8 - 1) + 1);
        let name = ".row"+row+"-col"+col;
        let div = document.querySelector(name);
        div.classList.add('box');
        grille[row][col].push(3);
        return grille;
    }
    
    function winBlock(grille) {
        
    }
    
    plateau(10, 10);
    createDecor(10, 10);
});
