export const isValid = (v) => {
  if (typeof v !== "undefined" && v !== null) return true;
  return false;
};

export const formatMoney = (input) => {
  input = input.toString();
  const pos = input.indexOf(".");
  if (pos >= 0) {
    const left = input.substring(0, pos);
    let right = input.substring(pos + 1);
    if (right.length === 1) {
      right += "0";
    }
    if (right.length > 2) {
      right = right.substring(0, 2);
    }
    const result = `${left}.${right}`;
    return result;
  }

  return "0.00";
};
