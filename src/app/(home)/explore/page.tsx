// import { RecentTransaction } from "@/app/_components/RecentTransation";
// import { UserProfile } from "@/app/_components/UserProfile";
// import axios from "axios";
// import { useState } from "react";
// import { userType } from "../../../../util/type";

// export default async function Home() {
//   //   const [usersNeon, setUsersNeon] = useState<userType[] | null>(null);
//   // const getUsers = await axios.get ("/api/users")
//   // const data = await getUsers.json()

//   return (
//     <div className="w-[955px] flex flex-col gap-6 px-6 ">
//       <UserProfile />
//       <RecentTransaction />
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserProfile } from "@/app/_components/UserProfile";
import { RecentTransaction } from "@/app/_components/RecentTransation";
import { profile } from "console";
import { Loader } from "@/app/_components/Loader";

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
      {/* <UserProfile /> */}

      {usersNeon ? (
        <div>
          {usersNeon.map((user) => (
            <RecentTransaction user={user} key={user.id} />
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
