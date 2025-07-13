<template>
  <el-breadcrumb ref="breadcrumbRef" class="ml-4" :separator-icon="ArrowRight">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbData"
        :key="item.name"
        :to="{ path: item.name }"
        :data-index="index"
        >
        <span>
          {{ $t(item.meta?.title) }}
        </span>
        </el-breadcrumb-item
      >
    </transition-group>
  </el-breadcrumb>
</template>

<script setup lang="tsx">
// import { routes } from 'vue-router/auto-routes'
// import gsap from 'gsap'
import { useRoute } from 'vue-router'
const route = useRoute()
const breadcrumbData = ref<any>([])
const localData = ref()
const breadcrumbRef = ref()
const ArrowRight = () => <i class="i-ep:arrow-right"></i>

function getBreadcrumbData() {
  if (route && route.matched?.length) {
    breadcrumbData.value = route.matched.filter(
      (item) => item.name && item.meta && item.meta.title,
    )
    localData.value = route.matched.filter(
      (item) => item.name && item.meta && item.meta.title,
    )
  }
}

useResizeObserver(breadcrumbRef, (entires) => {
  const { height } = entires[0].contentRect
  if (height > 14) {
    breadcrumbData.value.shift()
  }
})

const oldWidth = ref(-1)

const fn = useThrottleFn((entries) => {
  const { width } = entries[0].contentRect
  if (oldWidth.value === -1) {
    oldWidth.value = width
  }
  if (width > oldWidth.value) {
    // 说明屏幕在变宽
    if (breadcrumbRef.value) {
      if (breadcrumbRef.value.$el.offsetHeight <= 14) {
        let item
        // 留在页面上的数组里面还有元素
        if (breadcrumbData.value.length > 0) {
          const index = localData.value.findIndex((item) => item === breadcrumbData.value[0])
          item = localData.value[index - 1 <= 0 ? 0 : index - 1]
        } else {
          // 页面上已经无元素，那么应该从最后一个元素添加起
          item = localData.value[localData.value.length - 1]
        }
        // 判断，是否在页面上已经有了该元素，如果有，则不再添加
        if (breadcrumbData.value.indexOf(item) === -1) {
          breadcrumbData.value.unshift(item)
        }
      }
    }
  }
  oldWidth.value = width
}, 500)
useResizeObserver(document.body, fn)

// const onEnter = (el, done) => {
//   gsap.fromTo(el, {
//     opacity: 0,
//     transitionX: 30,
//   },{
//    opacity: 1,
//    transitionX: 0,
//    delay: el.dataset.index * 0.15,
//    onComplete: done
//   })
// }

watch(
  route,
  () => {
    getBreadcrumbData()
  },
  { immediate: true },
)
</script>

<style scoped lang="scss">
.breadcrumb-move, /* apply transition to moving elements */
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s ease;
}

.breadcrumb-enter-from,
.breadcrumb-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.breadcrumb-leave-active {
  position: absolute;
}
</style>
