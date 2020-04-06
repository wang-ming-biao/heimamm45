<template>
  <div class="body-box">
    <!-- 上半部分表格 -->
    <el-card class="box-card boxTop">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-row :gutter="24">
          <el-form-item label="学科">
            <el-select v-model="formInline.subject"  class="boxSize" placeholder="请选择学科">
              <el-option v-for="(item) in subjectList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="阶段">
            <el-select v-model="formInline.step"  class="boxSize" placeholder="请选择阶段">
              <el-option label="初级" :value="1"></el-option>
              <el-option label="中级" :value="2"></el-option>
              <el-option label="高级" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业">
            <el-select v-model="formInline.enterprise"  class="boxSize" placeholder="请选择企业">
              <el-option v-for="item in enterpriseList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="题型">
            <el-select v-model="formInline.type"  class="boxSize" placeholder="请选择题型">
              <el-option label="单选" :value="1"></el-option>
              <el-option label="多选" :value="2"></el-option>
              <el-option label="简答" :value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row :gutter="24">
          <el-form-item label="难度">
            <el-select v-model="formInline.difficulty"  class="boxSize" placeholder="请选择难度">
              <el-option label="简单" :value="1"></el-option>
              <el-option label="一般" :value="2"></el-option>
              <el-option label="困难" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="作者">
            <el-input v-model="formInline.username"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="formInline.status"  class="boxSize" placeholder="请选择状态">
              <el-option label="禁用" :value="0"></el-option>
              <el-option label="启用" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker v-model="formInline.create_date" type="date" class="boxSize" placeholder="选择日期">
          </el-date-picker>
          </el-form-item>
        </el-row>
        <el-form-item label="标题">
          <el-input v-model="formInline.title" class="titleInput"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button>清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus" @click="$refs.addDialog.dialogFormVisible = true">新增试题</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 下半部分表格 -->
    <el-card class="box-card">
      <el-table :data="tableData"  border style="width: 100%">
        <el-table-column fixed type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="title" label="题目" width="150">
          <!-- 使用插槽解析富文本 -->
          <template slot-scope="scope">
            <div v-html="scope.row.title"></div>
          </template>
        </el-table-column>
        <el-table-column prop="subject_name" label="学科.阶段" width="150">
          <!-- 
            var obj = {name: 'jake',age:18}
            obj['name'] ==>jake
            obj['age'] ==>18
            var question = {1:"初级",2:"中级",3:"高级"}
            question[1] ==>初级
            question[2] ==>中级
            {1: '初级',2: '中级',3: '高级'}[scope.row.step] 对象加索引取值,通过服务器给的键
           -->
           <template slot-scope="scope">
             {{ scope.row.subject_name + '.' + {1: '初级',2: '中级',3: '高级'}[scope.row.step] }}
           </template>
        </el-table-column>
        <el-table-column prop="type" label="题型" width="150">
          <!-- 使用对象[key]来简化编码 -->
          <template slot-scope="scope">
            {{ {1: '单选',2: '多选',3: '简答'}[scope.row.type] }}
            </template>
        </el-table-column>
        <el-table-column prop="enterprise_name" label="企业" width="300"></el-table-column>
        <el-table-column prop="username" label="创建者" width="300"></el-table-column>
        <el-table-column fit prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">启用</span>
            <span v-else  class="red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column fit prop="reads" label="访问量"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <!-- 点击编辑进入编辑阶段,将当前点击的东西通过scope.row传入进来 -->
            <el-button type="text" size="small" @click="enterEdit(scope.row)" >编辑</el-button>
            <el-button  type="text" size="small">启用</el-button>
            <el-button  type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 页码翻页器 -->
      <el-pagination
        background
        class="pageBox"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="Page"
        :page-sizes="pageSize"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <addDialog ref="addDialog" />
    <editDialog ref="editDialog" />
  </div>
</template>

