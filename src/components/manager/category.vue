<template>
    <el-container style="padding-left:150px;">
        <el-tabs v-model="activeName" @tab-click="handleClick" style="width:1000px;">
            <el-tab-pane label="一级分类" name="first">
                <div class="addCategory">
                    <el-form :inline="true" class="demo-form-inline">
                        <el-form-item label="新增一级分类：">
                            <el-input v-model="category" placeholder="分类名称"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit()">新增</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="showCategory">
                    <el-table
                        :data="tableData1"
                        border
                        style="width: 1000px"
                        height="500">
                        <el-table-column
                        fixed
                        prop="id"
                        label="id"
                        width="150">
                        </el-table-column>
                        <el-table-column
                        prop="category"
                        label="一级分类"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        fixed="right"
                        label="操作"
                        width="200">
                        <template slot-scope="scope">
                            <el-button @click="handleChange(scope.row)" type="success" size="small">修改</el-button>
                            <el-button type="danger" size="small" @click="Ondelete(scope.row)">删除</el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
            <el-tab-pane label="二级分类" name="second">
                    <el-form :inline="true"  class="demo-form-inline">
                        <el-form-item label="二级分类新增">
                            <el-input v-model="reclassily" placeholder="二级分类名称"></el-input>
                        </el-form-item>
                        <el-form-item label="所属一级分类" >
                            <el-select placeholder="一级分类信息" v-model="category_id">
                                <div v-for="cates in tableData1" v-bind:key="cates.id">
                                    <el-option :label="cates.category" :value="cates.id"></el-option>
                                </div>                         
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onADD()">新增</el-button>
                        </el-form-item>
                    </el-form>
                    <el-dropdown @command="handleCommand">
                    <el-button type="primary">
                        当前一级分类下属<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown" split-button="true">
                        <div v-for="cates in tableData1" v-bind:key="cates.id">
                            <el-dropdown-item :command="cates.id">{{cates.category}}</el-dropdown-item>
                        </div>                       
                    </el-dropdown-menu>
                    </el-dropdown>
                    <el-table
                        :data="tableData2"
                        border
                        style="width: 1000px"
                        height="500">
                        <el-table-column
                        prop="reclassify"
                        label="二级分类"
                        width="200">
                        </el-table-column>
                        <el-table-column
                        prop="url"
                        label="图片地址"
                        width="200"
                        >
                        </el-table-column>
                        <el-table-column
                        label="图片"
                        width="200"
                        prop="url"
                        >
                        <template slot-scope="scope">
                            <img  :src="scope.row.url" alt="" style="width: 50px;height: 50px">
                        </template>
                        </el-table-column>
                        <el-table-column
                        fixed="right"
                        label="操作"
                        width="300">
                        <template slot-scope="scope">
                            
                                <el-upload
                                    class="avatar-uploader"
                                    action="/manager/uploadFile"
                                    :show-file-list="false"
                                    :http-request="uploadfile"
                                    >
                                    <el-button @click="handleSetLogo(scope.row)" type="success" size="small">上传图片</el-button>
                                </el-upload>
                                <el-button type="danger" size="small" @click="OndeleteReclassify(scope.row)">删除</el-button>
                        </template>
                        </el-table-column>
                    </el-table>
            </el-tab-pane>
        </el-tabs>
        
    </el-container>
