<template>
  <div>
    <h1>{{ page.title }}</h1>
    <div v-html="page.content"></div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  apollo: {
    page: {
      query: gql`query Page($slug: String!) {
        page(filter: { slug: {
          eq: $slug
        } }) {
          title,
          content
        }
      }`,
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
}
</script>