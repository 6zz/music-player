<template>
    <div class="track" @click="playTrack">
        <div class="name">{{name}}</div>
        <div class="art" :style="backgroundImage"></div>
        <audio class="player" controls preload="metadata" :src="audio"></audio>
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
            backgroundImage: `url(${this.art})`
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
            position: sticky;
            top: 0;
            z-index: 1;
        }
    }

    .name {
        text-align: left;
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
