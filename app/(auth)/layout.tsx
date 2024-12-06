// app/(auth)/layout.tsx
import React from "react";
import Navbar from "../Components/Navbar";
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" bg-blue-400 min-h-[100vh]" >
        <Navbar />
        {children}
    </div>
  );
};

export default AuthLayout;
