<template>
    <div class="approvalLevelUp">
        <h3 class="title">处理列表</h3>
        <div class="searchPartner">
            <label for="partnerId">查找伙伴</label>
            <div class="searchArea"><input type="text" id="partnerId" placeholder="请输入伙伴ID" v-model="searchId"></div>
            <button @click="search(searchId)">搜索</button>
            <div class="partnerInfo" v-if="visible">
                <div class="cover">
                    <div class="photo"></div>
                    <div class="description">
                        <p>伙伴ID:{{s_list.id}}</p>
                        <p>升级金额:￥ {{s_list.amount}}</p>
                        <p>微信账号:{{s_list.weChat}}</p>
                    </div>
                    <div class="tip">已升级</div>
                </div>
            </div>
        </div>
        <div class="progress">
            <div class="btn">
                <div :class="{active:isActive}" @click="changeProgressState(1,1)"><span>待处理</span></div>
                <div :class="{active:!isActive}" @click="changeProgressState(0,2)"><span>已处理</span></div>
            </div>
            <div class="partnerInfo" v-for="(val,index) in m_list">
                <div class="photo"></div>
                <div class="description">
                    <p>伙伴ID:{{val.id}}</p>
                    <p>升级金额:￥ {{val.cost}}</p>
                    <p>微信账号:{{val.wchat}}</p>
                </div>
                <div class="choose" v-if="isActive">
                    <div class="yes comfirm">确认</div>
                    <div class="no">拒绝</div>
                </div>
                <div class="choose" v-if="!isActive">已处理</div>
            </div>
        </div>
		<foot></foot>
    </div>
</template>

<script>
import foot from './foot'
import { Toast } from 'vant';
export default {
  name: 'approvalLevelUp',
  data () {
    return {
      visible: false,
      isActive: true,
      searchId: '',
      id: '12345',
      weChat: 'abc123',
      amount: '12',
      m_list: [],
      s_list: {id:'',amount:'',weChat:''},
    }
  },
  components:{
  	  foot
  },
  methods: {
    changeProgressState(num,stu){
        this.$axios.post('/user/get_wdispose',{pid: localStorage.id,status: stu}).then((res) => {
          this.m_list = res.data.content;
          this.isActive = num;
        })
    },
    search(sid){
        this.$axios.post('/user/get_userInfo',{id:this.searchId}).then((res) => {
            this.s_list.id = res.data.id;
            this.s_list.amount = res.data.del;
            this.s_list.weChat = res.data.wchat;
            this.visible = true;
        })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('../assets/css/approvalLevelUp.css');
</style>
