import Image from 'next/image'
import styles from './featured.module.css'

const Featured = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Insights and Innovations</h1>
      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image className={styles.image} src={"/home.jpg"} alt="Home" fill />
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>Your Guide to Global Adventures</h1>
          <p className={styles.postDesc}>Welcome to "Discover the World," a blog dedicated to exploring the beauty and diversity of our planet. From bustling cities to serene landscapes, we take you on a journey through breathtaking destinations, rich cultures, and unforgettable experiences. Whether you're planning your next vacation, seeking travel inspiration, or simply curious about the world around you, our blog offers insightful articles, practical tips, and personal stories to ignite your wanderlust. Join us as we uncover hidden gems, share travel hacks, and celebrate the wonders of global exploration, one adventure at a time!</p>
          {/* <button className={styles.button}>Read More</button> */}
        </div>
      </div>
    </div>
  )
}

export default Featured