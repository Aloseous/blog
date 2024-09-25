"use client"
import React, { Suspense, useEffect, useState } from 'react';
import Card from '../card/Card';
import Pagination from '../pagination/Pagination';
import styles from './cardList.module.css';
import { Post } from '@prisma/client';
import Loader from '../loader/Loader';

type ApiResponse = {
    posts: Post[];
    count: number;
};

const getData = async (page: number, cat: string): Promise<ApiResponse> => {
    const res = await fetch(`/api/posts?page=${page}&cat=${cat || ''}`, {
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Failed to get posts');
    }

    return res.json();
};

const PostsList: React.FC<{ posts: Post[] }> = ({ posts }) => {
    return (
        <div className={styles.posts}>
            {posts.map((post) => (
                <Card key={post.id} post={post} />
            ))}
        </div>
    );
};

type CardListProps = {
    cat: string;
};

const CardList: React.FC<CardListProps> = ({ cat }) => {
    // Get the current page from localStorage or default to 1
    const [currentPage, setCurrentPage] = useState(() => {
        const savedPage = localStorage.getItem('currentPage');
        return savedPage ? parseInt(savedPage, 10) : 1;
    });

    const [posts, setPosts] = useState<Post[]>([]);
    const [count, setCount] = useState<number>(0);

    const POST_PER_PAGE = 2;

    useEffect(() => {

        const fetchData = async () => {
            const { posts, count } = await getData(currentPage, cat);
            setPosts(posts);
            setCount(count);
        };

        fetchData();
    }, [currentPage, cat]);

    useEffect(() => {
        setCurrentPage(1);
        localStorage.setItem('currentPage', '1');
    }, [cat]); // Only reset when the category changes

    const hasPrev = POST_PER_PAGE * (currentPage - 1) > 0;
    const hasNext = POST_PER_PAGE * currentPage < count;

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        localStorage.setItem('currentPage', newPage.toString()); // Store the new page in localStorage
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Recent posts</h1>
            <Suspense fallback={<Loader width={"100%"} height={"600px"} />}>
                <PostsList posts={posts} />
            </Suspense>
            <Pagination
                page={currentPage}
                hasPrev={hasPrev}
                hasNext={hasNext}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default CardList;
