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
      :openList="openList"
      @play-track="playTrack"
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
      return this.tracks[this.activeTrackId];
    }
  },
  methods: {
    setActiveTrack(id) {
      const numberTracks = this.tracks.length;
      if (id < 0) {
        id = numberTracks - 1;
      } else if (id === numberTracks) {
        id = 0;
      }
      this.activeTrackId = Number(id);
    },
    playTrack($event) {
      const target = $event.currentTarget;
      const id = target.dataset.track;
      if (id) {
        this.setActiveTrack(Number(id));
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
