<template>
    <div class="personalCenter">
        <div class="title">
            <h3>我的</h3>
            <div class="exit" @click="$router.push('/')">
                <span>退出</span>
                <img src="../assets/images/logout.png" alt="">
            </div>
            <div class="personalInfo">
                <div class="photo"></div>
                <div class="description">
                    <p>ID: {{id}}</p>
                    <p>手机号码: {{telphone}}</p>
                    <p>微信号码：{{wechat}}</p>
                </div>
            </div>
            <div class="modify" @click="$router.push('/modifyInfo')">
                <img src="../assets/images/amend.png" alt="">
                <p>修改资料</p>
            </div>
        </div>
        <div class="display">
            <ul>
                <li>收入：￥{{income}}</li>
                <li>等级：V{{level}}</li>
                <li>伙伴：{{partner}}个</li>
            </ul>
        </div>
        <div class="notice">
			<van-notice-bar
				text="继续升级，招更多学生，获更多红包哦！升级奖励多多"
				left-icon="volume-o"
				class="notice-bar"
			/>
        </div>
        <div class="parternerList">
            <ul v-for="(val,index) in list">
                <li @click="lookUp(val)"  :class="{able:level>=(index+1)}">
                    <span>V{{val.name}}伙伴</span>
                    <span>已有人数{{val.number}}</span>
                    <span>查看</span>
                </li>
            </ul>
        </div>
        <foot></foot>
    </div>
</template>

<script>
import foot from './foot'
import { NoticeBar } from 'vant';
export default {
  name: 'personalCenter',
  data () {
    return {
		id: '',
		telphone: '',
		wechat: '',
		income: '10',
		level: '2',
		partner: '1',
        number: '32',
        list:[
            {name:"1",number:"",pinfo:''},
            {name:"2",number:"",pinfo:''},
            {name:"3",number:"",pinfo:''},
            {name:"4",number:"",pinfo:''},
            {name:"5",number:"",pinfo:''}
        ],
    }
  },
  components:{
	  foot
  },
  methods: {
      lookUp(ele){
          if (this.level >= ele.name) {
              if (ele.pinfo) {
                  this.$router.push({path:'/parternerInfo',query:ele});
              }
          }
      }
  },
  mounted() {
      this.$axios.post('/user/get_userInfo',{id:localStorage.id}).then((res) => {
          this.id = res.data.id;
          this.telphone = res.data.phone;
          this.wechat = res.data.wchat;
      })
      this.list.forEach((val) => {
          this.$axios.post('/user/get_lev_list',{id:localStorage.id,lev:val.name}).then((res) => {
              val.pinfo = res.data.content;
              val.number = res.data.total;
        })
      });
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('../assets/css/personalCenter.css');
</style>
