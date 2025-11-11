// filepath: /c:/Users/elodi/Desktop/portfolio_elodie/src/views/ProjectsView.vue
<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Card from '../components/Card.vue'
import projectsData from '../data/projects-resolved.js'
import Tag from '../components/TagFilter.vue'

// selected tag keys (normalized lower-case)
const selected = ref([])

// gather unique tags from projects and keep display form
const tagMap = new Map()
for (const p of projectsData) {
  const tags = p.tags || []
  for (const t of tags) {
    const key = (t || '').toString().trim()
    if (!key) continue
    const norm = key.toLowerCase()
    if (!tagMap.has(norm)) tagMap.set(norm, key)
  }
}

// array of tag objects for rendering
const allTags = Array.from(tagMap.entries()).map(([key, label]) => ({ key, label }))

function toggleTag(keyOrLabel) {
  // accept either normalized key or label emitted by TagFilter
  let key = (keyOrLabel || '').toString().toLowerCase().trim()
  if (!tagMap.has(key)) {
    // try to find matching key by label (case-insensitive)
    for (const [k, v] of tagMap.entries()) {
      if (v.toLowerCase() === key) { key = k; break }
    }
  }
  if (!key) return
  const idx = selected.value.indexOf(key)
  if (idx === -1) selected.value.push(key)
  else selected.value.splice(idx, 1)
  // reset to first page when filters change and update URL immediately
  page.value = 1
  const q = { ...route.query }
  if (selected.value.length) q.tags = selected.value.join(',')
  else delete q.tags
  q.page = 1
  router.replace({ query: q }).catch(() => {})
}

function clearFilters() {
  selected.value = []
}

const filteredProjects = computed(() => {
  // if no filters selected, show all
  if (!selected.value.length) return projectsData
  return projectsData.filter((p) => {
    const tags = (p.tags || []).map((t) => t.toString().toLowerCase())
    // check that every selected tag key is present in project's tags
    return selected.value.every((sel) => tags.includes(sel))
  })
})

// Pagination state
const page = ref(1)
const pageSize = 12

const totalPages = computed(() => Math.max(1, Math.ceil(filteredProjects.value.length / pageSize)))

const pagedProjects = computed(() => {
  const start = (page.value - 1) * pageSize
  return filteredProjects.value.slice(start, start + pageSize)
})

const pageItems = computed(() => {
  const total = totalPages.value
  const current = page.value
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const items = []
  items.push(1)
  if (current > 4) items.push('...')
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  for (let i = start; i <= end; i++) items.push(i)
  if (current < total - 3) items.push('...')
  items.push(total)
  return items
})

// initialize from route query param `tags` (comma-separated keys)
const route = useRoute()
const router = useRouter()
onMounted(() => {
  const q = route.query.tags
  if (q) {
    const list = Array.isArray(q) ? q : String(q).split(',')
    const normalized = list.map(s => String(s).toLowerCase().trim()).filter(Boolean)
    // keep only known tags
    selected.value = normalized.filter(k => tagMap.has(k))
  }
  // initialize page from query param if present
  const qp = route.query.page
  if (qp) {
    const n = Number(qp)
    if (!Number.isNaN(n) && n >= 1) page.value = Math.min(n, totalPages.value)
  }
})

// update when route changes
watch(() => route.query.tags, (val) => {
  if (!val) { selected.value = []; return }
  const list = Array.isArray(val) ? val : String(val).split(',')
  selected.value = list.map(s => String(s).toLowerCase().trim()).filter(k => tagMap.has(k))
})

// keep local page in sync with query param
watch(() => route.query.page, (val) => {
  if (!val) { page.value = 1; return }
  const n = Number(Array.isArray(val) ? val[0] : val)
  if (!Number.isNaN(n) && n >= 1) page.value = Math.min(n, totalPages.value)
})

