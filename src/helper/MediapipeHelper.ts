import calcLandmarkList from "@/utils/CalculateLandmark";
import preProcessLandmark from "@/utils/PreProcessLandmark";
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";
import { RefObject } from "react";

class MediapipeHelper {
  handLandmarker: HandLandmarker | undefined;
  videoRef: React.RefObject<HTMLVideoElement>;

  private result = {
    handPresence: false,
    finalResult: [],
  };

  getResult = () => {
    return this.result;
  };

  constructor(video: RefObject<HTMLVideoElement>) {
    this.videoRef = video;
    this.initializeHandDetection();
  }

  initializeHandDetection = async () => {
    try {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );
      this.handLandmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
        },
        numHands: 2,
        runningMode: "VIDEO",
      });

      this.detectHands();
    } catch (error) {
      console.error("Error initializing hand detection:", error);
    }
  };

  detectHands = async () => {
    if (this.videoRef.current === null) {
      console.error("Video is not initialized.");
      return;
    }

    if (this.videoRef && this.videoRef.current.readyState >= 2) {
      if (!this.handLandmarker) {
        console.error("HandLandmarker is not initialized.");
        return;
      }
      const detections = this.handLandmarker.detectForVideo(
        this.videoRef.current,
        performance.now()
      );

      this.result = {
        handPresence: false,
        finalResult: [],
      };

      // Assuming detections.landmarks is an array of landmark objects
      if (detections.landmarks) {
        if (detections.handednesses.length > 0) {
          //   console.log(detections);

          if (detections.handednesses[0][0].displayName === "Right") {
            const landm = detections.landmarks[0].map((landmark) => landmark);

            const calt = calcLandmarkList(this.videoRef.current, landm);
            const finalResult = preProcessLandmark(calt);

            this.result = {
              handPresence: true,
              finalResult: finalResult,
            };
          } else {
            this.result = {
              handPresence: false,
              finalResult: [],
            };
          }
        }
      }
      
    }
    requestAnimationFrame(this.detectHands);
  };
}

export default MediapipeHelper;
