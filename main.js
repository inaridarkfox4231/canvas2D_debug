const {Inspector} = fisce.foxIA;

function setup() {
  createCanvas(windowWidth,windowHeight);
  pixelDensity(window.devicePixelRatio);

  const cvs = document.querySelector('canvas');
  let offsetY = 5;
  let offsetVelocity = 0;
  let offsetAcceleration = 0;

  const IR = new Inspector(cvs);
  IR.add("wheel",(e)=>{
    offsetAcceleration = -e.deltaY*0.05;
  });
  const loopFunction = () => {
    // IRもインタラクションなので、こういうことはできる。
    if(IR.getPointers().length > 0){
      const p = IR.getPointers()[0];
      if(p.y > p.prevY){
        offsetAcceleration = 3;
      }else{
        offsetAcceleration = -3;
      }
    }

    offsetVelocity += offsetAcceleration;
    offsetAcceleration = 0;

    offsetY = constrain(offsetY + offsetVelocity, -1000, 5);
    offsetVelocity *= 0.85;
    if(abs(offsetVelocity) < 0.001) offsetVelocity=0;

    background(255);

    const stl = window.getComputedStyle(cvs);
    textSize(15);
    textAlign(LEFT,TOP);
    let a = 5;
    let b = offsetY;
    text("width:" + width, a, b);
    text("windowWidth:" + windowWidth, a, b+=30);
    text("window.innerWidth:" + window.innerWidth, a, b+=30);
    text("window.screen.width:" + window.screen.width, a, b+=30);
    text("height:" + height, a, b+=30);
    text("windowHeight:" + windowHeight, a, b+=30);
    text("window.innerHeight:" + window.innerHeight, a, b+=30);
    text("window.screen.height:" + window.screen.height, a, b+=30);
    text("devicePixelRatio:" + window.devicePixelRatio, a, b+=30);
    text(stl.getPropertyValue("width"), a, b+=30);
    text(stl.getPropertyValue("height"), a, b+=30);
    text("document.documentElement.clientWidth", a, b+=30);
    text(document.documentElement.clientWidth, a, b+=30);
    text("document.documentElement.clientHeight", a, b+=30);
    text(document.documentElement.clientHeight, a, b+=30);
    text("document.body.clientWidth", a, b+=30);
    text(document.body.clientWidth, a, b+=30);
    text("document.body.clientHeight", a, b+=30);
    text(document.body.clientHeight, a, b+=30);
  }
  draw = loopFunction;
}
