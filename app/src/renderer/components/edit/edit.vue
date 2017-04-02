<template>
    <div class="edit">
        <div class="title">
            <input type="text" placeholder="Title" v-model="title">
        </div>
        <div class="date">
            <date-picker :date="date" :option="option"></date-picker>
        </div>
        <div class="projects">
            <v-select v-model="selected" :options="options" :placeholder="options[0]"></v-select>
        </div>
        <div class="description">
            <textarea placeholder="Description" v-model="des"></textarea>
        </div>
        <div class="commit" @click="commit">Commit</div>
        <div class="cancel" @click="cancel">Cancel</div>
    </div>
</template>
<script>
    import datePicker from 'vue-datepicker/vue-datepicker-es6.vue';
    export default {
        components: {
            datePicker
        },
        props: {
            projects: {
                type: Object
            }
        },
        data () {
            return {
                title: '',
                des: '',
                date: {
                    time: '' // string
                },
                selected: null,
                options: [],
                option: {
                    type: 'day',
                    week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
                    month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    format: 'YYYY-M-D',
                    placeholder: 'set your to-do time',
                    inputStyle: {
                        'display': 'inline-block',
                        'padding': '6px',
                        'line-height': '22px',
                        'font-size': '14px',
                        'border': '2px solid #fff',
                        'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
                        'border-radius': '2px',
                        'color': '#5F5F5F',
                        'text-align': 'center'
                    }
                }
            };
        },
        methods: {
            cancel () {
                this.$emit('cancel', false);
            },
            commit () {
                this.$emit('cancel', false);
                let data = {
                    title: this.title,
                    description: this.des,
                    project: this.selected,
                    date: this.date.time,
                    isDone: false
                };
                this.$emit('commit', data);
                this.$nextTick(() => {
                    this.title = '';
                    this.des = '';
                    this.selected = this.projects.data[0].name;
                    this.date.time = '';
                });
            }
        },
        watch: {
            selected: function (val, oldval) {
                let tag = document.getElementsByClassName('selected-tag')[0];
                this.projects.data.forEach((item) => {
                    if (val === item.name) {
                        tag.style.background = item.color;
                        tag.style.borderColor = item.color;
                    }
                });
            }
        },
        created () {
            this.projects.data.forEach((item) => {
                this.options.push(item.name);
            });
            this.selected = this.projects.data[0].name;
        }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    *
        font-family: "Aaux"

    .edit
        width: 240px
        height: 100%
        border-left: 1px solid #eee
        background: #ffffff
        padding: 10px
        input
            width: 100%
            height: 30px
            outline: none
            color: lightcoral
            font-size: 14px
            text-align: center
        .title
            width: 100%
        .date
            margin-top: 16px
            text-align: center
        .projects
            margin-top: 20px
            text-align: center
            height: 20px
            width: 100%
            font-size: 12px
            .dropdown-toggle
                border: 0
            .selected-tag
                color: #fff
        .description
            width: 100%
            height: calc(100% - 280px)
            margin-top: 38px
            textarea
                width: 100%
                height: 100%
                border: none
                outline: none
                font-size: 16px
        .commit
            display: inline-block
            position: absolute
            left: 30px
            bottom: 0px
            width: 90px
            height: 30px
            background: rgb(128, 128, 251)
            box-shadow: 0 0 5px 0 rgb(128, 128, 251)
            color: #ffffff
            text-align: center
            border-radius: 5px
            box-sizing: border-box
            padding-top: 6px
            transition: all 0.3s
            cursor:default
            &:hover
                transform: scale(1.2)
                box-shadow: 0 0 8px 0 rgb(128, 128, 251)
        .cancel
            display: inline-block
            position: absolute
            right: 30px
            bottom: 0px
            width: 90px
            height: 30px
            background: red
            box-shadow: 0 0 5px 0 red
            color: #ffffff
            text-align: center
            border-radius: 5px
            box-sizing: border-box
            padding-top: 6px
            transition: all 0.3s
            cursor: default
            &:hover
                transform: scale(1.2)
                box-shadow: 0 0 8px 0 red
</style>
