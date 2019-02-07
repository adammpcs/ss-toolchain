<template>
  <sui-container fluid text-align="left">
    <div id="site-wrapper">
      <header>
        <sui-menu pointing secondary v-if="!$apollo.loading && menuPrimaryNavigation">
          <router-link is="sui-menu-item" to="/" :active="isActive({ slug: 'home' })">Home</router-link>
          <router-link is="sui-menu-item" to="/news" :active="isActive({ slug: 'news' })">News</router-link>
          <router-link
            is="sui-menu-item"
            v-for="item in menuPrimaryNavigation"
            :key="item.id"
            :active="isActive(item)"
            :content="item.title"
            :to="'/' + item.slug"
            ></router-link>
        </sui-menu>
      </header>
      <main>
        <nuxt />
      </main>
      <footer>
        <sui-container>
          <sui-menu text v-if="!$apollo.loading && menuFooter">
            <router-link is="sui-menu-item" to="/" :active="isActive({ slug: 'home' })">Home</router-link>
            <router-link is="sui-menu-item" to="/news" :active="isActive({ slug: 'news' })">News</router-link>
            <router-link
              is="sui-menu-item"
              v-for="item in menuFooter"
              :active="isActive(item)"
              :key="item.id"
              :content="item.title"
              :to="'/' + item.slug"
              ></router-link>
          </sui-menu>
        </sui-container>
      </footer>
    </div>
  </sui-container>
</template>

<script>
import { MAIN_MENU_QUERY, FOOTER_MENU_QUERY } from '../queries'
import { mapGetters } from 'vuex'

export default {  
  methods: {
    isActive(item) {
      if (this.$route.params.slug && this.$route.params.slug === item.slug)
        return true;
      if (item.slug === 'home' && this.$route.path === '/')
        return true;
      if (item.slug === 'news' && this.$route.path === '/news')
        return true;
      return false;
    },
    select(item) {
      console.log('Selected ... ', item);
      return;
    }
  },
  computed: {
    ...mapGetters({ menuPrimaryNavigation: 'content/headerMenuItems', menuFooter: 'content/footerMenuItems'})
  }
  // apollo: {
  //   menuPrimaryNavigation: {
  //     query: MAIN_MENU_QUERY
  //   },
  //   menuFooter: {
  //     query: FOOTER_MENU_QUERY
  //   }
  // },

}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

#site-wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
}

header, footer {
  flex: 0 0 0;
}

header .ui.secondary.pointing.menu .active.item {
  border-bottom: 4px solid #d430e6;
}
main {
  flex: 1 1 auto;
}

footer {
  background-color: #333;
  color: #fff;
}
footer .ui.text.menu a.item {
  color: #fff;
}
</style>