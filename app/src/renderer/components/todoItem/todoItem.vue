<template>
    <div class="todoitem">
        <span class="title" v-if="!data.isDone">{{data.title}}</span>
        <span class="title" v-else><del>{{data.title}}</del></span>
        <span class="des" v-if="!data.isDone">{{data.description}}</span>
        <span class="des" v-else><del>{{data.description}}</del></span>
        <span class="project" :style='Color'>{{data.project}}</span>
        <span class="done" @click="Done" v-if="!data.isDone"><i class="icon-check"></i></span>
        <span class="star" v-if="!data.isDone"></span>
        <span class="delete" v-if="!data.isDone"></span>
    </div>
</template>
<script>
    export default {
        props: {
            data: {
                type: Object
            },
            projects: {
                type: Object
            }
        },
        data () {
            return {
                Color: {}
            };
        },
        methods: {
            Done () {
                this.$emit('done', this.data.id);
            }
        },
        watch: {
            data: function () {
                let project = this.data.project;
                this.projects.data.forEach((item) => {
                    if (project === item.name) {
                        this.Color = {background: item.color};
                        return;
                    }
                });
            }
        },
        created () {
            let project = this.data.project;
            this.projects.data.forEach((item) => {
                if (project === item.name) {
                    this.Color = {background: item.color};
                    return;
                }
            });
        }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .todoitem
        width: 100%
        height: 62px
        background: #ffffff
        font-size: 0
        .title
            background: #fff
            display: inline-block
            font-size: 16px
            color: rgba(0, 0, 0, 0.7)
            line-height: 62px
            margin-left: 30px
        .des
            background: #fff
            display: inline-block
            font-size: 16px
            color: #999
            line-height: 62px
            margin-left: 15px
            max-width: 80%
        .project
            display: inline-block
            font-size: 12px
            padding: 3px
            border-radius: 4px
            color: #fff
            margin-left: 15px
        .done
            float: right
            display: inline-block
            font-size: 18px
            line-height: 62px
            color: #999
            margin-right: 20px
            transition: all 0.4s
            &:hover
                color: limegreen
                transform: scale(1.6)
</style>
