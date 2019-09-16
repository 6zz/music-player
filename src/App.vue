<template>
  <div id="app">
    <MusicTrack v-for="track in tracks" :key="track.id" v-bind="track" @may-i-play="playTrack"/>
  </div>
</template>

<script>
import MusicTrack from './components/MusicTrack.vue'
import tracks from './assets/tracks.js'
import { inView } from './assets/utils'

export default {
  name: 'app',
  components: {
    MusicTrack
  },
  data() {
    return {
      tracks
    }
  },
  methods: {
    playTrack(el) {
      // only one track playing at a time
      document.querySelectorAll('.playing').forEach(track => {
        track.classList.remove('playing');
        track.querySelector('.player').pause()
      })
      if (el) {
        el.classList.add('playing')
        const audio = el.querySelector('.player')
        audio.play()
        if (!inView(el)) {
          el.scrollIntoView({
            block: 'end',
            behavior: 'smooth'
          })
        }
      }
    }
  }
} 
</script>

<style lang="scss">
@import './assets/constants';

html {
  background-color: $docBgColor;
  min-width: 360px;
}

#app {
  position: relative;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
