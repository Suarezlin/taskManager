<template>
    <div class="content">
        <div class="todo-wrapper" v-for="item in comTodo">
            <todos :data="item" :projects="projects" v-show="item.data.length!=0"></todos>
        </div>
        <div class="addnew-wrapper">
            <addnew @togglemenu="toggle"></addnew>
        </div>
        <transition name="fade">
            <div class="menu-wrapper" v-show="show">
                <v-edit :projects="projects" @cancel="toggle" @commit="commit"></v-edit>
            </div>
        </transition>
    </div>
</template>
<script>
    import vEdit from '../edit/edit.vue';
    import addnew from '../addNew/addNew.vue';
    import todos from '../todos/todos.vue';
    export default {
        components: {
            todos, addnew, vEdit
        },
        props: {
            todo: {
                type: Array
            },
            projects: {
                type: Object
            }
        },
        data () {
            return {
                show: false,
                comTodo: {}
            };
        },
        /* es-lint semi disabled */
        watch: {
            todo: function (val, oldval) {
                let d = new Date();
                let todayTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
                let tomorrowTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + (d.getDate() + 1);
                let today = {
                    name: 'Today',
                    data: []
                };
                let tomorrow = {
                    name: 'Tomorrow',
                    data: []
                };
                let later = {
                    name: 'Later',
                    data: []
                };
                let done = {
                    name: 'Done',
                    data: []
                };
                val.forEach((item) => {
                    if (item.date === todayTime && !item.isDone) {
                        today.data.push(item);
                    } else if (item.date === tomorrowTime && !item.isDone) {
                        tomorrow.data.push(item);
                    } else if (!item.isDone) {
                        later.data.push(item);
                    } else {
                        done.data.push(item);
                    }
                    ;
                });
                this.comTodo = {
                    today, tomorrow, later, done
                };
            }
        },
        created () {
            let d = new Date();
            let todayTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
            let tomorrowTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + (d.getDate() + 1);
            console.log(tomorrowTime);
            let today = {
                name: 'Today',
                data: []
            };
            let tomorrow = {
                name: 'Tomorrow',
                data: []
            };
            let later = {
                name: 'Later',
                data: []
            };
            let done = {
                name: 'Done',
                data: []
            };
            this.todo.forEach((item) => {
                if (item.date === todayTime && !item.isDone) {
                    today.data.push(item);
                } else if (item.date === tomorrowTime && !item.isDone) {
                    tomorrow.data.push(item);
                } else if (!item.isDone) {
                    later.data.push(item);
                } else {
                    done.data.push(item);
                }
            });
            this.comTodo = {
                today, tomorrow, later, done
            };
        },
        methods: {
            toggle (a) {
                this.show = !this.show;
            },
            commit (data) {
                this.$emit('commit', data);
            }
        }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .content
        width: 100%
        overflow: auto
        height: 100%
        .addnew-wrapper
            position: absolute
            top: 66px
            right: 44px
        .menu-wrapper
            position: absolute
            top: 50px
            right: 0px
            height: calc(100% - 70px)
            &.fade-enter-active, &.fade-leave-active
                transition: all 0.4s
            &.fade-enter, &.fade-leave-to
                transform: translate3d(100%, 0, 0)
</style>
