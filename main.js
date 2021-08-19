import * as THREE from 'three';
import './style.css'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import Section1 from './src/section1';
import Section3 from './src/section3';
import SectionParticles from './src/components/SectionParticles';
import gsap from 'gsap/gsap-core';
import TetrahedronParticles from './src/components/TetrahedronParticles';
import Section2 from './src/section2';

var scene = new THREE.Scene();


var camera = new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,0.1,1000)
camera.position.z = 5;


var renderer = new THREE.WebGLRenderer({canvas:document.querySelector('#app'),antialias: true});
renderer.setClearColor("#000000");
renderer.setSize(window.innerWidth,window.innerHeight);


window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})

function scrollEventThrottle(fn) {
	let last_known_scroll_position = 0;
	let ticking = false;
	window.addEventListener("scroll", function () {
	  let previous_known_scroll_position = last_known_scroll_position;
	  last_known_scroll_position = window.scrollY;
	  if (!ticking) {
		window.requestAnimationFrame(function () {
		  fn(last_known_scroll_position, previous_known_scroll_position);
		  ticking = false;
		});
		ticking = true;
	  }
	});
}
  
let isScrolling = false;

scrollEventThrottle((scrollPos, previousScrollPos) => {
	var delta = scrollPos-previousScrollPos;
	if (previousScrollPos > scrollPos) {
		console.log("going up ; delta : ",delta);
		if(Math.abs(delta)>5 && !isScrolling){
			
			moveToPrevSection();
		}
	} else {
		console.log("going down ; delta : ",delta);
		if(Math.abs(delta)>5  && !isScrolling){
			
			moveToNextSection();
		}
	}
});

function scrollingStopped(){
	isScrolling = false;
}

let current_section=0;
let total_sections = 3;

function moveToNextSection(){
	if(current_section<total_sections-1){
		isScrolling = true;
		current_section += 1;
		gsap.to(camera.position,{y:camera.position.y-5,duration:2,onComplete:scrollingStopped})
		particleSystem.animateGoingDown();
	}else{
		console.log("Reached End")
		scrollingStopped();
	}
}

function moveToPrevSection(){
	if(current_section>0){
		isScrolling = true;
		current_section -= 1;
		gsap.to(camera.position,{y:camera.position.y+5,duration:2,onComplete:scrollingStopped})
		particleSystem.animateGoingUp();
	}else{
		console.log("Reached Top");
		scrollingStopped();
	}
}

let particleSystem = new SectionParticles(scene);

// const light = new THREE.DirectionalLight(0xffffff, 0.75);
// light.position.set(-1, 0, 1);
// scene.add(light)
var light = new THREE.PointLight(0xFFFFFF, 2, 15)
light.position.set(0,1,3);
scene.add(light);
var light = new THREE.PointLight(0xFFFFFF, 2, 5)
light.position.set(0,-10,3);
scene.add(light);
// var lightHelper = new THREE.PointLightHelper(light);
// scene.add(lightHelper);



let s1 = new Section1(scene);
let s2 = new Section2(scene);
let s3 = new Section3(scene);

document.getElementById('app').addEventListener('mousemove',(event)=>{
  var canvasWidth = window.innerWidth;
	var halfWidth = canvasWidth / 2;
	// Main vars
	var mouseX = event.clientX ;
	var maxDegree = 25 * Math.PI / 180;
	var rotationZ = 0;
	if (mouseX < halfWidth) {
		rotationZ = -1 * (halfWidth - mouseX) * (maxDegree / halfWidth);
	} else {
		rotationZ = (mouseX - halfWidth) * (maxDegree / halfWidth);
	}
	camera.position.x = rotationZ; //set(rotationX, 0, rotationZ);
})

// const controls = new OrbitControls(camera,renderer.domElement);


let t = 0;
renderer.setAnimationLoop( function () {
	renderer.render( scene, camera );
	// controls.update();
	s1.animate();
	s2.animate();
	s3.animate();

	if(t >= 360){
		t = 0;
	}else{
		t += 0.02;
	}
	var height = Math.sin(t) * 0.005;

	var particles = particleSystem.particles;
	for(var i=0;i<particles.length;i++){
		particles[i].position.y += height;
	}
});

