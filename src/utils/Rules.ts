export const isRequired = (val: string | number) => {
  return (val !== null && val !== '') || 'Field required';
};

export const maxLength = (val: string | number) => {
  return val.toString().length <= 10 || 'Please use maximum 10 characters';
};

export const numbersValidation = (val: string) => {
  return /^[1-9]\d*$/.test(val) || 'Only integers numbers';
};
