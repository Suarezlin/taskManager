<template>
    <div class="tapbar">
        <div class="tab-header">
            <span class="title">Bar</span>
            <span class="icon"><i class="icon-three-bars"></i></span>
        </div>
        <div class="tab-content">
            <div class="tab-item">
                <div class="title">
                    <span class="text">{{data.type.name}}</span>
                </div>
                <div class="item todo-item" v-for="item in data.type.data">
                    <router-link :to="item.link" @click.native="changeHeader(item.name)"><span class="icon"><i
                            :class="getIcon(item.icon)"></i></span><span
                            class="text">{{item.name}}</span></router-link>
                </div>
            </div>
        </div>
        <div class="tab-content">
            <div class="tab-item">
                <div class="title">
                    <span class="text">{{data.Projects.name}}</span><span class="icon" @click="toggleProject"><i
                        class="icon-add_circle"></i></span>
                    <transition name="changeshow">
                        <div class="addpro" v-show="isChange">
                            <input type="text" placeholder="name" v-model="projectname">
                            <choice-color :colors='colors' radius='3em' @updateColor='updateColor'></choice-color>
                            <div class="commit-change" @click="changeCommit">Commit</div>
                        </div>
                    </transition>
                </div>
                <div class="item project-item" v-for="item in data.Projects.data">
                    <router-link :to="item.link" @click.native="changeHeader(item.name)">
                        <span class="icon"><i :class="getIcon(item.icon)"></i></span><span
                            class="text">{{item.name}}</span>
                        <span class="color" :style="{background:item.color}"></span>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="clean" @click="Clean">Clean</div>
    </div>
</template>
<script>
    import {circularNav, choiceColor} from 'vue-circle-choice';
    const colors = [
        '#1ba6cc',
        '#189ba7',
        '#98c6ae',
        '#45a270',
        '#7cb325',
        '#eb9826',
        '#d8541f',
        '#d40c45',
        '#cf6d90',
        '#980a58',
        '#da565f',
        '#754481',
        '#c11067'
    ];
    export default {
        props: {
            data: {
                type: Object
            }
        },
        data () {
            return {
                colors,
                isChange: false,
                color: '',
                projectname: ''
            };
        },
        components: {
            choiceColor, circularNav
        },
        methods: {
            getIcon (code) {
                let iconMap = ['icon-list2', 'icon-calendar', 'icon-square', 'icon-square', 'icon-calendar2', 'icon-calendar3', 'icon-square', 'icon-square'];
                return iconMap[code];
            },
            changeHeader (name) {
                this.$emit('changeHeader', name);
            },
            Clean () {
                this.$emit('clean');
            },
            toggleProject () {
                this.isChange = !this.isChange;
            },
            updateColor ({index, color}) {
                this.color = color;
            },
            changeCommit () {
                let color = this.color;
                let name = this.projectname;
                let data = {
                    name: name,
                    icon: 2,
                    color: color,
                    link: '/project/' + name
                };
                this.$emit('changeCommit', data);
                this.isChange = !this.isChange;
                this.$nextTick(() => {
                    this.projectname = '';
                });
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
        .router-link-active
            padding-bottom: 5px
            border-bottom: 2px solid deepskyblue
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
                    .addpro
                        width: 160px
                        height: 200px
                        position: absolute
                        background: #fff
                        border-radius: 10px
                        border: 1px solid #eee
                        left: 190px
                        top: 200px
                        &.changeshow-enter-active, &.changeshow-leave-active
                            transition: all 0.4s
                        &.changeshow-enter, &.changeshow-leave-to
                            transform: translate3d(-100%, 0, 0)
                            opacity: 0
                        .commit-change
                            position: absolute
                            bottom: 10px
                            left: 50%
                            margin-left: -22px
                            width: 45px
                            height: 20px
                            border-radius: 3px
                            background: lightcoral
                            font-size: 10px
                            text-align: center
                            line-height: 20px
                            color: #fff
                            cursor: default
                            transition: all 0.4s
                            &:hover
                                transform: scale(1.2)
                        input
                            position: relative
                            margin: 10px 0 0 18px
                            width: 80%
                            border-bottom: 1px solid #eee
                            outline: none
                    .text
                        display: inline-block
                        vertical-align: top
                        width: 80px
                    .icon
                        display: inline-block
                        margin-left: 47px
                        font-size: 14px
                .todo-item
                    .text
                        &:hover
                            color: lightskyblue
                .project-item
                    .text
                        &:hover
                            color: palevioletred
                .item
                    font-size: 14px
                    color: #999
                    margin-bottom: 10px
                    display: flex
                    transition: all 0.4s
                    &:hover
                        transform: scale(1.2)
                    .icon
                        display: inline-block
                        font-size: 14px
                        vertical-align: top
                        margin-right: 10px
                        flex: 0 0 10%
                    .text
                        display: inline-block
                        flex: 0 0 80%
                        transition: all 0.4s
                    &:last-child
                        margin-bottom: 0
                    .color
                        width: 10px
                        height: 10px
                        border-radius: 50%
                        margin-top: 3px
                        display: inline-block
                        flex: 0 0 10px
        .clean
            position: absolute
            cursor: default
            width: 50px
            height: 20px
            background: orange
            border-radius: 5px
            bottom: 10px
            left: 90px
            margin-left: -25px
            color: #fff
            font-size: 14px
            text-align: center
            padding: 3px
            box-sizing: border-box
            transition: all 0.4s
            &:hover
                transform: scale(1.2)
</style>
