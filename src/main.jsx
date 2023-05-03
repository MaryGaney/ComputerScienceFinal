import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Fog } from 'three';

import { numberOfStarColors } from './colors.jsx';

import { removeObject3D } from './removeObjects.jsx';

import { loadNotebook } from './notebook';

//create the scene (background that holds everything)
export const scene = new THREE.Scene();

//create the camera
export const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight);

//create the renderer
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),

});
//when an item has loaded alert the console
THREE.DefaultLoadingManager.onLoad = function ( ) {

	console.log( 'Loading Complete!');

};


//renderer automatically adjusts to device window
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );

//camera.lookAt(-1.2,0,-1);

//add the background that holds everything and the camera
renderer.render( scene, camera );


//create lighting
export const pointLight = new THREE.PointLight(0xffffff, 1);
export const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
//pointLight.position.set(2.5,4,-1);
//pointLight.castShadow = true;

//add the lights to the scene
scene.add(pointLight, ambientLight);

//adds a box to show where the camera is
const helper = new THREE.CameraHelper( camera );
scene.add( helper );

//adds a box to show where the light is and adds the grid
//instead of commenting these out, I think it's helpful to use them
//at this stage in development
//const lightHelper = new THREE.PointLightHelper(pointLight); lightHelper,
const gridHelper = new THREE.GridHelper(200,50);
scene.add(gridHelper);

//allows for movement in the scene
const controls = new OrbitControls(camera, renderer.domElement);





//takes in a start number and counts from the starting number to the ending number
//adding all of the numbers from the start number to the end number in the array
function countdown(startNumber, endNumber){
  let newArray = [];
  for(let count = startNumber; count <= endNumber; count++){
      let numberSend = count;
      newArray.push(numberSend)
  }
  return newArray;
}

//returns an array full of however many amount of the wanted number (repeats)
//this is to help with calendar view so that the x and z will stay the same but
//the y will change
function returnZero(wantNumber, repeats){
  let newArray = [];
  for(let count = 0; count <= repeats; count++){
    let numberSend = wantNumber;
    newArray.push(numberSend)
  }
  return newArray;
}


