<template>
    <div class="parternerInfo">
      <div class="title">
          <span @click="$router.push('/personalCenter')">返回</span>
          <h3>第{{title}}代伙伴</h3>
      </div>
      <div class="data">
        <div class="d-title">
          <span>ID号</span>
          <span>等级</span>
          <span>微信</span>
          <span>手机</span>
        </div>
        <div class="d-content" v-for="item in info">
          <span>{{item.id}}</span>
          <span>{{item.lev}}</span>
          <span>{{item.wchat}}</span>
          <span>{{item.phone}}</span>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'parternerInfo',
  data () {
    return {
      title: '',
      info: [],
    }
  },
  mounted() {
    this.info = this.$route.query.pinfo;
    this.title = this.$route.query.name;
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('../assets/css/parternerInfo.css');
</style>
