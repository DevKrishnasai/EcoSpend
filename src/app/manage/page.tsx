import React, { Suspense } from "react";
import BasicDeatilsSection from "./_components/BasicDeatilsSection";

const page = async () => {
  return (
    <div>
      <Suspense fallback={<>Loading.....</>}>
        <BasicDeatilsSection />
      </Suspense>
    </div>
  );
};

export default page;
