import React from "react";
import { DashboardProfile } from "../../_components/DashboardProfile";
import { CoverImg } from "../../_components/CoverImg";
import { SupporterPage } from "@/app/_components/SupporterPage";
import { Header } from "@/app/_components/Header.";
import { useUser } from "@/app/_context/UserContext";

const ViewProfile = () => {
  const { users } = useUser();
  return (
    <div>
      <Header />
      <CoverImg />
      <div className="w-screen px-[80px] flex gap-5 justify-center mt-[-86px] ">
        <SupporterPage />
        <DashboardProfile />
      </div>
    </div>
  );
};

export default ViewProfile;
