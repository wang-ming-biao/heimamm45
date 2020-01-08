<template>
<div class="body-box">
      <el-card class="box-card boxTop">
<el-progress type="circle" :percentage="25"></el-progress>
<el-progress type="circle" :percentage="25"></el-progress>
<el-progress type="circle" :percentage="50" status="exception"></el-progress>
<el-progress type="circle" :percentage="50" status="exception"></el-progress>
<el-progress type="circle" :percentage="100" status="success"></el-progress>
<el-progress type="circle" :percentage="100" status="success"></el-progress>
</el-card>
<el-card class="box-card">
</el-card>
</div>
</template>

<script>
export default {
        data() {
      return {
        formInline: {
          user: '',
          region: '',
        }
      }
    },
    methods: {
      onSubmit() {
        window.console.log('submit!');
      }
    }
}
</script>

<style>
/* 卡片样式 */
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 100%;
  }
  .boxTop {
    margin-bottom: 20px;
  }
</style>