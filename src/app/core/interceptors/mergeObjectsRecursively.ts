export const mergeObjectsRecursively = (
  objects: Record<string, unknown>[]
): Record<string, unknown> => {
  const mergedObject: Record<string, unknown> = {};

  for (const obj of objects) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];

        // Check if the value is an object and not null
        if (typeof value === "object" && value !== null) {
          // If mergedObject[key] is not an object, initialize it as an empty object
          if (
            typeof mergedObject[key] !== "object" ||
            mergedObject[key] === null
          ) {
            mergedObject[key] = {};
          }

          // Recursively merge objects
          mergedObject[key] = mergeObjectsRecursively([
            mergedObject[key] as Record<string, unknown>, // Ensure type safety
            value as Record<string, unknown>,
          ]);
        } else {
          // If the value is a primitive, just assign it
          mergedObject[key] = value;
        }
      }
    }
  }

  return mergedObject;
};
