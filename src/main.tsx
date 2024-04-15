import ReactDOM from "react-dom/client";
import "@/styles/globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import "@/lib/i18n.ts";
import { RouterProvider } from "react-router-dom";
import { router } from "./routers.tsx";
import { CookiesProvider } from "react-cookie";
import { queryClient } from "./lib/react-query.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <div dir="rtl">
        <Toaster />
        <RouterProvider router={router} />
      </div>
    </CookiesProvider>
  </QueryClientProvider>
);
