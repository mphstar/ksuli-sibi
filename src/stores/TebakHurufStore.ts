import { create } from "zustand";

type JawabanType = {
  jawaban: string;
  isCorrect: boolean;
};

type TebakHurufType = {
  listSoal: any[];
  setListSoal: (listSoal: any[]) => void;
  soalIndex: number;
  setSoalIndex: (index: number) => void;
  score: number;
  setScore: (score: number) => void;
  jawaban: JawabanType[];
  setJawaban: (jawaban: JawabanType[]) => void;
  addJawaban: (jawaban: JawabanType) => void;
};

const useTebakHurufStore = create<TebakHurufType>((set) => ({
  listSoal: [],
  setListSoal: (listSoal) => set({ listSoal: listSoal }),
  soalIndex: 0,
  setSoalIndex: (index) => set({ soalIndex: index }),
  score: 0,
  setScore: (score) => set({ score: score }),
  jawaban: [],
  setJawaban: (jawaban) => set({ jawaban: jawaban }),
  addJawaban: (jawaban) =>
    set((state) => ({ jawaban: [...state.jawaban, jawaban] })),
}));

export default useTebakHurufStore;
