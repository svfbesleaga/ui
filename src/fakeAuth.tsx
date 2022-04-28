import { LoginFormState } from "./session";

const userList: LoginFormState[] = [
  {
    email: "atreya@test.com",
    password: "admin"
  }
];

function register(userDetails: LoginFormState) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = userList.find(e => userDetails.email === e.email);
      if (user) {
        reject();
        return new Error("user already registered!");
      } else {
        userList.push(userDetails);
        resolve();
      }
    }, 2000);
  });
}

function signin(userDetails: LoginFormState) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = userList.find(e => userDetails.email === e.email);
      if (user) {
        resolve();
      } else {
        reject();
        return new Error("user not found!");
      }
    }, 2000);
  });
}

export { signin, register };
