<template>
    <el-container>
        <i class="el-icon-refresh-right reflash" @click="reflash()"></i>
        <el-table
        :data="product"
        style="width: 100%;margin-top:30px;"
        height="550"
        border>
        <el-table-column
            prop="title"
            label="商品名称"
            width="180">
        </el-table-column>
        <el-table-column
            prop="intro"
            label="简介"
            width="180">
        </el-table-column>
        <el-table-column
            prop="original_price"
            label="原价">
        </el-table-column>
        <el-table-column
            prop="bid_price"
            label="定价">
        </el-table-column>
        <el-table-column
            prop="postage"
            label="邮费">
        </el-table-column>
        <el-table-column
            prop="date"
            label="发布日期"
            width="180">
        </el-table-column>
        <el-table-column
            label="操作">
            <template slot-scope="scope">
                <el-button type="danger" size="small" @click="OndeleteProduct(scope.row)">删除</el-button>
            </template>
        </el-table-column>
        </el-table>
    </el-container>
</template>
<script>
import {postRequest} from '../../utils/api';
import {getRequest} from '../../utils/api';
export default {
    data:function(){
        return{
            product:[]
        }
    },
    components:{
    },
    mounted:function(){
            var _this=this;
            getRequest("/user/getProduct").then(resp=>{
                if(resp.status==200){
                    var json=resp.data;
                    _this.product=json;
                }                 
                },resp=>{
                    _this.$message({type: 'warning', message: '请重新登录!'});
                });
    },
    methods:{
        OndeleteProduct(row){
            console.log(row);
            var _this=this;
            postRequest("/user/deleteProduct",{
                pid:row.product_id
            }).then(resp=>{
                if(resp.status==200){
                    var json=resp.data;
                    if(json.status=="success"){
                        _this.$message({type: 'success', message: json.msg});
                        
                    }
                    else{
                        _this.$message({type: 'warning', message: json.msg});
                    }
                    
                }                 
                },resp=>{
                    _this.$message({type: 'warning', message: '请重新登录!'});
                });
        },
        reflash(){
            var _this=this;
            getRequest("/user/getProduct").then(resp=>{
                if(resp.status==200){
                    var json=resp.data;
                    _this.product=json;
                }                 
                },resp=>{
                    _this.$message({type: 'warning', message: '请重新登录!'});
                });
        }
    }
}
</script>
<style scoped>
.reflash{
    height: 50px;
    width: 50px;
    font-size: 30px;
    font-weight: bold;
    position: absolute;
    top: 5px;
    right: 30px;
}
.reflash:hover{
    color: #3498db;
}
</style>