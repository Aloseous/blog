import React, { Suspense } from "react"; // Import Suspense
import Image from "next/image";
import Menu from "@/components/menu/Menu";
import Comments from "@/components/comments/Comments";
import DOMPurify from "isomorphic-dompurify";
import { Post, User } from "@prisma/client";
import styles from "./singlePage.module.css";
import Loader from "@/components/loader/Loader";

type ApiResponse = Post & {
  user: User; // Include the user type here
};

// Create a wrapper for the fetching function
const fetchPostData = async (slug: string): Promise<ApiResponse> => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts/${slug}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error("Failed to get posts");
  }

  return res.json(); // Ensure the API returns an object with the required structure
};

const SinglePageContent = async ({ slug }: { slug: string }) => {
  const data = await fetchPostData(slug);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{data?.title}</h1>
          <div className={styles.user}>
            {data?.user?.image && (
              <div className={styles.userImageContainer}>
                <Image src={data?.user?.image} alt="" fill className={styles.avatar} />
              </div>
            )}
            <div className={styles.userTextContainer}>
              <span className={styles.username}>{data?.user.name}</span>
              <span className={styles.date}>{new Date(data.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        {data?.img && (
          <div className={styles.imageContainer}>
            <Image src={data?.img} alt="" fill className={styles.image} />
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div className={styles.description} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data?.desc) }} />
          <div className={styles.comment}>
            <Comments postSlug={slug} />
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
};

const SinglePage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  return (
    <Suspense fallback={<Loader width="100%" height="100vh" />}>
      <SinglePageContent slug={slug} />
    </Suspense>
  );
};

export default SinglePage;
