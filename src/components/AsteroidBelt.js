import * as THREE from 'three';

export default class AsteroidBelt{
    constructor(scene){
        this.y = -10;
        this.scene = scene;
        this.particles = [];
        this.system = new THREE.Object3D();
        this.length = 15;
        this.init();
    }

    init(){
        
        const pMaterial = new THREE.MeshBasicMaterial({color:'#ffffff',wireframe:true})

        for(var i=0;i<this.length;i++){
            var pGeometry = new THREE.TetrahedronGeometry(THREE.MathUtils.randFloat(0.1,0.3),1);
            var mesh = new THREE.Mesh(pGeometry, pMaterial);
            var theta = (i / this.length) * 2 * Math.PI ;
            mesh.position.set(
                Math.cos(theta)*3,
                Math.sin(theta)*3,
                THREE.MathUtils.randFloat(-0.5,0.5)
            )
            this.particles.push(mesh);
            this.system.add(mesh);
        }
       
        this.scene.add(this.system);
        this.system.rotation.x = Math.PI / 3;
        this.system.rotation.y = Math.PI / 4;
        this.system.position.y = this.y-1;
        this.system.position.z = 1;
    }

    animate(){
        this.system.rotation.z += 0.001;
        let count = this.particles.length;
        while(count--){
            this.particles[count].rotation.x += THREE.MathUtils.randFloat(0.001,0.005);
            this.particles[count].rotation.y += THREE.MathUtils.randFloat(0.001,0.005);
        }
    }
}