"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { userType } from "../../../util/type";

type UserContextType = {
  users: userType[];
};

const userContext = createContext<UserContextType>(
  [] as unknown as UserContextType
);

export const useUser = () => {
  return useContext(userContext);
};

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<userType[]>([]);

  const getUser = async () => {
    console.log("get user called");
    try {
      const res = await fetch("/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonData = await res.json();

      setUsers(jsonData);

      console.log("get user jsonData", jsonData);

      if (jsonData.error) {
        alert(jsonData.message);
        return;
      }
    } catch (error) {
      console.log("error", error);
      alert("error in getting user");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <userContext.Provider value={{ users: users }}>
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
