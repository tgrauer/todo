var taskInput = document.getElementById('new-task'); // new-task
var addButton = document.getElementsByTagName('button')[0]; //first button
var incompleteTasksHolder = document.getElementById('incomplete-tasks'); // incomplete-tasks
var completedTasksHolder = document.getElementById('completed-tasks'); // completed-tasks

var createNewTaskElement = function(taskString){
  var listItem = document.createElement('li');
  
  var checkBox = document.createElement('input');
  var label = document.createElement('label');
  var editInput = document.createElement('input');
  var editButton = document.createElement('button');
  var deleteButton = document.createElement('button');
  
  checkBox.type = "checkbox";
  editInput.type ="text";
  
  editButton.innerText = 'Edit';
  editButton.className = 'edit';
  deleteButton.innerText = 'Delete';
  deleteButton.className = 'delete';
  
  label.innerText = taskString;
  
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  
  return listItem;
}

var addTask = function(){

  if(taskInput.value == ''){
    alert('Enter a new task');
  }else{
    var listItem = createNewTaskElement(taskInput.value);
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = '';
  }
}

var editTask = function(){ 
  var listItem = this.parentNode;
  var editInput = listItem.querySelector('input[type=text]');
  var label = listItem.querySelector('label');
  var editButton = listItem.querySelector('button');
  var containsClass = listItem.classList.contains('editMode');
  if(containsClass){
    label.innerText=editInput.value;
    editButton.innerText = 'Edit';
  }else{
    editInput.value=label.innerText;
    editButton.innerText = 'Save';
  }
  
  listItem.classList.toggle('editMode');
}

var deleteTask = function(){
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
}

var taskCompleted = function(){
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete = function(){
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler){
  var checkBox= taskListItem.querySelector('input[type=checkbox]');
  var editButton = taskListItem.querySelector('button.edit');
  var deleteButton= taskListItem.querySelector('button.delete');
  
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

var ajaxRequest = function (){
  console.log('ajax request');
}

//addButton.onclick = addTask;
addButton.addEventListener('click',addTask);
addButton.addEventListener('click',ajaxRequest);

for(var i=0;i<incompleteTasksHolder.children.length;i++){
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

for(var i=0;i<completedTasksHolder.children.length;i++){
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}