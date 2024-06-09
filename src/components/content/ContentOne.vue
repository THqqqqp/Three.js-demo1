<script setup>
import * as THREE from 'three';
import {onMounted, ref} from "vue";

const containerRef = ref();
// 创建场景
const scene = new THREE.Scene();
// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-10, 40, 30)
camera.lookAt(scene.position)
// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(new THREE.Color(0xeeeeee));
// 创建坐标轴
const axes = new THREE.AxesHelper(40);
scene.add(axes);


onMounted(() => {
  // 设置渲染器的大小
  renderer.setSize(containerRef.value?.clientWidth, containerRef?.value.clientHeight);
  // 渲染
  containerRef.value?.appendChild(renderer.domElement);

  renderer.render(scene, camera)
})
</script>

<template>
  <div id="root">
    <h2>一、创建一个基本的three坐标系</h2>
    <div ref="containerRef" class="container"></div>
  </div>
</template>

<style lang="scss" scoped>
#root {
  padding: 10px;
  height: 500px;

  .container {
    width: 100%;
    height: 100%;
    border: 1px solid blue;
  }
}
</style>
