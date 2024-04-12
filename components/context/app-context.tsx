import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SessionData {
  userId: string;
  token: string;
  isLoggedIn: boolean;
}

interface SessionContextType {
  session: SessionData | null;
  updateSession: (newSession: SessionData | null) => void;
}

interface LocaleContextType {
  locale: string;
  setLocale: (newLocale: string) => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);
const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};

export const useLocale = (): LocaleContextType => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<SessionData | null>(null);
  const [locale, setLocale] = useState<string>("en");

  useEffect(() => {
    const loadSession = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token7");
        if (!storedToken) return;

        const response = await fetch(
          "https://agrovoiceai.vercel.app/api/user/name"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const { id } = await response.json();
        console.log("id", id);
        setSession({
          userId: "1",
          token: storedToken,
          isLoggedIn: true,
        });
      } catch (error) {
        console.error("Error loading session:", error);
      }
    };
    loadSession();
  }, []);

  const updateSession = async (newSession: SessionData | null) => {
    setSession(newSession);
    try {
      if (newSession) {
        await AsyncStorage.setItem("token7", newSession.token);
      } else {
        await AsyncStorage.removeItem("token7");
      }
    } catch (error) {
      console.error("Error storing token:", error);
    }
  };

  const changeLocale = (newLocale: string) => {
    setLocale(newLocale);
  };

  const sessionContextValue: SessionContextType = {
    session,
    updateSession,
  };

  const localeContextValue: LocaleContextType = {
    locale,
    setLocale: changeLocale,
  };

  return (
    <SessionContext.Provider value={sessionContextValue}>
      <LocaleContext.Provider value={localeContextValue}>
        {children}
      </LocaleContext.Provider>
    </SessionContext.Provider>
  );
};
