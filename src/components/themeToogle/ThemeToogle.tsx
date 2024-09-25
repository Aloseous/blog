"use client";
import Image from "next/image"
import styles from "./themeToogle.module.css"
import { useContext } from "react"
import { ThemeContext } from "@/context/ThemeContext";


const ThemeToogle = () => {

  const {theme, toogle} = useContext(ThemeContext);

  return (
    <div className={styles.container} style={theme === "dark" ? {background:"white"}: {background:"#0f172a"}} onClick={toogle}>
      <Image src={"/moon.png"} alt="moon" width={14} height={14}/>
      <div className={styles.ball} style={theme === "dark" ? {left:1, background:"#0f172a"}: {right:1, background:"white"}}></div>
      <Image src={"/sun.png"} alt="moon" width={14} height={14}/>
    </div>
  )
}

export default ThemeToogle