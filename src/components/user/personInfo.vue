<template>
    <el-container class="personal">
        <el-form ref="form" :model="user" label-width="80px" :disabled="disable" style="width:300px;height:700px;">
            <el-form-item label="头像" style="width:180px;">
                <el-upload
                    class="avatar-uploader"
                    action="/user/uploadHead"
                    :show-file-list="false"
                    :http-request="uploadfile"
                    >
                    <img v-if="user.head_portrait" :src="user.head_portrait" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="昵称">
                <el-input v-model="user.nickname"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名">
                <el-input v-model="user.real_name"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio v-model="user.sex" label="0">女生</el-radio>
                <el-radio v-model="user.sex" label="1">男生</el-radio>
            </el-form-item>
            <el-form-item label="QQ">
                <el-input v-model="user.qq"></el-input>
            </el-form-item>
            <el-form-item label="微信">
                <el-input v-model="user.wechat"></el-input>
            </el-form-item>
            <el-form-item label="个性签名">
                <el-input v-model="user.personalized_signature" type="textarea"></el-input>
            </el-form-item>
            </el-form>
            <div class="btn">
                <el-button type="primary" @click="change1" v-if="disable">修改</el-button>
                <el-button type="primary" @click="change2" v-if="!disable">取消</el-button>
                <el-button  @click="onSubmit" style="margin-left:130px;">保存</el-button>
            </div>
            <div class="school">
                <el-select v-model="id" placeholder="请选择学校" :disabled="status">
                    <el-option
                    v-for="item in school"
                    :key="item.id"
                    :label="item.university"
                    :value="item.id">
                    </el-option>
                </el-select>
                <el-button type="primary" @click="selectSchool" v-if="status">修改学校</el-button>
                <el-button type="primary" @click="giveUp" v-if="!status">取消</el-button>
                <el-button type="success" @click="saveSchool">保存</el-button>
            </div>
    </el-container>
</template>
<script>
import {uploadFileRequest} from '../../utils/api';
import {postRequest} from '../../utils/api';
import {getRequest} from '../../utils/api';
export default {
    data:function(){
        return{
            user:{
                head_portrait:'',
                nickname:'',
                university_id:'',
                email:'',
                real_name:'',
                sex:'',
                personalized_signature:'',
                count:'',
                qq:'',
                wechat:''
            },
            disable:true,
            school:[],
            status:true,
            id:''
        }
    },
    components:{

    },
    methods:{
        selectSchool(){
            var _this=this;
            getRequest("/user/getAll").then(resp=>{
                if(resp.status==200){
                    var json=resp.data;
                    _this.status=false;
                    _this.school=json;
                }                 
                },resp=>{
                    _this.$message({type: 'warning', message: '请重试!'});
                });
        },
        giveUp(){
            this.status=true;
        },
        saveSchool(){
            var _this=this;
            postRequest("/user/setUniversity",{
                id:this.id,
                user_id:this.user.user_id
            }).then(resp=>{
                if(resp.status==200){
                    var json=resp.data;
                    _this.disable=true;
                    _this.$message({type:"success",message:json.msg});
                    
                }                 
                },resp=>{
                    _this.$message({type: 'warning', message: '请重试!'});
                });
        },
        onSubmit(){
            var _this=this;
            postRequest("/user/setMsg",this.user).then(resp=>{
                if(resp.status==200){
                    var json=resp.data;
                    _this.$message({type:"success",message:json.msg});
                    _this.disable=false;
                }                 
                },resp=>{
                    _this.$message({type: 'warning', message: '请重试!'});
                });
        },
        change1(){
            this.disable=false;
        },
        change2(){
            this.disable=true;
        },
        uploadfile(File) {            
            var param = new FormData();
            param.append('image',File.file);
            var _this=this;
            uploadFileRequest(File.action,param).then(resp=>{
            if (resp.status === 200) {
                _this.user.head_portrait=resp.data.msg;
                _this.$message({type:"success",message:"上传成功！"});
                
            } 
            }, resp => {
                _this.$alert('找不到服务器⊙﹏⊙∥!', '失败!')
            })
        },
    },
    mounted:function(){
        var _this=this;
            postRequest("/user/getUser").then(resp=>{
                if(resp.status==200){
                    var json=resp.data;
                    _this.user=json;
                    if(json.count==0){
                        this.$alert('请完善个人信息，发布商品和求购都需要完善个人信息', '温馨提示', {
                        confirmButtonText: '确定',
                        });
                    }
                }                 
                },resp=>{
                    _this.$message({type: 'warning', message: '请重新登录!'});
                });
    }
}
</script>
<style scoped>
    .personal{
        position: relative;
        height: 100%;
        width: 100%;
    }
    .btn{
        position: absolute;
        top: 600px;
        left: 50px;
    }
    .avatar-uploader{
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }
    .avatar {
        width: 100px;
        height: 100px;
        display: block;
    }
</style>