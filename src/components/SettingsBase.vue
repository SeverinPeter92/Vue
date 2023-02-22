<template>
    <b-container>
        <b-row>
            <b-col class="font-weight-bold" style="font-size: xx-large;" @click="doSomething">
                Settings
            </b-col>
        </b-row>

        <b-row>
            <b-col class="text-left">
                Difficulty
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-form-input v-model.number="difficulty"/>
            </b-col>
        </b-row>

        <b-row>
            <b-col class="text-left mt-3">
                Mining reward
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-form-input v-model.number="reward"/>
            </b-col>
        </b-row>
    </b-container>
</template>

<script setup>
import { ref } from "vue";

const difficulty = ref(1)
const reward = ref(100)

const doSomething = () => {
    //So kannst du die variabeln dann verwenden
    console.log(difficulty.value)
    console.log(reward.value)
}
</script>

<style scoped>

</style>
