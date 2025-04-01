// Интерфейс для поста
export interface IPost {
    id: number; // Уникальный идентификатор поста
    title: string; // Заголовок поста
    body: string; // Содержимое поста
    userId: number; // Идентификатор пользователя, создавшего пост
}

// Пропсы для компонента управления пагинацией
export type PaginationControlsProps = {
    currentPage: number; // Текущая страница
    totalPages: number; // Общее количество страниц
    onPageChange: (page: number) => void; // Функция для изменения страницы
}

// Пропсы для селектора количества постов на странице
export type PostsPerPageSelectorProps = {
    value: number; // Текущее значение количества постов на странице
    onChange: (value: number) => void; // Функция для изменения количества постов на странице
    options: number[]; // Доступные варианты количества постов на странице
}