<script setup lang="ts">
import { computed } from 'vue'
// import { store } from '@/store'
import { usePeopleStore } from '@/store/people'

const store = usePeopleStore()

const peopleWithYears = computed(() => store.peopleWithYears)
</script>

<template>
  <div class="flex flex-col gap-4 w-full items-center gap-5">
    <h1 class="text-xl font-bold text-gray-700 w-full">People list</h1>

    <div class="flex flex-col gap-3 lg:w-1/4 min-w-fit">
      <router-link
        v-for="person in peopleWithYears"
        :key="person.id"
        :to="`/person/${person.id}`"
        class="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-violet-500"
      >
        <img
          src="/img.png"
          :alt="person.name"
          class="w-10 h-10 rounded-full border-2 border-violet-500 object-cover"
        />
        <div>
          <div class="font-bold text-gray-700">{{ person.name }}</div>
          <div class="text-gray-600">{{ person.ageInYears }} years old</div>
        </div>
      </router-link>
    </div>

    <router-link to="/settings" class="text-violet-600 hover:underline text-sm flex justify-center">
      Settings
    </router-link>
  </div>
</template>
