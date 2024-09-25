"use client"

import dynamic from 'next/dynamic';
import Image from 'next/image'
import styles from './writePage.module.css'
import { useEffect, useState } from 'react'
// import ReactQuill from 'react-quill';
import "react-quill/dist/quill.bubble.css";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '@/utils/firebase';
import { Category } from '@prisma/client';

const storage = getStorage(app);
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const getData = async (): Promise<Category[]> => {
  const res = await fetch(`/api/categories`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error("Failed to get categories");
  }
  return res.json();
}

const WritePage = () => {

  const { status } = useSession()
  const router = useRouter();


  const [file, setFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [value, setValue] = useState("")
  const [media, setMedia] = useState("")
  const [catSlug, setCatSlug] = useState("");
  const [catData, setCatData] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const categories = await getData();
      setCatData(categories);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fileUpload = () => {
      if (!file) return;
      const name = new Date().getTime() + file?.name
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          console.error('Error during file upload:', error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL)
          });
        }
      );
    }
    file && fileUpload();
  }, [file])

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/")
  }

  const slugify = (str: string): string =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleSubmit = async () => {

    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        desc: value,
        img: media,
        slug: slugify(title),
        catSlug: catSlug || "style",
      })

    })
    console.log(`upload res -->`, res);
  }



  return (
    <div className={styles.container}>
      <div className={styles.category}>
        <p>Select Category:</p>
        <select className={styles.select} onChange={(e) => setCatSlug(e.target.value)}>
          {catData.length > 0 && catData.map(cat => <option key={cat.title} value={cat.title}>{cat.title}</option>)}
        </select>
      </div>
      <input type="text" placeholder="Title" className={styles.input} onChange={e => setTitle(e.target.value)} />
      <div className={styles.editor}>
        <button className={styles.button} onClick={() => setOpen(!open)}>
          <Image src="/plus.png" alt="plus" width="16" height="16" />
        </button>
        {open && <div className={styles.add}>
          <input
            type='file'
            id='image'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const selectedFile = e.target.files ? e.target.files[0] : null;
              if (selectedFile) {
                setFile(selectedFile);
              }
            }}
            style={{ display: 'none' }}
          />
          <button className={styles.addButton}>
            <label htmlFor='image'>

              <Image src="/image.png" alt="plus" width="16" height="16" />
            </label>
          </button>
          <button className={styles.addButton}>
            <Image src="/external.png" alt="plus" width="16" height="16" />
          </button>
          <button className={styles.addButton}>
            <Image src="/video.png" alt="plus" width="16" height="16" />
          </button>
        </div>}
        {ReactQuill && <ReactQuill className={styles.textArea} theme='bubble' onChange={setValue} placeholder='write a story...' />}
      </div>
      <button className={styles.publish} onClick={handleSubmit}>Publish</button>
    </div>
  )
}

export default WritePage