"use client";
import { ReactNode, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools
        initialIsOpen={false}
        position="top"
        buttonPosition="top-left"
      /> */}
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