//count is the number of times this function has gone through
let count = 0;
//currently working on making this function simpler and will eventually use Date()
//simply just displaying these in full calendar order
function addStarOrdered(){
  console.log("reloading at starOrdered");
  //const Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
  const geometry = new THREE.SphereGeometry(0.25,27,27);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff} );
  //this is the start of making the function simpler
  /*
    let monthStarArrayOriginal = [];
    function createMonthStar(monthStarArray){
      for(let monthName = 0; monthName < Months.length; monthName++){
        Months[monthName] = new THREE.Mesh(geometry, material);

        monthStarArray.push(Months[monthName]);
      }
      return monthStarArray;
    }

    const Numbers = ["zeros", "ones", "twos", "threes", "fours", "fives", "sixes", "sevens", "eights", "nines", "tens", "elevens"];
    let starNumberArrayOriginal = [];
    function createArrays(starNumberArray){

      for(let countUp = 0; countUp < 44;){
        for(let goThrough = 0; goThrough < Numbers.length; goThrough++){


            Numbers[goThrough] = Array(1).fill().map(() => returnZero(countUp,31));
            starNumberArray.push(Numbers[goThrough]);
            countUp +=4;
        }
      }
      return starNumberArray;
    }
  */

  const[zeros] = Array(1).fill().map(() => returnZero(2,31));
  const[ones] = Array(1).fill().map(() => returnZero(4,31));
  const[twos] = Array(1).fill().map(() => returnZero(6,31));
  const[threes] = Array(1).fill().map(() => returnZero(8,31));
  const[fours] = Array(1).fill().map(() => returnZero(10,31));
  const[fives] = Array(1).fill().map(() => returnZero(12,31));
  const[sixes] = Array(1).fill().map(() => returnZero(14,31));
  const[sevens] = Array(1).fill().map(() => returnZero(16,31));
  const[eights] = Array(1).fill().map(() => returnZero(18,31));
  const[nines] = Array(1).fill().map(() => returnZero(20,31));
  const[tens] = Array(1).fill().map(() => returnZero(22,31));
  const[elevens] = Array(1).fill().map(() => returnZero(24,31));

  const[toThirty] = Array(1).fill().map(() => countdown( -4,26));
  const[toTwentyNine] = Array(1).fill().map(() => countdown( -4,24));
  const[toThirtyOne] = Array(1).fill().map(() => countdown(-4,27));
  //createMonthStar(monthStarArrayOriginal);
  //createArrays(starNumberArrayOriginal);


  /*
    for(let combineAll = 0; combineAll < 13; combineAll++){
      monthStarArrayOriginal[combineAll].position.set(starNumberArrayOriginal[combineAll], toThirtyOne[combineAll], starNumberArrayOriginal[combineAll]);
    }
  */
  const starJan = new THREE.Mesh(geometry, material);
  const starFeb = new THREE.Mesh(geometry,material);
  const starMar = new THREE.Mesh(geometry,material);
  const starApr = new THREE.Mesh(geometry,material);
  const starMay = new THREE.Mesh(geometry,material);
  const starJun = new THREE.Mesh(geometry,material);
  const starJul = new THREE.Mesh(geometry,material);
  const starAug = new THREE.Mesh(geometry,material);
  const starSept = new THREE.Mesh(geometry,material);
  const starOct = new THREE.Mesh(geometry,material);
  const starNov = new THREE.Mesh(geometry,material);
  const starDec = new THREE.Mesh(geometry,material);

  starJan.position.set(zeros[count],toThirtyOne[count],zeros[count]);
  starFeb.position.set(ones[count], toTwentyNine[count], zeros[count]);
  starMar.position.set(twos[count], toThirtyOne[count], zeros[count]);
  starApr.position.set(threes[count], toThirty[count], zeros[count]);
  starMay.position.set(fours[count], toThirtyOne[count], zeros[count]);
  starJun.position.set(fives[count], toThirty[count], zeros[count]);
  starJul.position.set(sixes[count], toThirtyOne[count], zeros[count]);
  starAug.position.set(sevens[count], toThirtyOne[count], zeros[count]);
  starSept.position.set(eights[count], toThirty[count], zeros[count]);
  starOct.position.set(nines[count], toThirtyOne[count], zeros[count]);
  starNov.position.set(tens[count], toThirty[count], zeros[count]);
  starDec.position.set(elevens[count], toThirtyOne[count], zeros[count]);

  scene.add(starJan);
  scene.add(starFeb);
  scene.add(starMar);
  scene.add(starApr);
  scene.add(starMay);
  scene.add(starJun);
  scene.add(starJul);
  scene.add(starAug);
  scene.add(starSept);
  scene.add(starOct);
  scene.add(starNov);
  scene.add(starDec);
  count++;
}


