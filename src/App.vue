<template>
  <div id="app">
    <MusicTrack v-for="track in tracks" :key="track.id" v-bind="track" @may-i-play="stopNPlay"/>
  </div>
</template>

<script>
import MusicTrack from './components/MusicTrack.vue'
import tracks from './assets/tracks.js'

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
    stopNPlay(el) {
      document.querySelectorAll('.playing').forEach(track => {
        track.classList.remove('playing');
        track.querySelector('.player').pause()
      })
      el.classList.add('playing')
      const audio = el.querySelector('.player')
      audio.addEventListener('ended', () => {
        el.classList.remove('playing')
        this.stopNPlay(el.nextSibling)
      })
      audio.play()
    }
  }
}
</script>

<style lang="scss">
@import './assets/constants';

html {
  background-color: $docBgColor;
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
