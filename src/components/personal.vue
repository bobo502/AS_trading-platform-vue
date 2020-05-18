<template>
    <el-container>
        <el-header style=" padding: 0;
        margin: 0;">
            <Header_nav></Header_nav>
        </el-header>
        <el-container class="person">
            <el-aside class="aside" style="width:200px;">
                <el-menu
                    background-color="#ffffff"
                    text-color="#2f3542"
                    active-text-color="#5352ed"
                    v-for="(item,index) in this.$router.options.routes" v-bind:key="index" router style="overflow:hidden;"
                    >

                    <el-submenu :index="index" v-if="item.person">
                            <div slot="title">
                                <span>{{item.name}}</span>
                            </div>
                            <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path">
                                {{child.name}}
                            </el-menu-item>
                    </el-submenu>
                    </el-menu>
            </el-aside>
            <el-main>
                    <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import Header_nav from './share/Header_nav.vue';

export default {
    data:function(){
        return{
            title:'hello'
        }
    },
    components:{
        'Header_nav':Header_nav
    },
    mounted:function(){
            this.$router.replace({ path: '/personInfo' });
    }
}
</script>
<style scoped>
    .person{
        height: 600px;
        width: 1200px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-40%);
        background-color: #fff;
    }
</style>