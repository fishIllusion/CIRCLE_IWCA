import { inject, provide, ref, watchEffect } from "vue";
// import gsap from 'gsap';
//开启弹窗
export function openDialog(test) {
     const isOpen = ref(false)
     provide(test, isOpen)

     function openAction() {
          isOpen.value = true
     }

     return { openAction }
}

//关闭弹窗
export function closeDialog(test) {
     const visible = ref(false)
     const show = inject(test, ref(false))
     watchEffect(() => {
          visible.value = show.value
     })

     function close(refs, tween, back) {
          visible.value = false
          show.value = false
          refs.svg.style.opacity = '1'
          refs.loadImg.src = ''
          tween.to('#container', { duration: .2, height: 300, ease: 'power0' })
          back.to('#addPanel', { duration: .2, x: 0, ease: 'power0' })
     }

     return { visible, close }
}

//开启邀请弹窗
export function openInvite(test) {
     const isOpen = ref(false)
     provide(test, isOpen)

     function openAction() {
          isOpen.value = true
     }

     return { openAction }
}

//关闭邀请弹窗
export function closeInvite(test) {
     const visible = ref(false)
     const show = inject(test, ref(false))
     watchEffect(() => {
          visible.value = show.value
     })

     function close(refs, tween, back) {
          visible.value = false
          show.value = false
          // refs.svg.style.opacity = '1'
          // refs.loadImg.src = ''
          tween.to('#container', { duration: .2, ease: 'power0' })
          back.to('#addPanel', { duration: .2, x: 0, ease: 'power0' })
     }

     return { visible, close }
}