<template>
        <el-container>
        <el-header style="padding:0;margin:0;">
            <Header_nav></Header_nav>
        </el-header>
        <el-main>
            <div class="form-school">
                <img :src="img1" alt="" width="450px" height="350px" style="margin-top:50px;">
                <el-form :model="school"  label-width="100px" class="addschool">
                    <el-form-item label="学校全称">
                        <el-input v-model="school.name" placeholder="请输入学校全称"></el-input>
                    </el-form-item>
                    <el-form-item label="校徽上传" style="height:100px;width:200px;">
                        <div>
                        <el-upload
                                    action="/user/uploadFile"
                                    :show-file-list="false"
                                    :http-request="uploadfile"
                                    >
                                    <el-button type="success" style="height=50px;width:100px;">上传图片</el-button>
                        </el-upload>
                        <img :src="school.logo" height="100px" width="100px" v-if="status">
                        </div>
                    </el-form-item>
                    <el-form-item style="margin-top:40px;">
                        <el-button type="primary" @click="submitForm()">提交</el-button>
                        <el-button @click="resetForm()" style="margin-left:190px;" type="success">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-main>
    </el-container>
</template>
<script>
import Header_nav from './share/Header_nav.vue';
import {uploadFileRequest} from '../utils/api';
import {postRequest} from '../utils/api';
export default {
    data:function(){
        return{
            img1:require("../assets/img/addschool1.png"),
            school:{
                name:'',
                logo:'',
            },
            status:false
        }
    },
        components:{
        'Header_nav':Header_nav
    },
    methods:{
        uploadfile(File) {            
            var param = new FormData();
            param.append('image',File.file);
            var _this=this;
            uploadFileRequest(File.action,param).then(resp=>{
            if (resp.status === 200) {
                _this.school.logo=resp.data.msg;
                _this.status=true;
                _this.$message({type:"success",message:"上传成功"});
                
            } 
            }, resp => {
                _this.$alert('找不到服务器⊙﹏⊙∥!', '失败!')
            })
        },
        submitForm(){
            var _this=this;
            postRequest("/user/AddUniversity",{
                university:this.school.name,
                url:this.school.logo
                }).then(resp=>{
            if (resp.status === 200) {
                var json = resp.data
                if (json.status === 'success') {
                    _this.$message({type:'success',message:json.msg});
                    _this.$router.replace({path:'/goods'});
                }
                else{
                    _this.$message({type:'warning',message:json.msg});
                }           
            } 
            }, resp => {
                _this.$alert('找不到服务器⊙﹏⊙∥!', '失败!')
            })
        }
    }
}
</script>
<style scoped>
    .form-school{
        margin-left: 50%;
        transform: translateX(-50%);
        width: 450px;
        height: 700px;
    }

</style>