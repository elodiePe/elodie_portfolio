<template>
    <!-- TagFilter acts like a toggle button for filtering. Use a button so it doesn't navigate. -->
    <button
        type="button"
        class="inline-flex items-center justify-center px-3 py-1 text-sm rounded-md transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1"
        :class="active ? activeClasses[colorKey] : colorClasses"
        @click="onClick"
        :aria-pressed="active ? 'true' : 'false'"
    >
        <slot>{{ computedLabel }}</slot>
    </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    label: { type: String, default: '' },
    color: { type: String, default: '' }, // lavender | pink | mint | sky | peach
    kind: { type: String, default: 'school' }, // school | group | individual | date
    // whether the filter is currently active/selected
    active: { type: Boolean, default: false }
})

const emit = defineEmits(['toggle'])

const computedRel = computed(() => (props.external && props.target === '_blank' ? 'noopener noreferrer' : undefined))

const palettes = {
    lavender: 'bg-purple-100 text-purple-800 hover:bg-purple-200 focus:ring-purple-300',
    pink:     'bg-pink-100 text-pink-800   hover:bg-pink-200   focus:ring-pink-300',
    mint:     'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 focus:ring-emerald-300',
    sky:      'bg-sky-100 text-sky-800     hover:bg-sky-200     focus:ring-sky-300',
    peach:    'bg-amber-100 text-amber-800   hover:bg-amber-200   focus:ring-amber-300',
    neutral:  'bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 focus:ring-gray-300'
}

// classes to use when the tag is active/selected (stronger background, white text)
const activeClasses = {
    lavender: 'bg-purple-800 text-white',
    pink: 'bg-pink-600 text-white',
    mint: 'bg-emerald-600 text-white',
    sky: 'bg-sky-700 text-white',
    peach: 'bg-amber-600 text-white',
    neutral: 'bg-gray-800 text-white'
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

// provide simple wrapper so template can access easily
const active = computed(() => !!props.active)

function onClick(e) {
    // emit a toggle event to parent; parent will manage the selected state
    emit('toggle', (props.label || '').toString())
}
</script>