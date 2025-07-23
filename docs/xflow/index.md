---
order: 0
title: 介绍
mobile: false
group: 
  title: 使用教程
  order: 0
---

<div style="display:flex;align-items:center;margin-bottom:24px">
  <img src="https://img.alicdn.com/tfs/TB17UtINiLaK1RjSZFxXXamPFXa-606-643.png" alt="logo" width="48px"/>
  <span style="font-size:30px;font-weight:600;display:inline-block;margin-left:12px">XFlow</span>
</div>
<p style="display:flex;justify-content:space-between;width:440px">
  <a href="https://www.npmjs.com/package/@xrenders/xflow" target="_blank">
    <img alt="npm" src="https://img.shields.io/npm/v/@xrenders/xflow.svg?maxAge=3600&style=flat-square">
  </a>
  <a href="https://npmjs.org/package/@xrenders/xflow" target="_blank">
    <img alt="NPM downloads" src="https://img.shields.io/npm/dm/@xrenders/xflow.svg?style=flat-square">
  </a>
  <a href="https://npmjs.org/package/@xrenders/xflow" target="_blank">
    <img alt="NPM all downloads" src="https://img.shields.io/npm/dt/@xrenders/xflow.svg?style=flat-square">
  </a>
  <a>
    <img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square">
  </a>
</p>
画布流程编排解决方案

## 简介
  XFlow 是一个基于 ReactFlow 底层能力和 Dify 交互体验实现的新一代开箱即用流程画布插件。它旨在为中后台项目提供统一、高效、易用的流程画布解决方案。

## 特点

* **性能卓越**：基于ReactFlow，提供高性能的图形渲染和交互能力。
* **XRender 生态**：配置面板部分集成FormRender，以最小成本快速生成配置面板。
* **快速上手**：提供丰富的预设配置和组件，大幅减少开发工作量。
* **灵活定制**：支持自定义节点、配置面板和节点组件，满足各种复杂业务需求。
* **操作便捷**：支持缩放、撤销/重做、自动布局、全屏展示等功能。

## 效果预览

<div class="preview-container">
  <div class="preview-card">
    <div class="preview-image" >
      <img src="https://img.alicdn.com/imgextra/i3/O1CN011ykg541qvcNWNDpni_!!6000000005558-0-tps-2094-1172.jpg" alt="预览图1" />
    </div>
    <div class="preview-title">基础流程图</div>
    <!-- <div class="preview-desc">支持基础的节点和连线操作</div> -->
  </div>
  <div class="preview-card">
    <div class="preview-image">
      <img src="https://img.alicdn.com/imgextra/i1/O1CN015jBSE71Lbh3o3zk78_!!6000000001318-0-tps-2100-1170.jpg" alt="预览图2" />
    </div>
    <div class="preview-title">自定义节点</div>
    <!-- <div class="preview-desc">支持自定义节点样式和交互</div> -->
  </div>
  <div class="preview-card">
    <div class="preview-image" >
      <img src="https://img.alicdn.com/imgextra/i2/O1CN01Y47YvN1s8GwCKZBtS_!!6000000005721-0-tps-2122-1198.jpg" alt="预览图3" />
    </div>
    <div class="preview-title">最佳实践</div>
    <!-- <div class="preview-desc">支持节点配置面板和日志展示</div> -->
  </div>
</div>

<style>
.preview-container {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  margin: 24px 0;
}

.preview-card {
  flex: 1;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.preview-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.preview-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  cursor: pointer;
}

.preview-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.preview-image:hover img {
  transform: scale(1.5);
}

.preview-title {
  padding: 16px;
  font-size: 16px;
  font-weight: 500;
  color: #1f1f1f;
}

.preview-desc {
  padding: 0 16px 16px;
  font-size: 14px;
  color: #666;
}

.preview-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  z-index: 9999;
  display: none;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.preview-modal.active {
  display: flex;
  opacity: 1;
}

.preview-modal-content {
  max-width: 90vw;
  max-height: 90vh;
}

.preview-modal-content img {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
}
</style>


