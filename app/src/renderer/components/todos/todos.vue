<template>
    <div class="todos">
        <div class="title">{{data.name}}</div>
        <div class="item-wrapper" v-for="item in data.data">
            <todoitem :data="item" :projects="projects" @done="done"></todoitem>
        </div>
    </div>
</template>
<script>
    import todoitem from '../todoItem/todoItem.vue';
    export default {
        props: {
            data: {
                type: Object
            },
            projects: {
                type: Object
            }
        },
        methods: {
            done (e) {
                this.$emit('done', e);
            }
        },
        components: {
            todoitem
        }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .todos
        background: rgb(247, 249, 252)
        .title
            margin-left: 30px
            height: 60px
            color: gray
            font-size: 16px
            line-height: 60px
        .item-wrapper
            border-bottom: 1px solid rgba(0, 0, 0, 0.1)
            &:last-child
                border-bottom: 0
</style>
