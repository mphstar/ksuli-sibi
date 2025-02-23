import { motion } from "framer-motion";

type ProgressBarProps = {
  progress: number; // nilai antara 0 - 100
};

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
      <motion.div
        className="h-full bg-blue-500 rounded-full"
        style={{ width: `${progress}%` }}
        transition={{ ease: "easeInOut" }}
      />
    </div>
  );
}
