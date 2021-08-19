import * as THREE from 'three';

export default class TetrahedronParticles{
    constructor(scene){
        this.scene = scene;
        this.particles = [];
        this.length = 3;
        this.init();
        
    }

    init(){
        const pGeometry = new THREE.TetrahedronGeometry(2,0);
        const pMaterial = new THREE.MeshBasicMaterial({color:'#ffffff',wireframe:true})

        for(var i=0;i<this.length;i++){
            var mesh = new THREE.Mesh(pGeometry, pMaterial);
            mesh.position.set(
                THREE.MathUtils.randFloat(-10,10),
                THREE.MathUtils.randFloat(-8,-5),
                THREE.MathUtils.randFloat(-10,-3)
            )
            this.particles.push(mesh);
            this.scene.add(mesh);
        }
    }

    animate(){
        // let count = this.length;
        // while(count--){
        //     this.particles[count].rotation.y += THREE.MathUtils.randFloat(0.01,0.05);
        //     this.particles[count].rotation.z += THREE.MathUtils.randFloat(0.01,0.05);
        // }
    }
}