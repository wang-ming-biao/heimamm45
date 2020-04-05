<template >
<!-- 编辑题库 -->
  <!-- opened : 饿了么提供的表单回调,对话框完全打开之后触发 -->
  <el-dialog
    @opened="opened"
    class="question-add"
    fullscreen
    title="编辑题库测试"
    :visible.sync="dialogFormVisible"
    center
  >
    <!-- 给表单外部加宽度,并使其居中 -->
    <el-form :label-position="labelPosition" ref="editForm" class="question-form" :model="editForm" :rules="editRules">
      <!-- 学科  subject -->
      <el-form-item label="学科" prop="subject" :label-width="formLabelWidth">
        <el-select v-model="editForm.subject" class="boxSize" placeholder="请选择学科">
          <el-option
            v-for="(item) in $parent.subjectList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <!-- 阶段 step -->
      </el-form-item>
      <el-form-item label="阶段" prop="step" :label-width="formLabelWidth">
        <el-select v-model="editForm.step" placeholder="请选择阶段">
          <el-option label="初级" :value="1"></el-option>
          <el-option label="中级" :value="2"></el-option>
          <el-option label="高级" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <!-- 企业 enterprise -->
      <el-form-item label="企业" prop="enterprise" :label-width="formLabelWidth">
        <el-select v-model="editForm.enterprise" prop="enterprise_id" class="boxSize" placeholder="请选择企业" >
          <el-option v-for="item in $parent.enterpriseList" :key="item.id" :label="item.name" :value="item.id" ></el-option>
        </el-select>
      </el-form-item>
      <!-- 城市 city -->
      <el-form-item label="城市" prop="city" :label-width="formLabelWidth">
        <!-- 级联选择器 -->
        <el-cascader
          v-model="editForm.city"
          :options="options"
          :props="{ expandTrigger: 'hover' }"
        ></el-cascader>
      </el-form-item>
      <!-- 题型 type -->
      <el-form-item label="题型" prop="type" :label-width="formLabelWidth">
        <el-radio-group v-model="editForm.type">
          <el-radio :label="1">单选</el-radio>
          <el-radio :label="2">多选</el-radio>
          <el-radio :label="3">简答</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 难度 difficulty -->
      <el-form-item label="难度" prop="difficulty" :label-width="formLabelWidth">
        <el-radio-group v-model="editForm.difficulty">
          <el-radio :label="1">简单</el-radio>
          <el-radio :label="2">一般</el-radio>
          <el-radio :label="3">困难</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!--  -->
      <el-form-item label="试题标题" prop="title" ></el-form-item>
      <!-- 富文本编辑器头部 -->
      <div class="title-toolbar"></div>
      <!-- 富文本编辑器身体 -->
      <div class="title-content"></div>
      <!-- 分割线 -->
      <el-divider></el-divider>
        <!-- 单选区域 -->
      <el-form-item v-if="editForm.type === 1" label="单选" prop="single_select_answer">
        <el-radio-group v-model="editForm.single_select_answer">
          <!-- 选项A -->
          <div class="option-box">
            <el-radio label="A">A</el-radio>
            <el-input v-model="editForm.select_options[0].text"></el-input>
            <!-- 用户头像上传 -->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageAUrl" :src="imageAUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- 选项B -->
          <div class="option-box">
            <el-radio label="B">B</el-radio>
            <el-input v-model="editForm.select_options[1].text"></el-input>
            <!-- 用户头像上传 -->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleBvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageBUrl" :src="imageBUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- 选项C -->
          <div class="option-box">
            <el-radio label="C">C</el-radio>
            <el-input v-model="editForm.select_options[2].text"></el-input>
            <!-- 用户头像上传 -->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleCvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageCUrl" :src="imageCUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- 选项D -->
          <div class="option-box">
            <el-radio label="D">D</el-radio>
            <el-input v-model="editForm.select_options[3].text"></el-input>
            <!-- 用户头像上传 -->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleDvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageDUrl" :src="imageDUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-radio-group>
      </el-form-item>
        <!-- 多选区域 -->
      <el-form-item v-if="editForm.type === 2" label="多选" prop="multiple_select_answer">
        <el-checkbox-group v-model="editForm.multiple_select_answer">
          <!-- 选项A -->
          <div class="option-box">
            <el-checkbox label="A">A</el-checkbox>
            <el-input v-model="editForm.select_options[0].text"></el-input>
            <!-- 用户头像上传 -->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageAUrl" :src="imageAUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- 选项B -->
          <div class="option-box">
            <el-checkbox label="B">B</el-checkbox>
            <el-input v-model="editForm.select_options[1].text"></el-input>
            <!-- 用户头像上传 -->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleBvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageBUrl" :src="imageBUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- 选项C -->
          <div class="option-box">
            <el-checkbox label="C">C</el-checkbox>
            <el-input v-model="editForm.select_options[2].text"></el-input>
            <!-- 用户头像上传 -->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleCvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageCUrl" :src="imageCUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- 选项D -->
          <div class="option-box">
            <el-checkbox label="D">D</el-checkbox>
            <el-input v-model="editForm.select_options[3].text"></el-input>
            <!-- 用户头像上传 -->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleDvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageDUrl" :src="imageDUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-checkbox-group>
      </el-form-item>
        <!-- 简答区域 -->
      <el-form-item v-if="editForm.type === 3" label="简答" prop="short_answer">
        <el-input type="textarea" rows="2" v-model="editForm.short_answer">
         
        </el-input>
      </el-form-item>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 解析视频 -->
      <el-form-item label="视频解析">
        <el-upload
          class="upload-demo"
          :action="uploadUrl"
          :on-success="handleVideoSuccess"
          :before-upload="beforeVideoUpload"
        >
          <el-button size="small" type="success">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传视频文件，且不超过2MB</div>
        </el-upload>
        <video v-if="videoUrl" :src="videoUrl" autoplay loop controls></video>
      </el-form-item>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 富文本编辑器 -->
      <el-form-item label="答案解析" prop="answer_analyze" ></el-form-item>
      <!-- 富文本编辑器头部 -->
      <div class="answer-toolbar"></div>
      <!-- 富文本编辑器身体 -->
      <div class="answer-content"></div>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 试题备注 remark -->
      <el-form-item label="试题备注" prop="remark">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="editForm.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入级联选择器数据
