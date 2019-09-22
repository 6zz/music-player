<template>
    <div class="player-plate" :class="{playing: isPlaying}">
        <div class="art" :style="{backgroundImage: `url(${art})`}"></div>
        <audio :src="audio" preload="meta" ref="audioEl" @ended="$emit('play-next')"/>
        <div class="info">
            <div class="title">{{ name }}</div>
            <div class="controls" @click.capture="controlClicked">
                <div class="btn-control">
                    <button class="btn">
                        <i class="fas fa-fast-backward" data-button="fastBack"/>
                    </button>
                </div>
                <div class="btn-control">
                    <button class="btn">
                        <i class="fas fa-play" data-button="play"></i>
                        <i class="fas fa-pause" data-button="pause"></i>
                    </button>
                </div>
                <div class="btn-control">
                    <button class="btn"><i class="fas fa-fast-forward" data-button="fastForward"/></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PlayerPlate',
    data() {
        return {
            isPlaying: false
        }
    },
    props: {
        art: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        audio: {
            type: String,
            default: ''
        }
    },
    updated() {
        if (this.isPlaying) {
            const audioEl = this.$refs.audioEl;
            audioEl.load();
            audioEl.play();
        }
    },
    methods: {
        controlClicked($event) {
            const target = $event.target;
            const player = this;
            const audioEl = this.$refs.audioEl;

            const controls = {
                play() {
                    player.isPlaying = true;
                    audioEl.play();
                },
                pause() {
                    player.isPlaying = false;
                    audioEl.pause();
                },
                fastBack() {
                    audioEl.pause();
                    player.$emit('play-previous');
                },
                fastForward() {
                    audioEl.pause();
                    player.$emit('play-next');
                }
            }

            const handler = controls[target.dataset.button];
            handler && handler()
        }
    }
}
</script>

<style lang="scss" scoped>
.player-plate {
    display: grid;
    grid-template-rows: repeat(5, 120px);
    grid-template-areas: 
        "art"
        "art"
        "art"
        "info"
        "info";
}

.art {
    grid-area: art;
    background: #f2f2f2 no-repeat center/contain
}
.info {
    grid-area: info;

    display: grid;
    grid-template-rows: repeat(2, 1fr);
    background-color: #f2f2f2;
    color: #000;
    padding: 10px 30px;
}

.title {
    grid-row-end: 2;
}

.controls {
    grid-row-end: 3;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
}

.btn-control {
    display: flex;
    justify-content: center;
    align-items: center;
}

.btn {
    position: relative;
    border: none;
    background: inherit;
    font-size: 30px;
    outline: none;

    &:hover {
        cursor: pointer;
    }

    &:active {
        color: lighten(#000, 60)
    }

    .fa-play,
    .fa-pause {
        display: inline-block;
    }

    .fa-pause {
        display: none;
    }
}

.playing {
    .fa-pause {
        display: inline-block;
    }

    .fa-play {
        display: none;
    }
}
</style>