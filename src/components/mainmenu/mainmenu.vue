<template>
    <div :class="classes" id='content'>
        <div class="btn-mainmenu" @click='changeWidth'>
            <span class="xcms-iconfont icon-zhankaishouhui" :class='{"icon-act": menuflag }'></span>
        </div>
        <div class="content-box">
            <ul id="box">
                <li @mouseenter='overfn' @mouseleave='outfn' v-for="(item, pindex) in menuData" :key="item.id" :class="{'active': item.url ? new RegExp(item.url, 'g').test(hrefValue) : false}" @click="menuItemClick(item.url ? new RegExp(item.url, 'g').test(hrefValue) : false, $event)">
                    <el-tooltip effect="light" popper-class='mainmenu-tip' :disabled='tipflag' :content="item.menuName" placement="right">
                        <a :href="item.url | scaleLinks">
                            <em class="xcms-iconfont" :class="'icon-'+item.icon"></em>
                            <span class='text'>
                                {{item.menuName}}
                            </span>
                        </a>
                    </el-tooltip>
                </li>
            </ul>
        </div>
        <div class="scroll" id="scroll">
        	<div class="bar" id="bar"></div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import {scaleLinks} from '../../filters/';
    import {Tooltip} from 'element-ui';
    import {addWheel} from '../../utils/';
    import { addClass, removeClass, getNowCookie} from '../../utils/';
    const prefixCls = 'xcms-mainmenu';
    export default {
        props: {
            menustatus: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                menuflag: false
            };
        },
        created() {
            this.menuflag = this.menustatus;
            if (this.menuflag) {
                addClass(document.querySelector('body'), 'body-mainmenu-sort');
            };
        },
        mounted() {
            this.$nextTick(() => {
                // var oDiv = document.getElementById('div1');

            	var oContent = document.getElementById('content');
            	var oBox = document.getElementById('box');

            	var oScroll = document.getElementById('scroll');
            	var oBar = document.getElementById('bar');

            	//拖拽
            	oBar.onmousedown=function (ev) {
            		var oEvent=ev||event;

            		var disY=oEvent.clientY-oBar.offsetTop;

            		document.onmousemove=function (ev)
            		{
            			var oEvent=ev||event;

            			var t=oEvent.clientY-disY;

            			setTop(t);
            		};

            		document.onmouseup=function ()
            		{
            			document.onmousemove=null;
            			document.onmouseup=null;
            		};

            		return false;
            	};

            	//计算滚动条多高
            	//oBar=oScroll*oContent/oBox

            	var h=oScroll.offsetHeight*oContent.offsetHeight/oBox.offsetHeight;
                console.log(oScroll.offsetHeight);
                console.log(oContent.offsetHeight);
                console.log(oBox.offsetHeight);
            	if(oContent.offsetHeight>oBox.offsetHeight)
            	{
            		oScroll.style.display='none';
            	}

            	if(h<60)h=60;

            	oBar.style.height=h+'px';

            	function setTop(t){
            		if(t<0)
            		{
            			t=0;
            		}
            		else if(t>oScroll.offsetHeight-oBar.offsetHeight)
            		{
            			t=oScroll.offsetHeight-oBar.offsetHeight;
            		}

            		oBar.style.top=t+'px';

            		var scale=t/(oScroll.offsetHeight-oBar.offsetHeight);

            		oBox.style.top=-(oBox.offsetHeight-oContent.offsetHeight+30)*scale+'px';
            	}

            	//鼠标滚轮
            	addWheel(oContent, function (down){
            		var t=0;

            		if(down)
            		{
            			t=oBar.offsetTop+10;
            		}
            		else
            		{
            			t=oBar.offsetTop-10;
            		}

            		setTop(t);
            	});

                oScroll.style.display='none';
                oContent.onmouseover = function() {
                    if(oContent.offsetHeight>oBox.offsetHeight)
                	{
                		oScroll.style.display='none';
                	} else {
                        oScroll.style.display = 'inline-block'
                    }
                }
                oContent.onmouseout = function() {
                    oScroll.style.display = 'none'
                }

            });
        },
        computed: {
            hrefValue() {
                return window.location.href;
            },
            classes() {
                return [
                        `${prefixCls}`,
                        {
                            [`${prefixCls}-sort`]: this.menuflag
                        }
                ];
            },
            tipflag() {
                return !this.menuflag
            },
            menuData() {
                var menuList = window.localStorage.getItem('menuList');
                var datas = menuList ? JSON.parse(menuList) : [];
                var result = [];
                if(datas.length) {
                    datas.forEach((item, index) => {
                        this.$delete(item, 'subMenu')
                        result.push(item);
                    });
                }
                console.log(result);
                return result;
            }
        },
        methods: {
            overfn(event) {
                addClass(event.target || event.srcElement, 'active');
            },
            outfn() {
                removeClass(event.target || event.srcElement, 'active');
            },
            menuItemClick(flag, event) {
                console.log(flag);
                if (flag) {
                    event.preventDefault();
                }
                // 判断是否认证信息
                var approveFlag = getNowCookie().userInfo.userStatus;
                console.log(approveFlag);
                switch (approveFlag) {
                    case '100' :
                        // 未认证
                        event.preventDefault();
                        this.$router.replace({
                            name: 'userinitial'
                        });
                        break;
                    case '200' :
                        // 认证中
                        event.preventDefault();
                        console.log(123123123);
                        this.$router.replace({
                            name: 'userauthentication'
                        });
                        console.log(123123123);
                        break;
                    case '300' :
                        // 驳回
                        event.preventDefault();
                        this.$router.replace({
                            name: 'reject'
                        });
                        break;
                    case '400' :
                        // 已认证
                        break;
                }
            },
            changeWidth() {
                this.menuflag = !this.menuflag;
                if (this.menuflag) {
                    this.$nextTick(() => {
                        addClass(document.querySelector('body'), 'body-mainmenu-sort');
                    });
                } else {
                    this.$nextTick(() => {
                        removeClass(document.querySelector('body'), 'body-mainmenu-sort');
                    });
                }
            }
        },
        filters: {
            scaleLinks
        },
        components: {
            'el-tooltip': Tooltip
        },
        destroyed() {
            removeClass(document.querySelector('body'), 'body-mainmenu-sort');
        }
    };
</script>
