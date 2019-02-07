const state = () => ({
  news: []
});

const getters = {
  all: state => state.news,
  single: (state) => (id) => { return state.find(s => s.id === id) }
};

const actions = {
  addNews: ({ state, commit }, news) => {
    const existing = state.news.find(s => s.id === news.id);
    if (!existing)
      commit('setNews', [...state.news.slice(), news]);
  },  
  updateNews: ({ state, commit }, news) => {
    const allnews = state.news.filter(s => s.id !== news.id);
    if (existing)
      commit('setNews', [...allnews.slice(), news]);
  }
};

const mutations = {
  setNews: (state, news) => state.news = news.slice()
};

export default { state, getters, actions, mutations };