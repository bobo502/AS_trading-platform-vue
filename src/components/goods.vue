<template>
    <el-container>
        <el-header>
            <Header_nav></Header_nav>
        </el-header>
        <el-main>
            <Category></Category>
        </el-main>
    </el-container>
</template>
<script>
import Header_nav from './share/Header_nav.vue';
import Category from './share/Category.vue';
export default {
    data:function(){
        return{
            title:'hello'
        }
    },
    components:{
        'Header_nav':Header_nav,
        'Category':Category
    }
}
</script>
<style scoped>
    *{
        padding: 0;
        margin: 0;
    }
</style>