<script>
// 导入获取学科列表的方法
import { subjectList } from '@/api/subject'
// 导入获取企业数据方法
import { enterpriseList } from '@/api/enterprise'
// 导入新增试题组件
import addDialog from './components/addDialog'
// 导入获取题库列表的接口
import { questionList } from '@/api/question'
// 引入编辑题目组件
import editDialog from './components/editDialog'
export default {
  components : {
    addDialog,
    editDialog
  },
  data() {
    return {
      // 上半部分表单
      formInline: {
        subject: '', // 学科名称
        step: '', // 阶段
        enterprise: '', // 企业名称
        type: '', // 题型
        difficulty: '', // 难度
        username: '', // 作者
        status: '', // 状态
        create_date: '', // 创建日期
        title: '' // 标题
      },
      // 当前页码
      Page: 1,
      // 页容量,默认当前页请求多少条
      size: 4,
      // 页容量选项
      pageSize: [2,4,6,8],
      // 总条数
      total: 0,
      subjectList: [], // 学科数据
      enterpriseList: [], // 企业数据
      tableData: [], // 题库列表
      isDate: '' // 时间数据
    };
  },
  methods: {
    // 搜索的方法
    onSubmit() {
      // 调用获取题库列表接口,将页码和搜索框内的值传进去
      questionList({
        page: this.Page,
        limit: this.size,
        // ...展开运算符,将表单内的值展开
        ...this.formInline
      }).then( res => {
        // 将页码传给本地翻页器
        this.total = res.data.pagination.total
        // 将数据保存到本地
        this.tableData = res.data.items
      })
    },
    //   分页方法
    handleSizeChange(val) {
      window.console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      window.console.log(`当前页: ${val}`);
    },
    // 获取题库
    getList () {
      // 调用接口,传入页码页容量
      questionList({
        page: this.page
      }).then( res => {
        // 将题目数据保存起来
        this.tableData = res.data.items
        window.console.log(this.tableData)
        // 将总页数赋值给翻页器
        this.total = res.data.pagination.total
      })
    },
    // 点击编辑题目
    enterEdit (item) {
      // 唤起编辑款
      this.$refs.editDialog.dialogFormVisible = true
      // 把数据设置给弹框,直接赋值会联动,所以要注意深拷贝
      // 使用 JSON.parse(JSON.stringify(item)) 进行深拷贝,避免影响
      // this.$refs.editDialog.editForm = JSON.parse(JSON.stringify(item))
      // 由于直接赋值拿不到城市等数据,所以要先进行数据的切割
      // 先设置一个常量接收传入的值
      const editForm = JSON.parse(JSON.stringify(item))
      // 再将里面的城市数据拿出来切割,以逗号为节点,返回成一个数组(城市数据需要变成数组才能够渲染)
      editForm.city = editForm.city.split(',')
      // 多选选项也是一个数组,也去要拿出来进行切割
      editForm.multiple_select_answer = editForm.multiple_select_answer.split(',')
      // 排序  数字  字母  默认就可以排序
      editForm.multiple_select_answer.sort()
      // 之后把处理好的数据赋值给弹框
      this.$refs.editDialog.editForm = editForm
      // 由于页面上渲染后顺序错乱,所以需要将数据重新排列
      // 定义一个空数组,用来接收重新排序的值
      const options = []
      // 遍历select_options里面的数据
      editForm.select_options.forEach( v =>{
        // 将等于该项的值重新赋值
        if(v.label == "A") {
          options[0] = v
        } else if (v.label == "B") {
          options[1] = v
        } else if (v.label == "C") {
          options[2] = v
        } else {
          options[3] = v
        }
      })
      editForm.select_options = options
      // 服务器返回的图片没有基地址,也少了一个 '/' 所以需要手动逐个进行拼接
      // 由于是设置在页面上的本地预览路劲,所以另行设置,(判断非空)
      if (editForm.select_options[0].image != "") {
        this.$refs.editDialog.imageAUrl = process.env.VUE_APP_BASEURL + "/" +  editForm.select_options[0].image
      }
      if (editForm.select_options[1].image != "") {
        this.$refs.editDialog.imageBUrl = process.env.VUE_APP_BASEURL + "/" +  editForm.select_options[1].image
      }
      if (editForm.select_options[2].image != "") {
        this.$refs.editDialog.imageCUrl = process.env.VUE_APP_BASEURL + "/" +  editForm.select_options[2].image
      }
      if (editForm.select_options[3].image != "") {
        this.$refs.editDialog.imageDUrl = process.env.VUE_APP_BASEURL + "/" +  editForm.select_options[3].image
      }
      // 视频预览地址也要拼接(判断视频地址有没有值之后再进行拼接)
      if (editForm.video !== "") {
        this.$refs.editDialog.videoUrl = process.env.VUE_APP_BASEURL + "/" + editForm.video
      }
      
    }
  },
  created () {
    // 获取学科数据
    subjectList().then(res=>{
      this.subjectList = res.data.items
    }),
    // 获取企业数据
    enterpriseList().then(res =>{
      this.enterpriseList = res.data.items
    }),
    // 获取题库数据
    this.getList()
  }
};
</script>

<style lang="less" scoped >
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
.el-form-item {
  margin-left: 30px;
}
/deep/.boxSize{
  width: 200px;
}
.titleInput{
  width: 300px;
  margin: 0;
}
.red {
  color: red;
}
// .el-date-editor.el-input, .el-date-editor.el-input__inner {
//   width: 200px;
// }
</style>