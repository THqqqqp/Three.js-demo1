<script setup>
import * as THREE from 'three';
import {onMounted, ref} from "vue";

const containerRef = ref();
// 创建场景
const scene = new THREE.Scene();
// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-10, 20, 20)
camera.lookAt(scene.position)
// 创建渲染器
const renderer = new THREE.WebGLRenderer();
// 透明背景
renderer.setClearColor(new THREE.Color(0x000000), 0);
// 创建坐标轴
const axes = new THREE.AxesHelper(90);
scene.add(axes);

// 球体模型
const sphereGeometry = new THREE.SphereGeometry(10, 20, 20);
const sphereMaterial = new THREE.MeshBasicMaterial({color: 0x7777ff, wireframe: true});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

// 正方体模型，物理材质
const cubeGeometry = new THREE.BoxGeometry(20, 20, 20, 1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({color: '#222222', wireframe: true});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(40, 0, 0);
scene.add(cube);

// 平面体，放在y正半轴上
const planeGeometry = new THREE.PlaneGeometry(50, 50);
const planeMaterial = new THREE.MeshBasicMaterial({color: '#222222', side: THREE.DoubleSide});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -1 * Math.PI / 2;
plane.position.set(0, 0, 0);
scene.add(plane);


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
  }
}
</style>
