import Link from "next/link";
import React from "react";
import { Category } from '@prisma/client';
import styles from "./menuCategories.module.css";

const getData = async (): Promise<Category[]> => {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`, {
        cache: 'no-store',
    })

    if (!res.ok) {
        throw new Error("Failed to get categories");
    }
    return res.json();
}


const MenuCategories = async () => {
    const data: Category[] = await getData();
    return (
        <div className={styles.categoryList}>
            {data.map(item => <Link key={item.title}
                href={`/blog?cat=${item.title}`}
                className={`${styles.categoryItem} ${styles[item.title]}`}>
                {item.title}
            </Link>)}
        </div>
    );
};

export default MenuCategories;
