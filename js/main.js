//=================== FUNCTION HELPER ===========================
function dom(selector) {
  return document.querySelector(selector);
}
const managerTask = new ManagerTask();

// hiển thị việc cần làm
function displayToDo() {
  let output = managerTask.filtertask().reduce((result, task) => {
    return (
      result +
      `
            <ul>
                <li> 
                    <span>${task.name}</span>
                    <button onclick="deleteTask('${task.name}')" class="buttons btnTrash"><i class="fa-regular fa-trash-can remove"></i></button>
                    <button onclick="finishTask('${task.name}')" class="buttons btnCheck"><i class="fa-regular fa-circle-check complete"></i></button>
                </li>
             </ul>
            `
    );
  }, "");
  dom("#todo").innerHTML = output;
}

// hiển thị task đã hoàn thành
function displayCompleted() {
  let output = managerTask.filterComplete().reduce((result, task) => {
    return (
      result +
      `
            <ul>
                <li> 
                    <span>${task.name}</span> 
                    <button onclick="deleteTask('${task.name}')" class="buttons btnTrash"><i class="fa-regular fa-trash-can remove"></i></button>
                    <button class="buttons btnCheck "><i class="fa-regular fa-circle-check changeColor fas"></i></button>
                </li>
             </ul>
            `
    );
  }, "");
  dom("#completed").innerHTML = output;
}

//=================== BUTTON DISPLAY ===========================
// thêm việc cần làm
dom("#addItem").addEventListener("click", () => {
  const taskName = dom("#newTask").value;
  if (taskName == "") {
    return;
  }
  const task = new Task(taskName, "Tiến Độ");
  managerTask.addTask(task);
  displayToDo(managerTask.tasks);
  displayCompleted(managerTask.completed);
  dom("#newTask").value = "";
  setLocalStorage();
});

// check việc đã làm
window.finishTask = (taskName) => {
  managerTask.checkTaskComplete(taskName);
  managerTask.completed.forEach((e) => {
    if (e.name === taskName) {
      e.desc = "Hoàn Tất";
    }
  });
  displayToDo(managerTask.tasks);
  displayCompleted(managerTask.completed);
  setLocalStorage();
};
// xoá
function deleteTask(taskName) {
  managerTask.delete(taskName);
  displayToDo(managerTask.tasks);
  displayCompleted(managerTask.completed);
  setLocalStorage();
}

// sắp xếp
// a->z
dom("#two").addEventListener("click", () => {
  managerTask.sortAz();
  displayToDo();
  displayCompleted();
});
// z->a
dom("#three").addEventListener("click", () => {
  managerTask.sortZa();
  displayToDo();
  displayCompleted();
});
// ------ init: lưu local strange -----
function init() {
  const tasksJSON = JSON.parse(localStorage.getItem("tasks")) || [];
  const tasks = tasksJSON.map((todo) => new Task(todo.name, todo.desc));
  const completedJSON = JSON.parse(localStorage.getItem("completed")) || [];
  const completed = completedJSON.map((todo) => new Task(todo.name, todo.desc));
  managerTask.tasks = tasks;
  managerTask.completed = completed;
  displayToDo(managerTask.tasks);
  displayCompleted(managerTask.completed);
}

function setLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(managerTask.tasks));
  localStorage.setItem("completed", JSON.stringify(managerTask.completed));
}

init();
