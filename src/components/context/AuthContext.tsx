import React, { useState, useEffect } from "react";
import { CH, AUTH, ITM, DATA } from "../../types/type";

export const AuthContext = React.createContext<DATA>({
  data: null,
  authHandler: () => {},
  clean: () => {},
  error: {
    Paserr: "",
    Errmsg: "",
  },
});

const AuthContextProvider = (props: CH) => {
  const [data, setData] = useState<AUTH>({
    token: "",
    expiresIn: "",
    userId: "",
  });
  const [error, setError] = useState({
    Paserr: "",
    Errmsg: "",
  });
  const authHandler = (url: string, items: ITM) => {
    cleanErr();
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(items),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          const errmsg = data.error.message;
          if (errmsg === "EMAIL_EXISTS") {
            setError((prevst) => {
              return {
                ...prevst,
                Errmsg: "This user is already exists",
              };
            });
          } else if (
            errmsg ===
            "WEAK_PASSWORD : Password should be at least 6 characters"
          ) {
            setError((prevst) => {
              return {
                ...prevst,
                Paserr: "Password is weak",
              };
            });
          } else if (errmsg === "INVALID_PASSWORD") {
            setError((prevst) => {
              return {
                ...prevst,
                Paserr: "Invalid Password",
              };
            });
          } else if (errmsg === "EMAIL_NOT_FOUND") {
            setError((prevst) => {
              return {
                ...prevst,
                Errmsg: "Email not found",
              };
            });
          } else {
            setError({
              Errmsg: "",
              Paserr: "",
            });
          }
        } else {

          const currentTime = new Date().getTime()
          const expire:any = currentTime - parseInt(data.expiresIn)*1000
          localStorage.setItem("token", data.idToken);
          localStorage.setItem('expire',expire)
          console.log(data,'eeeee')
          setData({
            token: data.idToken,
            expiresIn: expire,
            userId: data.localId,
          });
        }
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const exp = localStorage.getItem('expire')
    if (token) {
      setData({ token: token, expiresIn: "", userId: "" });
    }
    console.log("cccccccccccc");
    const currentTime = new Date().getTime();
    console.log(data.expiresIn)
    let newExpire
    if(exp){
     newExpire = currentTime - parseInt(exp)
    }else{
       newExpire =  currentTime - data.expiresIn
    }
    console.log(newExpire,'newnwewexpitw')
    const timer = setTimeout(() => {
      cleanHandler();
    }, newExpire);

    return () => clearTimeout(timer);
  }, [data.expiresIn]);

  const cleanHandler = () => {
    setData({
    token: "",
    expiresIn: "",
    userId: "",
    });
    localStorage.removeItem("token");
  };
  const cleanErr = () => {
    setError({
      Errmsg: "",
      Paserr: "",
    });
  };
  return (
    <AuthContext.Provider
      value={{
        authHandler: authHandler,
        data: data,
        clean: cleanHandler,
        error: error,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
