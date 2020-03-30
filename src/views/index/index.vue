<template>
  <el-container class="index-container">
    <el-header class="my-header">
      <div class="left">
        <i class="left-icon el-icon-s-operation" @click="isCollapse = !isCollapse"></i>
        <img src="../../assets/index-logo.png" alt class="left-img" />
        <span class="left-name">黑马面面</span>
      </div>
      <div class="right">
        <img :src="user.avatar" class="userPic" alt="">
        <span class="userName">{{user.username}},您好</span>
        <el-button type="success" class="btnSize" size="mini" @click="open">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="auto" class="my-aside">
        <!-- 将当前路由绑定到 default-active 上,获取页面跳转以及高亮-->
        <el-menu
          router
          :collapse="isCollapse"
          :default-active="$route.path"
          class="el-menu-vertical-demo"
        >
          <el-menu-item index="/index/chart">
            <!-- e-charts -->
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="/index/user">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/index/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/index/enterprise">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/index/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="my-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { logout } from '../../api/login.js'
import { removeToken } from '../../utils/token';
// import { removeToken } from '../../utils/token.js';
export default {
  name: 'user',
  data() {
    return {
      isCollapse: false ,//列表显示隐藏
      user:{},//进入页面后请求的用户详情
    };
  },
  methods: {
    // 退出确定
    open() {
        this.$confirm('此操作将退出网站登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '退出成功!',
          });
            this.logout();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
    //   退出登陆
    logout(){
        logout().then(res=>{
            window.console.log(res)
            if (res.data.code == 200) {
            removeToken();
            this.$router.push('/login')
            }else{
                this.$message.error(res.data.message)
            }
        })
    }
  },
  // 在尽可能早的时候进行登录判断
  // beforeCreate () {
  //   // 获取到用户的存储在本地的token
  //   const token = getToken()
  //   if(token === null) {
  //     this.$message.success('没有登陆哦!请先登录')
  //     this.$router.push('/login')
  //   }
  // },
  // 进入页面调用created请求用户数据
  // created() {
    
  // },
};
</script>

<style lang="less">
.index-container {
  height: 100%;
  .my-header {
    // background-color: aqua;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-content: center;
      align-items: center;
      .left-icon {
        font-size: 24px;
        margin-right: 22px;
      }
      .left-name {
          font-size: 22px;
          color:rgba(73,161,255,1);
      }
      .left-img {
          width: 33px;
          height: 28px;
          margin-right: 12px;
      }
    }
    .right{
        display: flex;
        align-items: center;
            
        .userPic{
            width: 43px;
            height: 43px;
            margin-right: 12px;
        }
        .userName{
            // width: 63px;
            height: 15px;
            font-size: 14px;
            margin-right: 28px;
        }
    }
  }
  // .my-aside {
  //     background-color: yellowgreen
  // }
  .my-main {
    background-color: skyblue;
  }
  // 列表伸缩流畅
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>