import { PostsPerPageSelectorProps } from '../types/types'
import styles from './PostsPerPageSelector.module.scss'

// Компонент для выбора количества постов на странице
const PostsPerPageSelector = ({
  value,
  onChange,
  options
}: PostsPerPageSelectorProps) => {
  // Проверяем, есть ли доступные опции
  if (!options || options.length === 0) {
    return <div className={styles.error}>Нет доступных опций</div>;
  }

  return (
    <div className={styles.selector}>
      <label htmlFor="posts-per-page">Показывать на странице:</label>
      <select
        id="posts-per-page"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={styles.select}
        aria-label="Количество записей на странице"
      >
        {options.map(option => (
          <option key={option} value={option}>
            {option} записей
          </option>
        ))}
      </select>
    </div>
  )
}

export default PostsPerPageSelector