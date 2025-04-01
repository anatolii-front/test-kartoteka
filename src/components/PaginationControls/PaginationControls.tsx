import { PaginationControlsProps } from '../types/types'
import styles from './PaginationControls.module.scss'

// Компонент для управления пагинацией
const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlsProps) => {
  // Создаем массив страниц от 1 до totalPages
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className={styles.pagination}>
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Назад"
      >
        Назад
      </button>
      
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={currentPage === page ? styles.active : ''}
          aria-label={`Страница ${page}`}
        >
          {page}
        </button>
      ))}
      
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Вперед"
      >
        Вперед
      </button>
    </div>
  )
}

export default PaginationControls