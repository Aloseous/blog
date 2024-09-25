import Image from 'next/image';
import Link from 'next/link';
import DOMPurify from "isomorphic-dompurify";
import { Post } from '@prisma/client';  // Assuming you're using Post from Prisma
import styles from './card.module.css';

type CardProps = {
    post: Post;  // Expecting the `post` object
};

const Card = ({ post }: CardProps) => {
    const { id, title, desc, img, createdAt, catSlug, slug, userEmail } = post;
    const shortDesc = desc.length > 150 ? `${desc.substring(0, 150)}...` : desc;
    return (
        <div className={styles.container} key={id}>
            <div className={styles.imgContainer}>
                <Image className={styles.image} src={img || "/home.jpg"} alt={title} fill />
            </div>
            <div className={styles.textContainer}>
                <div className={styles.details}>
                    <span className={styles.date}>{new Date(createdAt).toLocaleDateString()} - </span>
                    <span className={styles.category}>{catSlug}</span>
                </div>
                <Link href={`/posts/${slug}`}>
                    <h1>{title}</h1>
                </Link>
                <p className={styles.desc} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(shortDesc) }} />
                <Link href={`/posts/${slug}`} className={styles.link}>Read More.</Link>
            </div>
        </div>
    );
};

export default Card;
