
// 路由配置
const options = {
    routes: [
        {
            path: '/login',
            name: 'login',
            pid: 1,
            nid: 1,
            hidden: true
        },
        {
            path: '*',
            name: '404',
            pid: 1,
            nid: 2,
            hidden: true
        },
        {
            path: '/403',
            name: '403',
            pid: 1,
            nid: 3,
            hidden: true
        },
        {
            path: '/500',
            name: '500',
            pid: 1,
            nid: 4,
            hidden: true
        },
        {
            path: '/',
            name: 'home',
            pid: 1,
            nid: 5,
        },
        {
            path: 'dashboard',
            name: 'Dashboard',
            pid: 5,
            nid: 6,
        },
        {
            path: 'workplace',
            name: '工作台',
            pid: 6,
            nid: 7,
        },
        {
            path: 'analysis',
            name: '分析页',
            pid: 6,
            nid: 8,
        },
        {
            path: 'form',
            name: '表单页',
            pid: 5,
            nid: 9,
        },
        {
            path: 'basic',
            name: '基础表单',
            pid: 9,
            nid: 10,
        },
        {
            path: 'step',
            name: '分步表单',
            pid: 9,
            nid: 11,
        },
        {
            path: 'advance',
            name: '高级表单',
            pid: 9,
            nid: 12,
        },
        {
            path: 'list',
            name: '列表页',
            pid: 5,
            nid: 13,
        },
        {
            path: 'query',
            name: '查询表格',
            pid: 13,
            nid: 14,
        }
    ]
}

// const createMenu = (rootNode) => {
//     if (rootNode == null) {
//         currentNode = {
//             nid: 1,
//             pid: 0,
//             children: []
//         }
//     }
//     routes.forEach(element => {
//         if (!element.hidden) {
//             pid = element.pid
//             if (pid === currentNode.nid) {
//                 currentNode.children.push(element)
//             } else {
//                 if (length(currentNode.children) > 0) {

//                 }

//             }
//         }
//     });
// }

export default createMenu





