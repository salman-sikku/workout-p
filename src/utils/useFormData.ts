import { useState } from "react";
import { useAppDispatch } from "@/hooks/hooks";
import { setAuth } from "@/features/authSlice";

interface FormData {
  fitnessLevel: string;
  goal: string;
  height: number | string;
  weight: number | string;
}

const userEmtyDate = {
  fitnessLevel: "beginner",
  goal: "e",
  height: 0,
  weight: 0,
};

export const useFormData = () => {
  const dispatch = useAppDispatch();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fitnessLevel: "",
    goal: "",
    height: "",
    weight: "",
  });
  const [errorMsg, setError] = useState("");

  const handleChange = (name: keyof FormData, value: string) => {
    setError("");
    if (name === "height" || name === "weight") {
      if (!isNaN(Number(value)) || value === "") {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value.length > 3 ? value.slice(0, 3) : value,
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        return formData.fitnessLevel !== "";
      case 2:
        return formData.goal !== "";
      case 3:
        if (
          formData.height === "" ||
          parseInt(formData.height as string) < 40 ||
          parseInt(formData.height as string) > 250
        ) {
          setError("Height must be between 40 to 250 cm");
          return false;
        }
        return true;
      case 4:
        if (
          formData.weight === "" ||
          parseInt(formData.weight as string) < 30 ||
          parseInt(formData.weight as string) > 350
        ) {
          setError("Weight must be between 30 to 350 kg");
          return false;
        }
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handleForm = async (e: any, router: any) => {
    e.preventDefault();
    try {
      dispatch(setAuth({ user: formData }));
      router.push("/homepage");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleSkip = (router: any) => {
    dispatch(setAuth({ user: userEmtyDate }));
    router.push("/homepage");
  };

  return {
    step,
    formData,
    handleChange,
    handleNext,
    handleForm,
    errorMsg,
    handleSkip
  };
};
