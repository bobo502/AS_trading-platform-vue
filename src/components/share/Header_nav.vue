<template>
    <div class="header_nav" v-loading="loading">
        <img :src="url2" class="logo_head"/>
        <img :src="url3" class="logo_text"/>     
        <el-menu class="nav_item " mode="horizontal" text-color="#000" @select="handleSelect" router >
            <div v-for="(item,index) in this.$router.options.routes" v-bind:key="index" >
                <el-menu-item :key="item.path" :index="item.path" v-if="!item.hidden">
                        <span slot="title" style="font-size:18px;font-weight=500;">{{item.name}}</span>
                </el-menu-item>
            </div>
        </el-menu>
        <div v-if="!auth_status" v-cloak>
            <img :src="url1" height="50px" width="50px" class="logo"/>
            <div class="login">
            <router-link to="/login"><span style="margin-bottom:15px;">登录</span></router-link>
            </div>
        </div>
        <div v-else class="fabu">
            <el-dropdown>
                <span class="el-dropdown-link" style="font-size:19px;">
                    发布<i class="el-icon-arrow-down el-icon--right" ></i>
                </span>
                <el-dropdown-menu slot="dropdown" class="fabu_memu">
                    <el-dropdown-item class="fabu_item"><router-link to="/release"><img :src="url4" alt="" class="logo_fabu1">发布商品</router-link></el-dropdown-item>
                    <el-dropdown-item class="fabu_item"><router-link to="/release_buy"><img :src="url5" alt="" class="logo_fabu2">发布求购</router-link></el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <router-link to="/personal" style="font-size:18px;margin-left:50px;">个人中心<img :src="url6" class="logo_personal"></router-link>
            <img :src="url7" @click="layout()" class="logo_layout">
        </div>
    </div>
</template>
<script>
import {postRequest} from '../../utils/api';
import {getRequest} from '../../utils/api';
export default {
    data:function(){
        return{
            url1:require('../../assets/img/login3.png'),
            url2:require('../../assets/img/university.png'),
            url3:require('../../assets/img/university_text.png'),
            url4:require('../../assets/img/fabu1.png'),
            url5:require('../../assets/img/fabu2.png'),
            url6:require('../../assets/img/personal.png'),
            url7:require('../../assets/img/layout.png'),
            auth_status:false,
            loading:true
        }
    },
    methods: {
        handleSelect(key, keyPath) {
        console.log(key, keyPath);
        },
        layout(){
            var _this=this;
            postRequest("/layout").then(resp=>{
            if(resp.status==200){
                if(resp.data.msg==='success'){
                    _this.$message({type: 'success', message: resp.data.msg});
                    _this.$router.replace({ path: '/login' });
                }
                else{
                    _this.$message({type: 'error', message: resp.data.msg});
                    _this.$router.replace({ path: '/login' });
                }
            }                 
            },resp=>{
                _this.$message({type: 'success', message: '请登录浏览!'});
                _this.$router.replace({ path: '/login' });
            });
        },
    },
    mounted:function(){
        var _this=this;
        postRequest("/open/getauth").then(resp=>{
            if(resp.status==200){
                if(resp.data==="[ROLE_普通用戶]"){
                        _this.auth_status=true,
                        _this.loading=false
                }
                else{
                    _this.loading=false
                    _this.$message({type: 'success', message: "请登录浏览!"});
                }
            }                 
            },resp=>{
                _this.loading=false
                _this.$message({type: 'success', message: '请登录浏览!'});
            });
    }
}
</script>
<style scoped>
    a{
        text-decoration: none;
        margin-bottom: 20px;
        font-size: 15px;
        color: #000;
    }
    a:hover {
        color:#0097e6;
    }
    .header_nav{
        width: 100%;
        height: 72px;
        box-shadow: 5px 3px 5px  #95a5a6;
        position: relative;
        background-color: #fff;
        margin-left: 50%;
        transform: translateX(-50%);
    }
    .nav_item{
        width: 600px;
        height: 60px;
        position: absolute;
        left: 230px;
        top: 10px;
    }
    .nav_item div{
        float: left;
    }
    .logo_head{
        position: absolute;
        left: 30px;
        top: 15px;
        height: 50px;
        width: 50px;
    }
    .login{
        position: absolute;
        right: 100px;
        top: 30px;
        height: 70px;
    }
    .logo{
        position: absolute;
        top: 15px;
        right: 150px;
    }
    .logo_text{
        position: absolute;
        top: 25px;
        left: 80px;
        height: 40px;
        width: 100px;
        z-index: 22;
    }
    .fabu{
        position: absolute;
        top: 25px;
        right: 300px;
        font-size: 18px;
    }
    .fabu_memu{
        width: 350px;
        height: 100px;
        position: relative;
    }
    .fabu_memu .fabu_item{
        position: absolute;
        height: 70px;
        width: 110px;
        left: 20px;
        top: 20px;
    }
    .fabu_memu .fabu_item:nth-child(2){
        left: 160px;
        top: 20px;
    }
    .fabu_memu .fabu_item .logo_fabu1{
        height: 50px;
        width: 50px;
        padding-top: 15px;
    }
    .fabu_memu .fabu_item .logo_fabu2{
        height: 50px;
        width: 50px;
        padding-top: 15px;
    }
    .logo_personal{
        height: 50px;
        width: 50px;
        position: absolute;
        top: -15px;
        right: -55px;
    }
    .logo_layout{
        height: 30px;
        width: 30px;
        position: absolute;
        top: -13px;
        right: -150px;
        padding: 10px;
        transition: 0.5s;
    }
    .logo_layout:hover{
        border: #000 1px solid;
        border-radius: 50%;
    }
    [v-cloak] {
    display: none;
}
</style>