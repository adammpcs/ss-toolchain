<template>
  <div :style="bg">
    <sui-container>
      <div class="content" v-if="content.text" v-html="content.text"></div>
    </sui-container>
  </div>
</template>

<script>
export default {
  name: 'FeatureCallout',
  props: ['content'],
  computed: {
    bg() {
      const backgroundColor = (this.content && this.content.backgroundColor && this.content.backgroundColor.hex) ? this.content.backgroundColor.hex : '#d430e6';
      const backgroundImage = (this.content && this.content.backgroundImage && this.content.backgroundImage.url) ? this.content.backgroundImage.url : undefined;
      return { backgroundColor, backgroundImage }
    }
  }
}
</script>

<style scoped>
  .content {
    padding: 4rem 0;
    font-size: 1.5rem;
    text-align: center;
    color: white;
  }
</style>