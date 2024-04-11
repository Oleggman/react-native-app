const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isRegisterValid = (login, email, password, setError) => {
  if (login.length < 3) {
    setError("Логін повинен містити принаймні 3 символи");
    return false;
  }

  if (!emailRegex.test(email)) {
    setError("Введіть правильну адресу електронної пошти");
    return false;
  }

  if (password.length < 8 || password.length > 16) {
    setError("Пароль повинен містити від 8 до 16 символів");
    return false;
  }

  return true;
};

export const isLoginValid = (email, password, setError) => {
  if (!emailRegex.test(email)) {
    setError("Введіть правильну адресу електронної пошти");
    return false;
  }

  if (password.length < 8 || password.length > 16) {
    setError("Пароль повинен містити від 8 до 16 символів");
    return false;
  }

  return true;
};
