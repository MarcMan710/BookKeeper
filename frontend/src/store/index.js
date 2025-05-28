import { createStore } from 'vuex'
import axios from 'axios'

// Configure axios
axios.defaults.baseURL = 'http://localhost:3000'

export default createStore({
  state: {
    books: [],
    loading: false,
    error: null
  },
  getters: {
    getBookById: (state) => (id) => {
      return state.books.find(book => book.id === id)
    },
    searchBooks: (state) => (query) => {
      if (!query) return state.books
      const lowercaseQuery = query.toLowerCase()
      return state.books.filter(book => 
        book.title.toLowerCase().includes(lowercaseQuery) ||
        book.author.toLowerCase().includes(lowercaseQuery)
      )
    }
  },
  mutations: {
    SET_BOOKS(state, books) {
      state.books = books
    },
    ADD_BOOK(state, book) {
      state.books.push(book)
    },
    UPDATE_BOOK(state, updatedBook) {
      const index = state.books.findIndex(book => book.id === updatedBook.id)
      if (index !== -1) {
        state.books.splice(index, 1, updatedBook)
      }
    },
    DELETE_BOOK(state, bookId) {
      state.books = state.books.filter(book => book.id !== bookId)
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    SET_ERROR(state, error) {
      state.error = error
    }
  },
  actions: {
    async fetchBooks({ commit }) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.get('/api/books')
        commit('SET_BOOKS', response.data)
      } catch (error) {
        commit('SET_ERROR', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async addBook({ commit }, book) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.post('/api/books', book)
        commit('ADD_BOOK', response.data)
        return response.data
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async updateBook({ commit }, book) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.put(`/api/books/${book.id}`, book)
        commit('UPDATE_BOOK', response.data)
        return response.data
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async deleteBook({ commit }, bookId) {
      commit('SET_LOADING', true)
      try {
        await axios.delete(`/api/books/${bookId}`)
        commit('DELETE_BOOK', bookId)
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    }
  }
}) 