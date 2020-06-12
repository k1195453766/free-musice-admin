<!--  -->
<template>
  <div>
    <el-container>
      <el-aside :width="width">
        <side-bar class="sidebar-container" :isCollapse="isCollapse"></side-bar>
      </el-aside>

      <el-container class="el-container">
        <el-header>
          <nav-bar @updateCollapse="updateCollapse" />
          <!-- <i class="el-icon-s-fold" @click="updataCollapse()"></i> -->
        </el-header>

        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
export default {
  name: "Layout",
  data() {
    return {
      isCollapse: false,
      width: "210px"
    };
  },
  computes: {
    // updataCollapse() {
    //   return !this.isCollapse;
    // }
  },
  components: {
    SideBar,
    NavBar
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
    }
  }
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
  margin-top: 60px;
  z-index: -9;
}
body > .el-container {
  margin-bottom: 40px;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  padding: 0;
  position: fixed;
  width: 100%;
}
</style>
