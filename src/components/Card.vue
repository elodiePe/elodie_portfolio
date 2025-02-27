// filepath: /c:/Users/elodi/Desktop/portfolio_elodie/src/components/Card.vue
<template>
  <div @click="navigateToProject" class="card card-compact bg-base-100 shadow-xl w-2/5 sm:w-30 md:w-30 lg:w-60 cursor-pointer">
    <figure class="relative w-full h-full rounded-box transition-transform duration-300 ease-in-out transform hover:scale-105">
      <img :src="image" :alt="title" class="object-cover w-full h-full" />
      <div class="absolute bottom-0 left-0 w-full bg-opacity-50 bg-black text-white p-2">
        <h2 class="card-title">{{ title }}</h2>
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