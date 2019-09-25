<template>
    <div class="control-aux">
        <div class="volume-control">
            <i class="fa fa-volume-off" />
            <input 
                class="volume-slider" 
                type="range" min=0 max=1 step=0.01 
                :value="volume" 
                @change="volumeChanged" 
            />
            <i class="fa fa-volume-up" />
        </div>
        <i class="btn fa fa-list" data-button="playList" />
    </div>
</template>

<script>
export default {
    name: 'AuxButtons',
    props: {
        volume: Number,
        default: new Number(0.25)
    },
    methods: {
        volumeChanged($event) {
            this.$emit('set-volume', $event.target.value);
        }
    }
}
</script>

<style lang="scss" scoped>
.control-aux {
    grid-row: 3 / 4;
    display: grid;
    grid-auto-rows: 4fr;

    .fa-list {
        grid-row: 2 / 4;
        align-self: center;
    }
}

.volume-control {
    grid-row-end: 2;
    font-size: smaller;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.volume-slider {
    appearance: none;
    height: 2px;
    width: 80%;
    background-color: #b2b2b2;
    outline: none;

    &::-webkit-slider-thumb {
        appearance: none;
        height: 6px;
        width: 6px;
        border-radius: 50%;
        background-color: #b2b2b2;
        transition: scale .2s;

        &:hover {
            transform: scale(2);
            cursor: pointer;
        }
    }
}
</style>