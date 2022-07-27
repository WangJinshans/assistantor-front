import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            count: 0,
            systemName: "Ant Designed Vue"
        }
    },
    getters: {
        getCount: (state) => state.count,
        getSystemName: (state) => state.systemName,
    },
    mutations: {
        setCount(state, count) {
            state.count = count
        },
        setSystemName(state, systemName) {
            state.systemName = systemName
        },
    }
})

export default store