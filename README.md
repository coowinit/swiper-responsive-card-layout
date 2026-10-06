# Demo Swiper Layout

一个基于 **HTML + CSS + Swiper** 实现的响应式图文轮播组件示例。

项目重点不是复杂动画，而是验证一套可以长期复用的前端结构：

- 一个页面可以同时放置多个轮播组件
- 每个组件使用独立 `section + 唯一 ID`
- 所有实例共用同一套 CSS 和 JavaScript
- 底部菜单数量不固定，可适配 2、3、4、8 等不同数量
- 桌面端采用“大图 + 浮动信息卡片 + 底部导航”
- 手机端自动切换为“横向卡片滑动”
- CSS 使用 `.demo` 作为组件命名空间，减少对页面其他样式的污染
- 描述过长时显示独立滚动条
- 后续可以方便迁移到 WordPress、PHP Loop、短代码或自定义模块中

当前正式版本：**v1.0.0**

---

## 1. 项目预览逻辑

### 桌面端

桌面端主要结构：

```text
标题

┌──────────────────────────────┐
│                              │
│          当前图片             │
│                    ┌──────────────┐
│                    │ 标题         │
│                    │ 描述内容     │
│                    │ 滚动条       │
│                    └──────────────┘
│                              │
└──────────────────────────────┘

───────────────────────────────
Tab 1   Tab 2   Tab 3 ... Tab N
                 ━━━━━
```

特点：

- 图片占主要视觉区域
- `.info` 信息卡片覆盖在图片右侧
- 底部 Tab 自动等分可用宽度
- 点击 Tab 切换对应 Slide
- Swiper 切换后同步更新 Tab 高亮
- 橙色 Marker 自动跟随当前菜单位置和宽度

---

## 2. 手机端

手机端不直接压缩桌面布局，而是切换为卡片模式：

```text
┌───────────────┐
│     图片      │
├───────────────┤
│ 标题          │
│ 描述          │
│ 滚动条        │
└───────────────┘  ┌──
                   │ 下一张
                   └──
```

特点：

- 单卡片显示
- 右侧露出下一张卡片
- 提示用户可以左右滑动
- 手机端隐藏底部 Tabs
- 信息区高度更紧凑
- 长描述仍然保留滚动能力

---

## 3. 技术栈

- HTML5
- CSS3
- JavaScript
- Swiper 11
- ResizeObserver

Swiper 通过 CDN 加载。

---

## 4. 项目结构

```text
demo-swiper-layout/
│
├─ index.html
├─ style.css
├─ script.js
├─ README.md
│
└─ images/
   ├─ demo-1.jpg
   ├─ demo-2.jpg
   ├─ demo-3.jpg
   ├─ demo-4.jpg
   ├─ demo-5.jpg
   ├─ demo-6.jpg
   ├─ demo-7.jpg
   └─ demo-8.jpg
```

---

## 5. 组件结构

每一组轮播都使用：

```html
<section id="唯一ID" class="demo">
    ...
</section>
```

例如：

```html
<section id="demo-tech-3" class="demo">
    ...
</section>

<section id="demo-tech-8" class="demo">
    ...
</section>
```

其中：

- `class="demo"`：公共组件命名空间
- `id`：当前组件唯一身份

新增一个轮播实例时，原则上只需要复制一个 `.demo` section 并修改 ID 和内容。

---

## 6. 类名约定

组件内部采用简洁类名：

```text
.demo
├─ .head
├─ .slider
├─ .slide
├─ .media
├─ .info
├─ .title
├─ .desc
├─ .tabs
├─ .tab
└─ .marker
```

CSS 始终通过：

```css
.demo .title {}
.demo .info {}
.demo .tab {}
```

限定作用范围。

不要单独写：

```css
.title {}
.info {}
.tab {}
```

这样可以降低对其他页面样式的影响。

---

## 7. 多实例初始化

JavaScript 会自动查找：

```js
document.querySelectorAll('.demo')
```

并逐个初始化。

每个 section 都拥有自己的：

- Swiper
- Tabs
- activeIndex
- Marker
- ResizeObserver

因此多个轮播同时存在时不会互相干扰。

---

## 8. 底部菜单宽度

底部菜单不写死百分比：

```css
.demo .tabs {
    display: flex;
}

.demo .tab {
    flex: 1 1 0;
    min-width: 0;
}
```

因此：

- 2 项自动等分
- 3 项自动等分
- 4 项自动等分
- 8 项自动等分

第一版主要针对常见的 2～8 项场景。

---

## 9. Slide 与 Tab 数量

建议始终保持：

```text
Slide 数量 = Tab 数量
```

例如：

