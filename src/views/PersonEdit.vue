<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
// import { store } from '@/store'
import { usePeopleStore } from '@/store/people'

import AgeInput from '@/components/AgeInput.vue'
import PageHeader from '@/components/PageHeader.vue'

const store = usePeopleStore()
const route = useRoute()

const person = computed(() => {
    const userId = Number(route.params.id)
    return store.getUserById(userId)
})

const minAge = computed(() => {
  return Number(store.minimumAgeInMonths)
})

const ageInHours = computed({
  get() {
    return person.value?.ageInHours ?? 0
  },
  set(value: number) {
    if (!person.value) return
    person.value.ageInHours = value
  }
})
</script>

<template>
  <div v-if="person" class="flex flex-col items-center gap-4 w-full">
    <PageHeader/>
    <h1 class="text-xl text-indigo-900">Change {{person.name}}'s age</h1>
    <div 
      tabindex="0" 
      class="group flex justify-center gap-3">
      <img
        src="/img.png"
        :alt="person.name"
        class="w-14 h-14 rounded-full object-cover
              group-focus-within:border-2
              group-focus-within:border-violet-500"
      />

      <AgeInput
        :name="person.name"
        input-id="hours-input"
        v-model="ageInHours"
        :min-age="minAge"
      />
    </div>
  </div>

  <div v-else class="flex flex-col justify-center">
    <p class="text-gray-600">Person not found</p>
    <router-link to="/" class="text-violet-600 hover:underline text-sm">
      Back to list
    </router-link>
  </div>
</template>
