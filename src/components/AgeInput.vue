<script setup lang="ts">
import { ref, watch } from 'vue';

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

function format(value: number | string): string {
    const digits = value.toString().replace(/\D/g, '')
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

function parseToDigit(value: string): number{
    return Number(value.replace(/\D/g, '')) 
}

function onInput(event: Event) {
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
        class="border border-gray-300 rounded px-2 py-1 text-lg outline-none"
        placeholder="0"
      />
      <span class="text-gray-600">hours old</span>
    </div>
    <p v-if="error" class="text-red-500 text-sm mt-1">
      {{ error }}
    </p>
  </div>
</template>
