<template>
    <div :class="classes">
        <div class="headerWrapper">
            <div class="header">
                <div class="logo fl">
                    <a :href="pageIndexHref">鲜易供应链协同平台</a>
                </div>
                <div class='header-msg fr'>
                    <template v-if="loginName">
                            <el-dropdown class='headerDrop' @command="handleCommand">
                                <div class="el-dropdown-link">
                                    <p>欢迎,</p>
                                    <p>{{loginName}}</p>
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
    import {logOut, getNowCookie} from '../../utils/';
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
                loginName: '',
                pageIndexHref: 'http://localhost:8001/',
                locationHref: 'http://localhost:8001/userauth/login',
                locationForget: 'http://localhost:8001/home/userForgetpass',
                locationPersonInfo: 'http://localhost:8001/home/PersonInfor',
            };
        },
        created() {
            var _this = this;
            switch (process.env.NODE_ENV) {
                case 'production':
                    this.pageIndexHref = 'http://paas-web.xianyiscm.com/';
                    break;
                case 'beta':
                    this.pageIndexHref = 'http://paas-web-beta.xianyiscm.com/';
                    break;
                case 'test':
                    this.pageIndexHref = 'http://paas-web-test.xianyiscm.com/';
                    break;
                case 'devend':
                    this.pageIndexHref = 'http://paas-web-dev.xianyiscm.com/';
                    break;
            };
            this.locationHref = this.pageIndexHref + 'userauth/login';
            this.locationForget = this.pageIndexHref + 'home/userForgetpass';
            this.locationPersonInfo = this.pageIndexHref + 'home/PersonInfor';

            // ======
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
                        window.location.href = this.locationForget;
                        break;
                    case 'b':
                        // 个人信息
                        window.location.href = this.locationPersonInfo;
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
                // 老版退出
                this.$http({
                    method: 'POST',
                    url: '/page/login/logout'
                });
                logOut();
                this.$xeStore.removeItem('menuList');
                this.backToLogin();
            },
            logInfn() {
                // this.$router.replace({name: 'Login'});
                this.backToLogin();
            },
            getUserInfo() {
                var nowCookie = getNowCookie();
                this.loginName = nowCookie.userInfo.loginName;
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
