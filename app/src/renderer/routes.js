import content from './components/content/content.vue';
import today from './components/today/today.vue';
import week from './components/week/week.vue';
import month from './components/month/month.vue';
import project from './components/project/project.vue';
export default [
    {
        path: '/',
        name: 'index',
        component: content
    },
    {
        path: '/mytask',
        name: 'mytask',
        component: content
    },
    {
        path: '/today',
        name: 'today',
        component: today
    },
    {
        path: '/week',
        name: 'week',
        component: week
    },
    {
        path: '/month',
        name: 'month',
        component: month
    },
    {
        path: '/project/:name',
        name: 'project',
        component: project
    }
];
