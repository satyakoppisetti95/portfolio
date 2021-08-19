import AsteroidBelt from "./components/AsteroidBelt";
import DisplayText from "./components/DisplayText";


export default class Section3{
    constructor(scene){
        this.y = -10;
        this.scene = scene;
        this.textengine = new DisplayText(scene);
        this.text1 = this.textengine.addText("ABOUT ME",0.18,0.05,0,this.y,0);
        this.text2 = this.textengine.addText("_______",0.18,0.05,0,this.y-0.1,0);
        this.text3 = this.textengine.addText("I have four years of experience in building\nscalable and efficient, web and mobile\napplications. Led teams of 5-15\nacross technology, business and\ndesign departments.",0.1,0.05,0,this.y-0.3,0);
        this.t = 0;
        this.ab = new AsteroidBelt(scene);
        this.texts = [this.text1,this.text2,this.text3];
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

        let texts_len = this.texts.length;
        while(texts_len--){
            this.texts[texts_len].position.y += height;
        }
        this.ab.system.position.y += height;
        this.ab.animate();
        
    }
}