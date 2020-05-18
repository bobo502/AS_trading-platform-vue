<template>
    <div class="register_card">
        <img :src="img1" class="register_logo"/>
        <span class="register_text">AS校园注册</span>
        <el-form :model="registerForm" :rules="rules" ref="registerForm"  label-width="100px" class="register_form">
        <el-form-item label="邮箱" prop="email">
            <el-input type="text" v-model="registerForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
            <el-input type="text" v-model="registerForm.code" placeholder="请输入验证码">
                <template slot="append"><el-button type="button" @click="getCode()">获取验证码</el-button></template>
            </el-input> 
        </el-form-item>
        <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="registerForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm()">注册</el-button>
            <el-button @click="resetForm()" style="margin-left:150px;">取消</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>
<script>
import {postRequest} from '../utils/api';
import {putRequest} from '../utils/api';
export default {
    data:function(){
        return{
            registerForm:{
                email:'',
                code:'',
                password:'',
            },
            img1:require("../assets/img/university.png"),
            rules:{
                    email:[
                        {required:true,message:'请输入邮箱',trigger:'blur'}
                    ],
                    code:[
                        {required:true,message:'请输入验证码',trigger:'blur'}
                    ],
                    pass:[
                        {required:true,message:'请输入密码',trigger:'blur'}
                    ]
            },
        }
    },
    methods:{
        getCode(){
            var _this=this;
            postRequest("/open/register",{
                email:_this.registerForm.email
            }).then(resp=> {
                if (resp.status == 200) {
                    _this.$message({type: 'success', message: resp.data.msg});
                }
            }, resp=> {
                _this.$message({type: 'error', message: '服务端错误，请重试!'});
            });
        },
        submitForm(){
            var _this=this;
            putRequest("/open/register",{
                email:_this.registerForm.email,
                password:_this.registerForm.password,
                code:_this.registerForm.code
            }).then(resp=> {
                if (resp.status == 200) {
                    _this.$message({type: 'success', message: resp.data.msg});
                    if(resp.data.status=='success'){
                        _this.$router.replace({ path: '/login' });
                    }
                }
            }, resp=> {
                _this.$message({type: 'error', message: '服务端错误，请重试!'});
            }); 
        },
        resetForm(){
            this.$router.replace({path:'/login'});
        },
    },
}
</script>
<style scoped>
    .register_card{
        padding: 0;
        margin: 0;
        width: 100%;
        height: 100%;
        background-image: url('../assets/img/login1.jpg');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        position: relative;
    }
    .register_form{
        position: absolute;
        left: 50%;
        top: 65%;
        transform: translate(-50%,-70%);
        height: 300px;
        width: 450px; 
        background-color: #fff;   
        padding-right: 50px;
        padding-top: 20px; 
        border-radius: 10px;
    }
    .register_logo{
        height: 100px;
        width: 100px;
        position: absolute;
        left: 50%;
        top: 20%;
        transform: translate(-50%,-50%);
    }
    .register_text{
        position: absolute;
        left: 50%;
        top: 30%;
        transform: translate(-50%,-50%);
        font-size: 35px;
        font-weight: bold;
        color: aliceblue;
    }
</style>