// CODE EXPLAINED channel

// Select Element
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// Classes Name 
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_TROUGH = "lineThrough";

// Variables
let LIST, id;

// Get item from localstorage
let data = localStorage.getItem("TODO");

// Check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);

} else {
    LIST = [];
    id = 0;
}

// Load items to user interface 
function loadList(array) {
     array.forEach(function(item){
        addTodo(item.name, item.id, item.done, item.trash);
    });
}

// Clear the localstorage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});


// Show todays date
const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);


// add to do function
function addTodo(toDo, id, done, trash){

    if(trash){ return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_TROUGH : "";

    const item = `
                <li class="item">
                <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                <p class="text ${LINE}">${toDo}</p>
                <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                </li> 
                `;
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);

}

// add an item to the list user the enter key
document.addEventListener("keyup",function(even){
    if(event.keyCode == 13){
        const toDo = input.value;
        
        // if the input isnt empty
    
        if(toDo){
            addTodo(toDo, id, false, false);

            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });

            // Add item from localstorage ( this code must be added where list array update )
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;

        }
        input.value = "";
    }
});

function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_TROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;

}

function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;

}

list.addEventListener("click",function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if(elementJob == "complete"){
        completeToDo(element);
    } else if(elementJob == "delete"){
        removeToDo(element);
    }

    // Add item from localstorage ( this code must be added where list array update )
     localStorage.setItem("TODO", JSON.stringify(LIST));
});

