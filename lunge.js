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
        let rx1 = pose.rightHip.x - pose.rightKnee.x;
        let ry1 = pose.rightHip.y - pose.rightKnee.y;
        let rx2 = pose.rightKnee.x - pose.rightAnkle.x;
        let ry2 = pose.rightKnee.y - pose.rightAnkle.y;
        let lx1 = pose.leftHip.x - pose.leftKnee.x;
        let ly1 = pose.leftHip.y - pose.leftKnee.y;
        let lx2 = pose.leftKnee.x - pose.leftAnkle.x;
        let ly2 = pose.leftKnee.y - pose.leftAnkle.y;

        let a1 = Math.atan2(ry1, rx1);
        let a2 = Math.atan2(ry2, rx2);
        let b1 = Math.atan2(ly1, lx1);
        let b2 = Math.atan2(ly2, lx2);
        let a = parseInt((a2 - a1) * 180 / Math.PI + 360) % 360;
        let b = parseInt((b2 - b1) * 180 / Math.PI + 360) % 360;

        if ((a >= 100 && a <= 185) && (b >= 45 && b <= 90)) {
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