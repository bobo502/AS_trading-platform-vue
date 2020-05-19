<template>
    <el-container class="box">
        <img :src="img1" class="img1" />
        <div class="head">
            <h1 style="font-size:70px;">AS校园</h1>
            <h3 style="font-size:30px;">——专注校园二手——</h3>
        </div>
        <div class="btnlist">
        <div class="btn btn1">
            <h1>校园二手</h1>
            <p>带不走的东西，丢不掉的记忆，让小A帮它找到新的主人</p>
            <el-button type="warning"><el-link href="/#/goods" style="color:#fff;">校园二手</el-link></el-button>
        </div>
        <div class="btn btn2">
            <h1>校园求购</h1>
            <p>众里寻它，蓦然回首原来它就在这里－柚子求购</p>
            <el-button type="warning"><el-link href="/#/AskForBuy" style="color:#fff;">校园求购</el-link></el-button>
        </div>
        <div class="btn btn3">
            <h1>开通学校</h1>
            <p>年华已去，梦想犹在入驻我们，或获得属于你的平台</p>
            <el-button type="warning"><el-link href="/#/AddSchool" style="color:#fff;">开通学校</el-link></el-button>
        </div>
        </div>
        
    </el-container>
</template>
<script>
export default {
    data:function(){
        return{
            img1:require("../assets/img/index1.jpg")
        }
    },
    
}
</script>
<style scoped>
    .box{
        height: 100%;
        width: 100%;
    }
    .img1{
        width: 100%;
        height: 700px;
        opacity: 0.5;
    }
    .head{
        position: absolute;
        left: 50%;
        top: 100px;
        transform: translateX(-50%);
        color: #7f8c8d;
        text-align: center;
    }
    .btnlist{
        position: absolute;
        height: 350px;
        width: 1080px;
        left: 50%;
        transform: translateX(-50%);
        bottom: 30px;
    }
    .btn{
        height: 200px;
        width: 210px;
        text-align: center;
        background-color: #ffffff;
        padding: 70px;
        border-radius: 10px;
        float: left;
        margin-left: 5px;
    }
</style>