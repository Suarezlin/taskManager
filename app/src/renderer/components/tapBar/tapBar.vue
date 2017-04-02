<template>
    <div class="tapbar">
        <div class="tab-header">
            <span class="title">Bar</span>
            <span class="icon"><i class="icon-three-bars"></i></span>
        </div>
        <div class="tab-content">
            <div class="tab-item">
                <div class="title">
                    <span class="text">{{data.type.name}}</span><span class="icon"><i
                        class="icon-add_circle"></i></span>
                </div>
                <div class="item" v-for="item in data.type.data">
                    <span class="icon"><i :class="getIcon(item.icon)"></i></span><span class="text">{{item.name}}</span>
                </div>
            </div>
        </div>
        <div class="tab-content">
            <div class="tab-item">
                <div class="title">
                    <span class="text">{{data.Projects.name}}</span><span class="icon"><i
                        class="icon-add_circle"></i></span>
                </div>
                <div class="item" v-for="item in data.Projects.data">
                    <span class="icon"><i :class="getIcon(item.icon)"></i></span><span class="text">{{item.name}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            data: {
                type: Object
            }
        },
        methods: {
            getIcon (code) {
                let iconMap = ['icon-list2', 'icon-calendar', 'icon-square', 'icon-square', 'icon-calendar2', 'icon-calendar3', 'icon-square', 'icon-square'];
                return iconMap[code];
            }
        }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .tapbar
        width: 181px
        height: 100%
        background: #ffffff
        border-right: 1px solid #eee
        .tab-header
            width: 100%
            height: 50px
            background: linear-gradient(to right, rgb(88, 90, 233), rgb(115, 117, 249));
            color: #fff
            .title
                font-size: 16px
                font-weight: 400
                line-height: 50px
                margin-left: 20px
            .icon
                font-size: 16px
                line-height: 50px
                margin-left: 100px
        .tab-content
            .tab-item
                padding-left: 20px
                padding-right: 20px
                .title
                    font-size: 16px
                    height: 55px
                    line-height: 60px
                    .text
                        display: inline-block
                        vertical-align: top
                        width: 80px
                    .icon
                        display: inline-block
                        margin-left: 45px
                        font-size: 14px
                .item
                    font-size: 14px
                    color: #999
                    margin-bottom: 10px
                    .icon
                        display: inline-block
                        font-size: 14px
                        vertical-align: top
                        margin-right: 10px
                    .text
                        display: inline-block
                    &:last-child
                        margin-bottom: 0


</style>
