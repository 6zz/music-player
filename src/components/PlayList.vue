<template>    
    <ul class="play-list" :class="classesPlaylist">
      <MusicTrack 
        v-for="track in tracks" 
        :key="track.id" 
        v-bind="track"
    />
    </ul>
</template>

<script>
import MusicTrack from './MusicTrack'

export default {
    name: 'PlayList',
    components: {
        MusicTrack
    },
    props: {
        tracks: {
            type: Array,
            default() {
                return [];
            }
        },
        openList: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        classesPlaylist() {
            return {
                'play-list-open': this.openList
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.play-list {
    margin-top: 600px;
    max-height: 0;
    min-height: 0;
    overflow: hidden;
    transition: min-height 0.3s ease-in-out, max-height .3s ease .3s;

    &-open {
        min-height: 500px;
        max-height: 99999px;
    }
}
</style>