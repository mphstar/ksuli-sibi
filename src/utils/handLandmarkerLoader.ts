import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";
import { getHandLandmarkerModel, saveHandLandmarkerModel } from "./indexedDBHelper";

let handLandmarker: HandLandmarker | null = null;

export async function loadHandLandmarker(): Promise<HandLandmarker> {
  if (handLandmarker) return handLandmarker; // Jika model sudah ada, langsung kembalikan

  let modelBlob = await getHandLandmarkerModel();

  if (!modelBlob) {
    console.log("🔄 Model Hand Landmarker tidak ditemukan di cache, mengunduh...");
    const response = await fetch(
      "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task"
    );
    modelBlob = await response.blob();
    await saveHandLandmarkerModel(modelBlob);
  } else {
    console.log("✅ Model Hand Landmarker ditemukan di cache, menggunakan model lokal.");
  }

  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
  );

  const modelURL = URL.createObjectURL(modelBlob);
  handLandmarker = await HandLandmarker.createFromOptions(vision, {
    baseOptions: { modelAssetPath: modelURL },
    numHands: 2,
    runningMode: "VIDEO",
  });

  return handLandmarker;
}
