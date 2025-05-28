import { createRouter, createWebHistory } from 'vue-router'
import BookList from '../views/BookList.vue'
import AddBook from '../views/AddBook.vue'
import EditBook from '../views/EditBook.vue'

const routes = [
  {
    path: '/',
    name: 'BookList',
    component: BookList
  },
  {
    path: '/add',
    name: 'AddBook',
    component: AddBook
  },
  {
    path: '/edit/:id',
    name: 'EditBook',
    component: EditBook,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router 