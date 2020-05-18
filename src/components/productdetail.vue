<template>
    <el-container>
        <el-header style=" padding: 0;margin: 0;">
            <Header_nav></Header_nav>
        </el-header>
        <el-main v-loading="loading">
            <el-card shadow="always" class="show_box">
                <div class="photo">
                    <img
                    style="width: 400px; height: 400px"
                    :src="image"/>
                    <div v-for="item in product.photos" :key="item" class="photolist">
                        <img
                            style="width: 50px; height: 50px"
                            :src="item"
                            @click="changePhoto(item)"/>
                    </div>
                </div>
                <div class="msg">
                    <div><el-avatar :src="user.head_portrait" style=""></el-avatar><span style="font-size:15px;margin-left:15px;margin-bottom:15px;">{{user.nickname}}</span></div>
                    <div style="font-size:20px;font-weight:bold;margin-top:20px;">{{product.title}}</div>
                    <div style="font-size:15px;margin-top:10px;color:#7f8c8d;">{{product.intro}}</div>
                    <div style="font-size:15px;color:#7f8c8d;margin-top:15px;"><i class="el-icon-s-shop" style="font-size:25px;color:#718093;"></i><span style="color:red;margin-left:15px;">¥{{product.bid_price}}</span><span style="margin-left:15px;">原价{{product.original_price}}元</span></div>
                    <div style="margin-top:15px;"><i class="el-icon-s-ticket"  style="font-size:25px;color:#718093;"></i>
                    <span v-for="tag in product.tags" :key="tag" style="margin-left:15px;">
                        <el-tag size="mini">{{tag}}</el-tag>
                    </span>
                    </div>
                    <div style="margin-top:15px;">
                        <i class="el-icon-s-flag"  style="font-size:25px;color:#718093;"></i> <span  style="margin-left:15px;">{{university}}</span>
                    </div>
                    <div style="margin-top:15px;">
                        <i class="el-icon-s-open" style="font-size:25px;color:#718093;"></i> <span  style="margin-left:15px;">{{product.date}}</span>
                    </div>
                    <div v-if="auth_status" style="margin-top:15px;">
                        <i class="el-icon-s-promotion" style="font-size:25px;color:#718093;"></i> <span  style="margin-left:15px;">微信：{{user.wechat}}</span><span style="margin-left:15px;">QQ:{{user.qq}}</span>
                    </div>
                    <div v-if="!auth_status" style="margin-top:15px;">
                        <i class="el-icon-s-promotion" style="font-size:25px;color:#718093;"></i>
                        <span  style="margin-left:15px;">请登录获取联系方式！</span>
                    </div>
                </div>
            </el-card>
        </el-main>
    </el-container>
</template>
<script>
import Header_nav from './share/Header_nav.vue';
import Category from './share/Category.vue';
import {postRequest} from '../utils/api';
export default {
    data:function(){
        return{
            pid:'',
            loading:true,
            product:'',
            university:'',
            user:'',
            image:'',
            auth_status:false
        }
    },
    components:{
        'Header_nav':Header_nav,
    },
    mounted:function(){
        this.pid = this.$route.query.pid;
        var _this=this;
        postRequest("/open/productDetail",{
            pid:this.pid
        }    
        ).then(resp=>{
            if(resp.status==200){
                _this.product=resp.data.product;
                _this.university=resp.data.university;
                _this.user=resp.data.user;
                _this.image=_this.product.photos[0];
                console.log(resp.data);
                _this.loading=false;
            }                 
            },resp=>{
                _this.loading=false;
                console.log("失败！");
            });
            postRequest("/open/getauth").then(resp=>{
            if(resp.status==200){
                if(resp.data==="[ROLE_普通用戶]"){
                        _this.auth_status=true;
                }
            }                 
            },resp=>{
            });
    },
    methods:{
        changePhoto(item){
            this.image=item;
        }
    }
}
</script>
<style scoped>
    .show_box{
        width: 1000px;
        height: 600px;
        margin-left: 50%;
        transform: translateX(-50%);
        position: relative;
    }
    .photo{
        height: 100%;
        width: 400px;
        position: absolute;
        left: 40px;
        top: 40px;
    }
    .photolist{
        display: inline;
        margin-left: 30px;
    }
    .msg{
        height: 100%;
        width: 550px;
        position: absolute;
        top: 40px;
        left:500px;
    }
</style>