import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@prisma/client';
import { Suspense } from 'react';
import Loader from '../loader/Loader';

import styles from './categoryList.module.css';

// Simulate a delay in fetching categories
const getData = async (): Promise<Category[]> => {
  // await new Promise((resolve) => setTimeout(resolve, 25000)); // Simulated delay
  // 
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error("Failed to get categories");
  }
  return res.json();
};

// Fetch data within a separate component to use Suspense
const CategoryData: React.FC = async () => {
  const data: Category[] = await getData();
  return (
    <div className={styles.categories}>
      {data.slice(0, 6).map((item) => (
        <Link
          className={`${styles.category} ${styles[item.slug]}`}
          href={`/blog?cat=${item.slug}`}
          key={item.id}
        >
          {item.img && (
            <Image
              className={styles.image}
              src={item.img ?? ""}
              alt='style'
              width={32}
              height={32}
            />
          )}
          {item.title}
        </Link>
      ))}
    </div>
  );
};

const CategoryList = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Popular Categories</div>
      <Suspense fallback={<Loader width="100%" height={80} />}>
        <CategoryData />
      </Suspense>
    </div>
  );
};

export default CategoryList;
