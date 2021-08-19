import DisplayText from "./components/DisplayText";
import SectionParticles from "./components/SectionParticles";
import SmokeEmitter from "./components/SmokeEmitter";


export default class Section1{
    constructor(scene){
        this.scene = scene;
        // this.particleSystem = new SectionParticles(scene);
        this.textengine = new DisplayText(scene);
        this.hello = this.textengine.addText("Hello",0.5,0.05,0,0,0);
        this.smokeEmitter = new SmokeEmitter(scene);
        // this.koppisetti = this.textengine.addText("KOPPISETTI",0.2,0.05,0,-0.4,0);
        this.init();
        this.t = 0;
    }

    init(){
        
    }

    animate(){
      
        if(this.t >= 360){
            this.t = 0;
        }else{
            this.t += 0.02;
        }
        var height = Math.sin(this.t) * 0.005;
        this.hello.position.y += height;
       
        this.smokeEmitter.animate();
    }
}