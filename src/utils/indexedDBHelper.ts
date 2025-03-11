import * as tf from "@tensorflow/tfjs";

const DB_NAME = "ModelCacheDB";
const STORE_NAME = "models";
const TENSORFLOW_MODEL_KEY = "tensorflow_model";
const HAND_LANDMARKER_MODEL_KEY = "hand_landmarker_model";

// Membuka IndexedDB
export function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// 🟢 **Simpan Model TensorFlow.js ke IndexedDB**
export async function saveTensorFlowModel(model: tf.LayersModel): Promise<void> {
  await model.save(`indexeddb://${TENSORFLOW_MODEL_KEY}`);
}

// 🟢 **Ambil Model TensorFlow.js dari IndexedDB**
export async function getTensorFlowModel(): Promise<tf.LayersModel | null> {
  try {
    return await tf.loadLayersModel(`indexeddb://${TENSORFLOW_MODEL_KEY}`);
  } catch (error) {
    console.warn("⚠️ Model TensorFlow tidak ditemukan di cache:", error);
    return null;
  }
}

// 🟢 **Simpan Model Hand Landmarker ke IndexedDB**
export async function saveHandLandmarkerModel(blob: Blob): Promise<void> {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);
  store.put(blob, HAND_LANDMARKER_MODEL_KEY);
}

// 🟢 **Ambil Model Hand Landmarker dari IndexedDB**
export async function getHandLandmarkerModel(): Promise<Blob | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(HAND_LANDMARKER_MODEL_KEY);

    request.onsuccess = () => resolve(request.result as Blob | null);
    request.onerror = () => reject(request.error);
  });
}
