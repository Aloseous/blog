"use client";

import { createContext, useState, ReactNode, useEffect } from "react";

type ThemeContextType = {
    theme: string;
    toogle: () => void;
};

type ThemeContextProviderProps = {
    children: ReactNode;
};

const defaultThemeContext: ThemeContextType = {
    theme: "light",
    toogle: () => {}
};

export const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);

const getFromLocalStorage = (): string => {
    // Safeguard for SSR environments
    if (typeof window !== "undefined") {
        const themeValue = localStorage.getItem("theme");
        return themeValue || "light";
    }
    return "light";
}

export const ThemeContextProvider = ({ children }: ThemeContextProviderProps) => {
    const [theme, setTheme] = useState<string>(getFromLocalStorage());

    // Update local storage whenever theme changes
    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toogle = () => {
        setTheme(theme === "light" ? "dark" : "light")
    }

    return (
        <ThemeContext.Provider value={{ theme, toogle }}>
            {children}
        </ThemeContext.Provider>
    );
};
