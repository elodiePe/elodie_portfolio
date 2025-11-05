<template>
    <main class="mx-auto max-w-screen-lg px-4 md:pt-20 pb-20 md:pb-0 pt-8 sm:pt-0">

  <div v-if="project">
    <h1>{{ project.title }}</h1>
    <img :src="project.image" :alt="project.title" />
    <p>{{ project.description }}</p>
  </div>
  <div v-else>
    <p>Project not found.</p>
  </div>
</main>
</template>

<script>
import projectsData from '../assets/projects.json';

export default {
  props: ['id'],
  data() {
    return {
      project: null
    };
  },
  mounted() {
    this.project = projectsData.find(project => project.id.toString() === this.id.toString());
  }
};
</script>