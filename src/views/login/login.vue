<template>
  <div class="login-container">
    <div class="left">
      <div class="title-box">
        <img src="../../assets/logo.png" alt />
        <div class="title">黑马面面</div>
        <div class="line"></div>
        <div class="sub-title">用户登录</div>
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <!-- 手机号码盒子 -->
        <el-form-item prop="name">
          <el-input
            class="phone"
            placeholder="请输入手机号"
            prefix-icon="el-icon-user"
            v-model="ruleForm.name"
          ></el-input>
        </el-form-item>
        <!-- 密码盒子 -->
        <el-form-item prop="password">
          <el-input
            class="passW"
            show-password
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-model="ruleForm.password"
          ></el-input>
        </el-form-item>
        <!-- 验证码盒子 -->
        <el-form-item prop="code">
          <el-row>
            <el-col :span="18">
              <el-input placeholder="请输入右侧的验证码" prefix-icon="el-icon-key" v-model="ruleForm.code"></el-input>
            </el-col>
            <el-col :span="6" class="code-col">
              <img class="cdInput-img"  :src="ruleForm.codeUrl" alt />
            </el-col>
          </el-row>

          <!-- <div class="codeBox"></div> -->
        </el-form-item>
      </el-form>
      <el-checkbox class="Privacy" v-model="ruleForm.checked">
        我已阅读并同意
        <el-link type="primary">用户协议</el-link>和
        <el-link type="primary">隐私条款</el-link>
      </el-checkbox>
      <el-button type="primary" class="my-btn">登录</el-button>
      <el-button type="primary" class="my-btn">注册</el-button>
    </div>
    <img class="img" src="../../assets/login_banner_ele.png" alt />
  </div>
</template>

<script>
// 当输入框失去焦点时调用这里的方法
const validatePhone = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入手机号"));
  } else {
    // 定义正则
    const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    if (reg.test(value) == true) {
      callback();
    } else {
      callback(new Error("请输入正确的手机号码"));
    }
  }
};

export default {
  data() {
    return {
      ruleForm: {
        name: "", //输入框绑定
        password: "", //密码框
        code: "", //验证码
        checked: false ,//多选框选定
        codeUrl: process.env.VUE_APP_BASEURL + '/captcha?type=login' ,
      },
      rules: {
        // 手机号码验证
        name: [{ required: true, validator: validatePhone, trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          { min: 6, max: 18, message: "长度在 6 到 18 个字符", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "长度必须为4", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
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
    background: rgba(245, 245, 245, 1);
    padding-left: 43px;
    padding-right: 41px;
    box-sizing: border-box;
    .phone,
    .passW,
    .cdInput,
    .Privacy {
      margin-bottom: 25px;
    }
    // 验证码框
    // .cdInput-img {
    //   width: 100px;
    //   height: 42px;
    // }
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
        margin-right: 14px;
      }
      .line {
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
    // 登陆与注册按钮
    .my-btn {
      width: 100%;
      margin: 0;
      margin-bottom: 25px;
    }
  }
  // 右侧图片
  .img {
    width: 633px;
    height: 435px;
  }
}
</style>