'use strict';

var allNames=[];
var studs;

document.addEventListener('DOMContentLoaded', init);

function init() {
	studs = document.getElementById('students');

	document.querySelector('#addPerson').addEventListener('click', addPerson);
	document.querySelector('#typePerson').addEventListener('keypress', addPersonEnter);
	document.querySelector('#randomGen').addEventListener('click', rando);
	document.querySelector('#numPeople').addEventListener('keypress', groupEnter);
	document.querySelector('#groupEm').addEventListener('click', groupNow);

}

function addPerson() {
	var name = document.getElementsByTagName('input')[0].value;
		if(name === '') {
			return;
		}
		else {
			document.getElementsByTagName('input')[0].value='';
			var names = name.split(', ');
			allNames.push(names);
			allNames = [].concat.apply([], allNames);
			createList(names);
		};
}

function addPersonEnter() {
	if(event.keyCode === 13) {
		var name = document.getElementsByTagName('input')[0].value;
		if(name === '') {
			return;
		}
		else {
		document.getElementsByTagName('input')[0].value='';
		var names = name.split(', ');
		allNames.push(names);
		allNames = [].concat.apply([], allNames);
		createList(names);
		};
	};
}

function createList(arr) {
	for(var i = 0;i < arr.length; i++) {
		var listItem = document.createElement('div');
		var namesHere = arr[i];
		listItem.innerHTML = namesHere;
		listItem.classList.add('student');
		studs.appendChild(listItem);
	};
}

function rando() {
	var pickOnMe = allNames[Math.floor(Math.random()*allNames.length)];
	var highlight = document.getElementsByClassName('student');
	for (var i=0; i < highlight.length; i++) {
		if (highlight[i].textContent == pickOnMe) {
			highlight[i].classList.add('highlight');
		}
		else {
			highlight[i].classList.remove('highlight');
		}
	}
}

function fisherShuffle(array) {
	//https://www.youtube.com/watch?v=tLxBwSL3lPQ
	var currentIndex = array.length, temporaryValue, randomIndex;

	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function groupNow() {
	var groupArr = fisherShuffle(allNames);  //									=30 people
	var groupSize = Math.ceil(document.getElementsByTagName('input')[1].value);// 			of 5 people
	document.getElementsByTagName('input')[1].value = groupSize;
	if(groupSize <1) {return};
	var howManyGroups = Math.ceil(groupArr.length / groupSize); //ex 6 groups ^
	
	while (studs.firstChild) {
		studs.removeChild(studs.firstChild);
	}

	for(var i = 0; i < howManyGroups; i++) {
		var groupItem = document.createElement('div');
		groupItem.classList.add('groupCell' + i, 'cell');
		studs.appendChild(groupItem);			
		for(var k = 0; k < groupSize; k++) {				
		var listItem = document.createElement('div');
		var namesHere = groupArr[i * groupSize + k]; 	
		if(namesHere != undefined) {
			listItem.innerHTML = namesHere;
			var classGroup = i + 1;
			listItem.classList.add('student', 'group' + classGroup);
			groupItem.appendChild(listItem);
		};
		}
	}


}


function groupEnter() {
	if(event.keyCode === 13) {
		var groupArr = fisherShuffle(allNames);  //									=30 people
		var groupSize = Math.ceil(document.getElementsByTagName('input')[1].value);// 			of 5 people
		document.getElementsByTagName('input')[1].value = groupSize;
		if(groupSize <1) {return};
		var howManyGroups = Math.ceil(groupArr.length / groupSize); //ex 6 groups ^
		
		while (studs.firstChild) {
			studs.removeChild(studs.firstChild);
		}
	
		for(var i = 0; i < howManyGroups; i++) {
			var groupItem = document.createElement('div');
			groupItem.classList.add('groupCell' + i, 'cell');
			studs.appendChild(groupItem);			
			for(var k = 0; k < groupSize; k++) {				
			var listItem = document.createElement('div');
			var namesHere = groupArr[i * groupSize + k]; 	
			if(namesHere != undefined) {
				listItem.innerHTML = namesHere;
				var classGroup = i + 1;
				listItem.classList.add('student', 'group' + classGroup);
				groupItem.appendChild(listItem);
			};
			}
		}
	}
}









