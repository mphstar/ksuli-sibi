import * as tf from "@tensorflow/tfjs";
import { getTensorFlowModel, saveTensorFlowModel } from "./indexedDBHelper";

let model: tf.LayersModel | null = null;

export async function loadTensorFlowModel(): Promise<tf.LayersModel> {
  if (model) return model; // Jika model sudah dimuat, langsung kembalikan

  model = await getTensorFlowModel();

  if (!model) {
    console.log("🔄 Model TensorFlow tidak ditemukan di cache, mengunduh...");
    model = await tf.loadLayersModel("/model/model.json");
    await saveTensorFlowModel(model);
  } else {
    console.log("✅ Model TensorFlow ditemukan di cache, menggunakan model lokal.");
  }

  return model;
}
