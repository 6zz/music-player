<template>
    <div class="controls">
        <div class="btn-control">
            <button class="btn">
                <i class="fas fa-fast-backward" data-button="fastBack" />
            </button>
        </div>
        <div class="btn-control">
            <button class="btn">
                <i class="fas fa-play" data-button="play"></i>
                <i class="fas fa-pause" data-button="pause"></i>
            </button>
        </div>
        <div class="btn-control">
            <button class="btn"><i class="fas fa-fast-forward" data-button="fastForward" /></button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.controls {
    grid-row: 2 / 3;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
}

.btn-control {
    display: flex;
    justify-content: center;
    align-items: center;
}

.fa-play,
.fa-pause {
    display: inline-block;
}

.fa-pause {
    display: none;
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