<template>
  <div>
    <div v-if="!news">
      <h2>Loading</h2>
    </div>
    <sui-container v-else fluid>     
      <div class="feature-image" v-if="news.featuredImage && news.featuredImage.url">
        <img :src="src + '&fit=crop'" :srcset="srcSet" />
      </div>
      <sui-container>
      <sui-divider hidden />   
      <h1>{{ news.title }}</h1>
      <h2>Testing</h2>
      <sui-divider hidden />   
      <div v-if="news.content">
        <div v-html="news.content"></div>
      </div>
      <sui-divider hidden /> 
      <!-- <pre v-html="news"></pre> -->
      </sui-container>
    </sui-container>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { NEWS_ITEM_QUERY } from '~/queries';
import { mapState, mapGetters } from 'vuex'

export default {  
  computed: {
    ...mapGetters({ data: 'news/all'}),
    news() {
      return (this.data) ? this.data.find(s => s.id === this.$route.params.slug).news : {}
    },
    srcSet() {
      return this.src + '&fit=crop&dpr=1 1x,'
        + this.src + '&fit=max&q=80&dpr=2 2x,'
        + this.src + '&fit=max&q=40&dpr=3 3x'
    },
    src() {
      return this.news.featuredImage.url + '?h=480&w=1600&auto=enhance';
    }    
  },
  head() {
    const storeData = this.$store.getters['news/all']
    const newsData = storeData.find(s => s.id === this.$route.params.slug).data
    if (newsData && newsData.seo) {
      const meta = {
        title: newsData.seo.title,
        meta: [
          { hid: 'description', name: 'description', content: newsData.seo.description }          
        ]
      };
      if (newsData.seo.image !== null) {
        meta.meta.push({ hid: 'og:image', name: 'og:image', content: newsData.seo.image.url + '?h=300&w=560&auto=enhance'})
      }
      return meta;
    } else {
      return {};
    }
  },
  async asyncData ({ route, app, store }) {
    let { data } = await app.apolloProvider.defaultClient.query({ query: NEWS_ITEM_QUERY, variables: { slug: route.params.slug } });
    store.dispatch('news/addNews', { id: route.params.slug, data: data.news })
  },
}
</script>

<style scoped>
.feature-image {
    width: 100%;
    max-height: 460px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.feature-image img {
  width: 100%;
}
</style>