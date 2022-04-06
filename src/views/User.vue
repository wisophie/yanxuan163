<template>
  <div>
    <header @click="loginUp">
      <div class="left">
        <img :src="userInfo.avatar" alt="" />
        <span>{{userInfo.username}}</span>
      </div>
      <i class="iconfont icon-more"></i>
    </header>
    <van-grid :column-num="3" square>
      <van-grid-item
        v-for="item in arr"
        :key="item.text"
        :icon="item.icon"
        :text="item.text"
      />
    </van-grid>
    <!-- 登录弹窗 -->
    <van-overlay :show="show" @click="show=false">
      <div class="wrapper" @click.stop>
        <van-form @submit="onSubmit">
          <van-field
            v-model="username"
            name="username"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="pwd"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit"
              >提交</van-button
            >
          </div>
        </van-form>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import {loginUp} from '@/network/api'
export default {
  data() {
    return {
      arr: [
        {
          text: "我的订单",
          icon: "label-o",
        },
        {
          text: "优惠券",
          icon: "bill-o",
        },
        {
          text: "礼品卡",
          icon: "goods-collect-o",
        },
        {
          text: "我的收藏",
          icon: "location-o",
        },
        {
          text: "我的足迹",
          icon: "flag-o",
        },
        {
          text: "会员福利",
          icon: "contact",
        },
        {
          text: "地址管理",
          icon: "aim",
        },
        {
          text: "账号安全",
          icon: "warn-o",
        },
        {
          text: "联系客服",
          icon: "service-o",
        },
        {
          text: "帮助中心",
          icon: "question-o",
        },
        {
          text: "意见反馈",
          icon: "smile-comment-o",
        },
      ],
      show: false,
      username: "",
      password: "",
      userInfo:{}
    };
  },
  created(){
    let user=localStorage.getItem('userInfo')
    if(user){
      this.userInfo=JSON.parse(user)
    }else{
      this.userInfo={
        // avatar:'/img/headImg.png',
        avatar:require('../../public/img/headImg.png'),
        username:'点击起飞'
      }
    }
  },
  methods: {
    loginUp() {
      console.log(localStorage.getItem('token'))
      !localStorage.getItem('token')?this.show = true:''
    },
    async onSubmit(val) {
      let data=await loginUp(val)
      if(data.errno==0){
        this.$toast('登录成功')
        this.userInfo=data.data.userInfo
        localStorage.setItem('token',data.data.token)
        localStorage.setItem('userInfo',JSON.stringify(data.data.userInfo))
        this.show=false
      }else{
        this.$toast('用户名或密码错误')
      }
    },
  },
};
</script>
<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 10px;
  background: #333;
  color: #fff;
  font-size: 16px;

  .left {
    display: flex;
    align-items: center;
    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
  i {
    font-size: 22px;
  }
}
// 弹窗

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;width: 90%;
  left: 50%;
  transform: translate(-50%,-50%);
  background: #fff;
  .van-cell{
    margin-top: 15px;
  }
}

</style>
