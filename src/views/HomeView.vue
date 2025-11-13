<script setup>
  import projects from '../data/projects-resolved.js'
      import Button from '../components/Button.vue'
      
    const projectsList = Array.isArray(projects) ? projects : []

    const getFirstImage = (p) => {
      // try common fields: images array, thumbnail, image
      const img = (p.images && p.images[0]) || p.thumbnail || p.image

      // fallback placeholder
      const placeholder = new URL('../assets/project-1-placeholder.jpg', import.meta.url).href
      if (!img) return placeholder

      // If it's already a resolved URL (import.meta.glob produced), return as-is
      if (typeof img === 'string' && (img.startsWith('http') || img.startsWith('blob:') || img.startsWith('data:') || img.startsWith('//'))) return img

      // If it's a public-root path (e.g. /assets/...), return as-is
      if (typeof img === 'string' && img.startsWith('/')) return img

      // Try to resolve relative paths via Vite
      try { return new URL(img, import.meta.url).href } catch { return img }
    }
        const scrollToCollaboration = () => {
      if (typeof document === 'undefined') return
      const el = document.getElementById('collaboration')
      if (el && typeof el.scrollIntoView === 'function') {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
</script>

<template>
  <main class="mx-auto max-w-screen-lg px-4 md:pt-10 pb-20 md:pb-0 pt-0 sm:pt-0">
    
    <div class="flex flex-col md:flex-row items-center gap-10 pt-10">
                  <h1 class=" md:hidden text-5xl font-semibold text-brand pt-8 text-center">Elodie Perring</h1>

 <img
            src="../assets/elodie_logo_portfolio.svg"
            alt="Portfolio logo"
            class="w-60 h-60 md:w-500 md:h-500 rounded-sm object-contain"
          />
          <div >
            <h1 class="hidden md:block text-5xl font-semibold text-brand pb-4">Elodie Perring</h1>
            <p >My passion is <span class="text-2xl font-semibold">creation</span>, whether it's developing brand identities, designing layouts, building websites and designing innovative products that ensure a smooth user experience. I aspire to one day turn this passion into a concrete career. I also practice painting, creating designs for clothing and photography.</p>
          <div class="mt-6 w-full flex flex-col md:flex-row items-center justify-center md:justify-start gap-4">
              <Button class="w-full md:w-auto" @click="$router.push('/projects')">See all projects</Button>

            <Button
              :color="'mint'"
              class="w-full md:w-auto"
              @click="scrollToCollaboration()"
            >
              Do you want to start a project with me?
            </Button>
          </div>
          </div>
        </div>
 
  <div class="w-full rounded-md overflow-hidden h-64 md:h-96 mt-10">
      <div class="relative w-full h-full">
        <img
          v-for="p in projectsList.filter(p => [1,2,3].includes(Number(p.id)))"
          :key="p.id"
          :src="getFirstImage(p)"
          :alt="p.title || ('Project ' + p.id)"
          class="slide absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>

    <section class="mt-10 w-full">

<p class="mb-4 ">
  I studied Media Engineering (bachelor), where I learned about the web (UX/UI, front-end, back-end, digital marketing and project management). Before that I focused mostly on graphic design, painting and photography. I am currently doing a master's in User Experience Design. 
</p>



<div class="grid grid-cols-1 sm:grid-cols-2  gap-4">
  <div
    v-for="(cap, i) in [
      { title: 'Brand & Identity', desc: 'Logo systems, visual languages and brand guidelines to give projects a clear personality.', tag: 'logo,branding' },
      { title: 'Web Design', desc: 'Responsive interfaces, accessible layouts and pixel-perfect mockups for modern browsers. user flows, wireframes and prototypes focused on usability and delightful interactions and its user', tag: 'webdesign,ux, ui' },
      { title: 'Project managment', desc: 'Hand-drawn and digital illustrations for editorial, merchandise and print.', tag: 'managment' },
      { title: 'Photography & painting', desc: 'I  have been painting since I was six years old. I mainly create acrylic paintings. </br> Photography is also one of my passions. I have a particular fondness for the animal theme, which I love to capture both in photography and painting.', tag: 'photography,painting' },
      { title: 'Clothing design', desc: 'Layout, textile patterns and production-ready artwork for garments and printed matter.', tag: 'clothing' },
      { title: 'Print', desc: 'Layout, textile patterns and production-ready artwork for garments and printed matter.', tag: 'print' }
      
    ]"

    role="button"
    tabindex="0"
    :key="i"
    class="group relative overflow-hidden rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-105 shadow-lg"
  >
    <!-- SVG background that cycles colours every 5s (three colours => 15s cycle) -->
    <svg
      class="absolute inset-0 w-full h-full"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="0" y="0" width="100" height="100" :fill="['#FDE8D9','#FBD5E1','#DFF7E6','#E6F4FF','#FFF4CC','#F3E8FF','#FCE7F3'][i % 7]" />
    </svg>

    <!-- Content layer -->
    <div class="relative z-10 h-full flex flex-col justify-center p-6 text-[#3b2418]">
      <h3 class="text-lg md:text-xl font-semibold leading-tight drop-shadow-sm">{{ cap.title }}</h3>

      <!-- description revealed on hover -->
      <p
      class="mt-2 text-sm md:text-base max-h-0 opacity-0 group-hover:opacity-100 group-hover:max-h-40 transition-all duration-300 ease-in-out overflow-hidden" 
      v-html="cap.desc">
      </p>
      <Button
        class="mt-2 text-sm md:text-base max-h-0 opacity-0 group-hover:opacity-100 group-hover:max-h-40 transition-all duration-300 ease-in-out overflow-hidden pointer-events-none group-hover:pointer-events-auto"
        color="lavender"
        @click="(function(e){
          if (typeof window === 'undefined') return;
          const s = window.getComputedStyle(e.currentTarget);
          if (s.opacity === '0' || s.maxHeight === '0px') return;
          $router.push({ path: '/projects', query: { tags: cap.tag } });
        })($event)"
      >
        See projects
      </Button>

    </div>

    <!-- subtle overlay to improve text contrast when needed -->
    <div class="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-20 transition-colors duration-300 pointer-events-none"></div>
  </div>
