<!-- 个人设置 -->
<template>
  <div id="container">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-input v-model="form.avator" :disabled="true"></el-input>
        <el-upload
          class="upload-demo"
          action="http://www.freemusice.com/api/uploadImage"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-upload="beforeAvatarUpload"
          :on-exceed="handleExceed"
          :file-list="fileList"
          :auto-upload="false"
          :limit="1"
          name="image"
          :data="userInfo"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>

      <el-form-item label="性别">
        <el-select v-model="form.sex" placeholder="请选择您的角色">
          <el-option label="男" value="1"></el-option>
          <el-option label="女" value="0"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="角色">
        <el-input v-model="form.role" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="密码">
        <el-input v-model="form.password" type="password" showPassword></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">修改个人信息</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    let userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
    return {
      userInfo: userInfo,
      form: {
        name: userInfo.username,
        phone: userInfo.phone,
        email: userInfo.email,
        address: userInfo.address,
        avator: userInfo.avator,
        role: userInfo.role,
        sex: userInfo.sex == 1 ? "男" : "女",
        password: userInfo.password
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        phone: [{ required: true, message: "请输入电话", trigger: "blur" }],
        avator: [{ required: true, message: "请输入头像", trigger: "blur" }],
        sex: [{ required: true, message: "请选择您的性别", trigger: "blur" }]
      },
      fileList: []
    };
  },
  computed: {
    getUserInfo() {
      return JSON.parse(window.sessionStorage.getItem("userInfo"));
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //   alert("submit!");

          this.$http({
            url: "/api/uploadImage",
            method: "post",
            data: this.userInfo
          })
            .then(res => {
              console.log("uploadImageSucc", res);
            })
            .catch(e => {
              console.log("uploadImageError", e);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`只能上传单个文件`);
    },

    beforeAvatarUpload(file) {
      console.log("beforeAvatarUpload", file);

      const isJPG = file.type === "image/jpeg" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG或者PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }

      this.fileList.splice(0, 1, file);
      console.log(this.fileList);

      return isJPG && isLt2M;
    }
  }
};
</script>

<style  scoped>
.el-input__inner {
  widows: 60%;
}
#container {
  width: 80%;
  margin: 0 auto;
  margin-top: 30px;
}
</style>
