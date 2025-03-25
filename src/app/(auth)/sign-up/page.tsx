"use client";
import { useState } from "react";
import { SecondStep } from "./components/SecondStep";
import { FirstStep } from "./components/FirstStep";

export default function SignUpPage() {
  const [current, setCurrent] = useState<number>(0);
  const FormSteps = [FirstStep, SecondStep][current];
  const nextPage = () => {
    setCurrent(current + 1);
  };
  return (
    <div>
      <FormSteps nextPage={nextPage} />
    </div>
  );
}
