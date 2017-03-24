<template>
    <div :class="classes">
        <el-menu class="el-menu-vertical-demo" :default-active="'oper_007'">
            <el-menu-item
                    v-for="(item, pindex) in menuData"
                    :key="pindex"
                    :index="item.id+''"
                    @click.prevent.native="navTo(item.id)">{{item.menuName}}</el-menu-item>
        </el-menu>
    </div>
</template>
<script type="text/ecmascript-6">
    import {Menu, menuItem} from 'element-ui';
    const prefixCls = 'xcms-mainmenu';
    export default {
        data() {
            return {
                menuData: [
                    {
                        "id": "oper_007",
                        "pid": "oper_root",
                        "actionCode": "oper007",
                        "menuName": "客户中心",
                        "url": "/1",
                        "icon": "fa-users",
                        "number": "1",
                        "remark": "",
                        "yn": null,
                        "parentMenu": null,
                        "hasMenu": true
                    },
                    {
                        "id": "oper_001",
                        "pid": "oper_root",
                        "actionCode": "oper001",
                        "menuName": "产品中心",
                        "url": "",
                        "icon": "fa-cubes",
                        "number": "2",
                        "remark": "",
                        "yn": null,
                        "parentMenu": null,
                        "hasMenu": true
                    },
                    {
                        "id": "oper_006",
                        "pid": "oper_root",
                        "actionCode": "oper006",
                        "menuName": "资源中心",
                        "url": "",
                        "icon": "fa-th-list",
                        "number": "3",
                        "remark": "",
                        "yn": null,
                        "parentMenu": null,
                        "hasMenu": true
                    },
                    {
                        "id": "oper_005",
                        "pid": "oper_root",
                        "actionCode": "oper005",
                        "menuName": "订单中心",
                        "url": "",
                        "icon": "fa-clipboard",
                        "number": "4",
                        "remark": "",
                        "yn": null,
                        "parentMenu": null,
                        "hasMenu": true
                    },
                    {
                        "id": "oper_009",
                        "pid": "oper_root",
                        "actionCode": "oper009",
                        "menuName": "调度中心",
                        "url": "",
                        "icon": "fa-sliders",
                        "number": "5",
                        "remark": "",
                        "yn": null,
                        "parentMenu": null,
                        "hasMenu": true
                    },
                    {
                        "id": "oper_004",
                        "pid": "oper_root",
                        "actionCode": "oper004",
                        "menuName": "仓储中心",
                        "url": "",
                        "icon": "fa-building",
                        "number": "6",
                        "remark": "",
                        "yn": null,
                        "parentMenu": null,
                        "hasMenu": true
                    },
                    {
                        "id": "oper_003",
                        "pid": "oper_root",
                        "actionCode": "oper003",
                        "menuName": "配送中心",
                        "url": "",
                        "icon": "fa-truck",
                        "number": "7",
                        "remark": "",
                        "yn": null,
                        "parentMenu": null,
                        "hasMenu": true
                    },
                    {
                        "id": "413b8d675ee24e30b9e21d824d945fd9",
                        "pid": "oper_root",
                        "actionCode": "oper074",
                        "menuName": "对接中心",
                        "url": "/epc",
                        "icon": "fa-clipboard",
                        "number": "7",
                        "remark": "",
                        "yn": null,
                        "parentMenu": null,
                        "hasMenu": true
                    },
                    {
                        "id": "oper_012",
                        "pid": "oper_root",
                        "actionCode": "oper012",
                        "menuName": "结算中心",
                        "url": "",
                        "icon": "fa-fax",
                        "number": "10",
                        "remark": "",
                        "yn": null,
                        "parentMenu": null,
                        "hasMenu": true
                    },
                    {
                        "id": "oper_013",
                        "pid": "oper_root",
                        "actionCode": "oper012",
                        "menuName": "客服中心",
                        "url": "",
                        "icon": "fa-envelope",
                        "number": "11",
                        "remark": "",
                        "yn": null,
                        "parentMenu": null,
                        "hasMenu": false
                    },
                    {
                        "id": "oper_008",
                        "pid": "oper_root",
                        "actionCode": "oper008",
                        "menuName": "数据分析",
                        "url": "",
                        "icon": "fa-jsfiddle",
                        "number": "13",
                        "remark": "",
                        "yn": null,
                        "parentMenu": null,
                        "hasMenu": true
                    }
                ],
                menuLink: {
                    'oper_007': 'http://localhost:8002/csc/',
                    'oper_001': 'http://www.jd.com/'
                }
            };
        },
        computed: {
            classes() {
                return [
                        `${prefixCls}`
                ];
            }
        },
        methods: {
            navTo(id) {
                this.$xeStore.setItem('abc', 111);
                window.location.href = this.menuLink[id];
            }
        },
        components: {
            'el-menu': Menu,
            'el-menu-item': menuItem
        }
    };
</script>
