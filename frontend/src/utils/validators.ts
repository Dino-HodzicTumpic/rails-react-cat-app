export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const hasLetter = (password: string): boolean => {
  return /[a-zA-Z]/.test(password);
};

export const hasNumberOrSpecial = (password: string): boolean => {
  return /[\d!@#$%^&*()?]/.test(password);
};

export const hasMinLength = (password: string): boolean => {
  return password.length >= 6;
};

export const isValidPassword = (password: string): boolean => {
  return (
    hasLetter(password) &&
    hasNumberOrSpecial(password) &&
    hasMinLength(password)
  );
};
