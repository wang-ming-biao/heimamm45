<template>
  <el-container class="index-container">
    <el-header class="my-header">
      <div class="left">
        <i class="left-icon el-icon-s-operation" @click="isCollapse = !isCollapse"></i>
        <img src="../../assets/index-logo.png" alt class="left-img" />
        <span class="left-name">黑马面面</span>
      </div>
      <div class="right">
        <img :src="getUser.avatar" class="userPic" alt="">
        <span class="userName">{{getUser.username}},您好</span>
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
        <!-- 数据   调用计算属性中过滤后的数据进行判断组件是否渲染 -->
          <el-menu-item v-if="[ '超级管理员','管理员','老师','学生' ].includes(getUser.role) === true" index="/index/chart">
            <!-- e-charts -->
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <!-- 用户 在导航守卫中设置权限主要是为了防止用户收藏地址,设置了权限后,用户收藏了地址也无法进入 -->
          <el-menu-item v-if="[ '超级管理员','管理员' ].includes(getUser.role) === true" index="/index/user">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <!-- 题库 -->
          <el-menu-item v-if="[ '超级管理员','管理员','老师'].includes(getUser.role) === true" index="/index/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <!-- 企业 -->
          <el-menu-item v-if="[ '超级管理员','管理员','老师'].includes(getUser.role) === true" index="/index/enterprise">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <!-- 学科 -->
          <el-menu-item v-if="[ '超级管理员','管理员','老师','学生' ].includes(getUser.role) === true" index="/index/subject">
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
          // 用户点击退出
          this.$message({
            type: 'success',
            message: '退出成功!',
          });
          // 调用退出方法
            this.logout();
        }).catch(() => {
          // 用户点击取消退出
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
    //   退出登陆方法
    logout(){
        logout().then(res=>{
            if (res.data.code == 200) {
              // 退出成功后清除本地token
            removeToken();
            // 清除本地数据
            this.$store.state.user = undefined
            this.$router.push('/login')
            }else{
                this.$message.error(res.data.message)
            }
        })
    }
  },
  // 计算属性
  computed: {
    getUser () {
    // 简化用户获取的数据,将vuex中的数据经过计算属性返回出去
      return this.$store.state.user
    }
  }
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