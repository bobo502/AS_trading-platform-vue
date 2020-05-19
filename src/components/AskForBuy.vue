<template>
        <el-container>
        <el-header style="margin:0;padding:0;">
            <Header_nav></Header_nav>
        </el-header>
        <el-main v-loading="loading" class="container">
            <el-card shadow="always" v-for="(item,index) in BuyInfo" :key="index" class="box">
                <div>
                <el-avatar :size="35" :src="item.userMsg.head_portrait"></el-avatar>
                <span style="font-size:15px;">{{item.userMsg.nickname}}</span>
                <span style="color:#576574;font-size:12px;margin-left:15px;">更新于{{item.date}}</span>
                </div>
                <h4>{{item.title}}</h4>
                <p style="font-size:15px;color:#576574;margin-left:15px;">{{item.intro}}</p>
                <p style="font-size:15px;color:#576574;margin-left:15px;">QQ:{{item.userMsg.qq}}  微信：{{item.userMsg.wechat}}</p>
                <div> 
                    <span v-for="tag in item.tags" :key="tag" style="margin-left:15px;">
                        <el-tag size="mini" type="success">{{tag}}</el-tag>
                    </span></div>
                    <img :src="item.photos" class="photo"/>
            </el-card>
            <el-pagination
                background
                :page-size="pageSize"
                layout="prev, pager, next"
                :total="totalCount" @current-change="currentChange"
                style="position: absolute;bottom:45px;left: 50%;transform: translateX(-50%);">
            </el-pagination>
        </el-main>
    </el-container>
</template>
<script>
import {postRequest} from '../utils/api';
import Header_nav from './share/Header_nav.vue';
export default {
    data:function(){
        return{
            BuyInfo:[],
            pageSize:10,
            totalCount:1,
            page:1,
            loading:true
        }
    },
        components:{
        'Header_nav':Header_nav
    },
    mounted:function(){
            var _this=this;
            postRequest("/open/BuyInfoCount").then(resp=>{
            if (resp.status === 200) {
                _this.totalCount=resp.data;
               
            } 
        })
        this.getBuyInfo(1);
        this.loading=false;
    },
    methods:{
        currentChange(page){
            getBuyInfo(page);
        },
        getBuyInfo(page){
            var _this=this;
            postRequest("/open/getBuyInfo",{
                page:page,
                count:_this.pageSize
            }).then(resp=>{
            if (resp.status === 200) {
                _this.BuyInfo=resp.data;
               
            } 
        })
        }
    }
}

</script>
<style scoped>
    .container{
        position: relative;
        width: 100%;
        margin-top: 30px;
        padding-bottom: 100px;
    }
    .box{
        height: 230px;
        width: 900px;
        margin-left: 50%;
        transform: translateX(-50%);
        margin-top: 20px;
        margin-bottom: 30px;
        position: relative;
    }
    .photo{
        position: absolute;
        right: 30px;
        top: 30px;
        height: 100px;
        width: 100px;
    }
</style>