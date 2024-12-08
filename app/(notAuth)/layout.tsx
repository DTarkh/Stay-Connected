import React from "react";
import { cookies } from "next/headers"; 
import { redirect } from "next/navigation"; 

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get("refreshToken"); 

  if (refreshToken) {
    redirect("/home");
  }

  return (
    <div className="bg-blue-400 min-h-[100vh]">
      {children}
    </div>
  );
};

export default AuthLayout;
