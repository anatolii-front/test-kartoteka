import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

import styles from './PostDetailsPage.module.scss'
import { IPost } from '../../types/types'

const PostDetailsPage = () => {
  const { id } = useParams()
  const [post, setPost] = useState<IPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        )
        setPost(response.data)
      } catch (err: any) {
        setError(err.message || 'Пост не найден')
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [id])

  if (loading) return <div className={styles.loading}>Загрузка...</div>
  if (error) return <div className={styles.noPost}>{error}</div>
  if (!post) return <div className={styles.noPost}>Пост не найден</div>

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backLink}>
         ← Назад к списку
      </Link>
      <h1 className={styles.title}>{post.title}</h1>
      <p className={styles.body}>{post.body}</p>
    </div>
  )
}

export default PostDetailsPage