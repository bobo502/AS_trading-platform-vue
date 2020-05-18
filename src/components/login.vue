<template>
    <div class="loginForm-box">
            <img :src="url1" alt="" class="url1">
            <span class="head">AS校园登录</span>
        <el-form :model="lofinForm" :rules="rules" ref="lofinForm" label-width="100px" class="loginForm">
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="lofinForm.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="lofinForm.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-checkbox class="login_remember" v-model="checked" label-position="left">记住密码</el-checkbox>
            <el-form-item style="padding-top:10px;">
                <el-button type="primary" @click="submitForm()">登录</el-button>
                <el-button @click="resetForm()" style="margin-left:90px;" type="success">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import {postRequest} from '../utils/api';
export default {
    data:function(){
        return{
            lofinForm:{
                email:'',
                password:''
            },
            checked:false,
            url1:require('../assets/img/university.png'),
            rules:{
                    email:[
                        {required:true,message:'请输入邮箱',trigger:'blur'}
                    ],
                    password:[
                        {required:true,message:'请输入密码',trigger:'blur'}
                    ]
            },
            authority:'',
        }
    },
    methods:{
        submitForm(){
        var _this = this
        postRequest("/login",{
            email:this.lofinForm.email,
            password:this.lofinForm.password
        }).then(resp=>{
            if (resp.status === 200) {
            // 成功
            var json = resp.data
            if (json.status === 'success') {
                postRequest("/open/getauth").then(resp=>{
                    if(resp.data=="[ROLE_管理员]"){
                        _this.$router.replace({ path: '/manager' });
                    }
                    else  _this.$router.replace({ path: '/goods' });
                })
                // 
            } else {
                _this.$alert('登录失败!', '失败!')
            }
            } else {
            // 失败
                _this.$alert('登录失败!', '失败!')
            }
            }, resp => {
                console.log(resp.data);
                _this.loading = false
                _this.$alert('找不到服务器⊙﹏⊙∥!', '失败!')
            })
        },
        resetForm(){
            this.$router.replace({ path: '/register' });
        },
    }
}
</script>
<style scoped>
    .loginForm-box{
        height: 100vh;
        width: 100%;
        position: relative;
        background-image: url('../assets/img/login1.jpg');
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
    .loginForm{
        height: 200px;
        width: 400px;
        position: absolute;
        left: 50%;
        top: 52%;
        transform: translate(-50%,-50%);
        background-color: #fff;
        padding-top: 50px;
        padding-right: 50px;
        border-radius: 10px;
    }
    .url1{
        height: 100px;
        width: 100px;
        position: absolute;
        left: 50%;
        top: 20%;
        transform: translate(-50%,-50%);
    }
    .head{
        position: absolute;
        left: 50%;
        top: 30%;
        font-size: 35px;
        font-weight: bold;
        color: aliceblue;
        transform: translate(-50%,-50%);
    }
    .login_remember{
        margin-left: 50%;
        transform: translateX(-50%);
    }
</style>