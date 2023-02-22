<template>
    <div class="text-left p-3" style="border: 1px solid black; border-radius: 5px; width: max-content" @click="$emit('click')">
        <b-row style="border-bottom: 1px solid black;">
            <b-col>
                {{ name }}
            </b-col>
        </b-row>

        <b-row class="mt-3">
            <b-col>
                <div>
                    Hash
                </div>
                <div>
                    {{ hash }}
                </div>
            </b-col>
        </b-row>

        <b-row class="mt-1" style="border-bottom: 1px solid black;">
            <b-col>
                <div>
                    Hash of previous Block
                </div>
                <div>
                    {{ previousHash }}
                </div>
            </b-col>
        </b-row>

        <b-row class="mt-3" style="border-bottom: 1px solid black;">
            <b-col>
                <div>
                    Nonce
                </div>
                <div>
                    {{ nonce }}
                </div>
            </b-col>
        </b-row>

        <b-row class="mt-3">
            <b-col>
                <div>
                    Timestamp
                </div>
                <div>
                    {{ timestamp }}
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    props: {
        name: String,
        hash: String,
        previousHash: String,
        nonce: Number,
        timestamp: Number
    }
})
</script>

<style scoped>

</style>
