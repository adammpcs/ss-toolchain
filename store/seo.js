const state = () => ({
  seo: []
});

const getters = {
  allSEO: state => state.seo,
  singleSEO: (state) => (id) => { return state.find(s => s.id === id) }
};

const actions = {
  addSEO: ({ state, commit }, seo) => {
    const existing = state.seo.find(s => s.id === seo.id);
    console.log('Dispatching seo ...' , existing);
    if (!existing)
      commit('setSEO', [...state.seo.slice(), seo]);
    console.log('Finished ... ', state.seo);
  },  
  updateSEO: ({ state, commit }, seo) => {
    const allSEO = state.seo.filter(s => s.id !== seo.id);
    if (existing)
      commit('setSEO', [...allSEO.slice(), seo]);
  }
};

const mutations = {
  setSEO: (state, seo) => state.seo = seo.slice()
};

export default { state, getters, actions, mutations };