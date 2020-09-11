<!--  -->
<template>
  <div>
    <el-container>
      <el-aside :width="width" class="hidden-xs-only">
        <side-bar class="sidebar-container" :isCollapse="isCollapse"></side-bar>
      </el-aside>

      <el-container class="el-container">
        <el-header>
          <nav-bar
            @updateCollapse="updateCollapse"
            @handleCommand="handleCommand"
            @updateCollapsePhone="updateCollapsePhone"
          />
          <nav-bar-phone :show3="isCollapsePhone" @closeCollapsePhone="closeCollapsePhone"></nav-bar-phone>
        </el-header>

        <el-main>
          <transition>
            <router-view />
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
import NavBarPhone from "./components/NavBarPhone";
export default {
  name: "Layout",
  data() {
    return {
      isCollapse: false,
      isCollapsePhone: false,
      width: "210px",
    };
  },
  computes: {
    // updataCollapse() {
    //   return !this.isCollapse;
    // }
  },
  components: {
    SideBar,
    NavBar,
    NavBarPhone,
  },
  methods: {
    updateCollapse(params) {
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse) {
        document.getElementsByClassName("sidebar-container")[0].style.width =
          "64px";
        this.width = "64px";
      } else {
        document.getElementsByClassName("sidebar-container")[0].style.width =
          "210px";
        this.width = "210px";
      }
    },

    updateCollapsePhone(params) {
      console.log(this.isCollapsePhone);
      this.isCollapsePhone = !this.isCollapsePhone;
    },

    closeCollapsePhone() {
      this.isCollapsePhone = false;
    },

    handleCommand(params) {
      if (params.index == 0) {
        // 退出
        this.$store
          .dispatch("loginOut")
          .then((res) => {
            if (res.status == 1) {
              window.sessionStorage.clear();
              this.$router.replace("/");
              location.reload();
            }
          })
          .catch((e) => {
            console.log("loginOut Error");
          });
      } else if (params.index == 1) {
        // 查看个人信息
        this.$router.push("/profile");
      }
    },
  },
};
</script>

<style lang="scss">
@import "~@/styles/variables.scss";
.sidebar-container {
  transition: width 0.23s;
  width: $sideBarWidth;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
  background: rgb(84, 92, 100);
}
.el-menu {
  border-right: none;
}
.el-main {
  padding: 0;
}
body > .el-container {
  margin-bottom: 40px;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  padding: 0 0;
  width: 100%;
  z-index: 9;
  right: 0px;
  left: 0;
  position: relative;
}
</style>
