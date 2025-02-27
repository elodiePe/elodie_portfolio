// filepath: /c:/Users/elodi/Desktop/portfolio_elodie/src/views/ProjectsView.vue
<script setup>
import { ref, onMounted } from 'vue';
import Card from '../components/Card.vue';
import projectsData from '../assets/projects.json';

const projects = ref([]);

onMounted(() => {
  projects.value = projectsData;
});
</script>

<template>
  <h1>Projects</h1>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <Card
      v-for="(project, index) in projects"
      :key="index"
      :title="project.title"
      :description="project.description"
      :image="project.image"
      :projectId="project.id.toString()"
    />
  </div>
</template>

<style>
.grid {
  display: grid;
  gap: 1rem;
}
</style>