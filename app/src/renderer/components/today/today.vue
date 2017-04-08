<template>
    <div class="content">
        <div class="todo-wrapper">
            <todos :data="todayTodo" :projects="projects" v-show="todayTodo.data.length!=0" @done="done" @delete="Delete"></todos>
            <todos :data="todayTodoDone" :projects="projects" v-show="todayTodoDone.data.length!=0"></todos>
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
                todayTodo: {name: '', data: []},
                todayTodoDone: {name: '', data: []}
            };
        },
        created () {
            let d = new Date();
            let todayTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
            let done = [];
            let undone = [];
            this.todo.forEach((item) => {
                if (item.date === todayTime) {
                    if (item.isDone) {
                        done.push(item);
                    } else {
                        undone.push(item);
                    }
                }
            });
            this.$nextTick(() => {
                this.todayTodo = {
                    name: 'Today',
                    data: undone
                };
                this.todayTodoDone = {
                    name: 'Done',
                    data: done
                };
            });
        },
        methods: {
            done (e) {
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
            },
            refresh () {
                let d = new Date();
                let todayTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
                let done = [];
                let undone = [];
                this.todo.forEach((item) => {
                    if (item.date === todayTime) {
                        if (item.isDone) {
                            done.push(item);
                        } else {
                            undone.push(item);
                        }
                    }
                });
                this.$nextTick(() => {
                    this.todayTodo = {
                        name: 'Today',
                        data: undone
                    };
                    this.todayTodoDone = {
                        name: 'Done',
                        data: done
                    };
                });
            }
        }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .content
        width: 100%
        overflow: auto
        height: 100%
</style>
