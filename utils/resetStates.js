export const resetStates = (...args) => {
  args.forEach((state) => state(""));
};
