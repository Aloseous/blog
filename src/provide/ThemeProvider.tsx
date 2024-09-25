"use client";
import { ThemeContext } from '@/context/ThemeContext';
import React, { ReactNode, useContext, useEffect, useState } from 'react'

type ThemeProviderProps = {
    children: ReactNode;
};


const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [mounted, setMounted] = useState(false);

    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        setMounted(true);
    }, [])

    if (mounted === true)
        return (
            <div className={theme}>{children}</div>
        )
}

export default ThemeProvider