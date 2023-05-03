import './style.css'
import { camera } from "./main";
import { pointLight } from "./main";
import * as THREE from "three";
import { scene } from "./main";

//pulls the colors from the local storage
let CIC = window.localStorage.getItem("ColorComplete");
let CIP = window.localStorage.getItem("ColorPartial");



//1. create a running total of complete goals -> notebook.jsx
//2. create a running total of partial goals -> notebook.jsx
//3. pull that total from the local storage 
let completeGoals = window.localStorage.getItem("TotalCompleteGoals");
completeGoals = Number(completeGoals);
console.log(completeGoals);
let partialGoals = window.localStorage.getItem("PartialCompleteGoals");
partialGoals = Number(partialGoals);
console.log(partialGoals);

//this will return an array of how many stars need to be the different chosen colors
export function numberOfStarColors(){

  if(CIC == null){
    CIC = 0;
  }
  
  if(CIP == null){
    CIC = 0;
  }

  let total = 365;
  //let whiteStars = total - completeGoals - partialGoals;
  let whiteStars = total - 60 - 40;

  let returnArray = [];
  returnArray[0] = whiteStars;
  //returnArray[1] = completeGoals;
  returnArray[1] = 60;
  //returnArray[2] = partialGoals;
  returnArray[2] = 40;
  returnArray[3] = CIC;
  returnArray[4] = CIP;

  return returnArray;
}
//4. 365 - total complete goals - total partial goals = number of white stars
//5. send the # of white stars, # of complete stars, and # of partial stars to main.jsx


//add the background and decor objects
function addTheClouds(){
  const moonNormalTexture = new THREE.TextureLoader().load('space.jpg');
  const moonMesh = new THREE.MeshStandardMaterial( {normalMap: moonNormalTexture, color:0x472649} );
  moonMesh.transparent = true;
  moonMesh.opacity = 0.7;
  const moon = new THREE.Mesh(new THREE.SphereGeometry(3, 32, 32), moonMesh);
  scene.add(moon);
}