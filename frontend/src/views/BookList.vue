<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold text-gray-900">My Books</h1>
      <router-link to="/add" class="btn btn-primary">
        Add New Book
      </router-link>
    </div>

    <div class="relative">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search by title or author..."
        class="input pl-10"
      />
      <MagnifyingGlassIcon class="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
    </div>

    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
    </div>

    <div v-else-if="error" class="text-center py-12 text-red-600">
      {{ error }}
    </div>

    <div v-else-if="filteredBooks.length === 0" class="text-center py-12 text-gray-500">
      No books found
    </div>

    <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="book in filteredBooks"
        :key="book.id"
        class="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
      >
        <div class="flex justify-between items-start">
          <div>
            <h2 class="text-lg font-semibold text-gray-900">{{ book.title }}</h2>
            <p class="text-gray-600">{{ book.author }}</p>
          </div>
          <div class="flex space-x-2">
            <router-link
              :to="{ name: 'EditBook', params: { id: book.id }}"
              class="text-primary-600 hover:text-primary-700"
            >
              <PencilIcon class="h-5 w-5" />
            </router-link>
            <button
              @click="confirmDelete(book)"
              class="text-red-600 hover:text-red-700"
            >
              <TrashIcon class="h-5 w-5" />
            </button>
          </div>
        </div>
        <div class="mt-4">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
            {{ book.genre }}
          </span>
          <span class="ml-2 text-sm text-gray-500">{{ book.year }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { MagnifyingGlassIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'

export default {
  name: 'BookList',
  components: {
    MagnifyingGlassIcon,
    PencilIcon,
    TrashIcon
  },
  setup() {
    const store = useStore()
    const searchQuery = ref('')

    const loading = computed(() => store.state.loading)
    const error = computed(() => store.state.error)
    const filteredBooks = computed(() => store.getters.searchBooks(searchQuery.value))

    const confirmDelete = async (book) => {
      if (confirm(`Are you sure you want to delete "${book.title}"?`)) {
        try {
          await store.dispatch('deleteBook', book.id)
        } catch (error) {
          console.error('Failed to delete book:', error)
        }
      }
    }

    onMounted(() => {
      store.dispatch('fetchBooks')
    })

    return {
      searchQuery,
      loading,
      error,
      filteredBooks,
      confirmDelete
    }
  }
}
</script> 