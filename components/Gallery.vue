<template>
  <div>
    Gallery
    <div class="grid-layout">
      <div class="grid-item" v-for="image in content.images" :key="image.url" @click="selectImage(image)">
        <img :src="src(image.url) + '&fit=crop'" :srcset="srcSet(image.url)" />
      </div>
    </div>
    <sui-modal v-model="open">
      <sui-modal-content image v-if="activeImage" scrolling>
        <sui-image wrapped fluid :src="activeImage.url + '?fit=fillmax&h=1200&w=1200&auto=enhance'" />
      </sui-modal-content>
    </sui-modal>
  </div>
</template>

<script>
export default {
  name: 'Gallery',
  props: ['content'],
  data() { 
    return {
      open: false,
      activeImage: undefined
    }
  },
  methods: {
    toggleOpen() { 
      this.open = !this.open
      if (!this.open)
        this.activeImage = undefined
    },
    selectImage(img) {
      this.activeImage = img
      this.toggleOpen();
    },    
    srcSet(url) {
      return this.src(url) + '&fit=crop&dpr=1 1x,'
        + this.src(url) + '&fit=max&q=80&dpr=2 2x,'
        + this.src(url) + '&fit=max&q=40&dpr=3 3x'
    },
    src(url) {
      return url + '?h=240&w=360&auto=enhance';
    }
  },
  computed: {

  }
}
</script>

<style scoped>
div {
  margin: 2rem 0;
}
.grid-layout {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    grid-gap: 10px;
    grid-auto-rows: minmax(180px, auto);
    grid-auto-flow: dense;
    padding: 10px;
}

.grid-item {
  cursor: pointer;
    padding: 1rem;
}
.grid-item img {
  width: 100%;
}
</style>