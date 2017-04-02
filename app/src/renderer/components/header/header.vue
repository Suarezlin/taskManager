<template>
    <div class="header">
        <div class="icon" v-show="isfold" @click="unfold"><i class="icon-three-bars"></i></div>
        <div class="title">My Task</div>
        <div class="user-info">
            <span class="avatar"></span><span class="name">SuarezLin</span>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            isfold: {
                type: Boolean
            }
        },
        methods: {
            unfold () {
                this.$emit('unfold');
            }
        }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">

    .header
        width: 100%
        height: 50px
        text-align: center
        position: relative
        .icon
            position: absolute
            display: inline-block
            font-size: 16px
            line-height: 50px
            left: 10px
        .title
            position: relative
            display: inline-block
            margin: 0 auto
            text-align: center
            color: #000
            font-size: 14px
            font-weight: 100
            line-height: 50px
            width: 100px
        .user-info
            position: absolute
            display: inline-block
            right: 0
            margin-right: 10px
            height: 100%
            width: 100px
            .avatar
                display: inline-block
                vertical-align: top
                width: 30px
                height: 30px
                border-radius: 50%
                line-height: 30px
                background: url("./avatar.jpg")
                background-size: 40px 40px
                margin-top: 10px
            .name
                margin-left: 10px
                display: inline-block
                font-size: 10px
                line-height: 50px
</style>
