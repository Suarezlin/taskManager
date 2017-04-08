<template>
    <div class="week">
        <div class="todo-wrapper" v-for="item in [before,today,later,done]">
            <todos :data="item" :projects="projects" v-show="item.data.length!=0" @done="doneDone" @delete="Delete"></todos>
        </div>
    </div>
</template>
<script>
    import todos from '../todos/todos.vue';
    export default {
        props: {
            todo: {
                type: Array
            },
            projects: {
                type: Object
            }
        },
        components: {
            todos
        },
        data () {
            return {
                before: {name: 'Before', data: []},
                today: {name: 'Today', data: []},
                later: {name: 'Later', data: []},
                done: {name: 'Done', data: []}
            };
        },
        watch: {
            todo: function (val, oldval) {
                this.refresh();
            }
        },
        methods: {
            refresh () {
                this.before.data = [];
                this.today.data = [];
                this.later.data = [];
                this.done.data = [];
                var startStop = [];
                var currentDate = new Date();
                var today = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
                var week = currentDate.getDay();
                var millisecond = 1000 * 60 * 60 * 24;
                var minusDay = week !== 0 ? week - 1 : 6;
                var monday = new Date(currentDate.getTime() - (minusDay * millisecond));
                var tuesday = new Date(monday.getTime() + (1 * millisecond));
                var wed = new Date(monday.getTime() + (2 * millisecond));
                var thu = new Date(monday.getTime() + (3 * millisecond));
                var fri = new Date(monday.getTime() + (4 * millisecond));
                var sat = new Date(monday.getTime() + (5 * millisecond));
                //本周 周日
                var sunday = new Date(monday.getTime() + (6 * millisecond));
                monday = monday.getFullYear() + '-' + (monday.getMonth() + 1) + '-' + monday.getDate();
                sunday = sunday.getFullYear() + '-' + (sunday.getMonth() + 1) + '-' + sunday.getDate();
                tuesday = tuesday.getFullYear() + '-' + (tuesday.getMonth() + 1) + '-' + tuesday.getDate();
                wed = wed.getFullYear() + '-' + (wed.getMonth() + 1) + '-' + wed.getDate();
                thu = thu.getFullYear() + '-' + (thu.getMonth() + 1) + '-' + thu.getDate();
                fri = fri.getFullYear() + '-' + (fri.getMonth() + 1) + '-' + fri.getDate();
                sat = sat.getFullYear() + '-' + (sat.getMonth() + 1) + '-' + sat.getDate();
                //添加本周时间
                startStop.push(monday); //本周起始时间
                startStop.push(tuesday);
                startStop.push(wed);
                startStop.push(thu);
                startStop.push(fri);
                startStop.push(sat);
                //添加本周最后一天时间
                startStop.push(sunday); //本周终止时间
                var index = startStop.indexOf(today);
                var beforeDate = startStop.slice(0, index);
                var laterDate = startStop.slice(index + 1, 6);
                this.todo.forEach((item) => {
                    if (item.date === today) {
                        if (!item.isDone) {
                            this.today.data.push(item);
                        } else {
                            this.done.data.push(item);
                        }
                    } else if (beforeDate.indexOf(item.date) !== -1) {
                        if (!item.isDone) {
                            this.before.data.push(item);
                        } else {
                            this.done.data.push(item);
                        }
                    } else if (laterDate.indexOf(item.date) !== -1) {
                        if (!item.isDone) {
                            this.later.data.push(item);
                        } else {
                            this.done.data.push(item);
                        }
                    }
                });
            },
            doneDone (e) {
                this.$emit('todoDone', e);
                this.$nextTick(() => {
                    this.refresh();
                });
            },
            Delete (e) {
                this.$emit('delete', e);
                this.$nextTick(() => {
                    this.refresh();
                });
            }
        },
        created () {
            var startStop = [];
            var currentDate = new Date();
            var today = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
            var week = currentDate.getDay();
            var millisecond = 1000 * 60 * 60 * 24;
            var minusDay = week !== 0 ? week - 1 : 6;
            var monday = new Date(currentDate.getTime() - (minusDay * millisecond));
            var tuesday = new Date(monday.getTime() + (1 * millisecond));
            var wed = new Date(monday.getTime() + (2 * millisecond));
            var thu = new Date(monday.getTime() + (3 * millisecond));
            var fri = new Date(monday.getTime() + (4 * millisecond));
            var sat = new Date(monday.getTime() + (5 * millisecond));
            //本周 周日
            var sunday = new Date(monday.getTime() + (6 * millisecond));
            monday = monday.getFullYear() + '-' + (monday.getMonth() + 1) + '-' + monday.getDate();
            sunday = sunday.getFullYear() + '-' + (sunday.getMonth() + 1) + '-' + sunday.getDate();
            tuesday = tuesday.getFullYear() + '-' + (tuesday.getMonth() + 1) + '-' + tuesday.getDate();
            wed = wed.getFullYear() + '-' + (wed.getMonth() + 1) + '-' + wed.getDate();
            thu = thu.getFullYear() + '-' + (thu.getMonth() + 1) + '-' + thu.getDate();
            fri = fri.getFullYear() + '-' + (fri.getMonth() + 1) + '-' + fri.getDate();
            sat = sat.getFullYear() + '-' + (sat.getMonth() + 1) + '-' + sat.getDate();
            //添加本周时间
            startStop.push(monday); //本周起始时间
            startStop.push(tuesday);
            startStop.push(wed);
            startStop.push(thu);
            startStop.push(fri);
            startStop.push(sat);
            //添加本周最后一天时间
            startStop.push(sunday); //本周终止时间
            var index = startStop.indexOf(today);
            var beforeDate = startStop.slice(0, index);
            var laterDate = startStop.slice(index + 1, 6);
            this.todo.forEach((item) => {
                if (item.date === today) {
                    if (!item.isDone) {
                        this.today.data.push(item);
                    } else {
                        this.done.data.push(item);
                    }
                } else if (beforeDate.indexOf(item.date) !== -1) {
                    if (!item.isDone) {
                        this.before.data.push(item);
                    } else {
                        this.done.data.push(item);
                    }
                } else if (laterDate.indexOf(item.date) !== -1) {
                    if (!item.isDone) {
                        this.later.data.push(item);
                    } else {
                        this.done.data.push(item);
                    }
                }
            });
        }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .week
        width: 100%
        overflow: auto
        height: 100%
</style>
