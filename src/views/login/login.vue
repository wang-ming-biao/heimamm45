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
              <img class="cdInput-img" @click="codeChange" :src="codeUrl" alt />
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <el-checkbox class="Privacy" v-model="ruleForm.checked">
        我已阅读并同意
        <el-link type="primary">用户协议</el-link>和
        <el-link type="primary">隐私条款</el-link>
      </el-checkbox>
      <el-button type="primary" class="my-btn" @click="loginBtn">登录</el-button>
      <el-button type="primary" class="my-btn" @click="dialogFormVisible = true">注册</el-button>
    </div>
    <!-- 遮罩层 -->
    <el-dialog title="用户注册" center :visible.sync="dialogFormVisible"  class="maskTitle" width="35%">
      <el-form :model="form" :rules="rulesShadow" ref="rulesShadow" class="demo-rulesShadow">
        <!-- 用户头像上传 -->
        <el-form-item label="头像"  prop="avatar" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            name="image"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!-- 用户昵称 -->
        <el-form-item  label="昵称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 手机 -->
        <el-form-item label="手机" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password" label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" show-password autocomplete="off"></el-input>
        </el-form-item>
        <!-- 图形码盒子 -->
        <el-form-item label="图形码" prop="GPcode" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="16">
              <el-input placeholder="请输入右侧的验证码" prefix-icon="el-icon-key" v-model="form.GPcode"></el-input>
            </el-col>
            <el-col :span="6" :offset="2" class="code-col">
              <img class="shadow-img" @click="regCodeChange" :src="regCodeUrl" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 验证码盒子 -->
        <el-form-item label="验证码" prop="rcode" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="16">
              <el-input placeholder="请输入手机验证码" prefix-icon="el-icon-key" v-model="form.rcode"></el-input>
            </el-col>
            <el-col :span="6" :offset="2" class="code-col">
              <!-- <img class="shadow-img" @click="codeChange" :src="regCodeUrl" alt /> -->
              <el-button type="primary" plain @click="getMessage()" :disabled="delayTime !=0">{{btnMessage}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"  @click="btnRegister">确 定</el-button>
      </div>
    </el-dialog>
    <img class="img" src="../../assets/login_banner_ele.png" alt />
  </div>
</template>

<script>
// 导入抽取好的axios
import {login,getCode,register} from '../../api/login'
// 当输入框失去焦点时调用这里的方法验证手机号
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
// 导入操作token的方法
import {saveToken} from '../../utils/token.js'

// 邮箱验证方法:当输入框失去焦点时调用这里的方法
  const validateEmail = (rule, value, callback) => {
    if (value === "") {
      callback(new Error("邮箱地址不能为空!"));
    } else {
      // 定义正则
      const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      if (reg.test(value) == true) {
        callback();
      } else {
        callback(new Error("请输入正确的邮箱地址!"));
      }
    }
  };

export default {
  data() {
    return {
      codeUrl: process.env.VUE_APP_BASEURL + "/captcha?type=login",//登陆验证码地址
        regCodeUrl: process.env.VUE_APP_BASEURL + "/captcha?type=sendsms",//注册验证码地址
      imgUrl:'',//本地预览图片地址
      imageUrl: "", //用户头像上传
      uploadUrl: process.env.VUE_APP_BASEURL +'/uploads',//图片上传地址
      delayTime:0,//获取验证码倒计时
      btnMessage:'获取手机验证码',
      ruleForm: {
        name: "", //输入框绑定
        password: "", //密码框
        code: "", //验证码
        checked: false ,//多选框选定
      },
      rules: {
        // 手机号码验证
        name: [{ required: true, validator: validatePhone, trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "change"
          }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "长度必须为4", trigger: "change" }
        ]
      },
      // 遮罩层代码
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",//注册用户名
        email: "",//注册用户邮箱
        phone: "",//注册手机号
        GPcode: "",//图形码
        rcode:"",//验证码
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rulesShadow: {
        avatar:[{required: true,trigger: "change",message:"头像不能为空"}],
        email:[{required: true,trigger: "blur",validator:validateEmail}],
        // 手机号码验证
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "blur"
          }
        ],
        GPcode: [
          { required: true, message: "请输入图形验证码", trigger: "blur" },
          { min: 4, max: 4, message: "长度必须为4", trigger: "change" }
        ],
        name: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 4 到 20 个字符", trigger: "change" }
        ],
        rcode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "长度为 4 个字符", trigger: "change" }
        ],
      },
      formLabelWidth: "70px"//调整标题右边对齐
    };
  },
  methods: {
    // 验证码点击变化事件
    codeChange() {
      this.codeUrl =
        process.env.VUE_APP_BASEURL +
        "/captcha?type=login&" +
        Math.random() * 999;
    },
    // 注册验证码变化事件
    regCodeChange(){
        this.regCodeUrl =
        process.env.VUE_APP_BASEURL +
        "/captcha?type=sendsms&" +
        Math.random() * 999;
    },
    // 登录按钮
    loginBtn() {
      if (this.ruleForm.checked == true) {
        login({
            phone: this.ruleForm.name,
            password: this.ruleForm.password,
            code: this.ruleForm.code
          
        }).then(res => {
          if (res.data.code == 200) {
            // 保存token
            // window.localStorage.setItem('heimammtoken',res.data.data.token)
            // 使用抽取的操纵token的方法
            saveToken(res.data.data.token)
            //登陆成功跳转首页
            this.$router.push('/index')
          } else {
            window.console.log(res);
            return this.$message({
              message: res.data.message,
              type: "warning"
            });
          }
        });
      } else {
        this.Agreement();
        return;
      }
    },
    // 错误提示
    Agreement() {
      this.$message({
        message: "请确认用户协议之后进行登录",
        type: "warning"
      });
    },
    // 用户头像上传
    handleAvatarSuccess(res, file) {
      // 生成本地的临时路径
      this.imageUrl = URL.createObjectURL(file.raw);
      // 保存注册表单的头像
      this.form.avatar = res.data.file_path;
    },
    // 用户头像上传前预览
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 获取手机验证码
    getMessage(){
      if (this.form.phone == '') {
        return this.$message.error("手机号不能为空")
      }
      if (this.form.GPcode == '') {
        return this.$message.error("图形码不能为空")
      }
      if (this.delayTime == 0) {
        this.delayTime = 60;
        const interId = setInterval(()=>{
          this.delayTime --;
          this.btnMessage = `还剩下${this.delayTime}秒哦`
          if (this.delayTime ===0) {
            clearInterval(interId)
            this.btnMessage = "获取手机验证码"
          }
        },100)
        getCode({
          code: this.form.GPcode,
          phone: this.form.phone
        }).then(res=>{
          if (res.data.code == 200) {
            this.$message.success('短信验证码是:'+res.data.data.captcha)
          }else{
            this.$message.error(res.data.message)
          }
        })
      }
    },
    // 点击注册
    btnRegister(){
      // 调用  饿了么 封装的表单验证方法进行表单验证
      this.$refs.rulesShadow.validate((valid) => {
          if (valid) {
            register({
              username:this.form.name,//注册用户名
              phone:this.form.phone,//注册手机号
              email:this.form.email,//注册邮箱号
              password:this.form.password,//注册密码
              rcode:this.form.rcode,//手机验证码
              avatar:this.form.avatar,//用户头像
            }).then(res=>{
              if (res.data.code == 200) {
                this.$message.success('注册成功')
                // 注册成功后清除表单内容
                this.$refs.rulesShadow.resetFields();
                // 关闭注册表单
                this.dialogFormVisible = false
              }
            })
          } else {
            this.$message.error('格式不对!请重新输入!')
            return false;
          }
        });
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
  // 头部标题背景颜色
  .el-dialog__header {
    background-color: rgba(1, 198, 250, 1);
  }
  // 头像上传盒子居中
  .avatar-uploader {
    text-align: center;
  }//遮罩层验证码
  .shadow-img {
    width: 100%;
  }
  // 用户头像上传
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

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
    .cdInput-img {
      width: 100%;
      height: 42px;
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