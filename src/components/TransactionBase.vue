<template>
    <b-container>
        <b-row>
            <b-col class="font-weight-bold" style="font-size: xx-large;">
                Erstelle Transaktion
            </b-col>
        </b-row>

        <b-row>
            <b-col class="text-left">
                From address
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-form-input :value="store.wallet" disabled/>
            </b-col>
        </b-row>

        <b-row>
            <b-col class="text-left mt-3">
                To address
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-form-input v-model.number="to"/>
            </b-col>
        </b-row>

        <b-row>
            <b-col class="text-left mt-3">
                Amount
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-form-input v-model.number="amount"/>
            </b-col>
        </b-row>

        <b-row class="mt-3">
            <b-col>
                <b-button @click="create">
                    Erstelle Transaktion
                </b-button>
            </b-col>
        </b-row>
    </b-container>
</template>

<script setup lang="ts">
import store from '@/globalStore';
import { ref } from "vue";

const to = ref('')
const amount = ref(0)
const create = () => {
    //Erstelle eine Transaktion und speichere diese in den Store. Da weisst du besser was man hier machen muss
    store.value.blocks.push({
        name: 'jslkdfjs',
        hash: 'aslkfjlkad',
        nonce: 0,
        previousHash: 'asdfasdf',
        timestamp: Date.now(),
        transactions: [{
            test1: store.value.wallet,
            test2: to.value,
            test3: amount.value
        }]
    })
}
</script>

<style scoped>

</style>
