"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { RecentTransaction } from "@/app/_components/RecentTransation";
import { profile } from "console";
import { Loader } from "@/app/_components/Loader";
import { SupporterPage } from "@/app/_components/SupporterPage";

type userType = {
  id: string;
  name: string;
  email: string;
};

const GetNeon = () => {
  const [usersNeon, setUsersNeon] = useState<userType[] | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("/api/user");
        setUsersNeon(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    getUsers();
  }, []);
  console.log(usersNeon, "usersNeon");

  return (
    <div className="w-[955px] flex flex-col gap-6 px-6">
      {usersNeon ? (
        <div>
          {usersNeon.map((user) => (
            <RecentTransaction user={user} key={user.id} />
            // <SupporterPage user={user} key={user.id}/>
            // <p key={user.id[0]}>
            //   {user.username} {user.profile.about}
            //   {user.profile.socialmediaurl}
            // </p>v
          ))}
        </div>
      ) : (
        // <p>Loading...</p>
        <Loader />
      )}
    </div>
  );
};

export default GetNeon;
