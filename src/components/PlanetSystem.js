import * as THREE from 'three';

export default class PlanetSystem{
    constructor(scene){
        this.y = -5;
        this.scene = scene;
        this.particles = [];
        this.length = 3;

        const sGeometry = new THREE.SphereGeometry( 0.5, 16, 8 );
        const sMaterial = new THREE.MeshStandardMaterial({color:'#ffffff',wireframe:true})
        this.sun = new THREE.Mesh(sGeometry,sMaterial);
        
        this.system = new THREE.Object3D();
        this.system.add(this.sun)
        this.pivotPoint = new THREE.Object3D();
        this.sun.add(this.pivotPoint);

        const pGeometry1 = new THREE.SphereGeometry( 0.1, 8, 4 );
        this.planet1 = new THREE.Mesh(pGeometry1,sMaterial);
        this.planet1.position.set(-1.5,0,0);
        this.pivotPoint.add(this.planet1);

        const pGeometry2 = new THREE.SphereGeometry( 0.15, 10, 5 );
        this.planet2 = new THREE.Mesh(pGeometry2,sMaterial);
        this.planet2.position.set(2.5,0,0);
        this.pivotPoint.add(this.planet2);

        const curve1 = new THREE.EllipseCurve(
            0,  0,            // ax, aY
            1.5, 1.5,           // xRadius, yRadius
            0,  2 * Math.PI,  // aStartAngle, aEndAngle
            false,            // aClockwise
            0                 // aRotation
        );
        const curve2 = new THREE.EllipseCurve(
            0,  0,            // ax, aY
            2.5, 2.5,           // xRadius, yRadius
            0,  2 * Math.PI,  // aStartAngle, aEndAngle
            false,            // aClockwise
            0                 // aRotation
        );

        const points1 = curve1.getPoints( 50 );
        const cgeometry1 = new THREE.BufferGeometry().setFromPoints( points1 );
        const points2 = curve2.getPoints( 50 );
        const cgeometry2 = new THREE.BufferGeometry().setFromPoints( points2 );
        const cmaterial = new THREE.LineDashedMaterial( { color : 0xffffff } );
        // Create the final object to add to the scene
        const ellipse1 = new THREE.Line( cgeometry1, cmaterial );
        ellipse1.rotation.x = Math.PI * 0.5;
        const ellipse2 = new THREE.Line( cgeometry2, cmaterial );
        ellipse2.rotation.x = Math.PI * 0.5;

        this.system.add(ellipse1);
        this.system.add(ellipse2);

        this.scene.add(this.system);
        this.system.position.set(1,this.y-0.8,2);
        // this.system.rotation.x = Math.PI * 0.2;

    }

    init(){
      
    }

    animate(){
        this.sun.rotation.y += 0.02;
        this.planet1.rotation.y += 0.03;
        this.planet2.rotation.y -= 0.03;
    }
}