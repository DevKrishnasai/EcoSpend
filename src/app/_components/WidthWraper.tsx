import React, { ReactNode } from "react";

const WidthWraper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full px-2 lg:px-0 lg:w-11/12 mx-auto">{children}</div>
  );
};

export default WidthWraper;
