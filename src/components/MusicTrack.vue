<template>
    <div class="track" :data-track="id" @click.capture="$parent.$emit('play-track', $event)">
        <div class="name">{{name}}</div>
        <div class="art" :style="artStyle"></div>
    </div>
</template>

<script>
export default {
    name: 'MusicTrack',
    props: {
        name: String,
        art: String,
        id: Number
    },
    data() {
        return {
            artStyle: {backgroundImage: `url(${this.art})`}
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/constants';
$shadow: #888;

.track {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    margin-bottom: 1px;
    background-color: #fff;
    border: 1px solid #fff;
    box-sizing: border-box;
    top: 0;
    transition: top 250ms;

    &:hover {
        cursor: pointer;
        top: -1px;
        z-index: 1;
        box-shadow: 5px 10px 10px rgba($shadow, 0.8), -5px -5px 5px rgba($shadow, 0.8)
    }

    &:active {
        border: 1px solid $docBgColor;
        border-style: groove;
    }

    &.playing {
        background-color: rgba(21, 21, 43);
        color: white;
        top: 0;
        z-index: 2;
        transition: transform 600ms;

        &.force-in-view {
            position: fixed;
            width: 100%;
            top: unset;
            bottom: 100%;
            overflow: hidden;
            transform: translateY(100%);
            box-shadow: 1px 10px 10px rgba($shadow, 0.8);
        }
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
    left: 0;
    bottom: 0;
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
