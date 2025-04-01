import styles from './NotFoundPage.module.scss'; // Импорт стилей, если они есть

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h1>404 - Страница не найдена</h1>
      <p>Извините, но запрашиваемая страница не существует.</p>
    </div>
  );
}

export default NotFoundPage; 