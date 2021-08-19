import gsap from 'gsap/gsap-core';
import * as THREE from 'three';

export default class SectionParticles{
    constructor(scene){
        this.BOXSIZE = 0.03
        this.BOUNDARY = 10;
        this.scene = scene;
        this.particles = [];
        // this.pGeometry = new THREE.BoxGeometry( this.BOXSIZE, this.BOXSIZE, this.BOXSIZE);
        this.pMaterial = new THREE.MeshBasicMaterial( {color: 0xffffff} );
        this.t = 0;
        this.init();
    }

    init(){
        for(var i=0;i<50;i++){
            var pGeometry = new THREE.BoxGeometry(
                this.BOXSIZE,
                THREE.MathUtils.randFloat(0.01,this.BOXSIZE*2),
                0.01,
            )
            var cube = new THREE.Mesh( pGeometry, this.pMaterial );
            var x =  THREE.MathUtils.randFloat(-0.5*this.BOUNDARY,0.5*this.BOUNDARY);
            var y = THREE.MathUtils.randFloat(-0.5*this.BOUNDARY,0.3*this.BOUNDARY);
            var z = THREE.MathUtils.randFloat(3,-0.5*this.BOUNDARY);
            cube.position.set(x,y,z)
            this.particles.push(cube);
            this.scene.add(cube);
        }
    }


    resetScale(){
        let particle_count = this.particles.length;
        while(particle_count--){
            
        }
    }

    animateGoingDown(){
        let particle_count = this.particles.length;
        while(particle_count--){
            gsap.to(this.particles[particle_count].scale,{y:10,duration:0.5})
            gsap.to(this.particles[particle_count].position,{y:this.particles[particle_count].position.y-5,duration:3})
            gsap.to(this.particles[particle_count].scale,{y:1,duration:0.5,delay:1.5})
        }
    }

    animateGoingUp(){
        let particle_count = this.particles.length;
        while(particle_count--){
            gsap.to(this.particles[particle_count].scale,{y:10,duration:0.5})
            gsap.to(this.particles[particle_count].position,{y:this.particles[particle_count].position.y+5,duration:3})
            gsap.to(this.particles[particle_count].scale,{y:1,duration:0.5,delay:1.5})
        }
    }


}