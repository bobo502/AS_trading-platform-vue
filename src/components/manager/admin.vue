<template>
    <el-container>
        <el-header class="header"><h2 style="color:#fff;">AS校园后台管理系统</h2></el-header>
        <el-container>
            <el-aside class="aside" style="width:200px;">
                <el-menu
                    default-active="$route.path"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#34495e"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    v-for="(item,index) in this.$router.options.routes" v-bind:key="index" router style="overflow-y:hidden;">
                    <el-submenu :index="index+''" v-if="item.manager">
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
export default {
    data:function(){
        return{
            title:'admin'
        }
    },
    methods:{
        handleClose(key, keyPath) {
        //console.log(key, keyPath);
        },
         handleOpen(key, keyPath) {
        //console.log(key, keyPath);
        },
    }
}
</script>
<style scoped>
    .aside{
        width:200px;
        height: 90vh;
        background-color:#34495e;
    }
    .header{
        height: 100%;
        width: 100%;
        background-color: #1abc9c;
    }
    .el-menu-vertical-demo{
        width: 200px;

    }
</style>