import { regionData } from "element-china-area-data";
// 导入富文本编辑器
import wangeditor from "wangeditor";
// 导入封装的数据编辑接口
import { questionEdit } from '@/api/question.js'
export default {
  name: "editDialog",
  data() {
    return {
      dialogFormVisible: false, // 遮罩层是否展开
      options: regionData, // 级联选择器数据
      uploadUrl: process.env.VUE_APP_BASEURL + "/question/upload", // 上传地址
      labelPosition: "left", // 对齐方式
      // 验证表单
      editForm: {
        select_options: [
          {
            label: "A",
            text: "",
            image: ""
          },
          {
            label: "B",
            text: "",
            image: ""
          },
          {
            label: "C",
            text: "",
            image: ""
          },
          {
            label: "D",
            text: "",
            image: ""
          }
        ], // 选项,介绍,图片介绍
        title: "", // 标题
        subject: "", // 学科id标识
        step: "", // 难度
        enterprise: "", // 企业id标识
        city: "", // 城市
        type: "", // 题型 1单选 2多选 3简单
        difficulty: "", // 题目难度 1简单 2一般 3困难
        single_select_answer: "", // 单选题答案
        multiple_select_answer: [], // 多选题答案
        short_answer: "", // 简答题答案
        answer_analyze: "", // 答案解析
        video: "", // 视频的地址
        remark: "" // 试题备注
      },
      // 表单验证
      editRules: {
        title: [{ required: true, message: "标题不能为空", trigger: "change" }],
        // 标题
        subject: [
          { required: true, message: "学科不能为空", trigger: "change" }
        ],
        // 学科
        step: [{ required: true, message: "难度不能为空", trigger: "change" }],
        // 难度
        enterprise: [
          { required: true, message: "企业不能为空", trigger: "change" }
        ],
        // 企业
        city: [{ required: true, message: "城市不能为空", trigger: "change" }],
        // 城市
        type: [{ required: true, message: "题型不能为空", trigger: "change" }],
        // 题型
        difficulty: [
          { required: true, message: "题目难度不能为空", trigger: "change" }
        ],
        // 题目难度
        single_select_answer: [
          { required: true, message: "单选题不能为空", trigger: "change" }
        ],
        // 单选题
        multiple_select_answer: [
          { required: true, message: "多选题答案不能为空", trigger: "change" }
        ],
        // 多选题答案
        short_answer: [
          { required: true, message: "简答题答案不能为空", trigger: "change" }
        ],
        // 简答题答案
        answer_analyze: [
          { required: true, message: "答案解析不能为空", trigger: "change" }
        ],
        // 答案解析
        remark: [
          { required: true, message: "试题备注不能为空", trigger: "change" }
        ]
        // 试题备注
      }, // 表单验证规则定义
      formLabelWidth: "60px", // 下拉框的选项
      radio: 3, // 单选框的值
      titleEditor: undefined, // 编辑器 头部
      answerEditor: undefined, // 编辑器 答案
      imageAUrl: "", // 图片上传的本地预览地址
      imageBUrl: "", // 图片上传的本地预览地址
      imageCUrl: "", // 图片上传的本地预览地址
      imageDUrl: "", // 图片上传的本地预览地址
      videoUrl: "" // 视频上传后的本地预览地址
    };
  },
  methods: {
    // 打开新增窗口创建wangedit
    opened() {
      // 创建编辑器,在每次创建时要加入判断逻辑,防止opened重复创建
        // title 标题
      if (this.titleEditor === undefined) {
        // editor 编辑器  title-toolbar:编辑器头部的类名  title-content:编辑器身体的类名
        this.titleEditor = new wangeditor(".title-toolbar", ".title-content")
        // 接收输入文字时触发的内容,通过箭头函数使得this的指向往上一层,并不变
        this.titleEditor.customConfig.onchange = html => {
          // html 即变化之后的内容,将值绑定到表单中
          this.editForm.title = html;
        }
        // create方法
        this.titleEditor.create();
      }
        // answer: 回答,答案
      if (this.answerEditor === undefined) {
        this.answerEditor = new wangeditor(".answer-toolbar",".answer-content")
        // 接收输入文字时触发的内容,通过箭头函数使得this的指向往上一层,并不变
        this.answerEditor.customConfig.onchange = html => {
          // html 即变化之后的内容,将值绑定到表单中
          this.editForm.answer_analyze = html;
        }
        // create方法
        this.answerEditor.create();
      }
      // 因为是在编辑页面,需要渲染父组件传入的值,所以需要使用wangeditor的方法解析
      // 将数据里的试题标题与试题内容拿出来解析
      this.titleEditor.txt.html(this.editForm.title)
      this.answerEditor.txt.html(this.editForm.answer_analyze)
    },
    // 选项A的 上传组件钩子
    handleAvatarSuccess(res, file) {
      //  当文件上传成功之后,在本地生成一个地址
      this.imageAUrl = URL.createObjectURL(file.raw);
      // /通过打印res获取服务器返回的url地址,并将其赋值给表单
      this.editForm.select_options[0].image = res.data.url;
    },
    // 选项B的 上传组件钩子
    handleBvatarSuccess(res, file) {
      //  当文件上传成功之后,在本地生成一个地址
      this.imageBUrl = URL.createObjectURL(file.raw);
      // /通过打印res获取服务器返回的url地址,并将其赋值给表单
      this.editForm.select_options[1].image = res.data.url;
    },
    // 选项C的 上传组件钩子
    handleCvatarSuccess(res, file) {
      //  当文件上传成功之后,在本地生成一个地址
      this.imageCUrl = URL.createObjectURL(file.raw);
      // /通过打印res获取服务器返回的url地址,并将其赋值给表单
      this.editForm.select_options[2].image = res.data.url;
    },
    // 选项D的 上传组件钩子
    handleDvatarSuccess(res, file) {
      //  当文件上传成功之后,在本地生成一个地址
      this.imageDUrl = URL.createObjectURL(file.raw);
      // /通过打印res获取服务器返回的url地址,并将其赋值给表单
      this.editForm.select_options[3].image = res.data.url;
    },
    // 图片上传验证逻辑
    beforeAvatarUpload(file) {
      // 如果想上传别的类型的照片,可以修改判断逻辑
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/PNG/JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 视频解析上传
    // 视频解析上传组件钩子
    handleVideoSuccess(res, file) {
      //  视频的预览地址
      this.videoUrl = URL.createObjectURL(file.raw);
      // /通过打印res获取服务器返回的url地址,并将其赋值给表单
      this.editForm.video = res.data.url;
    },
    // 视频上传验证逻辑
    beforeVideoUpload(file) {
      // 如果想上传别的类型的照片,可以修改判断逻辑
      const isMP4 = file.type === "video/mp4";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isMP4) {
        this.$message.error("上传的视频只能是 MP4 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传视频大小不能超过 2MB!");
      }
      return isMP4 && isLt2M;
    },
    // 提交数据
    submitForm () {
      // 通过给表单注册一个ref选择器,调用element自带的表单验证方法validate
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          // 调用表单 上传的额接口,将表单的数据传入.通过.then()得到结果
          questionEdit(this.editForm).then( res => {
        window.console.log(res)
            if (res.code === 200) {
              // 提示用户成功
              this.$message.success('修改成功')
              // 收起新增框
              this.dialogFormVisible = false
              // 清空表单
              this.$refs.editForm.resetFields()
              // 使用forEach()遍历单选题的数组,清除不需要的内容
              this.editForm.select_options.forEach(v => {
                v.text = ''
                v.image = ''
              })
              // 调用wangeditor自带的方法,将页面输入的内容替换
              this.titleEditor.txt.html('<p>请输入内容</p>')
              this.answerEditor.txt.html('<p>请输入内容</p>')
              // 清除本地预览的视频地址
              this.videoUrl = ''
              // 清空本地图片预览地址
              this.imageAUrl = ''
              this.imageBUrl = ''
              this.imageCUrl = ''
              this.imageDUrl = ''
              // 刷新父级的数据列表
              this.$parent.getList()
            }
          })
        } else {
          this.$message.error('格式不太对哦,请检查一下')
          return false
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
// 使用深度选择器选择
/deep/.el-input {
  width: 364px;
}
.question-form {
  width: 834px;
  margin: 0 auto;
}
.title-toolbar {
  border: 1px solid #ededed;
  border-bottom: none;
}
.title-content {
  height: 100px;
  border: 1px solid #ededed;
  border-bottom: none;
  margin-bottom: 20px;
  .w-e-text::-webkit-scrollbar {
    display: none;
  }
}
.answer-toolbar {
  border: 1px solid #ededed;
  border-bottom: none;
}
.answer-content {
  height: 100px;
  border: 1px solid #ededed;
  border-bottom: none;
  .w-e-text::-webkit-scrollbar {
    display: none;
  }
}
// 用户上传组件
.option-box {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  .el-input {
    width: 476px;
    margin-right: 20px;
  }
}
// 用户头像上传样式
/deep/.avatar-uploader .el-upload {
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
</style>