img = "";
status = "";
objects = [];

function preload() {
    audio = loadSound("alarm.mp3");
}

function setup() {
     canvas = createCanvas(380 , 380);
     canvas.center();
     video = createCapture(VIDEO);
     video.size(380 , 380);
     video.hide();
     objectDetector = ml5.objectDetector(' cocossd' , modelloaded);
     document.getElementById("status").innerHTML = "status : Detecting Objects";
}

function modelloaded() {
    console.log("model is loaded");
    status = true;
}

function gotResult(error , results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image( video , 0 , 0 , 380 , 380);
    if ( (status!= " ") && (status=="person")){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video , gotResult) ; 
        for( i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "status : object detected";
            document.getElementById("number_of_objects").innerHTML = "person found" + objects.length;
            audio.stop();

            fill(r , g , b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 15 , objects[i].y+15);
            noFill();
            stroke(r , g , b);
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
        }
    }

    else{
        document.getElementById("status").innerHTML = "status : object not detected";
        document.getElementById("number_of_objects"). innerHTML = "person not found " + objects.length;
        audio.play();
       
    }
}