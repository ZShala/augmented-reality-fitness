let video;
let model;
let pose;
let skeleton;

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();
    model = ml5.poseNet(video, () => {
        console.log('PoseNet Model Loaded');
    });
    model.on('pose', (poses) => {
        if (poses.length > 0) {
            pose = poses[0].pose;
            skeleton = poses[0].skeleton;
        }
    });
}

function draw() {
    image(video, 0, 0);

    if (pose) {
        let dx1 = pose.rightShoulder.x - pose.rightElbow.x;
        let dy1 = pose.rightShoulder.y - pose.rightElbow.y;
        let dx2 = pose.rightElbow.x - pose.rightWrist.x;
        let dy2 = pose.rightElbow.y - pose.rightWrist.y;
        let a1 = Math.atan2(dy1, dx1);
        let a2 = Math.atan2(dy2, dx2);
        let a = parseInt((a2 - a1) * 180 / Math.PI + 360) % 360;

        if ((a >= 230 && a <= 260) || (a >= 100 && a <= 150)) {
            for (let i = 0; i < pose.keypoints.length; i++) {
                let x = pose.keypoints[i].position.x;
                let y = pose.keypoints[i].position.y;
                fill(71, 211, 202);
                ellipse(x, y, 16, 16);
            }

            for (let i = 0; i < skeleton.length; i++) {
                let a = skeleton[i][0];
                let b = skeleton[i][1];
                strokeWeight(2);
                stroke(71, 211, 202);
                line(a.position.x, a.position.y, b.position.x, b.position.y);
            }
        } else {

            for (let i = 0; i < pose.keypoints.length; i++) {
                let x = pose.keypoints[i].position.x;
                let y = pose.keypoints[i].position.y;
                fill(255, 0, 0);
                ellipse(x, y, 16, 16);
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