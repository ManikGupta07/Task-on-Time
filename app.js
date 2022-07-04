const outputdiv = document.querySelector(".outputdiv");
const task = document.querySelector("#task");
const addBtn = document.querySelector("#addBtn");
let notes;



if (localStorage.getItem("notes") == null) {
    notes = [];
}
else {
    let notesLocal = JSON.parse(localStorage.getItem("notes"));
    let completedTodosLocal = JSON.parse(localStorage.getItem("completedTodos"));
    if(completedTodosLocal == null){
        completedTodosLocal = []
    }
  
    notes = notesLocal;

    notes.forEach(note => {
        let div = document.createElement("div");
        div.classList.add("noteDiv");

        let textDiv = document.createElement("div");
        textDiv.classList.add("textDiv");
        textDiv.innerHTML = note;
        div.appendChild(textDiv);

        let btnsDiv = document.createElement("div")
        btnsDiv.classList.add("btnsDiv");

        let completeBtn = document.createElement("button");
        completeBtn.innerHTML = `<i class="fa-solid fa-check"></i>`
        completeBtn.classList.add("completeBtn");

        btnsDiv.appendChild(completeBtn)

        let deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`
        deleteBtn.classList.add("deleteBtn");

        btnsDiv.appendChild(deleteBtn)

        div.appendChild(btnsDiv)

        outputdiv.appendChild(div);

        if (completedTodosLocal.includes(note)) {
            let curTaskElem = completeBtn.parentElement.parentElement;
            curTaskElem.classList.add("completed")
        }

        deleteBtn.addEventListener("click", () => {
            let tasks = JSON.parse(localStorage.getItem("notes"));
            let completedTodos = JSON.parse(localStorage.getItem("completedTodos"));
            let curTaskElem = deleteBtn.parentElement.parentElement;
            let currTask = deleteBtn.parentElement.parentElement.firstChild.textContent;
            let taskIndex = tasks.indexOf(currTask);

            let removedTasks = tasks.splice(taskIndex, 1);
            if (curTaskElem.classList.contains('completed')) {
                completedTodos.splice(completedTodos.indexOf(currTask), 1)
                localStorage.setItem("completedTodos", JSON.stringify(completedTodos))
            }
            curTaskElem.parentNode.removeChild(curTaskElem);
            console.log(tasks);

            localStorage.setItem("notes", JSON.stringify(tasks))

        });
        completeBtn.addEventListener("click", () => {
            let completedTodos;
            if (JSON.parse(localStorage.getItem("completedTodos")) == null) {
                completedTodos = [];
            }
            else {
                completedTodos = JSON.parse(localStorage.getItem("completedTodos"));
            }

            let curTaskElem = completeBtn.parentElement.parentElement;
            curTaskElem.classList.toggle("completed")
            let taskContent = curTaskElem.firstChild.textContent;

            if (!completedTodos.includes(taskContent)) {

                completedTodos.push(taskContent);

                localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
            } else {
                completedTodos.splice(completedTodos.indexOf(taskContent), 1);
                localStorage.setItem('completedTodos', JSON.stringify(completedTodos));

            }
        })
    });
}

addBtn.addEventListener("click", () => {
    if (localStorage.getItem("notes") == null) {
        notes = [];
    }else{
        let notesLocal = JSON.parse(localStorage.getItem("notes"));
        notes = notesLocal
    }

    let note = task.value;
    if (note !== '') {
        notes.push(note);
        console.log(notes);
        task.value = ""
        task.setAttribute("placeholder", "");
        createDiv(note)
    }
    else {
        task.setAttribute("placeholder", "please enter text first")
    }

    localStorage.setItem("notes", JSON.stringify(notes));
})


function createDiv(text) {
    let div = document.createElement("div");
    div.classList.add("noteDiv");

    let textDiv = document.createElement("div");
    textDiv.classList.add("textDiv");
    textDiv.innerHTML = text;

    let btnsDiv = document.createElement("div")
    btnsDiv.classList.add("btnsDiv");

    let completeBtn = document.createElement("button");
    completeBtn.innerHTML = `<i class="fa-solid fa-check"></i>`
    completeBtn.classList.add("completeBtn");


    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`
    deleteBtn.classList.add("deleteBtn");

    div.appendChild(textDiv);
    btnsDiv.appendChild(completeBtn)
    btnsDiv.appendChild(deleteBtn)
    div.appendChild(btnsDiv)
    outputdiv.appendChild(div);

    deleteBtn.addEventListener("click", () => {
        let tasks = JSON.parse(localStorage.getItem("notes"));
        let completedTodos = JSON.parse(localStorage.getItem("completedTodos"));
        let curTaskElem = deleteBtn.parentElement.parentElement;
        let currTask = deleteBtn.parentElement.parentElement.firstChild.textContent;
        let taskIndex = tasks.indexOf(currTask);

        let removedTasks = tasks.splice(taskIndex, 1);
        if (curTaskElem.classList.contains('completed')) {
            completedTodos.splice(completedTodos.indexOf(currTask), 1)
            localStorage.setItem("completedTodos", JSON.stringify(completedTodos))
        }

        curTaskElem.parentNode.removeChild(curTaskElem);
        console.log(tasks);

        localStorage.setItem("notes", JSON.stringify(tasks))

    });


    completeBtn.addEventListener("click", () => {
        let completedTodos;
        if (JSON.parse(localStorage.getItem("completedTodos")) == null) {
            completedTodos = [];
        }
        else {
            completedTodos = JSON.parse(localStorage.getItem("completedTodos"));
        }

        let curTaskElem = completeBtn.parentElement.parentElement;
        curTaskElem.classList.toggle("completed")
        let taskContent = curTaskElem.firstChild.textContent;

        if (!completedTodos.includes(taskContent)) {

            completedTodos.push(taskContent);

            localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
        } else {
            completedTodos.splice(completedTodos.indexOf(taskContent), 1);
            localStorage.setItem('completedTodos', JSON.stringify(completedTodos));

        };
    });

};


task.addEventListener("keypress", (e) => {
    if (e.key === 'Enter') {
        addBtn.click()
    }
})



