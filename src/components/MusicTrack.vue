<template>
    <div class="track" @click="playTrack">
        <div class="name">{{name}}</div>
        <div class="art" :style="artStyle"></div>
        <audio 
            class="player" 
            controls 
            preload="metadata" 
            :src="audio" 
            @ended="$emit('may-i-play', $el.nextSibling)">
        </audio>
    </div>
</template>

<script>
export default {
    name: 'MusicTrack',
    props: {
        name: String,
        art: String,
        audio: String
    },
    data() {
        return {
            artStyle: {backgroundImage: `url(${this.art})`}
        }
    },
    methods: {
        playTrack(e) {
            const currentTarget = e.currentTarget;
            let target = e.target;

            if (target.classList.contains('player')) {
                return;
            } else {
                target = currentTarget;
            }
            this.$emit('may-i-play', target);
        }
    }
}
</script>

<style lang="scss">
@import '../assets/constants';
    .track {
        position: relative;
        display: flex;
        justify-content: space-between;
        padding: 10px;
        margin-bottom: 1px;
        background-color: #fff;
        border: 1px solid #fff;
        box-shadow: 5px 5px #888;
        box-sizing: border-box;

        &:hover {
            cursor: pointer;
        }

        &:active {
            border: 1px solid $docBgColor;
            border-style: groove;
        }

        &.playing {
            background-color: rgba(21, 21, 43, 0.9);
            color: white;
            position: sticky;
            top: 0;
            z-index: 1;
        }
    }

    .name {
        text-align: left;

        .playing & {
            font-weight: bold;
        }
    }

    .player {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 15px;
        display: none;

        .playing & {
            display: block;
            background: #f2f2f2;
        }

        &:focus {
            outline: none;
        }
    }
    
    .art {
        flex: 0 0 50px;
        background: #f1f1f1 no-repeat center/cover;
        height: 50px;
        margin-left: 10px;
    }
</style>
