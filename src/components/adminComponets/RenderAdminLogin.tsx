"use client";
import { useEffect } from "react";
import { useAppSelector } from "@/hooks/hooks";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";

export interface Admin {
  _id: string;
  username: string;
  password: string;
}

const RenderctHandler = () => {
  const router = useRouter();
  const admin = useAppSelector((state: RootState) => state.admin.user);

  useEffect(() => {
    if (admin) {
      router.replace("/admin/dashbord");
    } else {
      router.replace("/admin-login");
    }
  }, [admin, router]);

  return null;
};

export default RenderctHandler;
