<template>
    <div class="player-plate" :class="playerClasses">
        <div class="art" :style="{backgroundImage: `url(${art})`}"></div>
        <audio 
            :src="audio" 
            preload="meta" 
            ref="audioEl" 
            @ended="$emit('play-next')" 
            @canplay="playAudio"
        />
        <div class="info" @click.capture="controlClicked">
            <div class="title">{{ name }}</div>
            <AudioControls  />
            <AuxButtons />
        </div>
    </div>
</template>

<script>
import AudioControls from './AudioControls'
import AuxButtons from './AuxButtons'

export default {
    name: 'PlayerPlate',
    components: {
        AudioControls,
        AuxButtons
    },
    data() {
        return {
            isPlaying: false,
            ref: undefined
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
    mounted() {
        this.resized();
        window.addEventListener('resize', this.resized);
    },
    updated() {
        if (this.isPlaying) {
            const audioEl = this.$refs.audioEl;
            audioEl.load();
        }
    },
    computed: {
        playerClasses() {
            return {
                playing: this.isPlaying
            }
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
                },
                pause() {
                    audioEl.pause();
                    player.isPlaying = false;
                },
                fastBack() {
                    player.$emit('play-previous');
                },
                fastForward() {
                    player.$emit('play-next');
                },
                playList() {
                    player.$emit('toggle-play-list');
                }
            }
            const handler = controls[target.dataset.button];
            handler && handler()
        },
        playAudio($event) {
            if(this.isPlaying) {
                $event.target.play();
            }
        },
        setWidth() {
            this.$el.style.width = `${this.$el.parentElement.offsetWidth}px`;
        },
        resized() {
            if (this.raf) {
                cancelAnimationFrame(this.raf);
            }
            this.raf = requestAnimationFrame(this.setWidth);
        }
    }
}
</script>

<style lang="scss" scoped>
.player-plate {
    position: fixed;
    top: 0;
    z-index: 2;
    width: 100%;
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
    grid-template-rows: repeat(3, 1fr);
    background-color: #f2f2f2;
    color: #000;
    padding: 10px 30px;
}

.title {
    grid-row: 1 / 2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: larger;
}
</style>

<style lang="scss">
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
}
</style>