<script setup>
import { ref } from 'vue'
import { sendForm } from '@emailjs/browser'
import { t } from '../i18n'

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
  <div class="mx-auto max-w-screen-lg px-4 pb-20 md:pb-0  pt-6 md:pt-16">
    <div class="mb-6 flex justify-center md:justify-start">
      <div
        class="w-full h-28 md:w-full md:h-32 rounded-lg shadow-sm bg-gradient-to-br from-brand to-purple-800 relative overflow-hidden"
      >
        <h1 class="text-4xl md:text-4xl font-bold text-center text-accent pt-10 pointer-events-none">{{ t('contact.title') }}</h1>
      </div>
    </div>

    <form ref="formRef" @submit="onSubmit" class="space-y-6 bg-base-100 p-6 rounded-lg shadow-md bg-white">
      <!-- Name + Email on the same line (responsive) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="from_name" class="block text-sm font-medium mb-1">
            {{ t('contact.name') }} <span class="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="from_name"
            name="from_name"
            required
            autocomplete="name"
            aria-required="true"
            aria-describedby="from_name_help"
            :placeholder="t('contact.namePh')"
            class="input input-bordered w-full bg-white"
          />
          <p id="from_name_help" class="text-xs text-gray-600 mt-1">{{ t('contact.nameHelp') }}</p>
        </div>

        <div>
          <label for="from_email" class="block text-sm font-medium mb-1">
            {{ t('contact.email') }} <span class="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="from_email"
            name="from_email"
            type="email"
            required
            autocomplete="email"
            aria-required="true"
            aria-describedby="from_email_help"
            :placeholder="t('contact.emailPh')"
            class="input input-bordered w-full bg-white"
          />
          <p id="from_email_help" class="text-xs text-gray-600 mt-1">{{ t('contact.emailHelp') }}</p>
        </div>
      </div>

      <!-- Subject -->
      <div>
        <label for="title" class="block text-sm font-medium mb-1">
          {{ t('contact.subject') }} <span class="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          id="title"
          name="title"
          required
          aria-required="true"
          :placeholder="t('contact.subjectPh')"
          class="input input-bordered w-full bg-white"
        />
      </div>

      <!-- Message -->
      <div>
        <label for="message" class="block text-sm font-medium mb-1">
          {{ t('contact.message') }} <span class="text-red-500" aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          aria-required="true"
          rows="6"
          aria-describedby="message_help"
          :placeholder="t('contact.messagePh')"
          class="textarea textarea-bordered w-full bg-white"
        ></textarea>
        <p id="message_help" class="text-xs text-gray-600 mt-1">{{ t('contact.messageHelp') }}</p>
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
            <span v-if="sending">{{ t('contact.sending') }}</span>
            <span v-else>{{ t('contact.send') }}</span>
          </button>

          <button
            type="button"
            class="btn btn-ghost"
            @click="formRef && formRef.reset && formRef.reset()"
            :disabled="sending"
          >
            {{ t('contact.reset') }}
          </button>
        </div>

        <div class="text-sm" role="status" aria-live="polite">
          <span v-if="success === true" class="text-success">{{ t('contact.sent') }}</span>
          <span v-else-if="success === false" class="text-error">{{ t('contact.failed') }} {{ errorMsg || t('contact.unknown') }}</span>
          <span v-else class="text-muted">{{ t('contact.required') }}</span>
        </div>
      </div>
    </form>
  </div>
</template>