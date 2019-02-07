<template>
  <sui-container>
    <sui-divider hidden />
    <h1>News</h1>
    <sui-card-group :items-per-row="3">
      <sui-card v-for="news in allNews" :key="news.id" class="fluid">
        <sui-image v-if="news.featuredImage" :src="news.featuredImage.url" />
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
  </sui-container>
</template>

<script>
import gql from 'graphql-tag'
import { NEWS_QUERY } from '~/queries'

export default {
  apollo: {
    allNews: {
      query: NEWS_QUERY
    }
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