<template>
    <div class="player-plate" :class="playerClasses" :style="{width: playerWidth}">
        <div class="art" :style="{backgroundImage: `url(${art})`}"></div>
        <audio
            :src="audio"
            preload="meta"
            ref="audioEl"
            @play="isPlaying=true"
            @pause="whenPaused"
            @ended="playNext"
            @canplay="canPlay"
            @timeupdate="updateAudioPosition"
        />
        <div class="info" @click.capture="controlClicked">
            <div class="track-meta">
                <div class="duration">
                    <div class="currentTime" :style="{width: audioTimePercent}"/>
                </div>
                <div class="title">{{ name }}</div>
            </div>
            <AudioControls />
            <AuxButtons :volume="volume" @set-volume="setPlayerVolume" />
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
            ref: undefined,
            audioTimePercent: 0,
            playerWidth: 0,
            needToLoadAudio: false,
            volume: 0.25
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
        this.$refs.audioEl.volume = this.volume;
        this.$refs.audioEl.load();
        this.setWidth();
        window.addEventListener('resize', this.resized);
    },
    beforeUpdate() {
        this.needToLoadAudio = (this.$refs.audioEl.currentSrc !== this.audio);
    },
    updated() {
        if (this.needToLoadAudio) {
            this.$refs.audioEl.load();
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
                    audioEl.play();
                },
                pause() {
                    audioEl.pause();
                },
                fastBack() {
                    player.audioTimePercent = 0;
                    player.$emit('play-previous');
                },
                fastForward() {
                    player.audioTimePercent = 0;
                    player.$emit('play-next');
                },
                playList() {
                    player.$emit('toggle-play-list');
                }
            }
            const handler = controls[target.dataset.button];
            handler && handler()
        },
        canPlay($event) {
            if(this.isPlaying) {
                $event.target.play();
            }
        },
        whenPaused() {
            const audioEl = this.$refs.audioEl;
            if (!audioEl.ended) {
                this.isPlaying = false;
            }
        },
        playNext() {
            this.$emit('play-next');
        },
        setWidth() {
            this.playerWidth = `${this.$el.parentNode.offsetWidth}px`;
        },
        resized() {
            if (this.raf) {
                cancelAnimationFrame(this.raf);
            }
            this.raf = requestAnimationFrame(this.setWidth.bind(this));
        },
        updateAudioPosition() {
            const audioEl = this.$refs.audioEl;
            if (!audioEl) {
                return;
            }
            const currentTime = audioEl.currentTime;
            const duration = audioEl.duration;

            if (!isNaN(duration)) {
                this.audioTimePercent = `${currentTime / duration * 100}%`;
            }
        },
        setPlayerVolume(volume) {
            this.$refs.audioEl.volume = volume;
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
    padding: 10px 0;
}

.track-meta {
    grid-row: 1 / 2;
    display: grid;
    grid-auto-rows: auto;
    font-size: larger;
}

.duration {
    position: relative;
    width: 100%;
    margin: 0 auto;
    border-top: 2px solid lighten(#000, 70);
}

.currentTime {
    position: absolute;
    top: -2px;
    border-top: 2px solid #000;
    transition: width 250ms;
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