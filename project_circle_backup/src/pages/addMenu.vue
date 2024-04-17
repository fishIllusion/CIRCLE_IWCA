<template>
     <!-- <Teleport to="body"> -->
     <div class="gr_container" ref="container">
          <div class="center justOpen">
               <section>
                    <div class="func invite justOpen" @click="openMenu">Invite People</div>
                    <div class="func justOpen">Copy Link</div>
               </section>
               <div class="splite"></div>
               <section>
                    <div class="func delete justOpen">Delete the Group</div>
               </section>
          </div>
     </div>
     <!-- </Teleport> -->
     <inviteDialog />
</template>

<script>
import $bus from '@/utils/event_bus'

export default {
     setup() {
          const openMenu = () => {
               $bus.emit('showDialog')
          }

          return { openMenu }
     }
}
</script>

<style lang="less" scoped>
.gr_container {
     z-index: 999;
     width: 180px;
     // height: 230px;
     min-height: 100px;
     background-color: rgb(17, 18, 20);
     border-radius: 4px;
     display: flex;
     justify-content: center;
     align-items: center;
     padding: 10px 0;
     .center {
          width: 90%;
          // height: 95%;
          // border: 1px solid #fff;
          section {
               width: 100%;
               .func {
                    font-family: var(--nomal-font_family);
                    font-size: 14px;
                    width: 100%;
                    height: 30px;
                    color: #c2bfbf;
                    padding-left: 10px;
                    line-height: 30px;
                    cursor: pointer;
                    transition: .1s;
                    &:hover {
                         background-color: rgb(87, 100, 242);
                         color: #fff;
                         border-radius: 3px;
                    }
               }
              
               .invite {
                    color: rgb(87, 100, 242);
               }
               .delete {
                    color: rgb(217, 23, 23);
               }
          }
          .splite {
                    width: 100%;
                    height: 1px;
                    background-color: #fff;
                    margin: 8px 0;
               }
     }
}
</style>