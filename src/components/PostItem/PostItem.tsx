import { IPost } from '../types/types'
import styles from './PostItem.module.scss'

interface PostItemProps {
  post: IPost | null; // Уточнение типа, чтобы учитывать возможность null
}

const PostItem = ({ post }: PostItemProps) => {
  if (!post) {
    return <div className={styles.error}>Пост не найден</div>; // Сообщение, если пост не найден
  }

  return (
    <article className={styles.post}>
      <h2 className={styles.title}>{post.title}</h2>
      <p className={styles.body}>{post.body}</p>
    </article>
  )
}

export default PostItem