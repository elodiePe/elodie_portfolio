<template>
    <a
        :href="href || '#'"
        :target="target"
        :rel="computedRel"
        class="inline-flex items-center justify-center px-2 py-0.5 text-xs rounded-md transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-offset-1"
        :class="colorClasses"
    >
        <slot>{{ computedLabel }}</slot>
    </a>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    href: { type: String, default: '' },
    label: { type: String, default: '' },
    color: { type: String, default: '' }, // lavender | pink | mint | sky | peach
    kind: { type: String, default: 'school' }, // school | group | individual | date
    target: { type: String, default: '_self' },
    external: { type: Boolean, default: false }
})

const computedRel = computed(() => (props.external && props.target === '_blank' ? 'noopener noreferrer' : undefined))

const palettes = {
    lavender: 'bg-purple-100 text-purple-800 hover:bg-purple-200 focus:ring-purple-300',
    pink:     'bg-pink-100 text-pink-800   hover:bg-pink-200   focus:ring-pink-300',
    mint:     'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 focus:ring-emerald-300',
    sky:      'bg-sky-100 text-sky-800     hover:bg-sky-200     focus:ring-sky-300',
    peach:    'bg-amber-100 text-amber-800   hover:bg-amber-200   focus:ring-amber-300',
    neutral:  'bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 focus:ring-gray-300'
}

const defaultLabels = {
    school: 'School project',
    group: 'Group project',
    individual: 'Individual project',
    date: 'Date'
}

const kindToPalette = {
    school: 'lavender',
    group: 'pink',
    individual: 'mint',
    date: 'sky'
}

// map common tag names (lowercased) or keywords to a palette key
const tagToPalette = {
    art: 'pink',
    painting: 'pink',
    photography: 'pink',
    drawings: 'pink',
    'ux': 'sky',
    'ui': 'sky',
    'user research': 'sky',
    figma: 'sky',
    coding: 'mint',
    html: 'mint',
    css: 'mint',
    javascript: 'mint',
    js: 'mint'
}

const computedLabel = computed(() => props.label || defaultLabels[props.kind] || 'Tag')

const colorKey = computed(() => {
    // explicit color prop takes precedence
    if (props.color) return props.color

    // derive from tag/label if possible
    const label = (props.label || '').toString().toLowerCase().trim()
    if (label) {
        // direct match
        if (tagToPalette[label]) return tagToPalette[label]
        // keyword heuristics
        if (label.includes('ux') || label.includes('ui') || label.includes('user research') || label.includes('figma')) return 'sky'
        if (label.includes('art') || label.includes('paint') || label.includes('photo') || label.includes('draw')) return 'pink'
        if (label.includes('code') || label.includes('html') || label.includes('css') || label.includes('js') || label.includes('javascript')) return 'mint'
    }

    // fallback to kind mapping
    if (kindToPalette[props.kind]) return kindToPalette[props.kind]

    return 'neutral'
})

const colorClasses = computed(() => palettes[colorKey.value] || palettes.neutral)
</script>