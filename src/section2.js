import DisplayText from "./components/DisplayText";
import PlanetSystem from "./components/PlanetSystem";
import SmokeEmitter from "./components/SmokeEmitter";


export default class Section2{
    constructor(scene){
        this.y = -5;
        this.scene = scene;
        this.textengine = new DisplayText(scene);
        this.iam = this.textengine.addText("I AM",0.2,0.05,0,this.y+0.6,0);
        this.satya = this.textengine.addText("SATYA KOPPISETTI",0.2,0.05,0,this.y+0.3,0);
        this.dash = this.textengine.addText("____",0.2,0.05,0,this.y+0.1,0);
        this.fsd = this.textengine.addText("FULL STACK SOFTWARE ENGINEER",0.1,0.09,0,this.y-0.2,0)
        this.t = 0;
        this.planetsystem = new PlanetSystem(scene);
        this.init();
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
        this.iam.position.y += height;
        this.satya.position.y += height;
        this.fsd.position.y += height;
        this.dash.position.y += height;
        this.planetsystem.animate();
        this.planetsystem.system.position.y += height;
    }
}