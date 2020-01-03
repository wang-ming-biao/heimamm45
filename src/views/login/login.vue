<template>
  <div class="login-container">
    <div class="left">
      <div class="title-box">
        <img src="../../assets/logo.png" alt="">
        <div class="title">黑马面面</div>
        <div class="line"></div>
        <div class="sub-title">用户登录</div>
      </div>
        <el-input class="phone" placeholder="请输入手机号" prefix-icon="el-icon-user" v-model="username">
  </el-input>
        <el-input class="passW" show-password placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="password">
  </el-input>
        <div class="cdInput">
          <el-input  placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="input2">
  </el-input>
        <div class="codeBox">
          <img src="http://127.0.0.1/heimamm/public/captcha?type=login" style="width='110px' height='42px'"  alt="">
        </div>
        </div>
  <el-checkbox class="Privacy" v-model="checked" >我已阅读并同意
     <el-link type="primary">用户协议</el-link>
     和
      <el-link type="primary">隐私条款</el-link>
    </el-checkbox>   
    <el-button type="primary" class="my-btn">登录</el-button>
    <el-button type="primary" class="my-btn">注册</el-button>
    </div>
    <img class="img" src="../../assets/login_banner_ele.png" alt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      username:"",//输入框绑定
      password:"",//密码框
      userCode:"",//验证码
      checked: false,//多选框选定
      input2:'',//验证码
    }
  },
};
</script>

<style lang="less">
.login-container {
  // 主体盒子
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-around;
  align-items: center;
  background: linear-gradient(
    225deg,
     rgba(1, 198, 250, 1),
    rgba(20, 147, 250, 1)
    
  );
  // 左侧登录框大盒子
    .left {
      width: 478px;
      height: 550px;
      background:rgba(245,245,245,1);
      padding-left: 43px;
      padding-right: 41px;
      box-sizing: border-box;
      .phone,
      .passW,
      .cdInput,
      .Privacy {
        margin-bottom: 25px;
      }
      .cdInput{
        display: flex;
        .codeBox{
          width: 110px;
          height: 38px;
          background-color: #ffffff;
          border: 1px solid #CCCFD5;
          border-radius: 4px;
        }
      }
      // 顶部标题盒子
          .title-box {
            display: flex;
            align-items: center;
            padding-top: 44px;
            margin-bottom: 25px;
            img {
              width: 22px;
              height: 17px;
              margin-right: 16px;
            }
            .title {
                font-size: 24px;
                font-weight: 500;
                margin-right: 14px
            }
            .line{
              width: 2px;
              height: 28px;
              background-color: #c7c7c7;
            }
            .sub-title {
              font-size: 24px;
              font-weight: 500;
              margin-left: 14px;
            }
          }
          .my-btn {
            width: 100%;
            margin: 0;
            margin-bottom: 25px;
          }
      };
    .img {
      width: 633px;
      height: 435px;
    }
}
</style>