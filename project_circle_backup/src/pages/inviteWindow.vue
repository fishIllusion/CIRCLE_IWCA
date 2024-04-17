<template>
     <div class="container">
          <div class="panel">
               <div class="center">
                    <img src="../assets/background/background.png" alt="">
                    <div class="text">
                         <span class="inviteText">nickname(uname)invited you to join</span>
                         <span class="serverName">serverName</span>
                    </div>
                    <button>Accept Invite</button>
               </div>
          </div>
     </div>
</template>

<script>
import router from '@/router';
import base64 from 'base-64'
export default {
     setup() {
          let mes = router.currentRoute.value.params.inviteMes
          let decode = base64.decode(String(mes))
          console.log(decode.sid);
     }
}
</script>

<style lang="less" scoped>
.container {
     width: 100vw;
     height: 100vh;
     background-image: url('../assets/SVGS/inviteBcg.svg');
     background-repeat: no-repeat;
     background-size: cover;
     position: relative;

     .panel {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: rgb(49, 51, 56);
          width: 480px;
          height: 335px;
          border-radius: 5px;
          display: flex;
          justify-content: center;
          align-items: center;

          .center {
               width: 85%;
               height: 70%;
               // border: 1px solid #fff;
               display: flex;
               flex-direction: column;
               justify-content: space-between;
               align-items: center;
               img {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
               }
               .text {
                    span {
                         display: block;
                         text-align: center;
                    }
                    .inviteText {
                         color: #abaaaa;
                         font-family: var(--nomal-font_family);
                    }
                    .serverName {
                         color: #fff;
                         font-family: var(--nomal-font_family);
                         font-size: 24px;
                    }
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
               }
               button {
                    height: 44px;
                    width: 100%;
                    border-radius: 3px;
                    border: none;
                    color: #fff;
                    background-color: rgb(87, 100, 243);
                    font-family: var(--nomal-font_family);
                    // font-size: 17px;
                    transition: .3s;
                    &:hover {
                         cursor: pointer;
                         background-color: rgb(67, 77, 189);
                    }
               }
          }
     }
}
</style>