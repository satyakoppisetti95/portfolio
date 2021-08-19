import * as THREE from 'three';
import * as FontJson from '../../font.json';

export default class DisplayText{
    constructor(scene){
        this.scene = scene;
        this.font = new THREE.Font(FontJson);
        this.queue = [];
    }


    addText(text,size,height,x,y,z){
       
        var text_geometry = new THREE.TextGeometry(text,{font:this.font,size:size,height:height});
        var text_mesh = new THREE.Mesh(text_geometry,new THREE.MeshStandardMaterial({color: 0xFFFFFF}));
        var bbox = new THREE.Box3().setFromObject(text_mesh);
        var width = bbox.max.x - bbox.min.x;
        text_mesh.position.set(x-width/2.0,y,z);
        this.scene.add(text_mesh);
        console.log("added text from func");
        return text_mesh;
    }

}