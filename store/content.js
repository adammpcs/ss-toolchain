const state = () => ({
  content: []
});

const getters = {
  all: state => state.content,
  single: (state) => (id) => { return state.find(s => s.id === id) }
};

const actions = {
  addContent: ({ state, commit }, content) => {
    const existing = state.content.find(s => s.id === content.id);
    if (!existing)
      commit('setContent', [...state.content.slice(), content]);
  },  
  updateContent: ({ state, commit }, content) => {
    const allcontent = state.content.filter(s => s.id !== content.id);
    if (existing)
      commit('setContent', [...allcontent.slice(), content]);
  }
};

const mutations = {
  setContent: (state, content) => state.content = content.slice()
};

export default { state, getters, actions, mutations };