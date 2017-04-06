<template>
    <div id="#app" class="main">
        <transition name="fold">
            <div class="tapbar-wrapper" v-show="!isfold">
                <div class="tofold" @click="fold"></div>
                <tap-bar :data="result" @changeHeader="changeHeader" @clean="Clean"
                         @changeCommit="changeCommit"></tap-bar>
            </div>
        </transition>
        <div class="main-wrapper">
            <div class="header-wrapper">
                <v-header @unfold="unfold" :isfold="isfold" :name="headername"></v-header>
            </div>
            <div class="content-wrapper">
                <transition name="changetab">
                    <router-view :todo="result.ToDos" :projects="result.Projects" @todoDone="todoDone"
                                 @commit="commit" class="router-hook" ref="content"></router-view>
                </transition>
                <!--<v-content :todo="result.ToDos" :projects="result.Projects" @todoDone="todoDone"-->
                <!--@commit="commit"></v-content>-->
            </div>
        </div>
    </div>
</template>

<script>
    import vHeader from './components/header/header.vue';
    import tapBar from './components/tapBar/tapBar.vue';
    import vContent from './components/content/content.vue';
    export default {
        components: {
            vHeader, tapBar, vContent
        },
        data () {
            return {
                isfold: true,
                result: {},
                headername: 'My Task'
            };
        },
        methods: {
            unfold () {
                this.isfold = false;
            },
            changeHeader (name) {
                this.headername = name;
            },
            fold () {
                this.isfold = true;
            },
            commit (data) {
                this.result.ToDos.push(data);
                localStorage.data = JSON.stringify(this.result);
            },
            todoDone (e) {
                this.result.ToDos.forEach((item) => {
                    if (item.id === e) {
                        item.isDone = true;
                        localStorage.data = JSON.stringify(this.result);
                        return;
                    }
                });
            },
            Clean () {
                var obj = {
                    ToDos: [{
                        id: 1,
                        title: 'The first to-do',
                        description: 'press "Add a todo" button to add a to-do!',
                        project: 'Coding',
                        date: '2017-4-3',
                        isDone: false
                    }],
                    type: {
                        name: 'To-do',
                        data: [
                            {
                                name: 'My task',
                                icon: 0,
                                link: '/mytask'
                            },
                            {
                                name: 'Today',
                                icon: 1,
                                link: '/today'
                            },
                            {
                                name: 'Week',
                                icon: 4,
                                link: '/week'
                            },
                            {
                                name: 'Month',
                                icon: 4,
                                link: '/month'
                            }
                        ]
                    },
                    Projects: {
                        name: 'Projects',
                        data: [
                            {
                                name: 'Design',
                                icon: 2,
                                color: '#91d971',
                                link: '/project/Design'
                            }, {
                                name: 'Coding',
                                icon: 3,
                                color: '#896cec',
                                link: '/project/Coding'
                            }, {
                                name: 'Production',
                                icon: 3,
                                color: '#f06494',
                                link: '/project/Production'
                            }, {
                                name: 'Installation',
                                icon: 3,
                                color: '#77a3fe',
                                link: '/project/Installation'
                            }
                        ]
                    }
                };
                localStorage.data = JSON.stringify(obj);
                let data = JSON.parse(localStorage.data);
                this.result = data;
            },
            changeCommit (data) {
                this.result.Projects.data.push(data);
                localStorage.data = JSON.stringify(this.result);
            }
        },
        created () {
            if (localStorage.data) {
                let data = JSON.parse(localStorage.data);
                this.result = data;
            } else {
                var obj = {
                    ToDos: [{
                        id: 1,
                        title: 'The first to-do',
                        description: 'press "Add a todo" button to add a to-do!',
                        project: 'Coding',
                        date: '2017-4-3',
                        isDone: false
                    }],
                    type: {
                        name: 'To-do',
                        data: [
                            {
                                name: 'My task',
                                icon: 0,
                                link: '/mytask'
                            },
                            {
                                name: 'Today',
                                icon: 1,
                                link: '/today'
                            },
                            {
                                name: 'Week',
                                icon: 4,
                                link: '/week'
                            },
                            {
                                name: 'Month',
                                icon: 4,
                                link: '/month'
                            }
                        ]
                    },
                    Projects: {
                        name: 'Projects',
                        data: [
                            {
                                name: 'Design',
                                icon: 2,
                                color: '#91d971',
                                link: '/project/Design'
                            }, {
                                name: 'Coding',
                                icon: 3,
                                color: '#896cec',
                                link: '/project/Coding'
                            }, {
                                name: 'Production',
                                icon: 3,
                                color: '#f06494',
                                link: '/project/Production'
                            }, {
                                name: 'Installation',
                                icon: 3,
                                color: '#77a3fe',
                                link: '/project/Installation'
                            }
                        ]
                    }
                };
                localStorage.data = JSON.stringify(obj);
                let data = JSON.parse(localStorage.data);
                this.result = data;
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @font-face {
        font-family: Aaux
        src: url('Aaux.ttf') format('truetype')
        font-weight: lighter
        font-style: normal
    }

    html, body, .main
        height: 100%

    .main
        font-family: "Aaux"

    .tapbar-wrapper
        display: inline-block
        float: left
        height: 100%
        .tofold
            position: absolute
            width: 50px
            height: 50px
            left: 131px
            z-index: 100
        &.fold-enter-active, &.fold-leave-active
            transition: all 0.4s
        &.fold-enter, &.fold-leave-to
            transform: translate3d(-181px, 0, 0)

    .main-wrapper
        height: 100%
        .header-wrapper
            width: 100%
        .content-wrapper
            overflow: auto
            height: calc(100% - 50px)
            .router-hook
                &.changetab-enter-active, &.changetab-leave-active
                    transition: all 0.8s
                &.changetab-enter, &.changetab-leave-to
                    transform: translate3d(-100%, 0, 0)
</style>
