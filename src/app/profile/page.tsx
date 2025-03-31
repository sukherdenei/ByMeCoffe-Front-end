"use client";
import { useState } from "react";
import { Header } from "../_components/Header.";
import { FirstStep } from "./components/FirstStep";
import { SecondStep } from "./components/SecondStep";

const ProfilePage = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const FormSteps = [FirstStep, SecondStep][currentStep];

  return (
    <div>
      <Header />
      <div className="flex w-screen justify-center mt-[91px]">
        <FormSteps currentStep={currentStep} setCurrentStep={setCurrentStep} />
      </div>
    </div>
  );
};
export default ProfilePage;
