"use client"
import { useEffect } from "react";
import { useAppSelector } from "@/hooks/hooks";
import { useRouter } from "next/navigation";

interface User {
  fitnessLevel: string;
  goal: string;
  height: number | string;
  weight: number | string;
}

const RenderctHandler = () => {
  const router = useRouter();
  const user = useAppSelector(
    (state: { auth: { user: User | null } }) => state.auth.user
  );

  useEffect(() => {
    if (user) {
      router.replace('/homepage');
    } else {
      router.replace('/');
    }
  }, [user, router]);

  return null
};

export default RenderctHandler
