<template>
    <div class="login">
        <div class="login-box">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="账号" prop="username">
                    <el-input v-model="username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  setup() {
    const user = reactive({
        username: 'zoe',
        password: '123'
    }) 
    
    return {
    ...toRefs(user),
    }
  },
  components: {
  }
}
</script>
<style>
    .login {
        display: flex;
        width: 100%;
        height: 100%;
        margin: 0 auto;
        justify-content: center;
        align-items: center;
    }
    .login-box {
        width: 600px;
        margin: 0 auto;
        background-color: #fff;
    }
</style>