<template>
  <div class="max-w-2xl mx-auto">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-semibold text-gray-900">Add New Book</h1>
      <router-link to="/" class="btn btn-secondary">
        Back to List
      </router-link>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          id="title"
          v-model="form.title"
          required
          class="input mt-1"
          placeholder="Enter book title"
        />
      </div>

      <div>
        <label for="author" class="block text-sm font-medium text-gray-700">Author</label>
        <input
          type="text"
          id="author"
          v-model="form.author"
          required
          class="input mt-1"
          placeholder="Enter author name"
        />
      </div>

      <div>
        <label for="genre" class="block text-sm font-medium text-gray-700">Genre</label>
        <select
          id="genre"
          v-model="form.genre"
          required
          class="input mt-1"
        >
          <option value="">Select a genre</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Mystery">Mystery</option>
          <option value="Science Fiction">Science Fiction</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Biography">Biography</option>
          <option value="History">History</option>
          <option value="Poetry">Poetry</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label for="year" class="block text-sm font-medium text-gray-700">Year</label>
        <input
          type="number"
          id="year"
          v-model="form.year"
          required
          min="1000"
          max="2024"
          class="input mt-1"
          placeholder="Enter publication year"
        />
      </div>

      <div class="flex justify-end space-x-4">
        <router-link to="/" class="btn btn-secondary">
          Cancel
        </router-link>
        <button
          type="submit"
          class="btn btn-primary"
          :disabled="loading"
        >
          {{ loading ? 'Adding...' : 'Add Book' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'AddBook',
  setup() {
    const store = useStore()
    const router = useRouter()
    const loading = ref(false)

    const form = ref({
      title: '',
      author: '',
      genre: '',
      year: new Date().getFullYear()
    })

    const handleSubmit = async () => {
      loading.value = true
      try {
        await store.dispatch('addBook', form.value)
        router.push('/')
      } catch (error) {
        console.error('Failed to add book:', error)
      } finally {
        loading.value = false
      }
    }

    return {
      form,
      loading,
      handleSubmit
    }
  }
}
</script> 