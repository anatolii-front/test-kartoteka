import { useState, useEffect } from 'react'; // Импортируем хуки useState и useEffect из React
import { useSearchParams } from 'react-router-dom'; // Импортируем хук для работы с параметрами поиска в URL
import styles from './PostsPage.module.scss'; // Импортируем стили для страницы
import PostsList from '../PostList/PostList'; // Импортируем компонент для отображения списка постов
import PaginationControls from '../../PaginationControls/PaginationControls'; // Импортируем компонент для управления пагинацией
import { IPost } from '../../types/types'; // Импортируем интерфейс IPost для типизации постов
import PostsPerPageSelector from '../../PostsPerPageSelector/PostsPerPageSelector'; // Импортируем компонент для выбора количества постов на странице

const PostsPage = () => {
  const [posts, setPosts] = useState<IPost[]>([]); // Состояние для хранения постов
  const [totalPosts, setTotalPosts] = useState(0); // Состояние для хранения общего количества постов
  const [loading, setLoading] = useState(true); // Состояние для отслеживания загрузки данных
  const [error, setError] = useState<string | null>(null); // Состояние для хранения ошибок
  const [searchParams, setSearchParams] = useSearchParams(); // Хук для работы с параметрами поиска в URL

  // Получаем номер текущей страницы и лимит постов на странице из параметров поиска
  const page = parseInt(searchParams.get('page') || '1'); // Номер текущей страницы
  const limit = parseInt(searchParams.get('limit') || '10'); // Количество постов на странице

  useEffect(() => {
    const fetchPosts = async () => { // Асинхронная функция для получения постов
      setLoading(true); // Устанавливаем состояние загрузки
      try {
        const response = await fetch( // Выполняем запрос к API для получения постов
          `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
        );

        if (!response.ok) { // Проверяем, успешен ли ответ
          throw new Error('Ошибка при загрузке постов'); // Если нет, выбрасываем ошибку
        }

        setPosts(await response.json()); // Устанавливаем полученные посты в состояние
        setTotalPosts(Number(response.headers.get('X-Total-Count'))); // Получаем общее количество постов из заголовков ответа
      } catch (err: any) {
        setError(err.message || 'Ошибка при загрузке постов'); // Устанавливаем сообщение об ошибке
      } finally {
        setLoading(false); // Завершаем состояние загрузки
      }
    }

    fetchPosts(); // Вызываем функцию для получения постов
  }, [page, limit]); // Зависимости: обновляем данные при изменении страницы или лимита

  const totalPages = Math.ceil(totalPosts / limit); // Вычисляем общее количество страниц

  if (error) return <div className={styles.error}>{error}</div>; // Если есть ошибка, отображаем сообщение об ошибке

  return (
    <div className={styles.container}> {/* Контейнер для страницы */}
      <h1 className={styles.title}>Список постов</h1> {/* Заголовок страницы */}
      
      <PostsPerPageSelector
        value={limit} // Текущее значение лимита постов на странице
        onChange={(newLimit: number) => { // Обработчик изменения лимита
          setSearchParams({ page: '1', limit: newLimit.toString() }); // Обновляем параметры поиска при изменении лимита
        }}
        options={[5, 10, 20]} // Доступные варианты количества постов на странице
      />

      {loading ? ( // Если данные загружаются, отображаем индикатор загрузки
        <div className={styles.loading}>Загрузка...</div>
      ) : (
        <>
          <PostsList posts={posts} /> {/* Отображаем список постов */}
          <PaginationControls
            currentPage={page} // Текущая страница
            totalPages={totalPages} // Общее количество страниц
            onPageChange={(page: number) => setSearchParams({ page: String(page) })} // Обновляем параметры поиска при изменении страницы
          />
        </>
      )}
    </div>
  );
}

export default PostsPage; // Экспортируем компонент для использования в других частях приложения