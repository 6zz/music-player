<template>    
    <ul class="play-list">
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
        }
    }
}
</script>

<style lang="scss" scoped>
.play-list {
    margin-top: 600px;
    // min-height: 0;
    // height: 0;
    overflow: hidden;
    transition: min-height 250ms;

    .play-list-open & {
        height: auto;
        // min-height: auto;
    }
}
</style>