import { starsOrdered } from "./main";
import { starsGalaxy } from "./main";
import { startingStars } from "./main";
import { camera } from "./main";
import { pointLight } from "./main";
import * as THREE from "three";
import { scene } from "./main";
import { removeObject3D } from "./removeObjects";
import './style.css';

//this function will style the form
export function setUpInfo(){
  const goals = document.getElementById('goals');
  goals.style.visibility = "visible";
  goals.style.marginBottom = "15%";
  goals.style.marginLeft = "25%";
  goals.style.marginTop = "30%";
  goals.style.height = "15%";
  goals.style.width = "35%";
  document.getElementById('goodThing').style.visibility = "visible";
  document.getElementById('yellowNumber').style.visibility = "visible";
  document.getElementById('greenNumber').style.visibility = "visible";
  document.getElementById('submitGoals').style.visibility = "visible";
}

//get date
let date = new Date();
let month = date.getUTCMonth();
let day = date.getUTCDate();


let goodThingText = document.getElementById("goodThing");
let yellowNumberInfo = document.getElementById("yellowNumber");
let greenNumberInfo = document.getElementById("greenNumber");

//this function will keep track of the total amount of completed goals
function getNumbers(){
  //get the value of the local storage elements
    let yellowNumberValue = window.localStorage.getItem('yellowNumberToday');
    let greenNumberValue = window.localStorage.getItem('greenNumberToday');

    //total amount of complete goals
      let totalComplete = window.localStorage.getItem("TotalCompleteGoals");
    //total amount of partially completed goals
      let partialComplete = window.localStorage.getItem("PartialCompleteGoals");
    //if both are null then -> return 0 + whatever # of completed goals and set local storage item to that as well
      if(totalComplete == null || totalComplete == undefined){
        greenNumberValue = Number(greenNumberValue);
        totalComplete = Number(0);
        let returnNumber = greenNumberValue + totalComplete;
        window.localStorage.setItem("TotalCompleteGoals", returnNumber);
      } else{
        //otherwise, add the total to the # of completed goals
        greenNumberValue = Number(greenNumberValue);
        totalComplete = Number(totalComplete);
        let returnNumber = greenNumberValue + totalComplete;
        window.localStorage.setItem("TotalCompleteGoals", returnNumber);
      }

      //repeat function above for partial goals
      if(partialComplete == null){
        yellowNumberValue = Number(yellowNumberValue);
        partialComplete = Number(0);
        let returnNumber = yellowNumberValue + partialComplete;
        window.localStorage.setItem("PartialCompleteGoals", returnNumber);

      } else{
        yellowNumberValue = Number(greenNumberValue);
        partialComplete = Number(totalComplete);
        let returnNumber = yellowNumberValue + partialComplete;
        window.localStorage.setItem("PartialCompleteGoals", returnNumber);

      }
    
}
  
