import { Link } from 'react-router-dom'; // Импортируем компонент Link для навигации между страницами
import { IPost } from '../../types/types'; // Импортируем интерфейс IPost для типизации постов

import styles from './PostsList.module.scss'; // Импортируем стили для компонента
import PostItem from '../../PostItem/PostItem'; // Импортируем компонент для отображения отдельного поста

// Определяем интерфейс для пропсов компонента PostsList
interface PostsListProps {
  posts: IPost[]; // Массив постов, который будет передан в компонент
}

// Компонент для отображения списка постов
const PostsList = ({ posts }: PostsListProps) => {
  // Проверяем, есть ли посты для отображения
  if (posts.length === 0) {
    return <div className={styles.noPosts}>Нет доступных постов</div>; // Если постов нет, отображаем сообщение
  }

  return (
    <div className={styles.list}> {/* Контейнер для списка постов */}
      {posts.map((post) => ( // Перебираем массив постов и создаем элемент для каждого поста
        <Link key={post.id} to={`/post/${post.id}`} className={styles.link}> {/* Ссылка на страницу поста по его ID */}
          <PostItem post={post} /> {/* Компонент для отображения отдельного поста */}
        </Link>
      ))}
    </div>
  );
}

export default PostsList; // Экспортируем компонент для использования в других частях приложения