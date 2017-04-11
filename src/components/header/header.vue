<template>
    <div :class="classes">
        <div class="headerWrapper">
            <div class="header">
                <div class="logo fl">
                    <a :href="pageIndexHref">鲜易供应链协同平台</a>
                </div>
                <div class='header-msg fr'>
                    <template v-if="userName">
                            <el-dropdown class='headerDrop' @command="handleCommand">
                                <div class="el-dropdown-link">
                                    <p>欢迎,</p>
                                    <p>{{userName}}</p>
                                    <i class="el-icon-caret-bottom el-icon--right"></i>
                                </div>
                                <el-dropdown-menu class='headerDropmenu' slot="dropdown">
                                    <el-dropdown-item command="a">
                                        <i class="el-icon-setting"></i> 修改密码
                                    </el-dropdown-item>
                                    <el-dropdown-item command="b">
                                        <i class="el-icon-setting"></i> 个人信息
                                    </el-dropdown-item>
                                    <el-dropdown-item command="c">
                                        <i class="el-icon-setting"></i> 返回主页
                                    </el-dropdown-item>
                                    <el-dropdown-item command="d" divided>
                                        <i class="el-icon-setting"></i> 注销
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                    </template>
                    <template v-else>
                        <span @click.prevent='logInfn'>登录</span>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    const prefixCls = 'xcms-header';
    import {Dropdown, DropdownMenu, DropdownItem} from 'element-ui';
    export default {
        name: 'xcmsHeader',
        props: {
            pending: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                userName: '',
                locationHref: 'http://localhost:8001/login',
                pageIndexHref: 'http://localhost:8001/'
            };
        },
        created() {
            var _this = this;

            switch (process.env.NODE_ENV) {
                case 'production':
                    this.locationHref = 'http://paas-web.xianyiscm.com/login';
                    this.pageIndexHref = 'http://paas-web.xianyiscm.com/';
                    break;
                case 'beta':
                    this.locationHref = 'http://paas-web-beta.xianyiscm.com/login';
                    this.pageIndexHref = 'http://paas-web-beta.xianyiscm.com/';
                    break;
                case 'test':
                    this.locationHref = 'http://paas-web-test.xianyiscm.com/login';
                    this.pageIndexHref = 'http://paas-web-test.xianyiscm.com/';
                    break;
                case 'devend':
                    this.locationHref = 'http://paas-web-dev.xianyiscm.com/login';
                    this.pageIndexHref = 'http://paas-web-dev.xianyiscm.com/';
                    break;
            };

            this.getUserInfo();
            this.$xeBus.$on('logined', function() {
                _this.getUserInfo();
            });
        },
        components: {
            'el-dropdown': Dropdown,
            'el-dropdown-menu': DropdownMenu,
            'el-dropdown-item': DropdownItem
        },
        methods: {
            handleCommand(command) {
                switch (command) {
                    case 'a':
                        // 修改密码

                        break;
                    case 'b':
                        // 个人信息

                        break;
                    case 'c':
                        // 返回主页
                        window.location.href = this.pageIndexHref;
                        break;
                    case 'd':
                        // 注销
                        this.logOutfn();
                        break;
                }
            },
            backToLogin() {
                window.location.href = this.locationHref;
            },
            logOutfn() {
                if (process.env.NODE_ENV === 'development') {
                    this.$xeCookies.remove('userInfo');
                    this.$xeCookies.remove('token');
                } else {
                    this.$xeCookies.remove('userInfo', {domain: '.xianyiscm.com'});
                    this.$xeCookies.remove('token', {domain: '.xianyiscm.com'});
                }
                this.$xeStore.removeItem('menuList');
                // this.$xeStore.removeItem('token');
                // this.$router.replace({name: 'Login'});
                this.backToLogin();
            },
            logInfn() {
                // this.$router.replace({name: 'Login'});
                this.backToLogin();
            },
            getUserInfo() {
                var userInfo = this.$xeCookies.get('userInfo');
                if (userInfo) {
                    this.userName = JSON.parse(userInfo).username;
                }
            }
        },
        computed: {
            classes() {
                return [
                        `${prefixCls}`,
                    {
                        [`${prefixCls}-pending`]: this.pending
                    }
                ];
            }
        }
    };
</script>
