import { BrowserRouter, Route, Routes } from 'react-router-dom'

import PostsPage from './components/Pages/PostPage/PostsPage'
import PostDetailsPage from './components/Pages/PostDetailsPage/PostDetailsPage'
import NotFoundPage from './components/Pages/NotFoundPage/NotFoundPage'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostsPage />} />
        <Route path="/post/:id" element={<PostDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App