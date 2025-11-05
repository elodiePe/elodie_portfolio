<script setup>
import { ref } from 'vue'
import { sendForm } from '@emailjs/browser'

const formRef = ref(null)
const sending = ref(false)
const success = ref(null)   // null | true | false
const errorMsg = ref('')

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

async function onSubmit(e) {
  e.preventDefault()
  if (!formRef.value) return
  sending.value = true
  success.value = null
  errorMsg.value = ''

  try {
    const res = await sendForm(SERVICE_ID, TEMPLATE_ID, formRef.value, PUBLIC_KEY)
    // res.status should be 200 on success
    sending.value = false
    success.value = true
    // Optionally reset form fields:
    formRef.value.reset()
  } catch (err) {
    sending.value = false
    success.value = false
    errorMsg.value = err?.text || err?.message || String(err)
    console.error('EmailJS error', err)
  }
}
</script>

<template>
  <main class="mx-auto max-w-screen-lg px-4 md:pt-20 pb-20 md:pb-0 pt-8 sm:pt-0">
    <div class="mb-6 flex justify-center md:justify-start">
      <div
      class="w-full h-28 md:w-full md:h-32 rounded-lg shadow-sm bg-gradient-to-br from-brand to-accent"
      aria-hidden="true"
      >
      <h1 class="text-4xl md:text-4xl font-bold text-center text-accent pt-10">Contact me</h1>
    </div>

    </div>
    <form ref="formRef" @submit="onSubmit" class="space-y-6 bg-base-100 p-6 rounded-lg shadow-md bg-white">
      <!-- Name + Email on the same line (responsive) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">
            Name <span class="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            name="from_name"
            required
            autocomplete="name"
            aria-required="true"
            placeholder="Your full name"
            class="input input-bordered w-full bg-white"
          />
          <p class="text-xs text-gray-500 mt-1">Please enter the name I can address you by.</p>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">
            Email <span class="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            name="from_email"
            type="email"
            required
            autocomplete="email"
            aria-required="true"
            placeholder="you@example.com"
            class="input input-bordered w-full bg-white"
          />
          <p class="text-xs text-gray-500 mt-1">I will only use this to reply to your message.</p>
        </div>
      </div>

      <!-- Subject -->
      <div>
        <label class="block text-sm font-medium mb-1">
          Subject <span class="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          name="title"
          required
          placeholder="What is this about?"
          class="input input-bordered w-full bg-white"
        />
      </div>

      <!-- Message -->
      <div>
        <label class="block text-sm font-medium mb-1">
          Message <span class="text-red-500" aria-hidden="true">*</span>
        </label>
        <textarea
          name="message"
          required
          rows="6"
          placeholder="Write your message..."
          class="textarea textarea-bordered w-full bg-white"
        ></textarea>
        <p class="text-xs text-gray-500 mt-1">Aim for a clear subject and a concise message — I'll get back to you shortly.</p>
      </div>

      <!-- Actions + status -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div class="flex items-center gap-3">
          <button
            type="submit"
            class="btn bg-brand text-accent flex items-center gap-2 hover:bg-accent hover:text-brand hover:border-accent transition-colors duration-150"
            :disabled="sending"
            :aria-busy="sending ? 'true' : 'false'"
          >
            <svg v-if="sending" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
            <span v-if="sending">Sending…</span>
            <span v-else>Send</span>
          </button>

          <button
            type="button"
            class="btn btn-ghost"
            @click="formRef && formRef.reset && formRef.reset()"
            :disabled="sending"
          >
            Reset
          </button>
        </div>

        <div class="text-sm" role="status" aria-live="polite">
          <span v-if="success === true" class="text-success">Message sent — thank you!</span>
          <span v-else-if="success === false" class="text-error">Send failed: {{ errorMsg || 'Unknown error' }}</span>
          <span v-else class="text-muted">All fields are required.</span>
        </div>
      </div>
    </form>
  </main>
</template>