export const abjads = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Tidak Dikenali",
];

const ConvertResult = (result: number) => {
  if (result < 0 || result > 23) {
    return "Tidak Dikenali";
  }

  return `Abjad ${abjads[result]}`;
};

export default ConvertResult;
