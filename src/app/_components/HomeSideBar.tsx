import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import React from "react";

export const HomeSideBar = () => {
  return (
    <div className="w-[251px] flex flex-col items-start gap-1 ">
      <Link href={"/default"}>
      <Button 
        variant={"ghost"}
        className="w-[250px] h-[36px] cursor-pointer text-[14px] font-[500] leading-[20px] flex items-center justify-start "
      >
        Home
      </Button>
      </Link>
      <Button
        variant={"ghost"}
        className="w-[250px] h-[36px] cursor-pointer text-[14px] font-[500] leading-[20px]  flex items-center justify-start "
      >
        <Link href={"/explore"}> Explore</Link>
      </Button>
      <Button
        variant={"ghost"}
        className="w-[250px] h-[36px] cursor-pointer  flex  justify-start "
      >
        <Link href={"/view-page"}>
        <h4 className="text-[14px] font-[500] leading-[20px] ml-1 ">
          View page
        </h4>
        </Link>
        <ExternalLink />
      </Button>
      <Button
        variant={"ghost"}
        className="w-[250px] h-[36px] cursor-pointer text-[14px] font-[500] leading-[20px] flex items-center justify-start "
      >
        <Link href={"/acc-settings"}> Account settings</Link>
      </Button>
    </div>
  );
};
