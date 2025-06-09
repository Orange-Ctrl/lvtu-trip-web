import defaultImg from '@/assets/img/home/full-screen-loading.gif'

export default {
  mounted(el, binding) {
    // 1. 设置默认图片
    el.src = defaultImg

    // 2. 创建 IntersectionObserver 实例
    const observer = new IntersectionObserver(([{ isIntersecting }]) => {
      if (isIntersecting) {
        // 3. 图片进入可视区域，加载真实图片
        el.src = binding.value
        // 4. 停止观察
        observer.unobserve(el)
      }
    }, {
      // 5. 配置选项
      threshold: 0.01 // 当图片有 1% 进入可视区域时触发
    })

    // 6. 开始观察
    observer.observe(el)
  }
} 