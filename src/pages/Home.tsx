import LayoutPage from "@/components/templates/LayoutPage";
import { useEffect, useRef, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import * as tf from "@tensorflow/tfjs";
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";
import calcLandmarkList from "@/utils/CalculateLandmark";
import preProcessLandmark from "@/utils/PreProcessLandmark";
import ConvertResult from "@/utils/ConvertResult";
import useNavbarStore from "@/stores/NavbarStore";
import { AnimatePresence, motion } from "framer-motion";

type PredictResult = {
  abjad: String;
  acc: String;
};

const Home = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loadCamera, setLoadCamera] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [resultPredict, setResultPredict] = useState<PredictResult>({
    abjad: "",
    acc: "",
  });

  let model: tf.LayersModel;
  let handLandmarker: HandLandmarker;

  const [handPresence, setHandPresence] = useState(false);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      //   setLoadCamera(true);
      await initializeHandDetection();
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  const loadModel = async () => {
    setLoadCamera(false);
    try {
      const lm = await tf.loadLayersModel("/model/model.json");
      model = lm;

      const emptyInput = tf.tensor2d([[0, 0]]);

      model.predict(emptyInput) as tf.Tensor;

      setLoadCamera(true);
    } catch (error) {
      //   console.error("Error loading model:", error);
    }
  };

  const initializeHandDetection = async () => {
    try {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );
      handLandmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
        },
        numHands: 2,
        runningMode: "VIDEO",
      });

      detectHands();
    } catch (error) {
      console.error("Error initializing hand detection:", error);
    }
  };

  const makePrediction = async (finalResult: any) => {
    const input = tf.tensor2d([finalResult]);

    // Melakukan prediksi
    const prediction = model.predict(input) as tf.Tensor;

    const result = prediction.dataSync();

    const maxEntry = Object.entries(result).reduce((max, entry) => {
      const [, value] = entry;
      return value > max[1] ? entry : max;
    });

    // maxEntry sekarang berisi [key, value] dengan nilai terbesar
    const [maxKey, maxValue] = maxEntry;

    const percentageValue = (maxValue * 100).toFixed(2) + "%";

    setResultPredict({
      abjad: ConvertResult(parseInt(maxKey)),
      acc: percentageValue,
    });

    // Hapus tensor
    input.dispose();
    prediction.dispose();
  };

  const detectHands = async () => {
    if (videoRef.current && videoRef.current.readyState >= 2) {
      const detections = handLandmarker.detectForVideo(
        videoRef.current,
        performance.now()
      );

      setHandPresence(detections.handedness.length > 0);
      // Assuming detections.landmarks is an array of landmark objects
      if (detections.landmarks) {
        if (detections.handednesses.length > 0) {
          console.log(detections);

          if (detections.handednesses[0][0].displayName === "Right") {
            const landm = detections.landmarks[0].map((landmark) => landmark);

            const calt = calcLandmarkList(videoRef.current, landm);
            const finalResult = preProcessLandmark(calt);

            makePrediction(finalResult);
          } else {
            setHandPresence(false);
          }
        }
      }
    }
    requestAnimationFrame(detectHands);
  };

  const [info, setInfo] = useState(true);

  const store = useNavbarStore();

  useEffect(() => {
    store.setNavSelected("home");

    loadModel();
    startWebcam();

    setLoadCamera(true);

    return () => {
      if (handLandmarker) {
        handLandmarker.close();
      }
    };
  }, []);

  return (
    <LayoutPage>
      <AnimatePresence>
        {info && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            role="alert"
            className="alert alert-horizontal mt-4 flex items-center justify-between"
          >
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-info h-6 w-6 shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <p className="ml-2">
                Gunakan tangan kanan dan pastikan gambar pada kamera terlihat
                jelas
              </p>
            </div>
            <button
              onClick={() => setInfo(false)}
              className="btn btn-sm btn-outline"
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col flex-1 py-4">
        {loadCamera ? (
          <div className="rounded-md overflow-hidden relative">
            {handPresence && (
              <div className="top-6 left-6 absolute flex gap-2 items-center bg-white text-black rounded-md drop-shadow px-3 py-2">
                <FaCircleCheck className="text-green-500" />
                <h1 className="text-2xl font-semibold text-center">
                  {resultPredict.abjad} ({resultPredict.acc})
                </h1>
              </div>
            )}
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full z-20"
            />
            <video
              ref={videoRef}
              className="w-full max-h-[80svh] object-cover"
              autoPlay
              playsInline
            ></video>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1">
            <div className="loader"></div>
            <p className="mt-4 text-lg text-gray-700">Loading...</p>
          </div>
        )}
      </div>
    </LayoutPage>
  );
};

export default Home;
