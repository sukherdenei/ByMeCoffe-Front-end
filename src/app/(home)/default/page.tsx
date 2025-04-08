"use client";

import { UserProfile } from "@/app/_components/UserProfile";
import { useUser } from "@/app/_context/UserContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExternalLink, Search } from "lucide-react";
import Link from "next/link";
import React from "react";

const Explore = () => {
  const { users } = useUser();
  console.log("users", users);
  return (
    <div className="w-[957px] flex flex-col p-6 ">
      <UserProfile />
      <div className="w-full flex flex-col gap-6 items-start ">
        <div className="flex flex-col items-start gap-6  ">
          <h4 className="text-[20px] font-[600] leading-[28px] p-5">
            Recent transactions
          </h4>
        </div>
        <div className="flex w-full p-6 items-start rounded-lg border-[1px] border-border ">
          <div className="flex flex-col gap-3 items-start ">
            <div className="w-full flex justify-between items-center ">
              <div className="flex gap-3 items-center justify-between w-full">
                <Avatar>
                  <AvatarImage src="/Profile.png" />
                </Avatar>
                <div className="flex items-center gap-2 w-full">
                  <Avatar>
                    <AvatarFallback className="w-[24px] h-[28px]">
                      CN
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <h4 className="text-[20px] font-[600] leading-[28px] ">
                      Guest
                    </h4>
                    <p>instagram.com/welesley</p>
                  </div>
                </div>
                <div className="flex flex-col">
                  <p>+1$</p>
                  <p className="text-[12px]">10 hours ago</p>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-5 ">
              <div className="flex flex-col gap-2 items-start w-full ">
                <p className="text-[14px] font-[400] leading-[20px] w-full ">
                  Thank you for being so awesome everyday! You always manage to
                  brighten up my day when I’m feeling down. Although $1 isn’t
                  that much money it’s all I can contribute at the moment
                </p>
              </div>
            </div>
            <div className="flex items-start flex-col">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h5>John Doe</h5>
              <p>buymeacoffee.com/bdsadas</p>
              <p>Thank you for being so awesome everyday!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