</template>
<script>
import {postRequest} from '../../utils/api';
import {getRequest} from '../../utils/api';
import {uploadFileRequest} from '../../utils/api';
export default {
    data:function(){
        return{
            category:'',
            activeName: 'first',
            tableData1:[],
            reclassily:'',
            category_id:'',
            tableData2:[],
            imageUrl:'',
            reclassify_id:''
        }
    },
    methods:{
        handleClick(tab, event) {
        console.log(tab, event);
        },
        OndeleteReclassify(row){
            var _this=this;
            postRequest("/manager/reclassify/delete",{
                rid:row.reclassify_id
                }).then(resp=>{
            if (resp.status === 200) {
            // 成功
            var json = resp.data
            if (json.status === 'success') {
                _this.$message({type:'success',message:json.msg});
            }
            else{
                _this.$message({type:'warning',message:json.msg});
            }           
            } 
            }, resp => {
                _this.$alert('找不到服务器⊙﹏⊙∥!', '失败!')
            })
        },
        handleCommand(command) {
            var _this=this;
            postRequest("/manager/reclassify/queryall",{
                cid:command
                }).then(resp=>{
            if (resp.status === 200) {
                _this.tableData2=resp.data;
            } 
            }, resp => {
                _this.$alert('找不到服务器⊙﹏⊙∥!', '失败!')
            })
        },
        handleSetLogo(row){
            this.reclassify_id=row.reclassify_id;
        },
        uploadfile(File) {            
            var param = new FormData();
            param.append('image',File.file);
            param.append('id',this.reclassify_id);
            var _this=this;
            uploadFileRequest(File.action,param).then(resp=>{
            if (resp.status === 200) {
                _this.$message({type:"success",message:"上传成功"});
                
            } 
            }, resp => {
                _this.$alert('找不到服务器⊙﹏⊙∥!', '失败!')
            })
        },
        
        //一级分类修改
        handleChange(row) {
            var changemsg='';
            var _this=this;
            this.$prompt('请输入分类信息', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /\S/,
                    inputErrorMessage: '请输入分类信息'
                    }).then(({ value }) => {
                    postRequest("/manager/category/change",{
                            id:row.id,
                            category:value
                            }).then(resp=>{
                        if (resp.status === 200) {
                        // 成功
                        var json = resp.data
                        if (json.status === 'success') {
                            _this.$message({type:'success',message:json.msg});
                            _this.getTable();
                        }
                        else{
                            _this.$message({type:'warning',message:json.msg});
                        }           
                        } 
                        }, resp => {
                            _this.$alert('找不到服务器⊙﹏⊙∥!', '失败!')
                        });
                        
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消修改'
                    });       
                    });
                    
        },
        //一级分类新增
        onSubmit(){
            var _this=this;
            postRequest("/manager/category/add",{
                category:this.category
                }).then(resp=>{
            if (resp.status === 200) {
            // 成功
            var json = resp.data
            if (json.status === 'success') {
                _this.$message({type:'success',message:json.msg});
            }
            else{
                _this.$message({type:'warning',message:json.msg});
            }           
            } 
            }, resp => {
                _this.$alert('找不到服务器⊙﹏⊙∥!', '失败!')
            })
            _this.getTable();
        },
        //一级分类删除
        Ondelete(row){
            var _this=this;
            postRequest("/manager/category/delete",{
                id:row.id
                }).then(resp=>{
            if (resp.status === 200) {
            // 成功
            var json = resp.data
            if (json.status === 'success') {
                _this.$message({type:'success',message:json.msg});
            }
            else{
                _this.$message({type:'warning',message:json.msg});
            }           
            } 
            }, resp => {
                _this.$alert('找不到服务器⊙﹏⊙∥!', '失败!')
            })
            _this.getTable();
        },
        //刷新一级分类数据
        getTable(){
            var _this = this;
            getRequest("/manager/category/queryall").then(resp=>{
                if(resp.status==200){
                    _this.tableData1=resp.data;
                }                 
            });
        },
        //二级分类新增
        onADD(){
            var _this=this;
            postRequest("/manager/reclassify/add",{
                cid:this.category_id,
                reclassify:this.reclassily,
                contentType: 'application/json;charset=UTF-8'
                }).then(resp=>{
            if (resp.status === 200) {
            // 成功
            var json = resp.data
            if (json.status === 'success') {
                _this.$message({type:'success',message:json.msg});
            }
            else{
                _this.$message({type:'warning',message:json.msg});
            }           
            } 
            }, resp => {
                _this.$alert('找不到服务器⊙﹏⊙∥!', '失败!')
            })
        },

    },
    mounted:function(){
            var _this = this;
            getRequest("/manager/category/queryall").then(resp=>{
                if(resp.status==200){
                    _this.tableData1=resp.data;
                }                 
            });
    }
}
</script>
<style scoped>

</style>