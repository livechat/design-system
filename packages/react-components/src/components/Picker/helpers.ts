export const findIndicesWhere = <T>(
  array: T[],
  predicate: (item: T) => boolean
): number[] => {
  const indices: number[] = [];
  array.forEach((item, index) => {
    if (predicate(item)) {
      indices.push(index);
    }
  });

  return indices;
};
