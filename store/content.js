import { MAIN_MENU_QUERY, FOOTER_MENU_QUERY } from '../queries'

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
  async nuxtServerInit({ commit }, context) {
    console.log('Running server init ... ', context.app.apolloProvider.defaultClient)
    let { data } = await context.app.apolloProvider.defaultClient.query({ query: MAIN_MENU_QUERY, variables: { } })
    commit('setHeaderMenu', data.menuPrimaryNavigation.links)
    let footer = await context.app.apolloProvider.defaultClient.query({ query: FOOTER_MENU_QUERY, variables: { } })
    commit('setFooterMenu', footer.data.menuFooter.links)
  }
};

const mutations = {
  setContent: (state, content) => state.content = content.slice(),
  setHeaderMenu: (state, items) => state.headerMenu = items.slice(),
  setFooterMenu: (state, items) => state.footerMenu = items.slice(),
};

export default { state, getters, actions, mutations };