//this function stores *ALL* of the localstorage user info
function storeTheInfo(){
  //this function takes in the current day and month and returns a boolean value
  function daysEntered(day, month){
    //if local storage doesn't have a dayLog or monthLog create one and set both of 
    //them equal to the current day and month
    //return true because you are logging a day
    let newString = `${day}a${month}`;
    let currentDay = window.localStorage.getItem(newString);
    if(!currentDay){
      window.localStorage.setItem('monthLog', month);
      window.localStorage.setItem('dayLog', day);
      return true;
    } else{
      localStorage.removeItem("dayLog");
      localStorage.removeItem("monthLog");
      return false;
    }

  }
  let daysAnswer = daysEntered(day,month);

 
  //this function gets the value of the html inputs
  function getInputValue(){

    let goodThingValue = window.localStorage.getItem('goodThingToday');
    let yellowNumberValue = window.localStorage.getItem('yellowNumberToday');
    let greenNumberValue = window.localStorage.getItem('greenNumberToday');

    //check if the value of all of the inputs does not equal null
    //if the value of all fields isn't empty then return that value to the array
    if (!goodThingValue == null && !yellowNumberValue == null && !greenNumberValue == null){
      yellowNumberValue = Number(yellowNumberValue);
      greenNumberValue = Number(greenNumberValue);
      let returnArray = [];
      returnArray[0] = goodThingValue;
      returnArray[1] = yellowNumberValue;
      returnArray[2] = greenNumberValue;
      return returnArray;
    } else{
      const alertTitle = document.getElementById("alertGoals");
      //if they equal null, clear the page and have it send an alert up top that says 
      //"please fill out all fields"
      //edit the alert
      alertTitle.innerHTML = "Please fill all fields";
      alertTitle.style.visibility = "visible";
      alertTitle.style.color = "white";
        
      document.getElementById("goals").style.margin = 0,0,0,0;

      //edit the size and visibility of the notebook page

      goodThingText.style.visibility = "hidden";
      goodThingText.style.height = 0;
      yellowNumberInfo.style.visibility = "hidden";
      yellowNumberInfo.style.height = 0;
      greenNumberInfo.style.visibility = "hidden";
      greenNumberInfo.style.height = 0;
      document.getElementById("submitGoals").style.visibility = "hidden";
      document.getElementById("submitGoals").style.height = 0;
      let returnArray = [];
      returnArray[0] = goodThingValue;
      returnArray[1] = yellowNumberValue;
      returnArray[2] = greenNumberValue;
      return returnArray;
    }
    
  }

  function finalFunction(){

    if(daysAnswer === true){
      //get info to see if the JSONmemory array has already been created or not
      if(!window.localStorage.getItem('JSONmemory') == null){
        //if the value is not null, get the array from the getInputValue function
        let returnedArray = getInputValue();

        //set the array equal to the array in the local storage (this will store all of the dayDatas)
        let JSONArray = window.localStorage.getItem('JSONmemory');
            
        //take the day and the month and concat them into a string
        let newString = `${day}a${month}`;

        //take the data and set it equal to key value pairs
        let dayData = {month: month, day: day, goodThingSave: returnedArray[0], yellowNumberSave: returnedArray[1], greenNumberSave: returnedArray[2]};
        //stringify the data
        let myJSON = JSON.stringify(dayData);
        //add it to a local storage object
        localStorage.setItem(newString, myJSON);
            
        //add the data to the JSON array
        JSONArray.push(dayData);
        window.localStorage.setItem("JSONmemory", JSONArray);

        //get the total amount of completed goals (to pass to main.jsx)
        getNumbers();
      } else{
        //create the JSONmemory localstorage item and set it equal to an empty array
        let JSONArray = [];
        let JSONmemory = window.localStorage.setItem('JSONmemory', JSONArray);

        //get the input values
        let returnedArray = getInputValue();
        //take the day and the month and concat them into a string
        let newString = `${day}a${month}`;

        //take the data and set it equal to key value pairs
        let dayData = {month: month, day: day, goodThingSave: returnedArray[0], yellowNumberSave: returnedArray[1], greenNumberSave: returnedArray[2]};
        //stringify the data
        let myJSON = JSON.stringify(dayData);
        //add it to a local storage object
        localStorage.setItem(newString, myJSON);

        //add the data to the JSON array
        JSONArray.push(dayData);
        window.localStorage.setItem("JSONmemory", JSONArray);
      }
    } else{
      console.log("failure to perform finalFunction");
    }
  }
  finalFunction();

}






  


const submitButton = document.getElementById('submitGoals');
submitButton.addEventListener('click', storeTheInfo());


//when the submit button is clicked, 

//this function moves the camera, moves the light, 
//it also deletes all the stars from the scene
export function loadNotebook(){

  //all 3 for loops remove all stars from the canvas
    for (let i=0; i< starsOrdered.length; i++){
      removeObject3D(starsOrdered[i]);
    }

    for (let i=0; i< startingStars.length; i++){
      removeObject3D(startingStars[i]);
    }

    for (let i=0; i< starsGalaxy.length; i++){
      removeObject3D(starsGalaxy[i]);
    }

    pointLight.position.set(2.5,4,-1);
    pointLight.castShadow = true;
    camera.position.setZ(2.5);
    camera.position.setY(4);
    camera.position.setX(-1);
    camera.lookAt(0,0,0);
  
    
    const goodThing = document.getElementById("goodThing");
    goodThing.style.marginTop = "15%";
  
  
    const mainDiv = document.getElementById('main');
    mainDiv.style.visibility = "visible";
    mainDiv.style.height = "auto";

    setUpInfo();
    
}
  