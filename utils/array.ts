export function findUsedProperties(
  array1: [],
  array2: [],
  prop1: string,
  prop2: string,
): [] {
  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array2.length; j++) {
      if (array1[i][prop1] === array2[j][prop2]) {
        // @ts-expect-error generalized type
        array2[j].disabled = true
      }
    }
  }
  // @ts-expect-error generalized type
  return array2.sort((a, b) => a.disabled - b.disabled)
}
