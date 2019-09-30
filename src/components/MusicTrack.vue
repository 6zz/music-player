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
    box-sizing: border-box;
    transition: all 250ms;

    &:hover {
        cursor: pointer;
        font-weight: bold;
        box-shadow: inset 1px 1px 2px rgba($shadow, 0.8);
    }

    &:active {
        border: 1px solid $docBgColor;
        border-style: groove;
    }
}

.art {
    flex: 0 0 50px;
    background: #f1f1f1 no-repeat center/cover;
    height: 50px;
    margin-left: 10px;
}
</style>
