let video;
let poseNet;
let pose;
let skeleton;

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, () => {
        console.log('poseNet ready');
    });
    poseNet.on('pose', (poses) => {
        // console.log(poses);
        if (poses.length > 0) {
            pose = poses[0].pose;
            skeleton = poses[0].skeleton;
        }
    });
}

function draw() {
    image(video, 0, 0);

    if (pose) {
        var dx1 = pose.rightHip.x - pose.rightKnee.x;
        var dy1 = pose.rightHip.y - pose.rightKnee.y;
        var dx2 = pose.rightKnee.x - pose.rightAnkle.x;
        var dy2 = pose.rightKnee.y - pose.rightAnkle.y;
        var a1 = Math.atan2(dy1, dx1);
        var a2 = Math.atan2(dy2, dx2);
        var a = parseInt((a2 - a1) * 180 / Math.PI + 360) % 360;
        console.log(a)
        if (a >= 60 && a <= 90) {
            for (let i = 0; i < pose.keypoints.length; i++) {
                let x = pose.keypoints[i].position.x;
                let y = pose.keypoints[i].position.y;
                fill(71, 211, 202);
                ellipse(x, y, 8, 8);
            }

            for (let i = 0; i < skeleton.length; i++) {
                let a = skeleton[i][0];
                let b = skeleton[i][1];
                strokeWeight(1);
                stroke(71, 211, 202);
                line(a.position.x, a.position.y, b.position.x, b.position.y);
            }
        } else {

            for (let i = 0; i < pose.keypoints.length; i++) {
                let x = pose.keypoints[i].position.x;
                let y = pose.keypoints[i].position.y;
                fill(255, 0, 0);
                ellipse(x, y, 8, 8);
            }

            for (let i = 0; i < skeleton.length; i++) {
                let a = skeleton[i][0];
                let b = skeleton[i][1];
                strokeWeight(2);
                stroke(255, 0, 0);
                line(a.position.x, a.position.y, b.position.x, b.position.y);
            }
        }
    }
}