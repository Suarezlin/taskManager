<template>
    <div class="week">
        <div class="todo-wrapper" v-for="item in [month,done]">
            <todos :data="item" :projects="projects" v-show="item.data.length!=0" @done="doneDone"></todos>
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
                month: {name: 'This Month', data: []},
                done: {name: 'Done', data: []}
            };
        },
        created () {
            let date = new Date();
            let thisMonth = (date.getMonth() + 1).toString();
            this.todo.forEach((item) => {
                if (item.date.split('-')[1] === thisMonth) {
                    if (!item.isDone) {
                        this.month.data.push(item);
                    } else {
                        this.done.data.push(item);
                    }
                }
            });
        },
        methods: {
            doneDone (e) {
                this.$emit('todoDone', e);
                this.$nextTick(() => {
                    this.refresh();
                });
            },
            refresh () {
                let date = new Date();
                this.month.data = [];
                this.done.data = [];
                let thisMonth = (date.getMonth() + 1).toString();
                this.todo.forEach((item) => {
                    if (item.date.split('-')[1] === thisMonth) {
                        if (!item.isDone) {
                            this.month.data.push(item);
                        } else {
                            this.done.data.push(item);
                        }
                    }
                });
            }
        }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .month
        width: 100%
        overflow: auto
        height: 100%
</style>
