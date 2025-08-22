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

interface UserInfoForm {
  name: string;
  age: string;
  gender: string;
  weight: string;
  height: string;
  smoking: string;
}

type SymptomKey = keyof SymptomsState;
type MedicalKey = keyof MedicalHistoryState;

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

  const [error, setError] = useState<string>("");

  useEffect(() => {
    const data = localStorage.getItem("userInfo");
    if (data) {
      setUserInfo(JSON.parse(data) as UserInfoForm);
    } else {
      router.push("/user-info");
    }
  }, [router]);

  const handleSymptomChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as SymptomKey;
    setSymptoms({ ...symptoms, [name]: e.target.checked });
  };

  const handleMedicalChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = e.target.name as MedicalKey;
    setMedicalHistory({ ...medicalHistory, [name]: e.target.value });
  };

  const handleSubmit = () => {
    const symptomSelected = Object.values(symptoms).some((val) => val);
    const medicalComplete = Object.values(medicalHistory).every(
      (val) => val !== ""
    );

    if (!symptomSelected) {
      setError("⚠️ Please select at least one symptom.");
      return;
    }
    if (!medicalComplete) {
      setError("⚠️ Please complete all medical history fields.");
      return;
    }

    setError("");
    localStorage.setItem("symptoms", JSON.stringify(symptoms));
    localStorage.setItem("medicalHistory", JSON.stringify(medicalHistory));
    router.push("/report");
  };

  if (!userInfo) return null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 via-purple-900 to-black px-4">
      <div className="bg-gray-900 text-white shadow-2xl rounded-2xl p-10 w-full max-w-5xl">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Medical & Symptom Checklist
        </h2>
        <p className="text-center text-gray-400 mb-8">
          Please provide your current symptoms and medical history to help us
          generate your report.
        </p>

        {error && (
          <div className="mb-6 text-red-400 text-center font-medium">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Symptoms Section */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Symptoms</h3>
            <div className="flex flex-col gap-3">
              {(
                [
                  { label: "Cough", name: "cough" },
                  { label: "Fever", name: "fever" },
                  { label: "Night Sweats", name: "nightSweats" },
                  { label: "Weight Loss", name: "weightLoss" },
                  { label: "Fatigue", name: "fatigue" },
                  { label: "Chest Pain", name: "chestPain" },
                  { label: "Loss Of Appetite", name: "lossOfAppetite" },
                ] as { label: string; name: SymptomKey }[]
              ).map((symptom) => (
                <label
                  key={symptom.name}
                  className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
                >
                  <input
                    type="checkbox"
                    name={symptom.name}
                    checked={symptoms[symptom.name]}
                    onChange={handleSymptomChange}
                    className="accent-blue-500 w-5 h-5"
                  />
                  <span className="text-lg">{symptom.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Medical History Section */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Medical History</h3>
            <div className="flex flex-col gap-4">
              {(
                [
                  { label: "Diabetes", name: "diabetes" },
                  { label: "HIV Status", name: "hivStatus" },
                  {
                    label: "Immunosuppressants prior to TB treatment",
                    name: "immunosuppressants",
                  },
                ] as { label: string; name: MedicalKey }[]
              ).map((item) => (
                <div
                  key={item.name}
                  className="flex flex-col gap-2 p-3 bg-gray-700 rounded-lg"
                >
                  <span className="text-lg font-medium">{item.label}</span>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={item.name}
                        value="Positive"
                        checked={medicalHistory[item.name] === "Positive"}
                        onChange={handleMedicalChange}
                        className="accent-blue-500"
                      />
                      Positive
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={item.name}
                        value="Negative"
                        checked={medicalHistory[item.name] === "Negative"}
                        onChange={handleMedicalChange}
                        className="accent-blue-500"
                      />
                      Negative
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-8 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition duration-300 font-semibold text-lg"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

