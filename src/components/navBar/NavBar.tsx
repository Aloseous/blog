import Image from 'next/image'
import styles from './navBar.module.css'
import Link from 'next/link'
import ThemeToogle from '../themeToogle/ThemeToogle'
import AuthLinks from '../authLinks/AuthLinks'


const NavBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.social}>
        <Image src={'/facebook.png'} alt='facebook' width={24} height={24} />
        <Image src={'/instagram.png'} alt='instagram' width={24} height={24} />
        <Image src={'/youtube.png'} alt='youtube' width={24} height={24} />
      </div>
      <div className={styles.logo}>
        <span style={{ color: 'red', fontSize: '32px' }}>D</span>-AILY
      </div>

      <div className={styles.links}>
        <ThemeToogle />
        <Link href={"/"} className={styles.link}>Home</Link>
        <Link href={"/"} className={styles.link}>About</Link>
        <Link href={"/"} className={styles.link}>Contact</Link>
        <AuthLinks />
      </div>
    </div>
  )
}

export default NavBar