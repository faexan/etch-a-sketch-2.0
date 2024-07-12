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

const layoutBtns = document.querySelectorAll(".layout-btn");
layoutBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        if (e.target.id === "default-g") {
            createGrid(gridSize.value, "default-g")
        } else if (e.target.id == "circle-g") {
            createGrid(gridSize.value, "circle-g")
        } else if (e.target.id == "triangle-g") {
            createGrid(gridSize.value, "triangle-g")
        }
    })
})


function colorChange(gridDivs, size) {
    let addId = []; 
    let colorRecord = [];
    let mouseEv = false;
    let colorHold = "black";
    const blackBtn = document.querySelector(".blackColorBtn");
    const randomBtn = document.querySelector(".randomColorBtn");
    const erasor = document.querySelector(".erasorBtn");
    const reset = document.querySelector(".resetBtn");
    const customColorBtn = document.querySelector(".customColorBtn");
    blackBtn.addEventListener("click", () => {
        colorHold = "black";
    })
    randomBtn.addEventListener("click", () => {
        colorHold = "random";
    })
    erasor.addEventListener("click", () => {
        colorHold = "erasor";
    })
    customColorBtn.addEventListener("click", ()=> {
        colorHold = "custom";
    })
    reset.addEventListener("click", ()=> {
        createGrid(size);
        addId = [];
    })
    gridDivs.forEach((grid) => {
        grid.addEventListener("mousedown", (e) => {
            mouseEv = true;
            if (colorHold == "black") {
                e.target.style.backgroundColor = "black";
                addId.push(e.target.id);
                colorRecord.push("black")
            } else if (colorHold == "random") {
                let rC = randomColor();
                e.target.style.backgroundColor = rC;
                addId.push(e.target.id);
                colorRecord.push(rC);
            } else if (colorHold == "erasor") {
                e.target.style.backgroundColor = "white";
            } else if (colorHold == "custom") {
                e.target.style.backgroundColor = customColorBtn.value;
                addId.push((e.target.id));
            }
        });
        grid.addEventListener("mouseover", (e) => {
            if (mouseEv == true) {
                if (colorHold == "black") {
                    e.target.style.backgroundColor = "black";
                    addId.push(e.target.id);
                } else if (colorHold == "random") {
                    e.target.style.backgroundColor = randomColor();
                    addId.push(e.target.id);
                } else if (colorHold == "erasor") {
                    e.target.style.backgroundColor = "white";
                } else if (colorHold == "custom") {
                    e.target.style.backgroundColor = customColorBtn.value;
                    addId.push(e.target.id);
                }
            }
        });
        grid.addEventListener("mouseup", (e) => {
            mouseEv = false;
        })
    })
    undoRedo(addId);
   
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
            gridDiv.id = "0" + i + "0" + j; 
            playground.appendChild(gridDiv);
            if (shape == "default-g") {
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
                gridDiv.style.borderLeft = 600 / (gridSize.value * 2) + "px solid white";
                gridDiv.style.borderRight = 600 / (gridSize.value * 2) + "px solid white";
                gridDiv.style.borderTop = 600 / gridSize.value + "px solid transparent";
            }
        }
    }
    const gridDivs1 = document.querySelectorAll(".grid-div");
    colorChange(gridDivs1, size);
    SizeDisplay(size);
    playground.style.gridTemplateColumns = "repeat(" + size + ", 1fr)";
    playground.style.gridTemplateRows = "repeat(" + size + ", 1fr)";
}

function SizeDisplay(size) {
    const gridSizeDisplay = document.querySelector(".gridSizeDisplay");
    gridSizeDisplay.innerHTML = size + " X " + size;
}

function randomColor() {
    return "rgb(" + (Math.floor(Math.random()*255)) + "," + (Math.floor(Math.random()*255)) + "," + (Math.floor(Math.random()*255)) + ")"; 
}

function undoRedo(record) {
    let undoId;
    const undo = document.querySelector(".undo");
    undo.addEventListener("click", ()=> {
        undoId = record.pop();
        const div = document.getElementById(undoId);
        if(div != null) {div.style.backgroundColor = "white";}
    })
}