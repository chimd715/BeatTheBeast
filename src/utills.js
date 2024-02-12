export const resetAllRefs = (obj) => {
  Object.values(obj).forEach((ref) => {
    if (ref.current) {
      ref.current.value = '';
    }
  });
};

export const updateValueRef = (refObg, selectedData) => {
  Object.keys(refObg).forEach((fieldName) => {
    if (true) {
      refObg[fieldName].current.value = selectedData[fieldName] || '';
    }
  });
};
