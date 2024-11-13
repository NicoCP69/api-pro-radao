export const validatePassword = (password) => {
  const minLength = password.length >= 8;
  const hasSpecialChar = /[@$!%*#?&]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasLetter = /[A-Za-z]/.test(password);

  const errors = [];
  if (!minLength) errors.push('Le mot de passe doit contenir au moins 8 caractères');
  if (!hasSpecialChar)
    errors.push('Le mot de passe doit contenir au moins un caractère spécial (@$!%*#?&)');
  if (!hasNumber) errors.push('Le mot de passe doit contenir au moins un chiffre');
  if (!hasLetter) errors.push('Le mot de passe doit contenir au moins une lettre');

  return {
    isValid: minLength && hasSpecialChar && hasNumber && hasLetter,
    errors,
  };
};
