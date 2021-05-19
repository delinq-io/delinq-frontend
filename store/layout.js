const layoutModule = {
  state: () => ({
    showCreateLinkSlideover: false
  }),

  mutations: {
    TOGGLE_CREATE_LINK_SLIDEOVER: (state, status) => {
      state.showCreateLinkSlideover = status !== undefined ? status : !state.showCreateLinkSlideover
    }
  }
}

export default layoutModule
