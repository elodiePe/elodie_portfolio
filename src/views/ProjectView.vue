// filepath: /c:/Users/elodi/Desktop/portfolio_elodie/src/views/ProjectView.vue
<template>
  <div v-if="project">
    <h1>{{ project.title }}</h1>
    <img :src="project.image" :alt="project.title" />
    <p>{{ project.description }}</p>
  </div>
  <div v-else>
    <p>Project not found.</p>
  </div>
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