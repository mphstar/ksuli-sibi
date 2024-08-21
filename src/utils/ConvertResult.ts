const ConvertResult = (result: number) => {
  switch (result) {
    case 0:
      return "Abjad A";
    case 1:
      return "Abjad B";
    case 2:
      return "Abjad C";
    case 3:
      return "Abjad D";
    default:
      return "Unknown";
  }
};

export default ConvertResult;
