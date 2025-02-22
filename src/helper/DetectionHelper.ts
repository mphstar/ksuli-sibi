import ConvertResult from "@/utils/ConvertResult";
import * as tf from "@tensorflow/tfjs";

class DetectionHelper {
    model: tf.LayersModel | undefined;

    constructor() {
        this.loadModel();
    }

    loadModel = async () => {
        try {
          const lm = await tf.loadLayersModel("/model/model.json");
          this.model = lm;
        //   const emptyInput = tf.tensor2d([[0, 0]]);
        //   this. model.predict(emptyInput) as tf.Tensor;
        } catch (error) {
          //   console.error("Error loading model:", error);

        }
      };

    makePrediction = async (finalResult: any) => {
        const input = tf.tensor2d([finalResult]);

        if(!this.model) {
            console.error("Model is not initialized.");
            return;
        }
    
        // Melakukan prediksi
        const prediction = this.model.predict(input) as tf.Tensor;
    
        const result = prediction.dataSync();
    
        const maxEntry = Object.entries(result).reduce((max, entry) => {
          const [, value] = entry;
          return value > max[1] ? entry : max;
        });
    
        // maxEntry sekarang berisi [key, value] dengan nilai terbesar
        const [maxKey, maxValue] = maxEntry;
    
        const percentageValue = (maxValue * 100).toFixed(2) + "%";
    
        // Hapus tensor
        input.dispose();
        prediction.dispose();

        return {
            abjad: ConvertResult(parseInt(maxKey)),
            acc: percentageValue
        }
        
      };
}

export default DetectionHelper;