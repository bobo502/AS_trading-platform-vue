<template>
    <el-container class="bottom">
        <span>{{title}}</span> 
    </el-container>
</template>
<script>
export default {
    data:function(){
        return{
            title:'本项目纯属个人学习项目，不用于商业用途，如有雷同，请见谅！'
        }
    },
    
}
</script>
<style scoped>
    .bottom{
        height: 200px;
        width: 100%;
        background-color:#07111b ;
        text-align: center;
        align-items: center;
        color: aliceblue;
    }
</style>