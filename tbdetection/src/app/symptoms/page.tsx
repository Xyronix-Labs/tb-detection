"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

interface SymptomsState {
  cough: boolean;
  fever: boolean;
  nightSweats: boolean;
  weightLoss: boolean;
  fatigue: boolean;
  chestPain: boolean;
  lossOfAppetite: boolean;
}

interface MedicalHistoryState {
  diabetes: string;
  hivStatus: string;
  immunosuppressants: string;
}

// Reuse from user-info page if exported, but we redefine here for now:
interface UserInfoForm {
  name: string;
  age: string;
  gender: string;
  weight: string;
  height: string;
  smoking: string;
}

export default function Symptoms() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfoForm | null>(null);

  const [symptoms, setSymptoms] = useState<SymptomsState>({
    cough: false,
    fever: false,
    nightSweats: false,
    weightLoss: false,
    fatigue: false,
    chestPain: false,
    lossOfAppetite: false,
  });

  const [medicalHistory, setMedicalHistory] = useState<MedicalHistoryState>({
    diabetes: "",
    hivStatus: "",
    immunosuppressants: "",
  });

  useEffect(() => {
    const data = localStorage.getItem("userInfo");
    if (data) {
      setUserInfo(JSON.parse(data) as UserInfoForm);
    } else {
      router.push("/user-info");
    }
  }, [router]);

  const handleSymptomChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSymptoms({ ...symptoms, [e.target.name]: e.target.checked });
  };

  const handleMedicalChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setMedicalHistory({ ...medicalHistory, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const symptomSelected = Object.values(symptoms).some((val) => val);
    const medicalComplete = Object.values(medicalHistory).every(
      (val) => val !== ""
    );

    if (!symptomSelected) {
      alert("Please select at least one symptom");
      return;
    }
    if (!medicalComplete) {
      alert("Please complete all medical history fields");
      return;
    }

    localStorage.setItem("symptoms", JSON.stringify(symptoms));
    localStorage.setItem("medicalHistory", JSON.stringify(medicalHistory));
    router.push("/report");
  };

  if (!userInfo) return null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 via-purple-900 to-black px-4">
      {/* TODO: Insert JSX form for symptoms + medical history */}
    </div>
  );
}
