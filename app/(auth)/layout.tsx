// app/(auth)/layout.tsx
import React from "react";
import Navbar from "../Components/Navbar";
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" bg-blue-400" >
        <Navbar />
        {children}
    </div>
  );
};

export default AuthLayout;
