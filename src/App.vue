<template>
  <div id="main">
    <PlayerPlate 
      v-bind="activeTrack" 
      @play-previous="setActiveTrack(-1)"
      @play-next="setActiveTrack(1)"
    />
    <!-- <MusicTrack v-for="track in tracks" :key="track.id" v-bind="track" @may-i-play="playTrack"/> -->
  </div>
</template>

<script>
import PlayerPlate from './components/PlayerPlate.vue'
import tracks from './assets/tracks.js'

export default {
  name: 'app',
  components: {
    PlayerPlate
  },
  data() {
    return {
      tracks,
      activeTrackId: 0,
    }
  },
  computed: {
    activeTrack() {
      return this.tracks[this.activeTrackId];
    }
  },
  methods: {
    setActiveTrack(delta) {
      this.activeTrackId += delta;

      if (this.activeTrackId < 0) {
        this.activeTrackId = this.tracks.length - 1;
      } else if (this.activeTrackId === this.tracks.length) {
        this.activeTrackId = 0;
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
  max-width: 650px;
  margin: 0 auto;
}

body {
  margin: 0;
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
