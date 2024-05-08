import React, { Suspense } from "react";
import BasicDeatilsSection from "./_components/BasicDeatilsSection";

const page = async () => {
  return (
    <div className="w-11/12 md:w-1/2 h-full mx-auto mt-5">
      <BasicDeatilsSection />
    </div>
  );
};

export default page;
