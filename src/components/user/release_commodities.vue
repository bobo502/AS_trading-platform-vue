<template>
    <el-container class="box">
        <el-header style="padding:0;margin:0;">
            <Header_nav></Header_nav>
        </el-header>
        <el-main>
            <div class="addgoods">
                <h3 class="set_center">发布商品</h3>
            <el-form label-width="80px" :model="Product">
                <el-form-item label="标题">
                    <el-input v-model="Product.title" placeholder="很重要，显示在列表页"></el-input>
                </el-form-item>
                <el-form-item label="简介">
                    <el-input type="textarea" v-model="Product.intro" placeholder="很重要，显示在商品详情页"></el-input>
                </el-form-item>
                <el-form-item label="标价" size="small" style="width:50%;">
                    <el-input v-model="Product.bid_price" placeholder="数字，想卖的价格"></el-input>
                </el-form-item>
                <el-form-item label="原价" size="small" style="width:50%;">
                    <el-input v-model="Product.original_price" placeholder="数字，购买时的价格，让用户对比"></el-input>
                </el-form-item>
                <el-form-item label="卖家标签">
                    <el-tag
                        :key="tag"
                        v-for="tag in Product.tags"
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
                <el-form-item label="分类" style="width:50%;">
                    <el-cascader
                        v-model="value"
                        :options="options"
                        :props="{ expandTrigger: 'hover',value:'reclassify_id' }"
                        @change="setValue()"></el-cascader>
                    
                </el-form-item>
                <el-form-item label="邮费" size="small" style="width:50%;">
                    <el-input v-model="Product.postage"></el-input>
                </el-form-item>
                <el-form-item label="图片上传">
                    <span>请在上传前使用ps或QQ截图对图片进行裁剪，才不会变形，更美观，推荐750*750px(像素)</span>
                    <el-upload
                    action="/user/uploadGoods"
                    list-type="picture-card"
                    :http-request="upload"
                    :limit="3"
                    :on-exceed="handleexceed"
                    :on-preview="handlePictureCardPreview">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <div v-for="photo in Product.photos" v-bind:key="photo">
                        <img width="100%" :src="photo" alt="">
                    </div>                   
                </el-dialog>               
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="margin-left:50px;" @click="onSubmit()">提交</el-button>
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
import {postRequest} from '../../utils/api';
export default {
        data() {
        return {
            dialogImageUrl: '',
            dialogVisible: false,
            Product:{
                title:'',
                intro:'',
                bid_price:'',
                original_price:'',
                tags:['原装正品','无拆无修','如假包退','价格可谈','一口价','欢迎来撩','非诚勿扰'],
                reclassify_id:'',
                postage:'商议',
                photos:[],
            },
            inputVisible:false,
            inputValue:'',
            options:[],
            value:[]
        };
        },
        methods: {
        handleexceed(file, fileList) {
            this.$message({type:'warning',message:'最多允许上传三张图片！'});
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
                _this.Product.photos.push(resp.data.msg);
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
        this.Product.tags.splice(this.Product.tags.indexOf(tag), 1);
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
            this.Product.tags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        },
        onSubmit(){
            var _this=this;
            postRequest("/user/release",this.Product).then(resp=>{
                if(resp.status==200){
                    _this.$message({type: 'success', message: '发布成功!'});
                    _this.$router.replace({path:'/goods'});

                }                 
                },resp=>{
                    _this.$message({type: 'warning', message: '请重试!'});
                });
        },
        setValue(){
            this.Product.reclassify_id=this.value[1];
        }
    },
    components:{
        'Header_nav':Header_nav,
    },
    mounted:function(){
        var _this=this;
        postRequest("/open/query").then(resp=>{
            if(resp.status==200){
                _this.options=resp.data;
            }                 
            },resp=>{

            });
    },
}
</script>
<style scoped>
    .box{
        background-color:#ecf0f1;
        height: 1200px;
        width: 100%;
    }
    .addgoods{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-20%);
        height: 1000px;
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