```text
8 个 .swiper-slide
8 个 .tab
```

项目中已经加入开发提示。

如果数量不一致，浏览器控制台会输出警告信息，便于调试。

---

## 10. 信息卡片高度

当前 v1.0.0 使用：

### 桌面端

```css
.demo .info {
    min-height: 240px;
}
```

### 手机端

```css
.demo .info {
    min-height: 180px;
}
```

使用 `min-height` 而不是固定高度，可以保留一定布局弹性。

---

## 11. 描述滚动区域

描述区域默认以约 4 行文字为显示高度。

桌面端：

```css
.demo .desc {
    max-height: calc(
        1em *
        var(--desc-lh-desktop) *
        var(--desc-lines-desktop)
    );
    overflow-y: auto;
}
```

手机端：

```css
.demo .desc {
    max-height: calc(
        1em *
        var(--desc-lh-mobile) *
        var(--desc-lines-mobile)
    );
    overflow-y: auto;
}
```

默认变量：

```css
.demo {
    --desc-lines-desktop: 4;
    --desc-lines-mobile: 4;
}
```

效果：

- 3～4 行：正常显示
- 5～8 行或更多：出现滚动条
- 桌面端和手机端都支持滚动
- 已设置 WebKit 与 Firefox 滚动条样式

如需修改默认显示行数，只需要调整变量。

---

## 12. 响应式策略

项目不是维护两套 HTML。

同一套结构：

```text
Desktop
    ↓
大图 + 浮动信息卡片 + Tabs

Mobile
    ↓
卡片式 Swiper
```

响应式布局完全由 CSS 和 Swiper breakpoint 处理。

这样后续维护时只需要维护一份内容。

---

## 13. Swiper 配置思路

当前不启用自动轮播。

主要考虑：

- 内容需要阅读时间
- 自动切换容易打断用户
- 该组件更接近“内容浏览器”，而不是 Banner

当前交互方式：

- 桌面端点击 Tab
- 拖动 / 滑动 Slide
- 手机端触摸滑动

---

## 14. Marker 联动

底部橙色 Marker 不根据菜单数量手工计算百分比。

JavaScript 直接读取当前 Tab：

```js
activeTab.offsetWidth
activeTab.offsetLeft
```

因此不论是 3 项还是 8 项，都可以自动定位。

ResizeObserver 会在组件尺寸发生变化时重新计算 Marker 位置。

---

## 15. 新增一个轮播实例

复制一份：

```html
<section id="demo-new" class="demo">

    <h2 class="head">新的模块</h2>

    <div class="slider swiper">
        ...
    </div>

    <div class="tabs">
        ...
        <span class="marker"></span>
    </div>

</section>
```

然后：

1. 修改唯一 ID
2. 修改图片
3. 修改标题
4. 修改描述
5. 保持 Slide 与 Tab 数量一致

CSS 和 JavaScript 一般不需要修改。

---

## 16. 未来迁移到 WordPress

这个项目目前保持纯静态结构。

后续迁移到 WordPress 时，可以保持前端结构不变，只把静态 HTML 数据改为 PHP Loop 输出。

例如：

```text
静态 HTML
    ↓
WordPress CPT
    ↓
自定义字段
    ↓
PHP Loop
    ↓
输出同样的 .demo / .slide / .tab 结构
```

可以进一步应用到：

- WordPress 自定义文章类型
- 自定义字段
- Elementor 自定义模块
- Shortcode
- Gutenberg Block
- 企业官网研究方向
- 产品系列
- 技术能力
- 服务分类
- 案例分类
- 团队介绍

---

## 17. 设计原则

本项目目前坚持以下原则：

1. 一套 HTML，多端响应
2. 一个页面支持多个实例
3. CSS 使用组件命名空间
4. JS 在当前 section 内查找元素
5. 不依赖固定菜单数量
6. 不为了功能增加复杂度
7. 优先考虑后续 WordPress 迁移
8. 优先保证结构清晰和长期维护

---

## 18. 当前版本状态

### v1.0.0

已完成：

- 多实例组件架构
- Swiper 初始化
- 桌面端大图布局
- 右侧浮动信息卡片
- 底部动态 Tabs
- Marker 联动
- 2～8 项自动布局能力
- 手机端卡片模式
- 手机端下一张露出效果
- 描述区滚动条
- 桌面 / 手机独立最小高度
- ResizeObserver
- Slide / Tab 数量检查
- CSS 命名空间隔离
- README 文档整理

当前版本可以作为静态组件正式封板。

---

## 19. License

如果作为个人学习、内部项目或企业站组件使用，可以根据实际仓库需求补充 License。

如果准备公开发布，可以考虑：

```text
MIT License
```
