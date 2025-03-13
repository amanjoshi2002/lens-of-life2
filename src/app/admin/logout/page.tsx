"use client";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { useEffect } from "react";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    deleteCookie("isLoggedIn");
    router.push("/admin/login");
  }, [router]);

  return <div>Logging out...</div>;
};

export default Logout; 