<!--  -->
<template>
  <div>
    <h1>欢迎来到XXX后台管理系统</h1>
    <h3>{{title}} --- {{content}}</h3>
    <button id="btn" @click="clickOn()" type="primary">主要按钮</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "Index",
  data() {
    return {};
  },

  methods: {
    clickOn() {
      alert("点击了按钮");
    }
  },
  computed: {
    ...mapState("userModule", ["title", "content"])
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
