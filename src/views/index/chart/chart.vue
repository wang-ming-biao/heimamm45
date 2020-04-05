<template>
  <div class="body-box">
    <!-- 顶部 -->
    <el-card class="box-card boxTop">
      <el-progress type="circle" :percentage="25">
        今日新增用户
      </el-progress>
      <el-progress type="circle" :percentage="25">
        总用户量
      </el-progress>
      <el-progress type="circle" :percentage="50">
        新增试题
      </el-progress>
      <el-progress type="circle" :percentage="50">
        总试题量
      </el-progress>
      <el-progress type="circle" :percentage="100">
        总刷题量
      </el-progress>
      <el-progress type="circle" :percentage="100">
        人均刷题量
      </el-progress>
    </el-card>
    <!-- 底部 -->
    <el-card class="box-bottom">
      <h2 class="title">整体数据</h2>
      <div ref="chartsBox" class="charts-box"></div>
    </el-card>
  </div>
</template>

<script>
// 导入 ECharts
import echarts from "echarts";
// 导入获取头部数据接口
import { chartTitle, chartQuestion } from '@/api/chart'
/*
total_done_questions: 0
personal_questions: 0
total_users: 3
increment_users: 0
increment_questions: 0
total_questions: 2
*/
export default {
  name: "chart",
  data() {
    return {
      titledata: {} // 头部数据
    }
  },
  mounted() {
    // 使用依赖于接口数据,并且依赖于 dom 元素的 初始化逻辑
    // 一般全写在mounted中
        // 页面加载请求图表数据
  chartTitle().then(res => {
    this.titledata = res.data
  })
  // 请求整体数据
  chartQuestion().then(res=> {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.querySelector(".charts-box"))
    // 指定图表的配置项和数据
    var option = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        right: 10,
        // 显示数据表的数据名称,使用map遍历该数组,将里面的name返回出来
        // map方法,返回一个新的数组,传入回调函数,每次会把  每一项  传给v
        // return 的值  最终会拼成一个新的数组
        data: res.data.map(v=> {
          return v.name
        })
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          color: ["#0094ff", "#f9b358", "#f76137"],
          label: {
            show: false,
            position: "center"
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "30",
              fontWeight: "bold"
            }
          },
          labelLine: {
            show: false
          },
          // 直接将接口获取到的数据赋值给echarts图标的数据data
          data: res.data
        }
      ]
    }
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option)
  })
    
  }
};
</script>

<style lang="less" scoped>
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
/deep/.el-card__body {
  display: flex;
  justify-content: space-around;
}
.box-bottom {
  width: 100%;
  height: 100%;
}
.title {
  width: 230px;
}
// echarts容器
.charts-box {
  width: 100%;
  height: 800px;
}
</style>