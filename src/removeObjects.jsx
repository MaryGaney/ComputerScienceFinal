
import * as THREE from 'three';

//this removes objects from the scene
export function removeObject3D(object3D) {
    console.log("reloading at removal of object");
    if (!(object3D instanceof THREE.Object3D)) return false;
  
    // for better memory management and performance
    if (object3D.geometry) object3D.geometry.dispose();
  
    if (object3D.material) {
        if (object3D.material instanceof Array) {
            // for better memory management and performance
            object3D.material.forEach(material => material.dispose());
            object3D.material.forEach(object3D.length = 0)
        } else {
            // for better memory management and performance
            object3D.material.dispose();
  
        }
    }
    object3D.removeFromParent(); // the parent might be the scene or another Object3D, but it is sure to be removed this way
    return true;
  }
  
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
