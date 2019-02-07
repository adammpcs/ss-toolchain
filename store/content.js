const state = () => ({
  content: [],
  headerMenu: [],
  footerMenu: []
});

const getters = {
  all: state => state.content,
  single: (state) => (id) => { return state.find(s => s.id === id) },
  headerMenuItems: state => state.headerMenu,
  footerMenuItems: state => state.footerMenu
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
  },
  addHeaderMenuItems: ({ state, commit }, items) => {
    console.log('Adding header items ... ', items);
    commit('setHeaderMenu', items);
  },
  addFooterMenuItems: ({ state, commit }, items) => {
    commit('setFooterMenu', items);
  }
};

const mutations = {
  setContent: (state, content) => state.content = content.slice(),
  setHeaderMenu: (state, items) => state.headerMenu = items.slice(),
  setFooterMenu: (state, items) => state.footerMenu = items.slice(),
};

export default { state, getters, actions, mutations };