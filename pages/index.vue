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
import { PAGE_QUERY } from '~queries'

export default {
  components: {
    AppCarousel,
    FeatureCallout,
    PDFEmbed,
    Gallery,
    ThreeColumnFeature
  },
  computed: {

  },
  apollo: {
    page: {
      query: PAGE_QUERY,
      prefetch() {
        return {
          slug: 'home'
        }
      },
      variables() {
        return {
          slug: 'home'
        }
      }
    }
  },
}
</script>

<style>

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

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
</style>
