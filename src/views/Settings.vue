<script setup lang="ts">
import { store } from '@/store'
import { computed } from 'vue';

import PageHeader from '@/components/PageHeader.vue';
import NumericInput from '@/components/NumericInput.vue';

const minAgeProxy = computed({
  get: () => store.minimumAgeInMonths,
  set: (val: number) => {
    store.minimumAgeInMonths = val
  }
})
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
        <NumericInput inputId="min-age-input" v-model="minAgeProxy"/>
        <span class="text-gray-600">months</span>
      </div>
    </div>
    </div>
  </div>
</template>
