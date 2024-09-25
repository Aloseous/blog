"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import styles from "./authLinks.module.css"


const AuthLinks = () => {

  const [open, setOpen] = useState(false)
  const {status } = useSession()

  return (
    <>{status === "authenticated" ?
      (<div className={styles.links}>
        <Link href={"/write"} className={styles.link}>Write</Link>
        <span className={styles.link} onClick={() => signOut()}>Logout</span>
      </div>) :
      (<Link href={"/login"} className={styles.link}>Login</Link>
      )
    }
      <div className={styles.burger} onClick={() => setOpen(!open)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      {open && (<div className={styles.responsiveMenu}>
        <Link href={"/"} >Home</Link>
        <Link href={"/"} >About</Link>
        <Link href={"/"} >Contact</Link>
        {status === "authenticated" ?
          <div className={styles.links}>
            <Link href={"/write"}>Write</Link>
            <span className={styles.link} onClick={() => signOut()}>Logout</span>
          </div> :
          (
            <Link href={"/login"}>Login</Link>
          )
        }
      </div>)}
    </>
  )
}

export default AuthLinks