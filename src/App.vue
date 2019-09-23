<template>
  <div id="main">
    <PlayerPlate 
      v-bind="activeTrack" 
      @play-previous="setActiveTrack(activeTrackId - 1)"
      @play-next="setActiveTrack(activeTrackId + 1)"
      @toggle-play-list="openList = !openList"
    />
    <PlayList 
      :tracks="tracks" 
      v-show="openList"
      @click.native.capture="playTrack"
    />
  </div>
</template>

<script>
import tracks from './assets/tracks.js'
import PlayerPlate from './components/PlayerPlate.vue'
import PlayList from './components/PlayList'

export default {
  name: 'app',
  components: {
    PlayerPlate,
    PlayList
  },
  data() {
    return {
      tracks,
      activeTrackId: 0,
      openList: false
    }
  },
  computed: {
    activeTrack() {
      console.log('active track id', this.activeTrackId);
      return this.tracks[this.activeTrackId];
    }
  },
  methods: {
    setActiveTrack(id) {
      this.activeTrackId = id;

      if (this.activeTrackId < 0) {
        this.activeTrackId = this.tracks.length - 1;
      } else if (this.activeTrackId === this.tracks.length) {
        this.activeTrackId = 0;
      }
    },
    playTrack($event) {
      const target = $event.target;
      const id = target.dataset.track;
      if (id) {
        this.setActiveTrack(id);
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
  overflow-y: scroll;
}

#main {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
