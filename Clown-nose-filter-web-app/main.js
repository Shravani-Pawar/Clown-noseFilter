noseX = 0;
noseY = 0;
lefteyeY = 0;
righteyeX = 0;
lefteyeX = 0;
righteyeY = 0;
function preload() {
  clown_nose = loadImage("https://i.postimg.cc/YCdzdbbh/clown-noses.png");
}

function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(300, 300);
  video.hide();

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotPoses);
}

function modelLoaded() {
  console.log("PoseNet Initialized");
}
function draw() {
  image(video, 0, 0, 300, 300);
  image(clown_nose, noseX, noseY, 40, 30);
}

function take_snapshot() {
  save("Clown Nose Filter.png");
}

function gotPoses(results) {
  if (results.length > 0) {
    console.log(results);
    noseX = results[0].pose.nose.x - 20;
    noseY = results[0].pose.nose.y - 13;
    lefteyeX = results[0].pose.leftEye.x;
    lefteyeY = results[0].pose.leftEye.y;
    righteyeX = results[0].pose.rightEye.x;
    righteyeY = results[0].pose.rightEye.y;

    console.log("nose x = " + noseX);
    console.log("nose y = " + noseY);
    console.log("Lefteye x = " + lefteyeX);
    console.log("Lefteye y = " + lefteyeY);
    console.log("right eye x = " + righteyeX);
    console.log("right eye y = " + righteyeY);
  } else {
    alert("Pose not detected!Please make sure you pose in front of the camera");
  }
}