</div>
<div class="mt-8 flex justify-center">

</div>

</section>
<section id="collaboration" class="mt-12 rounded-lg  p-8 dark:bg-gray-800 flex flex-col md:flex-row items-center justify-between gap-6">
  <div class="flex-1">
    <h2 class="text-2xl md:text-3xl font-semibold text-accent mb-2">Start a project with me?</h2>
    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
I’m open to freelance and collaborative projects focused on custom creation. My expertise ranges from building professional assets like  Identity and Web Design, to crafting one-of-a-kind physical pieces such as <b class="text-accent"><a href="/projects?tags=clothing">personalized clothing</a></b> and <b class="text-accent"><a href="/projects?tags=painting">custom artwork</a></b>.</p>
    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">Tell me about your idea and we’ll discuss how to make it happen.</p>

  </div>

  <div class="flex-shrink-0 flex w-full sm:w-auto gap-3 flex-col sm:flex-row">
      <Button :color="'lavender'" class="w-full sm:w-auto" @click="$router.push('/contact')">Contact me</Button>

      <Button :color="'mint'" class="w-full sm:w-auto" @click="$router.push('/projects')">See my work</Button>
  </div>
</section>
  </main>

</template>
 <style>
        .slide { opacity: 0; transform: scale(1.02); animation: fadeSlide 12s infinite; }
        .slide:nth-of-type(1) { animation-delay: 0s; }
        .slide:nth-of-type(2) { animation-delay: 4s; }
        .slide:nth-of-type(3) { animation-delay: 8s; }

        @keyframes fadeSlide {
          0%   { opacity: 0; transform: scale(1.02); }
          6%   { opacity: 1; transform: scale(1); }
          30%  { opacity: 1; transform: scale(1); }
          36%  { opacity: 0; transform: scale(0.98); }
          100% { opacity: 0; transform: scale(0.98); }
        }

        /* Allow pointer events so buttons and links are interactive */
      </style>