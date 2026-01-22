<script setup lang="ts">
import { ref, watch, computed } from 'vue';

const props = defineProps<{
  name: string
  modelValue: number
  inputId: string
  minAge: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const error = ref<string | null>(null);

const localInputValue = ref<string>(format(props.modelValue))

watch(
    () => props.modelValue,
    (newValue) => {
        localInputValue.value = format(newValue)
    }
)

const widths = ['w-[72px]', 'w-[100px]', 'w-[128px]', 'w-[156px]', 'w-[184px]', 'w-[212px]'] 

const widthClass = computed(() => {
    const len = localInputValue.value.replace(/\s/g, '').length
    const step = Math.floor(len / 3)
    return widths[Math.min(step, widths.length - 1)]
})

/*
so this part of the code is optional, 
it possible to do by with using style,
but I decided to keep only the tailwind, 
increasing the width by 28 px every three characters.
i'm blocked here cause tailwind won't accept dynamic ${width}px, so i choose array
 */

function format(value: number | string): string {
    const digits = value.toString().replace(/\D/g, '')
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

function parseToDigit(value: string): number{
    return Number(value.replace(/\D/g, '')) 
}

function onInput(event: Event) {
    console.log(widthClass.value)
    const inputValue = (event.target as HTMLInputElement).value

    localInputValue.value = inputValue

    const inputNumber = parseToDigit(inputValue)
    localInputValue.value = format(inputNumber)

    //earlier was check if input have a text and if yes shows error, but i decided to just ignore not numbers

    if(inputNumber < Math.floor(props.minAge * 720)){
        error.value = 'The entered age is below the minimum'
        return
    }
    error.value = null
    emit('update:modelValue', inputNumber)

}
</script>

<template>
  <div>
    <label
      :for="inputId"
      class="block text-sm font-bold tracking-wide text-violet-700"
    >
      {{ name.toUpperCase() }} IS
    </label>

    <div class="flex items-center gap-2">
      <input
        :id="inputId"
        type="text"
        :value="localInputValue"
        @input="onInput"
        :class="[
            'border border-gray-300 rounded px-2 py-1 text-lg outline-none',
            widthClass
        ]"
        placeholder="0"
      />
      <span class="text-gray-600">hours old</span>
    </div>
    <p v-if="error" class="text-red-500 text-sm mt-1">
      {{ error }}
    </p>
  </div>
</template>
