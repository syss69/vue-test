<script setup lang="ts">
import { computed } from 'vue';
import { usePeopleStore } from '@/store/people';

import PageHeader from '@/components/PageHeader.vue';
import NumericInput from '@/components/NumericInput.vue';

const store = usePeopleStore()

const minAgeProxy = computed({
  get: () => store.minimumAgeInMonths,
  set: (val: number) => {
    store.setMinimumAge(val)
  }
})
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <PageHeader/>
    <div class="flex flex-col items-center gap-4 w-full">
      <h1 class="text-xl text-indigo-900">Settings</h1>

    <div class="group">
      <label for="min-age-input" class="block text-sm tracking-wide text-indigo-900 group-focus-within:text-violet-700">
        MINIMUM AGE
      </label>
      <div class="flex items-center gap-2">
        <NumericInput inputId="min-age-input" v-model="minAgeProxy"/>
        <span class="text-indigo-900">months</span>
      </div>
    </div>
    </div>
  </div>
</template>
