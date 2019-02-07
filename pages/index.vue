<template>
  <div>
    <div v-if="this.$route.path !== '/'">
      <router-view></router-view>
    </div>
    <div v-else>
      <div v-if="$apollo.loading || !page">
        <h2>Loading</h2>
      </div>
      <div v-else>
        <div  v-if="page.content">
          <div v-for="block in page.content" :key="block.id">
            <div v-if="block.__typename === 'TextRecord'" v-html="block.content"></div>
            <div v-if="block.__typename === 'CarouselRecord'">
              <AppCarousel :content="block" />
            </div>
            <div v-if="block.__typename === 'FeatureCalloutRecord'">
              <FeatureCallout :content="block" />
            </div>
            <div v-if="block.__typename === 'PdfEmbedRecord'">
              <PDFEmbed :content="block" />
            </div>
            <div v-if="block.__typename === 'GalleryRecord'">
              <Gallery :content="block" />
            </div>
            <div v-if="block.__typename === 'ThreeColumnFeatureRecord'">
              <ThreeColumnFeature :content="block" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import AppCarousel from '~/components/AppCarousel'
import FeatureCallout from '~/components/FeatureCallout'
import PDFEmbed from '~/components/PDFEmbed'
import Gallery from '~/components/Gallery'
import ThreeColumnFeature from '~/components/ThreeColumnFeature'
import { PAGE_QUERY } from '~/queries'
import { mapState, mapGetters } from 'vuex'

export default {
  components: {
    AppCarousel,
    FeatureCallout,
    PDFEmbed,
    Gallery,
    ThreeColumnFeature
  },
  computed: {
    ...mapGetters({ data: 'content/all'}),
    page() {
      return (this.data) ? this.data.find(s => s.id === 'home').data : {}
    }
  },
  head() {
    const storeData = this.$store.getters['content/all']
    const pageData = storeData.find(s => s.id === 'home').data
    if (pageData && pageData.metaTags) {
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
  },
  async asyncData ({ route, app, store }) {
    let { data } = await app.apolloProvider.defaultClient.query({ query: PAGE_QUERY, variables: { slug: 'home' } });
    store.dispatch('content/addContent', { id: 'home', data: data.page })
  }
}
</script>

<style>

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

</style>

<style scoped>
</style>
