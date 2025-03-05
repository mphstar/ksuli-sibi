import LayoutPage from "@/components/templates/LayoutPage";
import { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";
import calcLandmarkList from "@/utils/CalculateLandmark";
import preProcessLandmark from "@/utils/PreProcessLandmark";
import ConvertResult, { abjads } from "@/utils/ConvertResult";
import useNavbarStore from "@/stores/NavbarStore";
import ProgressBar from "@/components/molecules/ProgressBar";
import { MdOutlineQuiz } from "react-icons/md";
import useTebakHurufStore from "@/stores/TebakHurufStore";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// type PredictResult = {
//   abjad: String;
//   acc: String;
// };

const imagesToPreload = ["/assets/gif/betul.gif", "/assets/gif/salah.gif"];

const preloadImages = () => {
  imagesToPreload.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};

const Quiz = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loadCamera, setLoadCamera] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // const [setResultPredict] = useState<PredictResult>({
  //   abjad: "",
  //   acc: "",
  // });

  const [showAnswer, setShowAnswer] = useState(false);

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

  let previousResult: string[] = [];
  const [progress, setProgress] = useState(0);
  let noSoal = 0;
  let isLoading = false;
  const navigate = useNavigate();

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
    const [maxKey] = maxEntry;

    // const percentageValue = (maxValue * 100).toFixed(2) + "%";

    // setResultPredict({
    //   abjad: ConvertResult(parseInt(maxKey)),
    //   acc: percentageValue,
    // });

    let currentResult = ConvertResult(parseInt(maxKey));

    // Hapus tensor
    input.dispose();
    prediction.dispose();

    if (
      previousResult.length > 0 &&
      previousResult[previousResult.length - 1] === currentResult
    ) {
      previousResult.push(currentResult);
      setProgress((prev) => prev + 10);
    } else {
      previousResult = [currentResult];
      setProgress(10);
    }

    if (previousResult.length == 11) {
      isLoading = true;

      if (abjads[parseInt(maxKey)] === quizStore.listSoal[noSoal]) {
        quizStore.addJawaban({
          jawaban: abjads[parseInt(maxKey)],
          isCorrect: true,
        });
      } else {
        quizStore.addJawaban({
          jawaban: abjads[parseInt(maxKey)],
          isCorrect: false,
        });
      }

      setShowAnswer(true);

      setTimeout(() => {
        setShowAnswer(false);
        
        isLoading = false;
        setProgress(0);
        noSoal++;
        previousResult = [];
        quizStore.setSoalIndex(noSoal);

        if (noSoal === quizStore.listSoal.length) {
          quizStore.setSession(false);
          quizStore.setIsFinish(true);

          Swal.fire({
            title: "Loading",
            text: "Proses menyimpan data...",
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });

          navigate("/kuis/tebak-huruf");
        }
      }, 2000);
    }

    // console.log(previousResult);
  };

  const detectHands = async () => {
    if (showAnswer) {
      return;
    }

    if (videoRef.current && videoRef.current.readyState >= 2) {
      const detections = handLandmarker.detectForVideo(
        videoRef.current,
        performance.now()
      );

      setHandPresence(detections.handedness.length > 0);
      // Assuming detections.landmarks is an array of landmark objects
      if (detections.landmarks) {
        if (detections.handednesses.length > 0) {
          // console.log(detections);

          if (detections.handednesses[0][0].displayName === "Right") {
            const landm = detections.landmarks[0].map((landmark) => landmark);

            const calt = calcLandmarkList(videoRef.current, landm);
            const finalResult = preProcessLandmark(calt);

            if (!isLoading) {
              makePrediction(finalResult);
            }
          } else {
            setHandPresence(false);
            setProgress(0);
            previousResult = [];
          }
        } else {
          setProgress(0);
          previousResult = [];
        }
      }
    }
    requestAnimationFrame(detectHands);
  };

  const store = useNavbarStore();
  const quizStore = useTebakHurufStore();

  console.log(quizStore.jawaban);

  useEffect(() => {
    if (!quizStore.session) {
      window.location.href = "/kuis/tebak-huruf";
    }
  }, []);

  useEffect(() => {
    store.setNavSelected("kuis");
    preloadImages();

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
      <div
        className={`fixed inset-0 w-screen h-screen bg-black/60 ${
          showAnswer ? "opacity-100" : "opacity-0"
        }  z-[999] flex items-center justify-center pointer-events-none  ease-in-out`}
      >
        <div className="rounded-md px-3 py-2 text-white flex flex-col justify-center items-center gap-3">
          <img
            className="h-56"
            src={`/assets/gif/${
              quizStore.jawaban[quizStore.soalIndex]?.isCorrect
                ? "betul"
                : "salah"
            }.gif`}
            loading="eager"
            fetchPriority="high"
            alt={`Jawaban ${
              quizStore.jawaban[quizStore.soalIndex]?.isCorrect
                ? "Benar"
                : "Salah"
            }`}
          />
          <p className="text-center text-6xl font-bold">
            {quizStore.jawaban[quizStore.soalIndex]?.jawaban}
          </p>
          <h1 className="text-2xl font-semibold text-center">
            Jawaban kamu{" "}
            {quizStore.jawaban[quizStore.soalIndex]?.isCorrect
              ? "Benar"
              : "Salah"}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <MdOutlineQuiz size={18} />
        <h1 className="text-xl font-semibold">
          Soal: {quizStore.soalIndex + 1} / {quizStore.listSoal.length}
        </h1>
      </div>

      <div className="flex flex-col flex-1 py-4">
        {loadCamera ? (
          <div className="rounded-md overflow-hidden relative">
            {!showAnswer && (
              <div className="md:top-6 top-3 left-3 md:left-6 absolute flex gap-2 items-center bg-white text-black rounded-md drop-shadow px-3 py-2">
                <h1 className="md:text-2xl font-semibold text-center">
                  Tebak Huruf {quizStore.listSoal[quizStore.soalIndex]}
                </h1>
              </div>
            )}
            {handPresence && !showAnswer && (
              <div className="bottom-3 md:bottom-auto md:top-6 right-3 md:right-6 absolute flex gap-2 items-center bg-white text-black rounded-md drop-shadow px-3 py-2 w-fit">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="loader"></span>
                    <h1>Tahan Tangan..</h1>
                  </div>
                  <ProgressBar progress={progress} />
                </div>
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

export default Quiz;
