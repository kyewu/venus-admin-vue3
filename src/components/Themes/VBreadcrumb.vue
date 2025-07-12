<template>
  <el-breadcrumb class="ml-4" :separator-icon="ArrowRight">
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

const ArrowRight = () => <i class="i-ep:arrow-right"></i>

function getBreadcrumbData() {
  if (route && route.matched?.length) {
    breadcrumbData.value = route.matched.filter(
      (item) => item.name && item.meta && item.meta.title,
    )
  }
}

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
