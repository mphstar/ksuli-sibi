import React from "react";
import HeaderPage from "../organisms/HeaderPage";
import FooterPage from "../organisms/FooterPage";

const LayoutPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-svh bg-ground">
      <HeaderPage />
      <main className="flex flex-col flex-1 container max-w-[1200px]">
        {children}
      </main>
      <FooterPage />
    </div>
  );
};

export default LayoutPage;
