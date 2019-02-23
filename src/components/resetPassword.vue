<template>
    <div class="resetPsw">
        <div class="title">
            <div class="back">
                <span><</span>
                <span @click="$router.go(-1)">返回</span>
            </div>
            <h3>重设密码</h3>
        </div>
        <form v-on:submit.prevent>
            <div>
                <input type="email" v-model="email" placeholder="输入Email">
            </div>
            
            <div>
                <input type="text" v-model="comfirm" placeholder="输入验证码">
                <span>获取验证码</span>
            </div>

            <div>
                <input :type="visibleType" placeholder="请输入密码" v-model="password">
                <div class="visibleSymbol" @click="isVisible"></div>
            </div>

            <div class="bt">
                <input :type="visibleType" placeholder="请输入密码" v-model="passwordComfirm">
                <div class="visibleSymbol" @click="isVisible"></div>
            </div>
            <button type="submit" class="submit-btn" @click="$router.push('/')">确认</button>
        </form>
        <div class="info">
            <p>有问题联系客服</p>
            <p>微信: 1742494758</p>
            <p>工作时间24H</p>
        </div>
    </div>
</template>

<script>
export default {
  name: 'resetPassword',
  data () {
    return {
        email: '',
        comfirm: '',
        passwordComfirm: '',
        password: '',
        visibleType:  'text',
    }
  },
  methods: {
      isVisible(){
      this.visibleType = this.visibleType == 'text' ? 'password' : 'text';
     }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('../assets/css/resetPassword.css');
</style>
