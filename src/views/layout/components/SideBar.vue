<!--  -->
<template>
  <div>
    <el-menu
      router
      :default-active="getRoute"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isCollapse"
    >
      <el-menu-item>
        <router-link class="sidebar-logo-link" to="/welcome">
          <img :src="logo" class="sidebar-logo" />
          <h1 class="sidebar-title">{{ title }}</h1>
        </router-link>
      </el-menu-item>

      <template v-for="(item ,index) in routes">
        <template v-if="!item.meta.hidden">
          <!-- 当前路由有子路由的 -->
          <template v-if="item.children&&item.children.length>0">
            <el-submenu :index="item.path" :key="index" :popper-class="item.meta.title">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span>{{item.meta.title}}</span>
              </template>
              <el-menu-item-group v-for="(child ,key) in item.children" :key="key">
                <template v-if="!child.meta.hidden">
                  <el-menu-item v-if="child.meta.affix" :index="child.path">{{child.meta.title}}</el-menu-item>
                </template>
              </el-menu-item-group>
            </el-submenu>
          </template>
          <!-- 当前路由没有子路由 -->
          <template v-else>
            <el-menu-item v-if="item.meta.affix" :key="index" :index="item.path">
              <i class="el-icon-user"></i>
              <span slot="title">{{item.meta.title}}</span>
            </el-menu-item>
          </template>
        </template>
      </template>

      <!-- <el-menu-item index="/welcome">
        <i class="el-icon-menu"></i>
        <span slot="title">Welcome</span>
      </el-menu-item>

      <el-menu-item index="/home">
        <i class="el-icon-user"></i>
        <span slot="title">首页</span>
      </el-menu-item>

      <el-submenu index="/user" popper-class="用户列表">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/user">用户列表</el-menu-item>
          <el-menu-item index="/profile">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-menu-item index="/config">
        <i class="el-icon-setting"></i>
        <span slot="title">系统设置</span>
      </el-menu-item>

      <el-menu-item index="/profile">
        <i class="el-icon-setting"></i>
        <span slot="title">个人设置</span>
      </el-menu-item>-->
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      title: "后台管理系统",
      logo:
        "https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png",
      routes: JSON.parse(window.sessionStorage.getItem("routes"))
    };
  },
  props: {
    isCollapse: Boolean
  },
  created() {
    console.log("当前路由", this.$route);
    console.log(
      "所有路由",
      JSON.parse(window.sessionStorage.getItem("routes"))
    );
  },
  computed: {
    getRoute() {
      return this.$route.path == "/layout" ? "/welcome" : this.$route.path;
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style  scoped>
.sidebar-logo {
  width: 32px;
  height: 32px;
  vertical-align: middle;
  margin-right: 12px;
}
.sidebar-title {
  display: inline-block;
  margin: 0;
  color: #fff;
  font-weight: 600;
  line-height: 50px;
  font-size: 14px;
  font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
  vertical-align: middle;
}
.sidebar-logo-link {
  height: 100%;
  width: 100%;
}
</style>