//this is the number of days in each month - 1 (to account for 0)
//eventually I'll just the date and time automatically, but I wanted to wait and see if the actual function
//worked first
const Months = [[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27],
[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29],
[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29],
[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29],
[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29],
[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29],
[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
];

//this adds the dimensions and color for each star
const geometry = new THREE.SphereGeometry(0.25,27,27);
const material = new THREE.MeshStandardMaterial( { color: 0xffffff} );

//get the colors and number of different color stars
let colorInfo = numberOfStarColors();
//returnArray[0] =  # of whiteStars;
//returnArray[1] = # of completeGoals;
//returnArray[2] = # of partialGoals;
//returnArray[3] = complete goal color;
//returnArray[4] = partial goal color;

//this is the array of stars that need to be added to the scene
export let startingStars = [];
export let starsGalaxy = [];
export let starsOrdered = [];

//this creates an array of empty stars for each number inside each array in the Months array
function createMonthStar(monthStarArray){
  console.log("reloading at createMonthStar")
  //if the user doesn't have color options then proceed as normal
  if(colorInfo[3] == 0 && colorInfo[4] == 0){
    while(monthStarArray < 364){
      for(let monthName = 0; monthName < Months.length; monthName++){
        for(let monthDayNumber = 0; monthDayNumber < Months[monthName].length; monthDayNumber++){
          Months[monthName[monthDayNumber]] = new THREE.Mesh(geometry, material);
  
          monthStarArray.push(Months[monthName[monthDayNumber]]);
        }
  
      }
    }
    return monthStarArray;
  } else{
    //create the materials that respond to each color
    const materialComplete = new THREE.MeshStandardMaterial( { color: colorInfo[3] } );
    const materialPartial = new THREE.MeshStandardMaterial( { color: colorInfo[4] } );
    

    while(monthStarArray < colorInfo[0] + colorInfo[1] + colorInfo[2]){
      //while the array is less than the white star number create a star for each number
      for(let whiteStarCount = 0; whiteStarCount < colorInfo[0]; whiteStarCount++){
        const star = new THREE.Mesh(geometry, material);
        monthStarArray.push(star);
      }
      for(let completeStars = 0; completeStars < colorInfo[1]; completeStars++){
        const star = new THREE.Mesh(geometry, materialComplete);
        monthStarArray.push(star);
      }
      for(let partialStars = 0; partialStars < colorInfo[2]; partialStars++){
        const star = new THREE.Mesh(geometry, materialPartial);
        monthStarArray.push(star);
      }
    }
    
  }

}

createMonthStar(startingStars);
createMonthStar(starsGalaxy);
createMonthStar(starsOrdered);



// counts the number of times the galaxy display is used 
let starGalaxyCount = 0;
//this function creates an array of 3 variables
//it takes in whatever array and for each item in that array uses the 3 variables to 
//assign a position to the item
//then it adds the item to the scene
function addStarGalaxy(arrayOfMonths){

  
  const[x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  arrayOfMonths[starGalaxyCount].position.set(x,y,z);


  scene.add(arrayOfMonths[starGalaxyCount]);
  starGalaxyCount++;
}
//this function deletes the ordered stars 
//and adds the stars to the scene in galaxy view (spread out)
function populateStarsGalaxy(){
  document.getElementById('goodThing').style.visibility = "hidden";
  document.getElementById('yellowNumber').style.visibility = "hidden";
  document.getElementById('greenNumber').style.visibility = "hidden";
  document.getElementById('submitGoals').style.visibility = "hidden";
  document.getElementById("alertGoals").style.visibility = "hidden";
  //document.getElementById("main").style.height = "20%";
  document.getElementById("goals").style.height = 0;
  document.getElementById("goals").style.margin = "0 0 0 0";
  camera.position.setZ(-40);
  camera.position.setY(20);
  camera.position.setX(3);
  camera.lookAt(-2,1,1);

  for (let i=0; i< starsOrdered.length; i++){
    removeObject3D(starsOrdered[i]);
  }

  createMonthStar(starsGalaxy);
  for(let x = 0; x < starsGalaxy.length; x++){
    Array(12).fill(addStarGalaxy(starsGalaxy));
  }
}

//this function moves the camera and adds the stars to the scene 
//in an array of 12 for the 12 months
//it also deletes the galaxy (spread out) stars
function  populateStarsOrdered(){
  console.log("reloading at populate starsOrdered");
  //monthStarArrayOriginal.length = 0;
  for (let i=0; i< starsGalaxy.length; i++){
    removeObject3D(starsGalaxy[i]);
  }
  createMonthStar(starsOrdered);
  camera.position.setZ(-40);
  camera.position.setY(20);
  camera.position.setX(3);
  camera.lookAt(-2,1,1);
  Array(12).fill().forEach(addStarOrdered);
}


//these are the two variables for the "display my stars" and "display my notebook" button
//and the settings and first option in the settings
const notebookButton = document.getElementById("displayNotebook");
const starButtonGalaxy = document.getElementById("displayStarsGalaxy");
const settingsButton = document.getElementById("settingsButton");
//const starCalendarButton = document.getElementById("displayStarsCalendar");
//const starCalendarDButton = document.getElementById("displayStarsCalendarDay");
//const starButtonGalaxyD = document.getElementById("displayStarsGalaxyDay");

//when the buttons are clicked they run their specific functions that load in the stars or notebook
function finalGalaxy(){
  starGalaxyCount = 0;
  populateStarsGalaxy();

}

notebookButton.addEventListener('click', loadNotebook);
starButtonGalaxy.addEventListener('click', finalGalaxy);
//starCalendarButton.addEventListener('click', populateStarsOrdered);
//starCalendarDButton.addEventListener('click', populateStarsOrderedD);
//starButtonGalaxyD.addEventListener('click', populateStarsGalaxyD);



//this function resets the scene to it's original before the starting intro
function resetEverything(){
  controls.enableRotate = true;
  controls.enableZoom = true;
  controls.enablePan = true;
  controls.autoRotate = false;
  
  const title = document.getElementById("title");
  title.style.visibility = "hidden";
  title.style.marginTop = "100%";
  title.style.textAlign = "none"
  title.style.fontSize = "0";
  title.style.zIndex = -3;
  title.style.margin = 0;

  const startButton = document.getElementById('startButton');
  startButton.style.visibility = "hidden";

  const mainDiv = document.getElementById('main');
  mainDiv.visibility = "visible";
  mainDiv.style.height = "20%";
  mainDiv.style.margin = 0;
  notebookButton.style.visibility = "visible";
  notebookButton.scrollIntoView();
  starButtonGalaxy.style.visibility = "visible";
  settingsButton.style.visibility = "visible";


  for (let i=0; i< 364; i++){
    removeObject3D(startingStars[i]);
  }
  
  //createMonthStar(monthStarArrayOriginal);
  const fogColor = 0x000000;
  const fogDensity = 0.00;
  scene.fog = new THREE.FogExp2(fogColor,fogDensity); 
}

//this is the function that allows for the stars to show up on screen when starting
function populateStarsStarting(){
  camera.position.setZ(-40);
  camera.position.setY(20);
  camera.position.setX(3);
  camera.lookAt(-2,1,1);
  createMonthStar(startingStars);
  for(let x = 0; x < startingStars.length; x++){
    Array(12).fill(addStarGalaxy(startingStars));
  }
}

//this is the starting sequence
function starting(){
  const fogColor = 0x000000;
  const fogDensity = 0.05;
  scene.fog = new THREE.FogExp2(fogColor,fogDensity); 

 
  document.getElementById("alertGoals").style.visibility = "hidden";

  const title = document.getElementById("title");
  title.style.visibility = "visible";
  camera.position.set(10, 10, 0);
  notebookButton.style.visibility = "hidden";
  starButtonGalaxy.style.visibility = "hidden";
  settingsButton.style.visibility = "hidden";

  controls.enableRotate = false;
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.5;

  
  const startButton = document.getElementById('startButton');
  startButton.addEventListener('click', resetEverything);

  const goals = document.getElementById('goals');
  goals.style.padding = 0;
  goals.style.margin = 0;
  goals.style.height = 0;
  goals.style.width = 0;


  populateStarsStarting();
  starGalaxyCount = 0;
  
}

starting();

/*
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;
*/

const loader = new GLTFLoader();
loader.load( 'nebulasTest7.glb', function ( bookLayout) {
scene.add( bookLayout.scene );
}, undefined, function(error){
  console.log("error: ",error);
});

//this function runs the scene
function animate() {
  requestAnimationFrame( animate );

  //spaceTexture.rotation.x += 0.01;
  //spaceTexture.rotation +=0.005;
 
  controls.update();

  renderer.render( scene, camera);

  


  


}

animate();