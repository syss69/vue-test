<script setup lang="ts">
import { store } from '@/store'

import PageHeader from '@/components/PageHeader.vue';

function updateMinimumAge(value: string) {
  store.minimumAgeInMonths = Number(value) || 0
}
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <PageHeader/>
    <div class="flex flex-col items-center gap-4 w-full">
      <h1 class="text-xl font-bold text-gray-700">Settings</h1>

    <div>
      <label for="min-age-input" class="block text-sm font-bold tracking-wide text-gray-700">
        MINIMUM AGE
      </label>
      <div class="flex items-center gap-2">
        <input
          id="min-age-input"
          type="text"
          :value="store.minimumAgeInMonths"
          @input="updateMinimumAge(($event.target as HTMLInputElement).value)"
          class="border border-gray-300 rounded px-2 py-1 text-lg outline-none"
          placeholder="0"
        />
        <span class="text-gray-600">months</span>
      </div>
    </div>
    </div>
  </div>
</template>
