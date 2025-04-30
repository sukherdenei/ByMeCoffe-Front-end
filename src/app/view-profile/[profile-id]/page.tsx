"use client";
import { use } from "react";
import { useUser } from "@/app/_context/UserContext";
import { Header } from "@/app/_components/Header.";
import { CoverImg } from "@/app/_components/CoverImg";
import { SupporterPage } from "@/app/_components/SupporterPage";
import { DashboardProfile } from "@/app/_components/DashboardProfile";

export default function Page({
  params,
}: {
  params: Promise<{ "profile-id": string }>;
}) {
  const resolvedParams = use(params); // ⚠️ React 19+ use() hook ашиглана
  const profileId = resolvedParams["profile-id"];

  const { users } = useUser();
  const user = users?.find((u) => u.id === Number(profileId));
  console.log(user);
  return (
    <div>
      <Header />
      <CoverImg />
      <div className="w-screen px-[80px] flex gap-5 justify-center mt-[-86px] ">
        <SupporterPage user={user!} />
        <DashboardProfile />
      </div>
    </div>
  );
}
