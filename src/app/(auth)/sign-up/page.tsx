"use client";
import { useState } from "react";
import { SecondStep } from "./components/SecondStep";
import { FirstStep } from "./components/FirstStep";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [current, setCurrent] = useState<number>(0);
  const FormSteps = [FirstStep, SecondStep][current];
  const [username, setUserName] = useState<string | null>(null);
  const router = useRouter();

  const signUp = async (email: string, password: string) => {
    try {
      await fetch("/api/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });
      router.push("/login");
    } catch (error) {}
  };
  const nextPage = () => {
    setCurrent(current + 1);
  };
  return (
    <div>
      <FormSteps
        setUserName={setUserName}
        signUp={signUp}
        nextPage={nextPage}
      />
    </div>
  );
}
