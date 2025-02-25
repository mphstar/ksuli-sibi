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
  session: boolean;
  setSession: (session: boolean) => void;
  name: string;
  setName: (name: string) => void;
  isFinish: boolean;
  setIsFinish: (isFinish: boolean) => void;
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
  session: false,
  setSession: (session) => set({ session: session }),
  name: "",
  setName: (name) => set({ name: name }),
  isFinish: false,
  setIsFinish: (isFinish) => set({ isFinish: isFinish }),
}));

export default useTebakHurufStore;
