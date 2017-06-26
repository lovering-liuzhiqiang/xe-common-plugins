<template>
    <div :class="classes">
        <div class="headerWrapper">
            <div class="header">
                <div class="logo fl">
                    <a :href="pageIndexHref">
                        <img src="./logo.jpg" alt="">
                    </a>
                </div>
                <div class="header-tit fl">运营工作台</div>
                <div class="header-tips fl" :style="'background-image: url('+tipsimg+')'" v-if='tipsShow'>{{tipsText}}</div>
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
                <div class="header-input-panel fr">
                    <div @mouseenter.self.stop="mouseSearch" @mouseleave.stop="outSearch" ref="search">
                        <img src="./nby_03.png" alt="">
                        <span>搜索</span>
                        <div class="header-search" v-if="searchIsShow">
                            <form action="" @submit.prevent='searchSubmit()'>
                                <el-input
                                v-model.trim="searchWords"
                                placeholder="可查询订单号、运输单号、客户单号"
                                :on-icon-click="searchIconClick"
                                icon="search">
                                </el-input>
                            </form>
                            <div class="header-search-list" v-show='searchShow'>
                                <ul>
                                    <li v-for='item in searchList' :key='item'>
                                        <a target="_blank" :href="ofcUrl + item">{{item}}</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!--<div @click="helpClick">-->
                        <!--<img src="./nby_05.png" alt="">-->
                        <!--<span>帮助</span>-->
                    <!--</div>-->
                    <!--<div>-->
                        <!--<img src="./nby_07.png" alt="">-->
                        <!--<span>新手</span>-->
                    <!--</div>-->
                </div>
            </div>
        </div>
        <el-dialog class="xe-video-dialog" title="帮助视频" v-model="dialogVisible" size="small">
            <div  id="J_prismPlayer" class="prism-player" v-if="!noneImgShow">
            </div>
            <img v-if="noneImgShow" class="xe-noneImg" src="./none.gif" alt="没有视频">
        </el-dialog>
    </div>
</template>
<script type="text/ecmascript-6">
    const prefixCls = 'xcms-header';
    import {Dropdown, DropdownMenu, DropdownItem, Input, Dialog} from 'element-ui';
    import {logOut, getNowCookie, getHomeProjectLink} from '../../utils/';
    let img = require('./test.png');
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
                searchWords: '',
                searchList: [],
                ofcUrl: '',
                searchShow: false,
                tipsShow: true,
                tipsText: '本地开发版',
                tipsimg: img,
                searchIsShow: false,
                dialogVisible: false,
                videoId: undefined,
                noneImgShow: false
            };
        },
        created() {
            var _this = this;
            switch (process.env.NODE_ENV) {
                case 'production':
                    this.tipsShow = false;
                    this.pageIndexHref = 'http://paas-web.xianyiscm.com/';
                    break;
                case 'beta':
                    this.tipsText = "预生产";
                    this.pageIndexHref = 'http://paas-web-beta.xianyiscm.com/';
                    break;
                case 'test':
                    this.tipsText = "测试版";
                    this.pageIndexHref = 'http://paas-web-test.xianyiscm.com/';
                    break;
                case 'devend':
                    this.tipsText = "开发版";
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
            'el-dropdown-item': DropdownItem,
            'el-input': Input,
            'el-dialog': Dialog
        },
        mounted() {
            this.insertSdk();
            this.$nextTick(() => {
                var _this = this;
                document.querySelector('body').onclick = function() {
                    _this.searchShow = false;
                };
            });
        },
        methods: {
            searchIconClick(event) {
                event.stopPropagation();
                this.searchSubmit();
            },
            searchSubmit() {
                let projectLink = getHomeProjectLink();
                if (this.searchWords) {
                    switch (process.env.NODE_ENV) {
                        // 生产
                        case 'production':
                            this.ofcUrl = 'http://paas.xianyiscm.com/index#/ofc/orderDetailPageByCode/'
                        break;
                        // 预生产
                        case 'beta':
                            this.ofcUrl = 'http://paas-beta.xianyiscm.com/index#/ofc/orderDetailPageByCode/'
                        break;
                        // 测试
                        case 'test':
                            this.ofcUrl = 'http://paas-test.xianyiscm.com/index#/ofc/orderDetailPageByCode/'
                        break;
                        // 开发版-devend
                        case 'devend':
                            this.ofcUrl = 'http://paas-dev.xianyiscm.com/index#/ofc/orderDetailPageByCode/'
                        break;
                        default:
                            this.ofcUrl = 'http://paas-dev.xianyiscm.com/index#/ofc/orderDetailPageByCode/'
                    }
                    this.$http({
                        method: 'get',
                        baseURL: projectLink.ofcApiBaseUrl,
                        url: '/ofc/searchOverallOrder',
                        params: {
                            code: this.searchWords
                        }
                    }).then(res => {
                        if (res.result.length > 1) {
                            this.searchList = res.result;
                            this.searchShow = true;
                        } else {
                            this.searchShow = false;
                            window.location.href = this.ofcUrl + res.result[0];
                        }
                    }).catch(error => {
                        this.searchShow = false;
                        if (error.code !== 'xe404') {
                            if (error.result === null) {
                                // 没有信息
                                this.$xeMessage({
                                    message: '暂时未查询到信息！'
                                });
                            } else if (error.code === 403) {
                                // 没有权限
                                this.$xeMessage.error('没有权限');
                            } else {
                                this.$xeMessage.error(error.message);
                            }
                        }
                    });
                }
            },
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
            },
            mouseSearch() {
                this.searchIsShow = true;
            },
            outSearch(event) {
                this.searchIsShow = false;
            },
            insertSdk() {
                let link = document.createElement('link');
                link.type = 'text/css';
                link.rel = 'stylesheet';
                link.href = 'http://g.alicdn.com/de/prismplayer/1.7.6/skins/default/index-min.css';
                document.querySelector('head').appendChild(link);
                let script = document.createElement('script');
                script.src = 'http://g.alicdn.com/de/prismplayer/1.7.6/prism-min.js';
                document.querySelector('head').appendChild(script);
            },
            helpClick() {
                this.videoId = window.sessionStorage.getItem('currentVideoId');
                console.log('videoId', this.videoId);
                if (this.videoId) {
                    this.InitPlayer(this.videoId);
                } else {
                    this.dialogVisible = true;
                    this.noneImgShow = true;
                }

            },
            InitPlayer(videoId) {
                let projectLink = getHomeProjectLink();
                var _this = this;
                _this.$http({
                    method: 'POST',
                    url: projectLink.epcApiBaseUrl + '/page/epc/video/getVideoPlayAuthResponseByVideoId/' + videoId
                }).then((res) => {
                    _this.dialogVisible = true;
                    _this.noneImgShow = false;
                    this.$nextTick(() => {
                        var player = new prismplayer({
                            id: "J_prismPlayer",
                            autoplay: true,
                            width: "100%",
                            height: "400px",
                            vid: videoId,
                            playauth: res.result.playAuth,
                        });
                    });
                }).catch((err) => {

                });
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
