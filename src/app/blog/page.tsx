import CardList from "@/components/cardList/CardList";
import Menu from "@/components/menu/Menu";
import styles from "./blogPage.module.css";

type SearchParams = {
  page?: string;
  cat?: string;  // Assume cat is a string (slug or name) based on usage
};

type BlogPageProps = {
  searchParams: SearchParams;
};

const BlogPage = ({ searchParams }: BlogPageProps) => {
  const page = parseInt(searchParams.page || '1', 10);  // Handle undefined page gracefully
  const cat = searchParams.cat || 'All';  // Default category if none is provided

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{cat} Blog</h1>
      <div className={styles.content}>
        <CardList cat={cat} />  {/* Assuming CardList expects a category string */}
        <Menu />
      </div>
    </div>
  );
};

export default BlogPage;
