<template>
    <div class="todoitem">
        <span class="title">{{data.title}}</span>
        <span class="des">{{data.description}}</span>
        <span class="project" :style='Color'>{{data.project}}</span>
        <span class="done"></span>
        <span class="star"></span>
        <span class="delete"></span>
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
        created () {
            let project = this.data.project;
            this.projects.data.forEach((item) => {
                if (project === item.name) {
                    console.log(item.name);
                    console.log({background: item.color});
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
</style>
