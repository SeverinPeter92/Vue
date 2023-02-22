import { ref, watch } from "vue";

const store = ref({
    blocks: [
        {name: 'Block 1', hash: 'testhash1', previousHash: '0', nonce: 0, timestamp: 1483228800000,
            transactions: [{ test1: 'test1', test2: 'test2'}, { test1: 'test3', test2: 'test4'}]}
    ],
    wallet: 'testhash'
})

watch(store, () => {
    console.log(store)
})
export default store

