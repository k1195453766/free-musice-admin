<!--  -->
<template>
  <div>
    <h1>欢迎来到XXX后台管理系统</h1>
    <button id="btn" @click="function a(){alert('12314')}" type="primary">主要按钮</button>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {};
  },
  methods: {
    clickOn() {
      alert("14124");
    }
  }
};
</script>

<style  scoped>
.background {
  width: 90%;
  height: 1000px;
  background: turquoise;
}
</style>
