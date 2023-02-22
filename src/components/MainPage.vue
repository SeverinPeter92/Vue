<template>
    <b-container>
        <b-row class="mt-3">
            <b-col>
                <div style="width: 100%; max-width: 100vw; overflow-x: auto; gap: 10px;" class="d-flex">
                    <template v-for="block of store.blocks" >
                        <chain-block
                            :nonce="block.nonce"
                            :previous-hash="block.previousHash"
                            :name="block.name"
                            :hash="block.hash"
                            :timestamp="block.timestamp"
                            :key="block.name"
                            @click="selectBlock(block)"
                        />
                    </template>
                </div>
            </b-col>
        </b-row>

        <b-row class="mt-3">
            <b-col>
                <b-table
                    v-if="clickedBlock"
                    :fields="fields"
                    :items="clickedBlock.transaction"
                />
            </b-col>
        </b-row>
    </b-container>
</template>

<script setup lang="ts">
import ChainBlock from "@/components/ChainBlock.vue";
import store from "@/globalStore";
import { ref } from "vue";

const clickedBlock = ref()

const selectBlock = (block) => {
    clickedBlock.value = block
}

const fields = [
    {
        key: 'test'
    },
    {
        key: 'test2'
    }
]
</script>

<style scoped>

</style>
