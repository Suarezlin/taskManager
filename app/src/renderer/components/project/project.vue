<template>
    <div class="content">
        <div class="todo-wrapper" v-for="item in [todoUndone , todoDone]">
            <todos :data="item" :projects="projects" v-show="item.data.length!=0" @done="Donedone"></todos>
        </div>
    </div>
</template>
<script>
    import todos from '../todos/todos.vue';
    export default {
        components: {
            todos
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
                todoUndone: {name: 'To-do', data: []},
                todoDone: {name: 'Done', data: []}
            };
        },
        watch: {
            '$route' (val, oldval) {
                this.refresh(val.params.name);
            }
        },
        methods: {
            Donedone (e) {
                this.$emit('todoDone', e);
                this.$nextTick(() => {
                    this.refresh(this.$route.params.name);
                });
            },
            refresh (n) {
                let name = n;
                this.todoUndone.data = [];
                this.todoDone.data = [];
                this.todo.forEach((item) => {
                    if (item.project === name) {
                        if (!item.isDone) {
                            this.todoUndone.data.push(item);
                        } else {
                            this.todoDone.data.push(item);
                        }
                    }
                });
            }
        },
        created () {
            let name = this.$route.params.name;
            this.todo.forEach((item) => {
                if (item.project === name) {
                    if (!item.isDone) {
                        this.todoUndone.data.push(item);
                    } else {
                        this.todoDone.data.push(item);
                    }
                }
            });
        }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">

</style>
