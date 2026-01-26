<script setup lang="ts">
import { computed } from 'vue'
import { usePeopleStore } from '@/store/people'

const store = usePeopleStore()

const peopleWithYears = computed(() => store.peopleWithYears)
</script>

<template>
  <div class="flex flex-col gap-4 w-full items-center gap-5">
    <h1 class="text-xl text-primary w-full">People list</h1>

    <div class="flex flex-col gap-3 lg:w-1/4 min-w-fit">
      <router-link
        v-for="person in peopleWithYears"
        :key="person.id"
        :to="`/person/${person.id}`"
        class="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-violet-500 text-dark hover:text-primary"
      >
        <img
          src="/photo.png"
          :alt="person.name"
          class="w-10 h-10 rounded-full border-1 border-violet-500 object-cover"
        />
        <div>
          <div>{{ person.name }}</div>
          <div>{{ person.ageInYears }} years old</div>
        </div>
      </router-link>
    </div>

    <router-link to="/settings" class="text-violet-600 hover:underline text-sm flex justify-center">
      Settings
    </router-link>
  </div>
</template>
