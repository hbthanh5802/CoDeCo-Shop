export const getDifferencesAFromB = (arrA, arrB) => {
  const setA = new Set(arrA);
  const setB = new Set(arrB);
  return Array.from(setA.difference(setB));
};
