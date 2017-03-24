<template>
    <div :class="classes">
        <div class="headerWrapper">
            <div class="header">
                <div class="logo fl"><router-link to="/">鲜易供应链协同平台</router-link></div>
                <div class='header-msg fr'>
                    <template v-if="userName">
                        欢迎您,<em>{{userName}}</em>
                        <span @click.prevent='logOutfn'>[退出]</span>
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
                userName: ''
            };
        },
        created() {
            var _this = this;
            this.getUserInfo();
            this.$xeBus.$on('logined', function() {
                _this.getUserInfo();
            });
        },
        methods: {
            logOutfn() {
                this.$xeCookies.remove('userInfo');
                this.$xeStore.removeItem('menuList');
                this.$xeStore.removeItem('token');
                this.$router.replace({name: 'Login'});
            },
            logInfn() {
                this.$router.replace({name: 'Login'});
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
