<template>
  <div @click="navigateToProject" class="card card-compact bg-base-100 shadow-xl w-full sm:w-full md:w-full lg:w-full cursor-pointer">
    <figure class="relative w-full rounded-box transition-transform duration-300 ease-in-out transform hover:scale-105 overflow-hidden">
      <!-- Enforce a consistent aspect ratio (16:9 here). Change padding-top to e.g. 75% for 4:3 or 100% for 1:1 -->
      <div class="relative w-full" style="padding-top: 56.25%;">
          <img
            :src="image"
            :alt="title"
            class="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
            :class="loading ? 'opacity-0' : 'opacity-100'"
            @load="onLoad"
            @error="onError"
          />

          <!-- spinner shown while the image is loading -->
          <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-50">
            <div class="w-10 h-10 border-4 border-t-gray-800 border-gray-200 rounded-full animate-spin" aria-hidden="true"></div>
          </div>
          <!-- optional error state icon -->
          <div v-if="errored && !loading" class="absolute inset-0 flex items-center justify-center bg-gray-100">
            <svg class="w-10 h-10 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      <div class="absolute inset-x-0 bottom-0 bg-black bg-opacity-50 text-white p-2">
        <h2 class="card-title text-sm sm:text-base md:text-lg">{{ title }}</h2>
      </div>
    </figure>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    description: String,
    image: String,
    projectId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: true,
      errored: false
    }
  },
  methods: {
    onLoad() {
      this.loading = false
      this.errored = false
    },
    onError() {
      this.loading = false
      this.errored = true
    },
    navigateToProject() {
      this.$router.push({ name: 'Project', params: { id: this.projectId } });
    }
  }
}
</script>