"use client";

import { Provider } from "react-redux";
import { store } from "@/lib/store";
import { Toaster } from "sonner";
import { FC, PropsWithChildren } from "react";

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
      <Toaster position="top-right" richColors />
    </Provider>
  );
};

export default Providers;
