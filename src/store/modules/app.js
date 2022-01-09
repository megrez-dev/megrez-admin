export default {
    state: {
        collapsed: false,
        isDark: false
    },
    mutations: {
        TOGGLE_COLLAPSED(state) {
            state.collapsed = !state.collapsed
            console.log("toggle colleapsed", state.collapsed)
        },
        TOGGLE_THEME(state) {
            state.isDark = !state.isDark
        }
    }
}