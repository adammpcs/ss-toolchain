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
// import { PAGE_QUERY } from '../queries'

const fragments = {
  text: `
    ... on TextRecord {
      id
      content
    }
  `,
  gallery: `  
    ... on GalleryRecord {
      id
      images {
        alt
        height
        size
        title
        url
        width
      }
    }
  `,
  pdf: `  
    ... on PdfEmbedRecord {
    id
    document {
      alt
      format
      height
      size
      title
      url
      width
    }
  }
  `,
  carousel: `  
    ... on CarouselRecord {
    id
    images {
      alt
      height
      size
      title
      url
      width
    }
  }
  `,
  threeColumn: `  
    ... on ThreeColumnFeatureRecord {
      id
    column1
    column1Image {
      alt
      height
      size
      title
      url
      width
    }
    column2
    column2Image {
      alt
      height
      size
      title
      url
      width
    }
    column3
    column3Image {
      alt
      height
      size
      title
      url
      width
    }
  }
  `,
  feature: `  
    ... on FeatureCalloutRecord {
    id
    text
    backgroundColor { hex }
    backgroundImage {
      alt
      height
      size
      title
      url
      width
    }
  }
  `,
  pageLink: `
    ... on PageRecord {
      id
      title
      slug
    }
  `,
  newsLink: `
    ... on NewsRecord {
      id
      title
      slug
    }
  `
}

const PAGE_QUERY = gql`
  query Page($slug: String!) {
    page(filter: { slug: {
      eq: $slug
    } }) {
      title
      featuredImage {
        alt
        height
        size
        title
        url
        width
      }
      metaTags {
        title,
        description,
        image {
          alt
          height
          size
          title
          url
          width
        }
      }
      content {
        ${fragments.text}
        ${fragments.gallery}
        ${fragments.carousel}
        ${fragments.pdf}
        ${fragments.threeColumn}
        ${fragments.feature}
      }
    }
  }  
`

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
