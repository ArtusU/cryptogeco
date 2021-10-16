function login() {
  const token = "12345";
  console.log("Logging in...");
  const user = {
    email: "test@mail.com",
    token: token,
    userId: 1,
  };
  localStorage.setItem("user", JSON.stringify(user));
  return user;
}

function logout() {
  console.log("Logging out...");
  localStorage.removeItem("user");
}

function isLoggedIn() {
  const user = localStorage.getItem("user");
  return user !== null;
}

function getUser() {
  return localStorage.getItem("user");
}

const authService = {
  login,
  logout,
  isLoggedIn,
  getUser,
};

export default authService;
