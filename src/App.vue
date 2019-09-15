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
      // eslint-disable-next-line
      console.log('app custom event handler', el);
      document.querySelectorAll('.playing').forEach(track => {
        track.classList.remove('playing');
        track.querySelector('.player').pause()
      })
      el.classList.add('playing')
      el.querySelector('.player').play()
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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
