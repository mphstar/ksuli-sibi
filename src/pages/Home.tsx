import LayoutPage from "@/components/templates/LayoutPage";
import { useEffect, useRef, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import useNavbarStore from "@/stores/NavbarStore";
import MediapipeHelper from "@/helper/MediapipeHelper";
import DetectionHelper from "@/helper/DetectionHelper";

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

  const [handPresence, setHandPresence] = useState(false);

  const onHandDetected = async () => {
    if (!mediapipeHelper || !detectionHelper) {
      return;
    }

    mediapipeHelper.detectHands();

    const result = mediapipeHelper.getResult();
    if (result.handPresence) {
      // console.log("Hand Detected");
      setHandPresence(true);

      const predict = await detectionHelper.makePrediction(result.finalResult);

      if (predict) {
        setResultPredict((prevState) => ({
          ...prevState,
          ...predict,
        }));
      }
    } else {
      setHandPresence(false);
    }

    requestAnimationFrame(onHandDetected);
  };

  const startWebcam = async () => {
    try {
      console.log("Requesting camera access...");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        mediapipeHelper = new MediapipeHelper(videoRef);
        detectionHelper = new DetectionHelper();
        console.log("Camera access granted and helpers initialized.");
      }

      setLoadCamera(true);
      onHandDetected();
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  const store = useNavbarStore();
  let mediapipeHelper: MediapipeHelper;
  let detectionHelper: DetectionHelper;

  useEffect(() => {
    store.setNavSelected("home");

    startWebcam();

    return () => {
      
    };
  }, []);

  return (
    <LayoutPage>
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
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
            <p className="mt-4 text-lg text-gray-700">Loading...</p>
          </div>
        )}
      </div>
    </LayoutPage>
  );
};

export default Home;
