<!--  -->
<template>
  <div>
    <el-dialog
      title="提示"
      customClass="dialog-pub"
      width="80%"
      :visible.sync="dialogVisible"
      :before-close="dialogClose"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>

        <el-form-item label="电   话" prop="phone">
          <el-input v-model.number="ruleForm.phone" maxlength="11" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="邮  箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>

        <el-form-item label="地  址" prop="address">
          <el-input v-model="ruleForm.address"></el-input>
        </el-form-item>

        <el-form-item label="登陆密码" prop="password">
          <el-input
            :disabled="ruleForm.password.length>0?true:false"
            type="password"
            v-model="ruleForm.password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="ruleForm.role" placeholder="请分配用户角色">
            <el-option disabled label="超级管理员" value="1"></el-option>
            <el-option label="管理员" value="3"></el-option>
            <el-option label="会员" value="4"></el-option>
            <el-option label="用户" value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogClose">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "addDiaLog",
  props: {
    dialogVisible: Boolean,
    dialogData: Object
  },
  data() {
    return {
      user: {},
      ruleForm: {
        username: "",
        role: "",
        phone: "",
        email: "",
        address: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入用户电话", trigger: "blur" },
          { type: "number", message: "电话必须为数字值" }
        ],
        email: [
          { required: true, message: "请输入用户邮箱", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        address: [
          { required: true, message: "请输入用户地址", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入登陆", trigger: "blur" }]
        //role: [{ required: true, message: "请选择用户角色", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 关闭dialog
    dialogClose() {
      this.$emit("dialogClose");
    },
    // 确定dialog
    submitForm() {
      if (this.user.id == undefined) {
        // 新增
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            this.ruleForm.id = "";
            this.$emit("dialogSure", this.ruleForm);
            setTimeout(() => {
              this.$refs["ruleForm"].resetFields();
            }, 2000);
          } else {
            return false;
          }
        });
      } else {
        // 编辑
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            console.log("edit:", this.ruleForm);
            this.ruleForm.role =
              this.ruleForm.role == "超级管理员"
                ? "1"
                : this.ruleForm.role == "管理员"
                ? "3"
                : this.ruleForm.role == "会员"
                ? "4"
                : this.ruleForm.role == "用户"
                ? "5"
                : "6";
            this.ruleForm.id = this.user.id;
            this.$emit("dialogSure", this.ruleForm);
          } else {
            return false;
          }
        });
      }
    }
  },
  watch: {
    dialogData: function(val) {
      this.user = val;
      if (val.username == undefined) {
        this.ruleForm = {
          username: "",
          role: "",
          phone: "",
          email: "",
          address: "",
          password: ""
        };
      } else {
        this.ruleForm = {
          username: val.username,
          role:
            val.role == "1"
              ? "超级管理员"
              : val.role == "3"
              ? "管理员"
              : val.role == "4"
              ? "会员"
              : val.role == "5"
              ? "用户"
              : "",
          phone: val.phone == "" ? "" : parseInt(val.phone),
          email: val.email,
          address: val.address,
          password: val.password
        };
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
#container-dialog {
  width: 90%;
  height: 90%;
}
.el-dialog__wrapper .dialog-pub {
  width: 80%;
  margin-top: 0;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.el-dialog__wrapper {
  left: $sideBarWidth;
  top: 60px;
}
</style>
