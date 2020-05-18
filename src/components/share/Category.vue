<template>
    <div style="margin:0;padding:0;height:100%;width:100%;">
        <div class="search">
            <el-input
                placeholder="请输入搜索的关键字..."
                suffix-icon="el-icon-zoom-in"
                v-model="keywords" style="width:200px;float:left;">
            </el-input>
            <el-button type="warning" style="float:left;" @click="check">搜索</el-button>
        </div>
    <div v-loading="loading" class="class_menu">
        <el-dropdown v-for="(item,index) in options" v-bind:key="index" class="first" placement="bottom-end" @command="selectRid">
        <span class="el-dropdown-link" >
            {{item.label}}<i class="el-icon-arrow-right"></i>
        </span>
        <el-dropdown-menu slot="dropdown"  class="second">
            <div v-for="(child,node) in item.children" v-bind:key="node" >
                <el-dropdown-item class="item" :command="child.reclassify_id">
                    <img :src="child.url" height="50px" width="50px" />
                    <span>{{child.label}}</span> 
                </el-dropdown-item>
            </div>
            
        </el-dropdown-menu>
        </el-dropdown>
        <div class="block">
            <el-carousel height="495px" width="1000px">
            <el-carousel-item v-for="item in photos" :key="item">
                <img :src="item" alt="" height="495px" width="1000px">
            </el-carousel-item>
            </el-carousel>
        </div>
    </div>
    <section style="width:100%;height:2000px;background:#ecf0f1;">
    <div class="productList">
        <el-card v-for="(product,index) in product" :key="index" class="product" :body-style="{ padding: '0px' }" shadow="hover" >
                <div style="height:250px;width:250px;overflow:hidden;" @click="productdetail(product.product_id)">
                <img 
                    :src="product.photos[0]" 
                    class="photolist"/>
                </div>
                <div style="padding:15px;font-size:18px;" @click="productdetail(product.product_id)">{{product.title}}</div>
                <div style="color:#bdc3c7;font-size:15px;padding-left:15px;padding-top:10px;" @click="productdetail(product.product_id)">更新于{{product.date}}</div>
                <div style="color:#bdc3c7;font-size:15px;padding-left:15px;padding-top:5px;" @click="productdetail(product.product_id)">{{product.intro}}</div>
                <div style="color:red;font-size:15px;padding:8px;" @click="productdetail(product.product_id)">¥ {{product.bid_price}}<el-tag type="success" size="small" style="float:right;">{{product.tags[0]}}</el-tag>
                </div>

        </el-card>
      <el-pagination
        background
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="totalCount" @current-change="currentChange"
        style="position: absolute;bottom: 55px;left: 50%;transform: translateX(-50%);">
        </el-pagination>
    </div>
    </section>
</div>
</template>
<script>
import {postRequest} from '../../utils/api';
export default {
    data:function(){
        return{
            title:'articles',
            loading:true,
            options:[],
            photos:[
                require('../../assets/img/lunbo1.jpg'),
                require('../../assets/img/lunbo2.jpg'),
                require('../../assets/img/lunbo3.jpg'),
            ],
            selectid:-1,
            product:[],
            keywords:'',
            currentPage: 1,
            totalCount: 1,
            pageSize: 15,
        }
    },
    mounted:function(){
        var _this=this;
        postRequest("/open/query").then(resp=>{
            if(resp.status==200){
                _this.options=resp.data;
                _this.loading=false;
            }                 
            },resp=>{
                _this.loading=false
            });
            this.getProduct(this.currentPage);
        postRequest("/open/productCount").then(resp=>{
            if(resp.status==200){
                _this.totalCount=resp.data;
            }                 
            },resp=>{
                
            });
    },
    methods: {
        check(){
            this.getProduct(1);
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        selectRid(command){
            this.selectid=command;
            this.getProduct(1);
        },
        getProduct(page){
            var _this=this;
            postRequest("/open/getProductList",{
                rid:_this.selectid,
                keywords:_this.keywords,
                count:_this.pageSize,
                page:page
            }).then(resp=>{
            if(resp.status==200){
                _this.product=resp.data;
            }                 
            },resp=>{

            });
        },
        currentChange(currentPage){
            this.currentPage=currentPage;
            this.getProduct(currentPage);
        },
        productdetail(id){
            this.$router.push({path: '/productshowdetail', query: {pid: id}});
        },
    }
}
</script>
<style scoped>
    .class_menu{
        height: 500px;
        width: 1100px;
        margin-top: 100px;
        margin-left: 50%;
        transform: translateX(-50%);
    }
    .first{
        height: 35px;
        width: 80px;
        display: block;
        padding-top: 10px;
        padding-left: 10px;
        background-color: #303133;
        color: aliceblue;
    }
    .first:hover{
        background-color: #b2bec3;
    }
    .second{
        height: 475px;
        width: 950px;
        overflow: hidden;
        position: absolute;
        top: 147px!important;
        left: 50%!important;
        transform: translateX(-50%)!important;
    }
    .item{
        height: 100px;
        width: 100px;
        float: left;
        position: relative;
    }
    .item img{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 0;
    }
    .item span{
        position: absolute;
        top: 60px;
        left: 50%;
        transform: translateX(-50%);
    }
    .block{
        position: absolute;
        left: 85px;
        top:0;
        height: 650px;
        width: 1000px;
    }
    .productList{
        height: 2000px;
        width: 1150px;
        margin-left: 50%;
        transform: translateX(-50%);
        position: relative;
    }
    .search{
        position: absolute;
        right: 200px;
        top: 90px;
        z-index: 520;
        width: 300px;
    }
    .product{
        height:400px;
        width:250px;
        float:left;
        background-color: #ffffff;
        margin-left: 25px;
        margin-top: 10px;
    }
    .photolist{
        height:250px;
        width:250px;
        transition: 0.5s;
    }
    .photolist:hover{
        transform: scale(1.2);
    }
</style>