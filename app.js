import { DisplayList } from './components/DisplayList.js'
import {ListItem} from './components/listItem.js'
import {TodoApp} from './components/todoApp.js'

let app = new TodoApp()


const mylist = new DisplayList();
mylist.addItem({ content: 'aaa', id: 17 });
mylist.addItem({ content: 'bbb', id: 18 });

mylist.deleteItem(17);
let item1 = new ListItem("new1")
let item2 = new ListItem("new2")
let item3 = new ListItem("new3")
mylist.addItem(item1);
mylist.addItem(item2);
mylist.addItem(item3);
mylist.deleteItem(item2.id)

console.log(mylist.arrItems);

console.log('start here: !!!');

//Event handling, uder interaction is what starts the code execution.

const userInput=document.querySelector("#new-task");//user input box for new task content
// console.log(userInput);
const addButton=document.querySelector("#btn-add");//first button
const mainTaskList=document.querySelector("#tasks-list");//ul of #incomplete-tasks
const completedTasksButton = document.querySelector(".c-btn");
const unCompletedTasksButton = document.querySelector(".uc-btn");
const allTasksButton = document.querySelector(".all-btn");


// var completedTasksHolder=document.getElementById("completed-tasks");//completed-tasks

completedTasksButton.addEventListener('click', ()=>{
	console.log('completed tesks!!');
	const currTasksList = document.querySelectorAll('li');
	console.log(currTasksList);
	for (const itm of currTasksList) {
		console.log(itm.classList);
		if(itm.classList.contains('unmarked-item')) {
			itm.style.display = "none";

		} else {
			itm.style.display = "list-item";
		}
		
	}
	
});

unCompletedTasksButton.addEventListener('click', ()=>{
	console.log('unCompleted tasks!!');
	const currTasksList = document.querySelectorAll('li');
	console.log(currTasksList);
	for (const itm of currTasksList) {
		console.log(itm.classList);
		if(itm.classList.contains('marked-item')) {
			itm.style.display = "none"
		} else {
			itm.style.display = "list-item";
		}
		
	}

});




allTasksButton.addEventListener('click', ()=>{
	console.log('all tasks!!');
	const currTasksList = document.querySelectorAll('li');
	console.log(currTasksList);
	for (const itm of currTasksList) {
		itm.style.display = "list-item";
	}
});

//New task list item
var createNewTaskElement=function(taskString){

	var listItem=document.createElement("li");
	listItem.classList.add('unmarked-item');

	//input (checkbox)
	var checkBox=document.createElement("input");//checkbx
	//label
	var label=document.createElement("label");//label
	//input (text)
	var editInput=document.createElement("input");//text
	//button.edit
	// var editButton=document.createElement("button");//edit button

	//button.delete
	var deleteButton=document.createElement("button");//delete button
	deleteButton.addEventListener('click', ()=>{listItem.remove()});


	label.innerText=taskString;

	//Each elements, needs appending
	checkBox.type="checkbox";
	editInput.type="text";

	// editButton.innerText="Edit";//innerText encodes special characters, HTML does not.
	// editButton.className="edit";
	deleteButton.innerText="Delete";
	deleteButton.className="delete";

	checkBox.addEventListener('click', ()=>{
		console.log('clicked check box');
		// listItem.style.textDecorationLine = "line-through"; 
		// listItem.style.backgroundColor = 'red';
		// label.style.textDecorationLine = "line-through";
		// label.style.color = 'gray';
		if (!label.classList.length) {
			label.classList.add('marked-task');
			listItem.classList.remove('unmarked-item');
			listItem.classList.add('marked-item');		
		} else if(label.classList.contains('marked-task')){
			label.classList.remove('marked-task');
			label.classList.add('unmarked-task');
			listItem.classList.remove('marked-item');
			listItem.classList.add('unmarked-item');		

		} else {
			label.classList.remove('unmarked-task');
			label.classList.add('marked-task');
			listItem.classList.remove('unmarked-item');
			listItem.classList.add('marked-item');
		}

		console.log(listItem.classList); 
	});

	//and appending.
	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	// listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);
	return listItem;
}



const addTask=function(){

    if (userInput.value) {

	console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    console.log('user input => ', userInput.value);
    var listItem=createNewTaskElement(userInput.value);
    

	//Append listItem to TaskList
	mainTaskList.appendChild(listItem);
	// bindTaskEvents(listItem, taskCompleted);

    userInput.value="";

    }
    
}


// ++ adds event listener to Add button -> create a new task li
addButton.addEventListener("click",addTask);

