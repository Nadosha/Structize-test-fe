export const validateJson = (value: any) => {
  try {
    return value ? JSON.parse(value) : [];
  } catch (err) {
    return [];
  }
};
