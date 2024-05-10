// Variáveis para armazenar as listas de tarefas
var todoList = []; // Lista principal de todas as tarefas
var comdoList = []; // Lista de tarefas completadas
var remList = []; // Lista de tarefas pendentes
var addButton = document.getElementById("add-button"); // Botão para adicionar tarefas
var todoInput = document.getElementById("todo-input"); // Campo de entrada para adicionar tarefas
var deleteAllButton = document.getElementById("delete-all"); // Botão para deletar todas as tarefas
var allTodos = document.getElementById("all-todos"); // Lista de todas as tarefas exibidas na interface
var deleteSButton = document.getElementById("delete-selected"); // Botão para deletar tarefas selecionadas

// Event Listeners para adicionar, deletar e filtrar tarefas
addButton.addEventListener("click", add); // Evento de clique para adicionar tarefa
deleteAllButton.addEventListener("click", deleteAll); // Evento de clique para deletar todas as tarefas
deleteSButton.addEventListener("click", deleteS); // Evento de clique para deletar tarefas selecionadas

// Event Listeners para filtros de tarefas
document.addEventListener('click', (e) => {
    // Completar uma tarefa quando clicado
    if (e.target.className.split(' ')[0] == 'complete' || e.target.className.split(' ')[0] == 'ci') {
        completeTodo(e);
    }
    // Deletar uma tarefa quando clicado
    if (e.target.className.split(' ')[0] == 'delete' || e.target.className.split(' ')[0] == 'di') {
        deleteTodo(e);
    }
    // Mostrar todas as tarefas
    if (e.target.id == "all") {
        viewAll();
    }
    // Mostrar tarefas pendentes
    if (e.target.id == "rem") {
        viewRemaining();
    }
    // Mostrar tarefas completadas
    if (e.target.id == "com") {
        viewCompleted();
    }
});

// Event Listener para adicionar tarefa ao pressionar Enter
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        add();
    }
});

// Função para atualizar as listas de tarefas
function update() {
    // Atualiza as listas de tarefas completadas e pendentes
    comdoList = todoList.filter((ele) => ele.complete);
    remList = todoList.filter((ele) => !ele.complete);
    // Atualiza os contadores na interface do usuário
    document.getElementById("r-count").innerText = todoList.length.toString(); // Contador de todas as tarefas
    document.getElementById("c-count").innerText = comdoList.length.toString(); // Contador de tarefas completadas
}

// Função para adicionar uma nova tarefa à lista principal
function add() {
    var value = todoInput.value;
    if (value === '') {
        alert("😮 A tarefa não pode estar vazia");
        return;
    }
    // Adiciona a nova tarefa à lista principal
    todoList.push({
        task: value,
        id: Date.now().toString(),
        complete: false,
    });
    todoInput.value = ""; // Limpa o campo de entrada
    update(); // Atualiza as listas e a interface do usuário
    addinmain(todoList); // Renderiza a lista de tarefas na interface do usuário
}

// Função para renderizar a lista principal de tarefas na interface do usuário
function addinmain(todoList) {
    allTodos.innerHTML = ""; // Limpa a lista de tarefas
    // Renderiza cada tarefa na lista principal
    todoList.forEach(element => {
        var x = `<li id=${element.id} class="todo-item">
                    <p id="task">${element.complete ? `<strike>${element.task}</strike>` : element.task}</p>
                    <div class="todo-actions">
                        <button class="complete btn btn-success">
                            <i class="ci bx bx-check bx-sm"></i>
                        </button>
                        <button class="delete btn btn-error">
                            <i class="di bx bx-trash bx-sm"></i>
                        </button>
                    </div>
                </li>`;
        allTodos.innerHTML += x;
    });
}

// Função para deletar uma tarefa da lista principal
function deleteTodo(e) {
    var deleted = e.target.parentElement.parentElement.getAttribute('id');
    // Filtra a lista principal removendo a tarefa selecionada
    todoList = todoList.filter((ele) => ele.id != deleted);
    update(); // Atualiza as listas e a interface do usuário
    addinmain(todoList); // Renderiza a lista de tarefas na interface do usuário
}

// Função para marcar uma tarefa como completa ou incompleta
function completeTodo(e) {
    var completed = e.target.parentElement.parentElement.getAttribute('id');
    // Percorre a lista principal para encontrar a tarefa selecionada e altera seu estado de completude
    todoList.forEach((obj) => {
        if (obj.id == completed) {
            if (obj.complete == false) {
                obj.complete = true;
                e.target.parentElement.parentElement.querySelector("#task").classList.add("line");
            } else {
                obj.complete = false;
                e.target.parentElement.parentElement.querySelector("#task").classList.remove("line");
            }
        }
    });
    update(); // Atualiza as listas e a interface do usuário
    addinmain(todoList); // Renderiza a lista de tarefas na interface do usuário
}

// Função para deletar todas as tarefas
function deleteAll() {
    todoList = []; // Limpa a lista principal de tarefas
    update(); // Atualiza as listas e a interface do usuário
    addinmain(todoList); // Renderiza a lista de tarefas na interface do usuário
}

// Função para deletar apenas as tarefas completadas
function deleteS() {
    // Filtra a lista principal removendo as tarefas completadas
    todoList = todoList.filter((ele) => !ele.complete);
    update(); // Atualiza as listas e a interface do usuário
    addinmain(todoList); // Renderiza a lista de tarefas na interface do usuário
}

// Funções para exibir filtros de tarefas
function viewCompleted() {
    addinmain(comdoList); // Renderiza a lista de tarefas completadas na interface do usuário
}

function viewRemaining() {
    addinmain(remList); // Renderiza a lista de tarefas pendentes na interface do usuário
}

function viewAll() {
    addinmain(todoList); // Renderiza a lista principal de tarefas na interface do usuário
}
