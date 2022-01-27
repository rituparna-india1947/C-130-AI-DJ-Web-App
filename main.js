song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

score_leftWrist = 0;
score_rightWrist = 0;

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");

    if (score_leftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        InNumberleftWristY = Number(leftWristY);
        new_leftWristY = floor(InNumberleftWristY * 2);
        leftWristY_divide_1000 = new_leftWristY / 1000;
        document.getElementById("volume").innerHTML = "Volume: " + leftWristY_divide_1000;
        song.setVolume(leftWristY_divide_1000);
    }

    if (score_rightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        if (rightWristY > 0 && rightWristY <= 100) {
            document.getElementById("speed").innerHTML = "Speed: 0.5x";
            song.rate(0.5);
        }

        else if (rightWristY > 100 && rightWristY <= 200) {
            document.getElementById("speed").innerHTML = "Speed: 1x";
            song.rate(1);
        }

        else if (rightWristY > 200 && rightWristY <= 300) {
            document.getElementById("speed").innerHTML = "Speed: 1.5x";
            song.rate(1.5);
        }

        else if (rightWristY > 300 && rightWristY <= 400) {
            document.getElementById("speed").innerHTML = "Speed: 2x";
            song.rate(2);
        }

        else if (rightWristY > 400 && rightWristY <= 500) {
            document.getElementById("speed").innerHTML = "Speed: 2.5x";
            song.rate(2.5);
        }
    }
}

function preload() {
    song = loadSound("BTS-Butter.mp3");
}

function play_song() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded() {
    console.log("Model is Initialised");
}

function gotPoses(results) {
    if (results.length > 0) {
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Left Wrist X = " + leftWristX + " Left Wrist Y = " + leftWristY);
        console.log("Right Wrist X = " + rightWristX + " Right Wrist Y = " + rightWristY);
        score_rightWrist = results[0].pose.keypoints[10].score;
        score_leftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + score_rightWrist + " scoreLeftWrist = " + score_leftWrist);

    }
}