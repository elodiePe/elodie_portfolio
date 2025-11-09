<script setup>
    import projects from '../assets/projects.json'
      import Button from '../components/Button.vue'
    const projectsList = Array.isArray(projects) ? projects : []

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
    
    <div class="flex flex-col md:flex-row items-center gap-10 pt-4">
                  <h1 class="sm:hidden text-5xl font-semibold text-brand pt-8 text-center">Elodie Perring</h1>

 <img
            src="../assets/elodie_logo_portfolio.svg"
            alt="Portfolio logo"
            class="w-60 h-60 md:w-500 md:h-500 rounded-sm object-contain"
          />
          <div >
            <h1 class="hidden md:block text-5xl font-semibold text-brand pb-4">Elodie Perring</h1>
            <p >My passion is <span class="text-2xl font-semibold">creation</span>, whether it's developing brand identities, designing layouts, building websites and designing innovative products that ensure a smooth user experience. I aspire to one day turn this passion into a concrete career. I also practice painting, creating designs for clothing and photography.</p>
          <div class="mt-6 w-full flex flex-col md:flex-row items-center justify-center md:justify-start gap-4">
            <router-link to="/projects" aria-label="See all projects" class="w-full md:w-auto">
              <Button class="w-full md:w-auto">See all projects</Button>
            </router-link>

            <router-link to="/projects" aria-label="Start a project" class="w-full md:w-auto">
              <Button :color="'mint'" class="w-full md:w-auto">Do you want to start a project with me?</Button>
            </router-link>
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
  I study Media Engineering (bachelor), where I learned about the web (UX/UI, front-end, back-end, digital marketing and project management). Before that I focused mostly on graphic design, painting and photography. I am currently doing a master's in User Experience Design. 
</p>



<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  <div
    v-for="(cap, i) in [
      { title: 'Brand & Identity', desc: 'Logo systems, visual languages and brand guidelines to give projects a clear personality.' },
      { title: 'Web Design', desc: 'Responsive interfaces, accessible layouts and pixel-perfect mockups for modern browsers.' },
      { title: 'Product Design', desc: 'User flows, wireframes and prototypes focused on usability and delightful interactions.' },
      { title: 'Illustration', desc: 'Hand-drawn and digital illustrations for editorial, merchandise and print.' },
      { title: 'Photography', desc: 'Styling, shooting and retouching to communicate mood and story.' },
      { title: 'Print & Apparel', desc: 'Layout, textile patterns and production-ready artwork for garments and printed matter.' },
      { title: 'Print & Apparel', desc: 'Layout, textile patterns and production-ready artwork for garments and printed matter.' }
    ]"
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
      >
      {{ cap.desc }}
      </p>
    </div>

    <!-- subtle overlay to improve text contrast when needed -->
    <div class="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-20 transition-colors duration-300 pointer-events-none"></div>
  </div>
</div>
<div class="mt-8 flex justify-center">

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