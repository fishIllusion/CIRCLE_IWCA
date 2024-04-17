import { h, render } from 'vue'
import Menu from '@/pages/addMenu.vue'
export function openContextMenu() {
     let isOpen = false
     const containerEl = document.createElement('div')
     containerEl.style.position = 'absolute'
     containerEl.style.top = '0px'
     //创建虚拟DOM节点
     const vnode = h(Menu)
     
     function openMenu(e) {
          closeMenu()
          let X = e.clientX
          let Y = e.clientY
          // console.log(X, Y);
          containerEl.style.top = Y + 'px'
          containerEl.style.left = X + 'px'
          const scope = document.getElementById('testPC')
          //将刚刚创建的虚拟DOM节点渲染到contianerEl中
          render(vnode, containerEl)
          scope.appendChild(containerEl)
          isOpen = true
     }

     function closeMenu() {
          if (isOpen) {
               // console.log(isOpen);
               const scope = document.getElementById('testPC')
               render(null, containerEl)
               scope.removeChild(containerEl)
               isOpen = false
          }
     }

     function closeDirectly() {
          const scope = document.getElementById('testPC')
          // console.log(document);
          // console.log(scope);
          const containerEl = document.createElement('div')
               render(null, containerEl)
               scope.removeChild(containerEl)
               isOpen = false
     }
     return {
          isOpen,
          openMenu,
          closeMenu,
          closeDirectly
     }
}