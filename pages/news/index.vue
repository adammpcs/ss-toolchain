<template>
  <sui-container>
    <sui-divider hidden />
    <h1>News</h1>
    <sui-card-group :items-per-row="3" v-if="allNews && allNews.length > 0">
      <sui-card v-for="(news, idx) in allNews" :key="news.id" class="fluid">
        <sui-image v-if="news.featuredImage" :src="src(idx) + '&fit=crop'" :srcset="srcSet(idx)" />
        <sui-image v-else src="https://picsum.photos/360/240/?random" />
        <sui-card-content>
          <sui-card-header>{{ news.title }}</sui-card-header>
          <sui-card-meta>{{ news._createdAt | formatDate }}</sui-card-meta>
          <sui-card-description>
            <div class="news-content" v-html="news.content"></div>
            <p><router-link :to="'/news/' + news.slug">Read more</router-link></p>
          </sui-card-description>
        </sui-card-content>
      </sui-card>
    </sui-card-group>
    <div v-else>
      <p>Sorry, no news items were found.</p>
    </div>
    <sui-divider hidden /> 
  </sui-container>
</template>

<script>
import gql from 'graphql-tag'
import { NEWS_QUERY, PAGE_QUERY } from '~/queries'
import { mapState, mapGetters } from 'vuex'

export default {
  // apollo: {
  //   allNews: {
  //     query: NEWS_QUERY
  //   }
  // },
  computed: {
    ...mapGetters({ data: 'content/all', news: 'news/all'}),
    page() {
      return (this.data) ? this.data.find(s => s.id === 'news').data : {}
    },
    allNews() {
      return (this.news) ? this.news.map(n => n.news) : [];
    }
  },
  methods: {    
    srcSet(idx) {
      return this.src(idx) + '&fit=crop&dpr=1 1x,'
        + this.src(idx) + '&fit=max&q=80&dpr=2 2x,'
        + this.src(idx) + '&fit=max&q=40&dpr=3 3x'
    },
    src(idx) {
      return this.allNews[idx].featuredImage.url + '?h=240&w=360&auto=enhance';
    }
  },
  head() {
    const storeData = this.$store.getters['content/all']
    try {
      const pageData = storeData.find(s => s.id === 'news').data
      if (pageData && pageData.metaTags && pageData.metaTags !== null) {
        const meta = {
          title: pageData.metaTags.title,
          meta: [
            { hid: 'description', name: 'description', content: pageData.metaTags.description }          
          ]
        };
        if (pageData.metaTags.image !== null) {
          meta.meta.push({ hid: 'og:image', name: 'og:image', content: pageData.metaTags.image.url + '?h=300&w=560&auto=enhance'})
        }
        return meta;
      } else {
        return {};
      }
    } catch(err) {
      console.error('Problem getting page data ... ', err);
      return {};
    }
  },
  async asyncData ({ route, app, store }) {
    let { data } = await app.apolloProvider.defaultClient.query({ query: PAGE_QUERY, variables: { slug: 'news' } });
    store.dispatch('content/addContent', { id: 'news', data: data.page })
    let news = await app.apolloProvider.defaultClient.query({ query: NEWS_QUERY, variables: {} })
    news.data.allNews.forEach(n => {
      store.dispatch('news/addNews', {id: n.slug, news: n});
    });
  },
}
</script>

<style>
  sui-card  img {
    max-height: 240px;
  }
  .news-content {
    max-height: 4.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>