export default {
    state: {
        isCollapse: false,
        isDark: false
    },
    mutations: {
        TOGGLE_COLLAPSED(state) {
            state.isCollapse = !state.isCollapse
        },
        TOGGLE_THEME(state) {
            state.isDark = !state.isDark
        }
    }
}