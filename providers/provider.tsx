"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export function Providers({ children }: { children: ReactNode }) {
  const [client] = useState(() => new QueryClient());

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
