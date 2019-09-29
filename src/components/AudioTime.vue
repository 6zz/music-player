<template>
    <div class="duration">
        <input class="time-slider" type="range" min=0.0 max=100.0 :value="currentTimePercent"
            @change="timeSeeked" />
    </div>
</template>

<script>
export default {
    name: 'AudioTime',
    props: {
        duration: {
            type: Number,
            default: 0.0
        },
        currentTime: {
            type: Number,
            default: 0.0
        }
    },
    updated() {
        this.seekedTime = null;
    },
    data() {
        return {
            seekedTime: null
        }
    },
    computed: {
        currentTimePercent() {
            return this.seekedTime || this.currentTime / this.duration * 100;
        }
    },
    methods: {
        timeSeeked($event) {
            this.seekedTime = $event.target.value;
            this.$emit('seek', this.seekedTime / 100 * this.duration);
        }
    }
}
</script>

<style lang="scss" scoped>
.duration {
    position: relative;
    width: 100%;
    margin: 0 auto;
    align-self: self-start;
}

.currentTime {
    position: absolute;
    top: -2px;
    border-top: 2px solid #000;
    transition: width 250ms;
}

.time-slider {
    appearance: none;
    height: 2px;
    width: 99%;
    background-color: #b2b2b2;
    outline: none;
    position: absolute;
    top: 0;
    left: 0;
    transition: value 250ms;

    &::-webkit-slider-thumb {
        appearance: none;
        height: 6px;
        width: 2px;
        background-color: #000;
        transition: scale .2s;

        &:hover {
            transform: scale(2);
            cursor: pointer;
        }
    }
}
</style>