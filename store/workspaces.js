const workspacesModule = {
  // ----------------------------------------
  // -- state
  // ----------------------------------------
  state: () => ({
    workspacesList: [],
    workspace: {}
  }),

  // ----------------------------------------
  // -- getters
  // ----------------------------------------
  getters: {},

  // ----------------------------------------
  // -- mutations
  // ----------------------------------------
  mutations: {
    SET_WORKSPACES_LIST: (state, payload) => {
      state.workspacesList = payload
    },

    SET_WORKSPACE: (state, payload) => {
      state.workspace = payload
    }
  },

  // ----------------------------------------
  // -- actions
  // ----------------------------------------
  actions: {
    async fetchList ({ commit }) {
      const workspacesList = await this.$axios.$get('/me/workspaces')
      commit('SET_WORKSPACES_LIST', workspacesList)
    },

    async fetch ({ commit }, { name }) {
      const workspace = await this.$axios.$get(`/workspaces/${name}`)
      commit('SET_WORKSPACE', workspace)
    }
  }
}

export default workspacesModule
