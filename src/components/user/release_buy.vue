<template>
    <el-container class="box">
        <el-header style="padding:0;margin:0;">
            <Header_nav></Header_nav>
        </el-header>
        <el-main>
            <div class="addgoods">
                <h3 class="set_center">发布求购</h3>
            <el-form label-width="80px" :model="Buy_Information">
                <el-form-item label="标题">
                    <el-input v-model="Buy_Information.title" placeholder="很重要，让别人对您的需求一目了然"></el-input>
                </el-form-item>
                <el-form-item label="简介">
                    <el-input type="textarea" v-model="Buy_Information.intro" placeholder="让别人更清晰了解您的需求"></el-input>
                </el-form-item>
                <el-form-item label="价格" size="small" style="width:50%;">
                    <el-input v-model="Buy_Information.buy_price" placeholder="数字或文字，可接受价格，如100-150之间"></el-input>
                </el-form-item>
                <el-form-item label="卖家标签">
                    <el-tag
                        :key="tag"
                        v-for="tag in Buy_Information.tags"
                        closable
                        :disable-transitions="false"
                        @close="handleClose(tag)">
                        {{tag}}
                        </el-tag>
                        <el-input
                        class="input-new-tag"
                        v-if="inputVisible"
                        v-model="inputValue"
                        ref="saveTagInput"
                        size="small"
                        @keyup.enter.native="handleInputConfirm"
                        @blur="handleInputConfirm"
                        >
                    </el-input>
                    <el-button v-if="!inputVisible" class="button-new-tag" size="small" @click="showInput()">+自定义</el-button>
                </el-form-item>
                <el-form-item label="图片上传">
                    <span>请在上传前使用ps或QQ截图对图片进行裁剪，才不会变形，更美观，推荐750*750px(像素)</span>
                    <el-upload
                    action="/user/uploadBuy"
                    list-type="picture-card"
                    :http-request="upload"
                    :limit="1"
                    :on-exceed="handleexceed"
                    :on-preview="handlePictureCardPreview">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <div>
                        <img width="100%" :src="Buy_Information.photos" alt="">
                    </div>                   
                </el-dialog>               
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="margin-left:50px;" @click="onSent()">提交</el-button>
                    <el-button type="warning" style="margin-left:400px;" @click="cancel()">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-main>
    </el-container>
    
</template>
<script>
import Header_nav from '../share/Header_nav.vue';
import {uploadFileRequest} from '../../utils/api';
import {putRequest} from '../../utils/api';
export default {
        data() {
        return {
            dialogImageUrl: '',
            dialogVisible: false,
            Buy_Information:{
                title:'',
                intro:'',
                buy_price:'',
                tags:['原装正品','无拆无修','如假包退','价格可谈','一口价','欢迎来撩','非诚勿扰'],
                photos:'',
            },
            inputVisible:false,
            inputValue:'',
            options:[],
            value:[]
        };
        },
        methods: {
        handleexceed(file, fileList) {
            this.$message({type:'warning',message:'最多允许上传一张图片！'});
        },
        handlePictureCardPreview(file) {
            this.dialogVisible = true;
        },
        cancel(){
            this.$router.replace({path:'/goods'});
        },
        getPhotoList(response, file, fileList){
            console.log(response.data);
        },
        upload(f){
            var param = new FormData();
            param.append('image',f.file);
            var _this=this;
            uploadFileRequest(f.action,param).then(resp=>{
            if (resp.status === 200) {
                _this.Buy_Information.photos=resp.data.msg;
                _this.$message({type:"success",message:"上传成功"});
                
            } 
            }, resp => {
                _this.$alert('找不到服务器⊙﹏⊙∥!', '失败!')
            })
        },
        showImg(){
            console.log(this.dialogImageUrl);
        },
        handleClose(tag) {
            this.Buy_Information.tags.splice(this.Buy_Information.tags.indexOf(tag), 1);
        },

        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus();
            });
        },

        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
            this.Buy_Information.tags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        },
        onSent(){
            var _this=this;
            putRequest("/user/release",this.Buy_Information).then(resp=>{
                if(resp.status==200){
                    var json=resp.data;
                    if(json.status=="success"){
                    _this.$message({type: 'success', message: json.msg});
                    _this.$router.replace({path:'/goods'});
                    }
                    else{
                        _this.$message({type: 'warning', message: json.msg});
                    }

                }                 
                },resp=>{
                    _this.$message({type: 'warning', message: '请重试!'});
                });
        },
    },
    components:{
        'Header_nav':Header_nav,
    },
}
</script>
<style scoped>
    .box{
        background-color:#ecf0f1;
        height: 1000px;
        width: 100%;
    }
    .addgoods{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-30%);
        height: 700px;
        width: 800px;
        background-color: #fff;
        padding-right: 50px;
        border-radius: 20px;
    }
    .set_center{
        margin-left: 49%;
    }
    .el-tag + .el-tag {
    margin-left: 10px;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
</style>