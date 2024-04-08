import { createContext, useContext, useState } from "react";

type LocaleContextType = {
  locale: string;
  setLocale: (newLocale: string) => void;
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const useLocale = (): LocaleContextType => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
};

export const LocaleProvider: any = ({ children }: any) => {
  const [locale, setLocale] = useState<string>("en");

  const value = { locale, setLocale };

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
};
