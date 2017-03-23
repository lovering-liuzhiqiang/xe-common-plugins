<style lang="less">
    @import "../src/styles/index.scss";
</style>
<style scoped>
nav { margin: 20px; }
nav h3 {
    border-bottom:1px solid #000000;
    line-height: 30px;
}
nav a {
    color: #3399ff;
    line-height: 30px;
}
ul { display: flex; flex-wrap: wrap; }
li { display: inline-block; }
li + li { border-left: solid 1px #bbb; padding-left: 10px; margin-left: 10px; }
.container{}
.v-link-active { color: #bbb; }
</style>
<template>
    <div class="container">
        <nav>
            <h3>demo list</h3>
            <ul>
                <li><router-link to="/header">header</router-link></li>
            </ul>
        </nav>
        <router-view></router-view>
    </div>
</template>
<script>
    module.exports = {
        data: function() {
            return {

            }
        },
        mounted: function() {

        },
        beforeDestroy: function() {

        },
        methods: {

        }
    }
</script>
