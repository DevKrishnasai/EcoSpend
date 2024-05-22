import React, { Suspense } from "react";
import BasicDeatilsSection from "./_components/BasicDeatilsSection";
import CategoryMangeSection from "./_components/CategoryMangeSection";

const page = async () => {
  return (
    <div className="w-11/12 md:w-3/4 h-full mx-auto mt-5 space-y-4">
      <BasicDeatilsSection />
      <CategoryMangeSection />
    </div>
  );
};

export default page;
