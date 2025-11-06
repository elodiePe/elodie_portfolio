<template>
    <a
        :href="href || '#'"
        :target="target"
        :rel="computedRel"
        class="inline-flex items-center justify-center px-4 py-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
        :class="colorClasses"
    >
        <slot>{{ label }}</slot>
    </a>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    href: { type: String, default: '' },
    label: { type: String, default: 'Click' },
    color: { type: String, default: 'lavender' }, // lavender | pink | mint | sky | peach
    target: { type: String, default: '_self' },
    external: { type: Boolean, default: false }
})

const computedRel = computed(() => (props.external && props.target === '_blank' ? 'noopener noreferrer' : null))

const palettes = {
    lavender: 'bg-purple-100 text-purple-800 hover:bg-purple-200 focus:ring-purple-300',
    // pink:     'bg-pink-100 text-pink-800     hover:bg-pink-200   focus:ring-pink-300',
    mint:     'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 focus:ring-emerald-300',
    // sky:      'bg-sky-100 text-sky-800       hover:bg-sky-200     focus:ring-sky-300',
    // peach:    'bg-amber-100 text-amber-800   hover:bg-amber-200   focus:ring-amber-300'
}

const colorClasses = computed(() => palettes[props.color] || palettes.lavender)
</script>