<template>
    <div class="addnew">
        <div class="add-button" @click="toggle" v-show="!show">
            <div class="add-text">Add a todo</div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            show: {
                type: Boolean
            }
        },
        methods: {
            toggle () {
                this.$emit('togglemenu', this.show);
            }
        }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .addnew
        height: 100%
        .add-button
            position: relative
            width: 90px
            height: 30px
            border-radius: 5px
            background: rgb(128, 128, 251)
            box-shadow: 0 0 5px 0 rgb(128, 128, 251)
            transition: all 0.3s
            cursor:default
            &:hover
                transform: scale(1.2)
                box-shadow: 0 0 8px 0 rgb(128, 128, 251)
            .add-text
                position: absolute
                left: 50%
                margin-left: -28px
                color: #fff
                font-size: 12px
                line-height: 30px
</style>