## 功能设计
<div class="feature-table">
  <div class="feature-row">
    <div class="feature-name">节点菜单</div>
    <div class="feature-content">
      <div class="feature-desc">
        通过 JSON 配置的方式渲染画布节点菜单，支持节点组展示。每个节点包含标题、类型、描述和图标等信息，方便用户快速识别和使用不同类型的节点。
      </div>
      <div class="feature-image">
        <img src="https://img.alicdn.com/imgextra/i3/O1CN01rfAF9e28eMXX0fybx_!!6000000007957-0-tps-1896-1182.jpg" alt="节点菜单" >
      </div>
    </div>
  </div>

   <div class="feature-row">
    <div class="feature-name">节点展示</div>
    <div class="feature-content">
      <div class="feature-desc">
        <div class="desc-item">默认情况下节点只会展示节点名称、描述信息。</div>
        <div class="desc-item">节点需要额外展示内容，可以通过配置 nodeWidget 组件来实现。</div>
      </div>
      <div class="feature-images">
       <div class="feature-image" >
          <img src="https://img.alicdn.com/imgextra/i3/O1CN01f6WFZg1D9HZ2ZjP1j_!!6000000000173-0-tps-1448-766.jpg" alt="节点展示2" />
        </div>
        <div class="feature-image">
          <img src="https://img.alicdn.com/imgextra/i2/O1CN01utg9VL1SBJYfXc6Na_!!6000000002208-0-tps-1892-1198.jpg" alt="节点展示1" />
        </div>
      </div>
    </div>
  </div>

  <div class="feature-row">
    <div class="feature-name">节点配置</div>
    <div class="feature-content">
      <div class="feature-desc">
        提供 FormRender Schema 协议配置和自定义配置组件两种方式，支持节点数据的灵活配置。通过可视化界面，用户可以轻松设置节点参数和属性。
      </div>
      <div class="feature-images">
         <div class="feature-image node-show-img">
          <img src="https://img.alicdn.com/imgextra/i1/O1CN01ycuxbe1BsVROZAleA_!!6000000000001-0-tps-3102-1184.jpg" alt="节点展示1" />
        </div>
       <div class="feature-image " >
          <img src="https://img.alicdn.com/imgextra/i4/O1CN01dn5UGS1sXSikBsLnb_!!6000000005776-0-tps-606-672.jpg" alt="节点展示2" />
        </div>
        <div class="feature-image">
          <img src="https://img.alicdn.com/imgextra/i4/O1CN01Ia04jk1MznWGmzw4S_!!6000000001506-0-tps-604-340.jpg" alt="节点展示1" />
        </div>
      </div>
    </div>
  </div>

  <div class="feature-row">
    <div class="feature-name">内置节点</div>
    <div class="feature-content">
      <div class="feature-desc">
        内置条件节点和并行节点，支持多个连接点。条件节点用于流程分支控制，并行节点用于并发任务处理，无需额外开发即可使用。
        内置注释节点，方便添加节点注释。
      </div>
        <div class="feature-image node-show-img" >
        <img src="https://img.alicdn.com/imgextra/i3/O1CN01WKpbb01wbMYckbyOr_!!6000000006326-0-tps-3158-1234.jpg" alt="内置节点" />
      </div>
    </div>
  </div>

   <div class="feature-row">
    <div class="feature-name">节点功能</div>
    <div class="feature-content">
      <div class="feature-desc">
        支持节点的复制、删除、粘贴功能
      </div>
        <div class="feature-image" >
        <img src="https://img.alicdn.com/imgextra/i4/O1CN01UsgKOf1GoS0r7L6PA_!!6000000000669-0-tps-916-596.jpg" alt="内置节点" />
      </div>
    </div>
  </div>

   <div class="feature-row">
    <div class="feature-name">节点状态和节点日志</div>
    <div class="feature-content">
      <div class="feature-desc">
        支持展示节点的状态，自定义节点状态，以及显示节点的运行日志
      </div>
        <div class="feature-image" >
        <img src="https://img.alicdn.com/imgextra/i1/O1CN01m3yNGv1rpx5x3GKAQ_!!6000000005681-0-tps-2112-1192.jpg" alt="内置节点" />
      </div>
    </div>
  </div>

  <div class="feature-row">
    <div class="feature-name">画布操作</div>
    <div class="feature-content">
      <div class="feature-desc">
        支持画布缩放、撤销/重置、节点添加、鼠标模式切换、节点整理、全屏展示、画布快捷键等功能。提供丰富的画布操作工具，提升用户体验。
      </div>
       <div class="feature-image node-show-img">
        <img src="https://img.alicdn.com/imgextra/i3/O1CN01Pcb1wd1RKe0hVF7nG_!!6000000002093-0-tps-3172-1234.jpg" alt="画布操作" />
      </div>
    </div>
  </div>
</div>

<style>
.feature-table {
  margin: 24px 0;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  overflow: hidden;
}

.feature-row {
  display: flex;
  border-bottom: 1px solid #e8e8e8;
}

.feature-row:last-child {
  border-bottom: none;
}

.feature-name {
  width: 200px;
  padding: 24px;
  background: #fafafa;
  font-weight: 500;
  color: #1f1f1f;
  display: flex;
  align-items: center;
}

.feature-content {
  flex: 1;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
}

.feature-images {
  display: flex;
  gap: 24px;
  width: 100%;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.feature-image {
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  width: 400px;
  /* height: 300px; */
  display: flex;
  align-items: center;
  justify-content: center;
  /* background: #fafafa; */
}

.node-show-img{
   width: 800px;
}

.feature-image img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.feature-image:hover img {
  transform: scale(1.05);
}

.feature-desc {
  color: #666;
  line-height: 1.6;
  width: 100%;
}

.desc-item {
  margin-bottom: 8px;
}

.desc-item:last-child {
  margin-bottom: 0;
}
</style>


