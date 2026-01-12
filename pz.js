//Variables
var rows = 5;
var columns = 5;
var currTile;
var otherTile;
var turns = 0;

// ===== Mobile support =====
const isTouch = window.matchMedia("(pointer: coarse)").matches;
let selectedPiece = null;


window.onload = function() {
    //initialize the board 
    for (let r = 0; r < rows; r++){
        for (let c = 0; c < columns; c++){

            let tile = this.document.createElement("img");
            tile.src = "CAT/blank.png"
            tile.addEventListener("dragstart", dragStart); //click on an image to drag
            tile.addEventListener("dragover", dragOver); // you can drag over the image
            tile.addEventListener("dragenter", dragEnter); // you can drag over the image to another image
            tile.addEventListener("dragleave", dragLeave);// you can drag over the image away from another image  
            tile.addEventListener("drop", dragDrop);// you can drop the image onto another image 
            tile.addEventListener("dragend", dragEnd); // completing the drag and drop 
            if (isTouch) enableMobileTap(tile, "board");
            document.getElementById("board").append(tile);

           

    }


        }
    }
    //pieces 
    let pieces = [];
    for (let  i= 1; i <= rows* columns; i++){
        pieces.push(i.toString()); // put puzzle pieces "1-25 into the array"
    }
    pieces.reverse();//shuffles the pieces 
    for(let i = 0; i < pieces.length; i++){
        let j = Math.floor(Math.random() * pieces.length);
        //swaps the pieces 
        let tmp = pieces[i];
        pieces[i] = pieces[j];
        pieces[j] = tmp;
    }

    for(let i = 0; i < pieces.length; i++){
        let tile = this.document.createElement("img"); 
        tile.src = "./FOX/" + pieces[i] + ".png"; //displayes the pieces 

        //drag and drop functionality 
        tile.addEventListener("dragstart", dragStart); //click on an image to drag
        tile.addEventListener("dragover", dragOver); // you can drag over the image
        tile.addEventListener("dragenter", dragEnter); // you can drag over the image to another image
        tile.addEventListener("dragleave", dragLeave);// you can drag over the image away from another image  
        tile.addEventListener("drop", dragDrop);// you can drop the image onto another image 
        tile.addEventListener("dragend", dragEnd); // completing the drag and drop 
        document.getElementById("pieces").append(tile);
    }

//Drag and Drop Tile Functions 
function dragStart(){
    currTile = this;// this is the image being clicked and dragged 
}
function dragOver(e){
   e.preventDefault();
}
function dragEnter(e){
   e.preventDefault();
}
function dragLeave(){

}
function dragDrop(){
    otherTile = this; // this is the image that is being dropped on
}
function dragEnd(){
    if(currTile.src.includes("FOX/blank.png")){
       return; 
    }
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;
    turns += 1;
    document.getElementById("turns").innerText = turns;
}

function enableMobileTap(tile, type) {
    tile.addEventListener("click", function () {

        // Selecting a piece from the tray
        if (type === "piece") {
            selectedPiece = tile;

            // highlight selected piece
            document.querySelectorAll("#pieces img").forEach(img => {
                img.style.outline = "";
            });
            tile.style.outline = "3px solid purple";
        }

        // Placing piece on the board
        if (type === "board") {
            if (!selectedPiece) return;
            if (selectedPiece.src.includes("FOX/blank.png")) return;

            // swap images
            let temp = tile.src;
            tile.src = selectedPiece.src;
            selectedPiece.src = temp;

            turns++;
            document.getElementById("turns").innerText = turns;

            selectedPiece.style.outline = "";
            selectedPiece = null;
        }
    });
}
