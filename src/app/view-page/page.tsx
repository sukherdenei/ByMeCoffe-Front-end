import React from "react";
import { DashboardProfile } from "../_components/DashboardProfile";
import { PersonalPage } from "../_components/PersonalPage";
import { AddCoverImg } from "../_components/AddCoverImg";
import { Header } from "../_components/Header.";

const Page = () => {
  return (
    <div>
      <Header />
      <AddCoverImg />
      <div className="w-screen px-[80px] flex gap-5 justify-center mt-[-86px] ">
        <PersonalPage />
        <DashboardProfile />
      </div>
    </div>
  );
};

export default Page;
