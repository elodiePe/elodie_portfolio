<template>
  <div @click="navigateToProject" class="card card-compact bg-base-100 shadow-xl w-full sm:w-full md:w-full lg:w-full cursor-pointer">
    <figure class="relative w-full rounded-box transition-transform duration-300 ease-in-out transform hover:scale-105 overflow-hidden">
      <!-- Enforce a consistent aspect ratio (16:9 here). Change padding-top to e.g. 75% for 4:3 or 100% for 1:1 -->
      <div class="relative w-full" style="padding-top: 56.25%;">
        <img :src="image" :alt="title" class="absolute inset-0 w-full h-full object-cover" />
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
  methods: {
    navigateToProject() {
      this.$router.push({ name: 'Project', params: { id: this.projectId } });
    }
  }
}
</script>