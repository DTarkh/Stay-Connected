import React from "react";

const ErrorPage = ({
  title,
  message,
}: {
  title: string;
  message: string;
}) => (
  <main className="flex flex-col min-h-screen justify-center gap-5 bg-blue-400 p-4">
    <div className="flex flex-col items-center gap-4 w-full">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-lg">{message}</p>
    </div>
  </main>
);

export default ErrorPage;
