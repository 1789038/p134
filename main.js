img="";
alarm="";
status="";
objects=[];
function preload(){
    img=loadImage('dog_cat.jpg');
    alarm=loadSound("alarm.mp3");
}

function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    video.hide();
    document.getElementById("status").innerHTML="Status: Detecting Human";
}

function modelLoaded(){
    console.log("Model Loaded!");
    status=true;
}

function draw(){
    image(video,0,0,380,380);
    r=random(255);
    g=random(255);
    b=random(255);
     if(status !=""){
        objectDetector.detect(video,gotResult);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Status: Human Detected";
            document.getElementById("number_of_objects").innerHTML="Humans Found: " + objects.length;
            fill(r,g,b);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            alarm.stop();
        }
        if(objects.length==0){
            alarm.play();
        alarm.setVolume(1);
        document.getElementById("status").innerHTML="Status: Human Not Detected";
        document.getElementById("number_of_objects").innerHTML="Humans Found: " + objects.length;
        }
    }
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}