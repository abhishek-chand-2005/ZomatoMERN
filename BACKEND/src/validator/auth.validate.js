const validateRegisterInput = (username, password, email) => {
  if (!username || !password || !email) {
    return 'All fields are required';
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters long';
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    return 'Invalid email format';
  }
  return null;
};

const validateLoginInput = (username, password) => {
  if (!username || !password) {
    return 'Username and password are required';
  }
  return null;
};

module.exports = {
  validateRegisterInput,
  validateLoginInput
};