const container = document.querySelector(".container");
const playground = document.createElement("div");
playground.classList.add("playground");
container.appendChild(playground);
const gridSize = document.querySelector("#gridSize");
const gridSizeDisplay = document.querySelector(".gridSizeDisplay");
gridSize.addEventListener("click", (e) => {
    createGrid(gridSize.value);
})
createGrid(16);
let color = "brown";

const layoutBtns = document.querySelectorAll(".layout-btn");
layoutBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        if(e.target.id === "default-g") {
            createGrid(gridSize.value, "default-g")
        } else if (e.target.id == "circle-g") {
            createGrid(gridSize.value, "circle-g")
        } else if (e.target.id == "triangle-g") {
            createGrid(gridSize.value, "triangle-g")
        }
    } )
})























function colorSelection() {
    
}


function colorChange(gridDivs) {
    let mouseEv = false;
    gridDivs.forEach((grid)=> {
        grid.addEventListener("mousedown", (e) => {
        e.target.style.backgroundColor = color;
        mouseEv = true;
    });
    grid.addEventListener("mouseover", (e) => {
        if (mouseEv == true) {
            e.target.style.backgroundColor = color;
        }
    });
    grid.addEventListener("mouseup", (e) => {
        mouseEv = false;
    })
    })
    

}

function createGrid(size, shape) {
    const gridDivs = document.querySelectorAll(".grid-div");
    gridDivs.forEach((div) => {
        div.remove();
    })
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const gridDiv = document.createElement("div");
            gridDiv.classList.add("grid-div");
            playground.appendChild(gridDiv);
            if(shape == "default-g") {
                gridDiv.classList.remove("triangle-g")
                gridDiv.classList.remove("circle-g")
            } else if (shape == "circle-g") {
                gridDiv.classList.remove("triangle-g")
                gridDiv.classList.remove("default-g")
                gridDiv.classList.add("circle-g")
            } else if (shape == "triangle-g") {
                gridDiv.classList.remove("circle-g")
                gridDiv.classList.remove("default-g")
                gridDiv.classList.add("triangle-g")
                gridDiv.style.borderLeft = 600/(gridSize.value*2) + "px solid white";
                gridDiv.style.borderRight = 600/(gridSize.value*2) + "px solid white";
                gridDiv.style.borderTop = 600/gridSize.value + "px solid transparent" ;
            }
        }
    }
    const gridDivs1 = document.querySelectorAll(".grid-div");
    colorChange(gridDivs1);
    SizeDisplay(size);
    playground.style.gridTemplateColumns = "repeat(" + size + ", 1fr)";
    playground.style.gridTemplateRows = "repeat(" + size + ", 1fr)";
}

function SizeDisplay(size) {
    const gridSizeDisplay = document.querySelector(".gridSizeDisplay");
    gridSizeDisplay.innerHTML = size + " X " + size; 
}