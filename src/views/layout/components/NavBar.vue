<!--  -->
<template>
  <div>
    <i class="el-icon-s-fold" @click="onCollapse()"></i>

    <div class="profile">
      <div class="block">
        <el-avatar class="avatar" :size="40" :src="circleUrl"></el-avatar>
        <!-- <strong>{{getName}}</strong> -->
        <el-dropdown class="dropdown" @command="handleCommand">
          <span class="el-dropdown-link">
            {{getName}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">个人信息</el-dropdown-item>
            <el-dropdown-item command="0">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    };
  },
  computed: {
    // 获取姓名
    getName() {
      return JSON.parse(window.sessionStorage.getItem("userInfo")).username;
    },
    // 获取头像
    getAvatar() {}
  },
  methods: {
    // 左上角收缩菜单
    onCollapse() {
      this.$emit("updateCollapse");
    },
    // 我的操作
    handleCommand(command) {
      this.$emit("handleCommand", { index: command });
    }
  }
};
</script>

<style lang="scss">
.el-dropdown-link {
  cursor: pointer;
}
.block {
  height: 60px;
  text-align: left;
  .avatar {
    margin-top: 10px;
  }
  .dropdown {
    margin-left: 10px;
    float: right;
    font-size: 16px;
  }
}
.profile {
  position: absolute;
  right: 10px;
  height: 60px;
}
.el-header .el-icon-s-fold {
  font-size: 30px;
  line-height: 60px;
  position: absolute;
  left: 10px;
}
</style>

