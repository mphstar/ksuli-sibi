import { create } from "zustand";

const soal = [
  "INDONESIA",
  "KUCING",
  "SIBI",
  "MAHASISWA",
  "KSULI",
  // "INFORMATIKA",
  // "CODING",
  // "WHATSAPP",
  // "INSTAGRAM",
  // "TEMAN",
];

type MenyusunHurufType = {
  listSoal: string[];
  setListSoal: (listSoal: any[]) => void;
  soalIndex: number;
  setSoalIndex: (index: number) => void;
  time: number;
  setTime: (time: number) => void;
  session: boolean;
  setSession: (session: boolean) => void;
  name: string;
  setName: (name: string) => void;
  isFinish: boolean;
  setIsFinish: (isFinish: boolean) => void;
};

const useMenyusunHurufStore = create<MenyusunHurufType>((set) => ({
  listSoal: soal,
  setListSoal: (listSoal) => set({ listSoal: listSoal }),
  soalIndex: 0,
  setSoalIndex: (index) => set({ soalIndex: index }),
  time: 0,
  setTime: (time) => set({ time: time }),
  session: false,
  setSession: (session) => set({ session: session }),
  name: "",
  setName: (name) => set({ name: name }),
  isFinish: false,
  setIsFinish: (isFinish) => set({ isFinish: isFinish }),
}));

export default useMenyusunHurufStore;
