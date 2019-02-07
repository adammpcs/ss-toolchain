<template>
<div>
  <div class="carousel" v-if="content.images && content.images.length > 0" @mouseenter="stop" @mouseleave="start">
    <div class="controls">
      <div class="prev-button control" @click="next">
        <sui-icon name="chevron left" />
      </div>
      <div class="next-button control" @click="prev">
        <sui-icon name="chevron right" />
      </div>
    </div>   
    <transition name="fade">
      <img class="fluid" :srcset="srcSet" :src="src" :key="currentImage.url" />
    </transition>   
    <div class="title">
      <transition name="fade">
          <h3 :key="currentImage.url">{{ currentImage.title }}</h3>
      </transition>
    </div>
    <!-- <sui-image transition="fade" fluid :src="currentImage.url" :key="currentImage.id" v-show="!fading" /> -->
  </div>
</div>
</template>

<script>
export default {
  name: 'AppCarousel',
  props: ['content', 'minHeight'],
  data() {
    return {
      activeImage: 0,
      timer: null,
      fading: false
    }
  },
  created: function() {
    this.start();
  },
  computed: {
    height() {
      return (this.minHeight) ? this.minHeight : '480px';
    },

    currentImage() {
      return this.content.images[this.activeImage]
    },

    srcSet() {
      return this.src + '&fit=crop&dpr=1 1x,'
        + this.src + '&fit=max&q=80&dpr=2 2x,'
        + this.src + '&fit=max&q=40&dpr=3 3x'
    },
    src() {
      return this.currentImage.url + '?h=480&w=1600&auto=enhance';
    }
  },
  methods: {
    start() {
      this.timer = setInterval(() => {
        this.next();
      }, 6000);
    },
    stop() {
      clearInterval(this.timer);
    },
    next() {
      this.fading = true;
      this.activeImage = (this.activeImage + 1 < this.content.images.length) ? this.activeImage + 1 : 0;
      this.fading = false;
    },
    prev() {
      this.fading = true;
      this.activeImage = (this.activeImage > 0) ? this.activeImage - 1 : this.content.images.length - 1;
      this.fading = false;
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 350ms ease-in-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.fade-enter-to, .fade-leave {
  opacity: 1;
}

img.fluid {
  max-width: 100%;
}
.carousel {
  position: relative;
  height: 480px;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.carousel img {
  position: absolute;
  height: 100%;
  width: 100%;
}
.controls {
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  z-index: 1000;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.control {
  background: rgba(0,0,0,.6);
  color: #fff;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: opacity .25s ease-in-out;
  opacity: 0;
}
.controls:hover .control {
  opacity: 1;
}
.title {
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
  /* padding: 1rem; */
  width: 360px;
  position: absolute;
  top: 64%;
  bottom: 0;
}
.title h3 {
  padding: 1rem;
  background-color: rgba(0,0,0,.6);
  position: absolute;
  width: 100%;
  text-align: center;
  color: #fff;
  margin: 0;
}
.prev-button {
}
.next-button {
}
</style>