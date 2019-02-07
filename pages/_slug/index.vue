<template>
  <div>
    <div v-if="!page">
      <h2>Loading</h2>
    </div>
    <sui-container v-else fluid>
      <sui-divider hidden />      
      <div class="feature-image" v-if="page.featuredImage && page.featuredImage.url">
        <img :src="page.featuredImage.url" />
      </div>
      <sui-container>
      <sui-divider hidden />   
      <h1>{{ page.title }}</h1>
      <h2>Testing</h2>
      <sui-divider hidden />   
      <div v-if="page.content">
        <div v-for="block in page.content" :key="block.id">
          <div v-if="block.__typename === 'TextRecord'">
            <div v-html="block.content"></div>
          </div>
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
      <sui-divider hidden /> 
      <!-- <pre v-html="page"></pre> -->
      </sui-container>
    </sui-container>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { enableExperimentalFragmentVariables } from 'graphql-tag'
import { PAGE_QUERY } from '../../queries';
import AppCarousel from '~/components/AppCarousel'
import FeatureCallout from '~/components/FeatureCallout'
import PDFEmbed from '~/components/PDFEmbed'
import Gallery from '~/components/Gallery'
import ThreeColumnFeature from '~/components/ThreeColumnFeature'
import { mapState, mapGetters } from 'vuex'

let pageData;

export default {
  components: {
    AppCarousel,
    FeatureCallout,
    PDFEmbed,
    Gallery,
    ThreeColumnFeature
  },
  // computed: {
  //   ...mapGetters({ data: 'seo/allSEO'}),
  //   page() {
  //     return (this.data) ? this.data.find(s => s.id === 'about-us').data : {}
  //   }
  // },
  // head() {
  //   const storeData = this.$store.getters['seo/allSEO']
  //   const pageData = storeData.find(s => s.id === 'about-us').data
  //   console.log('Head ... ', pageData)
  //   if (pageData && pageData.metaTags) {
  //     const meta = {
  //       title: pageData.metaTags.title,
  //       meta: [
  //         // hid is used as unique identifier. Do not use `vmid` for it as it will not work
  //         { hid: 'description', name: 'description', content: pageData.metaTags.description }          
  //       ]
  //     };
  //     if (pageData.metaTags.image !== null) {
  //       meta.meta.push({ hid: 'og:image', name: 'og:image', content: pageData.metaTags.image.url + '?h=300&w=560&auto=enhance'})
  //     }
  //     return meta;
  //   }
  // },
  // async asyncData ({ route, app, store }) {
  //   let { data } = await app.apolloProvider.defaultClient.query({ query: PAGE_QUERY, variables: { slug: route.params.slug } });
  //   store.dispatch('seo/addSEO', { id: 'about-us', data: data.page })
  // },
  // created() {
  //   console.log('Created ... ', this.page);
  // }
  // async asyncData ({ route, app }) {
  //   return await app.apolloProvider.defaultClient.query({ query: PAGE_QUERY, variables: { slug: route.params.slug } })
  //     .then(({ data }) => data);
  // },
  apollo: {
    page: {
      query: PAGE_QUERY,
      prefetch({route}) {
        return {
          slug: route.params.slug
        }
      },
      variables() {
        return {
          slug: this.$route.params.slug,
        }
      }
    }
  },
  head() {
    if (this.page && this.page.metaTags) {
      const meta = {
        title: this.page.metaTags.title,
        meta: [
          // hid is used as unique identifier. Do not use `vmid` for it as it will not work
          { hid: 'description', name: 'description', content: this.page.metaTags.description }          
        ]
      };
      if (this.page.metaTags.image !== null) {
        meta.meta.push({ hid: 'og:image', name: 'og:image', content: this.page.metaTags.image.url + '?h=300&w=560&auto=enhance'})
      }
      return meta;
    } else {
      return { title: 'Demo' }
    }
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