// when selected filters change, reset page to 1 and update query (preserve tags)
watch(selected, () => {
  page.value = 1
  const q = { ...route.query }
  if (selected.value.length) q.tags = selected.value.join(',')
  else delete q.tags
  // reset page in query
  q.page = 1
  router.replace({ query: q }).catch(() => {})
})

function goToPage(n) {
  const target = Math.max(1, Math.min(Math.floor(n), totalPages.value))
  page.value = target
  const q = { ...route.query }
  q.page = target
  router.replace({ query: q }).catch(() => {})
}

    const getFirstImage = (p) => {
      // try common fields: images array, thumbnail, image
      const img = (p.images && p.images[0]) || p.thumbnail || p.image
      if (img) {
        // if relative path to assets, make sure it's resolved by Vite
        try { return new URL(img, import.meta.url).href } catch { return img }
      }
      // fallback placeholder
      return new URL('../assets/project-1-placeholder.jpg', import.meta.url).href
    }
</script>

<template>
  <main class="mx-auto max-w-screen-lg px-4 md:pt-20 pb-20 md:pb-0 pt-8 sm:pt-0">
    <nav aria-label="Breadcrumb" class="mb-4 text-sm">
      <ol class="flex items-center space-x-2">
        <li>
          <router-link to="/" class="text-gray-600 hover:underline">Home</router-link>
        </li>
        <li class="text-gray-400">/</li>
        <li aria-current="page" class="text-gray-900">Projects</li>
      </ol>
    </nav>

    <div class="flex items-center justify-between mb-4">
      <h1 class="font-bold text-2xl">My Projects</h1>
    </div>

    <!-- tag filters -->
    <div class="mb-6 flex flex-wrap gap-2 items-center">
      <div class="flex flex-wrap gap-2">
        <Tag
          v-for="tag in allTags"
          :key="tag.key"
          :label="tag.label"
          :active="selected.includes(tag.key)"
          @toggle="toggleTag"
          class="tag-button"
        />
      </div>

      <div class="ml-auto">
        <button v-if="selected.length" @click="clearFilters" class="text-sm text-gray-500 underline">Clear filters</button>
      </div>
    </div>
          <hr class="my-6 border-t border-gray-200" style="height:1px; background:transparent;"/>


    <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
      <Card
        v-for="(project, index) in pagedProjects"
        :key="project.id || index"
        :title="project.title"
        :description="project.description"
        :image="getFirstImage(project)"
        :projectId="project.id.toString()"
      />
      <p v-if="!filteredProjects.length" class="col-span-full text-center text-gray-500">
        No projects available with the selected filters.
      </p>
    </div>

    <!-- pagination controls -->
    <div v-if="totalPages > 1" class="mt-6 flex items-center justify-between">
      <div class="text-sm text-gray-600">
        Showing
        <span class="font-medium">{{ ( (page-1)*pageSize + 1 ) }}</span>
        -
        <span class="font-medium">{{ Math.min(page*pageSize, filteredProjects.length) }}</span>
        of <span class="font-medium">{{ filteredProjects.length }}</span>
      </div>

      <nav aria-label="Pagination" class="flex items-center gap-2">
        <button @click="goToPage(page-1)" :disabled="page<=1" class="px-3 py-1 rounded border disabled:opacity-50 hover:bg-brand hover:text-accent">Prev</button>

        <button
          v-for="item in pageItems"
          :key="String(item)"
          v-if="item !== '...'"
          @click="goToPage(item)"
          :class="['px-3 py-1 rounded border', item===page ? 'bg-brand text-white' : '']"
        >
          {{ item }}
        </button>
        <span v-for="item in pageItems" :key="'dot-'+String(item)" v-if="item === '...'" class="px-2">…</span>

        <button @click="goToPage(page+1)" :disabled="page>=totalPages" class="px-3 py-1 rounded border disabled:opacity-50 hover:bg-brand hover:text-accent">Next</button>
      </nav>
    </div>
  </main>
</template>

<style>
/* small helper: ensure buttons don't shrink */
.tag-button { white-space: nowrap }
</style>