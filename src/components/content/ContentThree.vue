<script setup>
import * as THREE from 'three';
import {onMounted, ref} from "vue";
//引入性能监视器stats.js
import Stats from 'three/addons/libs/stats.module.js';


const containerRef = ref();
// 创建场景
const scene = new THREE.Scene();
// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-15, 50, 20)
camera.lookAt(scene.position)
// 创建渲染器
const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.shadowMap.enabled = true

// 创建坐标轴
const axes = new THREE.AxesHelper(90);
scene.add(axes);

// 球体模型
const sphereGeometry = new THREE.SphereGeometry(10, 20, 20);
const sphereMaterial = new THREE.MeshLambertMaterial({
  color: '#ff0000',
  wireframe: false
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(0, 10, 0);
sphere.castShadow = true;
scene.add(sphere);

// 正方体模型，物理材质
const cubeGeometry = new THREE.BoxGeometry(10, 10, 10, 1, 1, 1);
const cubeMaterial = new THREE.MeshLambertMaterial({
  color: '#222222',
  wireframe: false
});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(25, 5, 0);
cube.castShadow = true;
scene.add(cube);

// 平面体，放在水平面
const planeGeometry = new THREE.PlaneGeometry(100, 50);
const planeMaterial = new THREE.MeshLambertMaterial({
  color: '#bec0b2',
  side: THREE.DoubleSide
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.set(0, 0, 0);
plane.rotation.x = Math.PI / 2;
plane.receiveShadow = true
scene.add(plane);

// 添加灯光
const pointLight = new THREE.PointLight('#ffffff', 1, 0, 0);
pointLight.position.set(-20, 100, -10);
pointLight.castShadow = true;
scene.add(pointLight);

// 添加环境光
const ambientLight = new THREE.AmbientLight('#ffffff', 2);
scene.add(ambientLight);

// 动画
let step = 0;

const stats = new Stats()
//stats.domElement:web页面上输出计算结果,一个div元素，
document.body.appendChild(stats.domElement);

function renderScene() {
  stats.update();
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.02;
  cube.rotation.z += 0.02;

  step += 0.001
  // sphere.position.x = -20 + (10 * (Math.cos(step)));
  // sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)));

  sphere.position.x = (10 * (Math.sin(step)));
  sphere.position.z = (10 * (Math.cos(step)));

  requestAnimationFrame(renderScene);
  renderer.render(scene, camera);
}

renderScene()

onMounted(() => {
  // 设置渲染器的大小
  renderer.setSize(containerRef.value?.clientWidth, containerRef?.value.clientHeight);
  // 渲染
  containerRef.value?.appendChild(renderer.domElement);

  // renderer.render(renderer, camera)
})
</script>

<template>
  <div id="root">
    <h2>三、根据动画渲染不同的阴影效果</h2>
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
