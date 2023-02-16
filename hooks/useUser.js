import Router from "next/router";
import { useState } from "react";

const useUser = () => {
  const [islogged, setIsLogged] = useState(true);

  const signIn = async (email, password) => {
    const data = {
      email: email.value,
      password: password.value,
    };

    await fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "Logged In") {
          alert(res.message);
          localStorage.setItem("token", res.token);
          localStorage.setItem("userRole", res.userRole[0].name);
          Router.push("/store");
        } else {
          alert(res.message);
        }
      });
  };

  const signUp = async () => {
    const data = {
      username: username.value,
      email: email.value,
      password: password.value
    }

    await fetch("http://localhost:4000/api/auth/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.message)
        Router.push("/login")
      });
    };

  const logOut = () => {
      if (!islogged) {
        setIsLogged(false);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        Router.push("/login");
      }
  };

  return {
    signIn,
    signUp,
    logOut
  }
};

export default useUser;
