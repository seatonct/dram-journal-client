export const loginUser = (user) => {
  return fetch("http://localhost:8000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      username: user.username,
      password: user.password,
    }),
  }).then((res) => res.json());
};

export const registerUser = (newUser) => {
  return fetch("http://localhost:8000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(newUser),
  }).then((res) => res.json());
};

export const getCurrentUser = async () => {
  const res = await fetch("http://localhost:8000/dramapi/current_user", {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const user = res.json();
  return user;
};
