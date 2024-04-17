<template>
     <div class="main-container">
          <header>
               <div class="top">
                    <div id="logoEl" class="logo" ref="logo">
                         <img src="../assets//logo/logo.png" alt="logo" class="logo">
                         <span>Circle</span>
                    </div>
                    <ul id="navsEl" class="navs">
                         <li><span>Download</span></li>
                         <li><span>Nitro</span></li>
                         <li><span>Safety</span></li>
                         <li><span>Privacy</span></li>
                         <li><span>Convenience</span></li>
                    </ul>
                    <div id="openEl" class="open openUp" v-if="whetherShow" @click="goChannels">Open Circle</div>
                    <div id="openEl" class="open openUp" v-if="!whetherShow" @click="goLogin">Login</div>
                    <div class="loginAndMenu" id="openEl">
                         <div class="open">Open Circle</div>
                         <img src="../assets/init-icon-pics/menu.png" alt="" @click="openMenu">
                    </div>
               </div>
               <div class="picAndText">
                    <div id="picAndTextEl" class="text">
                         <span>IMAGING A PLACE</span>
                         <p>where you can belong to a school club, a gaming group, or a worldwide art community.
                              Where just you and a handful of friends can spend time together. A place that makes it easy to
                              talk every day and hang out more often.</p>
                    </div>
                    <button id="picAndTextEl-button" @click="goChannels">Open Circle in Your Browser</button>
                    <!-- <div class="photo"><img src="../assets/background/background.png" alt=""></div> -->
               </div>
          </header>
          <section>
               <div class="part">
                    <div class="together">
                         <img src="../assets/homeSVG/1.svg" alt="">
                         <div class="text">
                              <span class="up">Create an invite-only place where you belong</span>
                              <p>Discord servers are organized into topic-based channels where you can collaborate, share,
                                   and just talk about your day without clogging up a group chat.</p>
                         </div>
                    </div>

               </div>
               <div class="part">
                    <div class="together">
                         <div class="text">
                              <span class="up">Where hanging out is easy</span>
                              <p>Grab a seat in a voice channel when you’re free. Friends in your server can see you’re
                                   around and instantly pop in to talk without having to call.</p>
                         </div>
                         <img src="../assets/homeSVG/2.svg" alt="">
                    </div>

               </div>
               <div class="part">
                    <div class="together">
                         <img src="../assets/homeSVG/2.svg" alt="">
                         <div class="text">
                              <span class="up">Where hanging out is easy</span>
                              <p>Grab a seat in a voice channel when you’re free. Friends in your server can see you’re
                                   around and instantly pop in to talk without having to call.</p>
                         </div>
                    </div>

               </div>
               <div class="part">
                    <div class="together">
                         <img src="../assets/homeSVG/3.svg" alt="">
                         <div class="text">
                              <span class="up">From few to a fandom</span>
                              <p>Get any community running with moderation tools and custom member access. Give members
                                   special powers, set up private channels, and more.</p>
                         </div>

                    </div>
               </div>
               <div class="part part4">
                    <div class="together">
                         <div class="text">
                              <span class="up">RELIABLE TECH FOR STAYING CLOSE</span>
                              <p>Low-latency voice and video feels like you’re in the same room. Wave hello over video, watch
                                   friends stream their games, or gather up and have a drawing session with screen share.</p>
                         </div>
                         <img src="../assets/homeSVG/4.svg" alt="">
                         <div class="other">
                              <span>Ready to start your journey?</span>
                              <button>Start Now</button>
                         </div>
                    </div>

               </div>
          </section>
          <footer>
               <div class="box">
                    <div class="upper">
                         <div class="left">
                              <div class="lang">
                                   <ul ref="ulEl">
                                        <li>
                                             <img src="../assets/flags/En.USA.png" alt="">
                                             <span>English,USA</span>
                                        </li>
                                        <li>
                                             <img src="../assets/flags/jpan.png" alt="">
                                             <span>日本語</span>
                                        </li>
                                        <li>
                                             <img src="../assets/flags/korean.png" alt="">
                                             <span>한국어</span>
                                        </li>
                                        <li>
                                             <img src="../assets/flags/china.png" alt="">
                                             <span>中文</span>
                                        </li>
                                        <li>
                                             <img src="../assets/flags/cnX.png" alt="">
                                             <span>繁體中文</span>
                                        </li>
                                        <li>
                                             <img src="../assets/flags/china.png" alt="">
                                             <span>中文</span>
                                        </li>
                                        <li>
                                             <img src="../assets/flags/cnX.png" alt="">
                                             <span>繁體中文</span>
                                        </li>
                                        <li>
                                             <img src="../assets/flags/china.png" alt="">
                                             <span>中文</span>
                                        </li>
                                        <li>
                                             <img src="../assets/flags/cnX.png" alt="">
                                             <span>繁體中文</span>
                                        </li>
                                   </ul>
                                   <img src="../assets/flags/En.USA.png" alt="">
                                   <span @click="activeUl">English,USA</span>
                                   <img @click="activeUl" src="../assets/init-icon-pics/arrow-down-s-line.png" alt="">
                              </div>
                              <ul class="medium">
                                   <li><img src="../assets/mediums/twitter-fill.png" alt=""></li>
                                   <li><img src="../assets/mediums/instagram-line.png" alt=""></li>
                                   <li><img src="../assets/mediums/facebook-box-fill.png" alt=""></li>
                                   <li><img src="../assets/mediums/youtube-fill.png" alt=""></li>
                                   <li><img src="../assets/mediums/tiktok-fill.png" alt=""></li>
                                   <li><img src="../assets/mediums/wechat-fill.png" alt=""></li>
                              </ul>
                         </div>
                         <div class="right">
                              <div class="link">
                                   <span>Product</span>
                                   <ul>
                                        <li>Download</li>
                                        <li>Nitro</li>
                                        <li>Status</li>
                                        <li>App Directory</li>
                                   </ul>
                              </div>
                              <div class="link">
                                   <span>Company</span>
                                   <ul>
                                        <li>About</li>
                                        <li>Jobs</li>
                                        <li>Brand</li>
                                        <li>Newsroom</li>
                                        <li>Fall Release</li>
                                   </ul>
                              </div>
                              <div class="link">
                                   <span>Resources</span>
                                   <ul>
                                        <li>College</li>
                                        <li>Support</li>
                                        <li>Safety</li>
                                        <li>Blog</li>
                                        <li>Feedback</li>
                                        <li>Developers</li>
                                        <li>Streamkit</li>
                                   </ul>
                              </div>
                              <div class="link">
                                   <span>Policies</span>
                                   <ul>
                                        <li>Terms</li>
                                        <li>Privacy</li>
                                        <li>Cookie Settings</li>
                                        <li>Guidelines</li>
                                        <li>Acknowledgements</li>
                                        <li>Licenses</li>
                                   </ul>
                              </div>
                         </div>
                    </div>
                    <div class="lower">
                         <div id="" class="logo" ref="logo">
                              <img src="../assets//logo/logo.png" alt="logo" class="logo">
                              <span>Circle</span>
                         </div>
                         <button>Sign up</button>
                    </div>
               </div>
          </footer>
          <div ref="coverPageEl" class="coverPage" id="coverPage">
               <div class="logo">
                    <div class="lo">
                         <img src="../assets/logo/logo.png" alt="logo" class="logo">
                         <span>Circle</span>
                    </div>
                    <img class="close" src="../assets/init-icon-pics/close.png" alt="close" @click="openMenu">
               </div>
               <div class="links">
                    <li>Home</li>
                    <li>Download</li>
                    <li>Nitro</li>
                    <li>Discover</li>
                    <li>Safety</li>
                    <li>Blog</li>
                    <li>Careers</li>
               </div>
          </div>
     </div>
</template>

<script>
import gsap from 'gsap';
import { getCurrentInstance, onMounted } from 'vue';
import { useRouter } from 'vue-router';
export default {
     name: 'HomePage',
     setup() {
          const ACTIVE = 'active'
          const router = useRouter()
          let whetherShow = localStorage.token?true:false
          let _this = getCurrentInstance()
          let tween = gsap.timeline()

          const goLogin = () => {
               router.push('/login')
          }

          const activeUl = () => {
               _this.refs.ulEl.classList.toggle(ACTIVE)
          }

          const goChannels = () => {
               router.push('/channels')
          }
          
          const openMenu = async () => {
               if (_this.refs.coverPageEl.classList.length == 1) {
                    tween.from('#coverPage', { duration: .2, x: 200, ease: 'power2' }).to('#coverPage', { duration: .2, x: 0, ease: 'power2' })
                    _this.refs.coverPageEl.classList.toggle(ACTIVE)
                    document.documentElement.style.overflow = "hidden";
                    return
               }
               if (_this.refs.coverPageEl.classList.length == 2) {
                    await tween.to('#coverPage', { duration: .2, x: 300, ease: 'power0' }).set('#coverPage', { x: 0 })
                    _this.refs.coverPageEl.classList.toggle(ACTIVE)
                    document.documentElement.style.overflow = "scroll";
                    return
               }
               // console.log( _this.refs.coverPageEl.classList.toggle(ACTIVE));

          }

          onMounted(() => {
               tween.from('#logoEl', { duration: 0.6, y: -60, opacity: 0, ease: 'power0' })
               tween.from('#openEl', { duration: .65, x: 100, opacity: 0, ease: 'power2' })
               gsap.from('#navsEl', { duration: .8, opacity: 0, scale: 0.2, ease: 'power1' })
               gsap.from('#picAndTextEl', { duration: .9, opacity: 0, scale: 0, ease: 'power2' })
               gsap.from('#picAndTextEl-button', { duration: .8, opacity: 0, scale: 0, y: 150, ease: 'power2' })
               gsap.to('#picAndTextEl-button', { duration: 1.3, opacity: 1, scale: 1, y: 0, ease: 'power2' })
          })

          return {
               activeUl, openMenu, goLogin, goChannels, whetherShow
          }
     }
}
</script>

<style lang="less" scoped>
.main-container {
     position: relative;
     background-color: rgb(244, 244, 244);
     width: 100vw;
     min-height: 100vh;

     .coverPage {
          position: absolute;
          top: 0;
          right: 0;
          height: 100vh;
          width: 300px;
          z-index: 999;
          border-radius: 5px;
          border: 1px solid rgb(127, 124, 124);
          background-color: #fff;
          // display: flex;
          display: none;
          flex-direction: column;
          align-items: center;

          .logo {
               width: 90%;
               height: 80px;
               display: flex;
               justify-content: space-between;
               align-items: center;

               .lo {
                    img {
                         width: 40px;
                         height: 40px;
                    }

                    span {
                         font-family: Montserrat-BlackItalic;
                         font-size: var(--initTextFontSize);
                    }

                    display: flex;
                    justify-content: center;
                    align-items: center;
               }

               .close {
                    width: 20px;
                    height: 20px;
               }
          }

          .links {
               width: 90%;
               display: flex;
               flex-direction: column;
               row-gap: 20px;
               // height: 500px;
               border-top: 1px solid rgb(210, 206, 206);

               li:nth-child(1) {
                    margin-top: 20px;
                    background-color: #ddd;
               }

               &:hover {
                    li {
                         background-color: #fff;
                    }
               }

               li {
                    font-family: var(--nomal-font_family);
                    padding-left: 20px;
                    height: 40px;
                    border-radius: 9px;
                    line-height: 40px;
                    transition: .3s;

                    &:hover {
                         background-color: #ddd;
                         cursor: pointer;
                    }

               }

          }
     }

     .active {
          display: flex;
     }

     // border: var(--border-production);
     header {
          width: 100%;

          .top {
               transition: .5s;
               padding-top: 20px;
               width: 80%;
               margin: 0 auto;
               display: flex;
               justify-content: space-between;
               align-items: center;

               @media screen and (max-width:1260px) {
                    width: 90%;
               }

               @media screen and (max-width: 1024px) {

                    .openUp,
                    .navs {
                         display: none;
                    }
               }

               .logo {
                    // border: var(--border-production);
                    display: flex;
                    height: 40px;

                    img {
                         // height: 40px;
                    }

                    span {
                         font-family: Montserrat-BlackItalic;
                         font-size: 25px;
                         height: 40px;
                         line-height: 40px;
                         font-weight: 800;
                    }
               }

               .navs {
                    @media screen and (max-width: 1024px) {
                         display: none;
                    }

                    display: flex;
                    ;
                    height: 30px;
                    line-height: 30px;

                    li {
                         font-family: var(--nomal-font_family);
                         color: var(--title-font-color);
                         font-weight: var(--button-fontWeight);
                         font-size: var(--initTextFontSize);
                         // padding-left: 40px;
                         margin-left: 40px;
                         text-align: center;

                         &:hover {
                              cursor: pointer;

                              &>span {
                                   display: block;
                                   // animation: jump 2.5s infinite;
                                   scale: 0.8;
                                   transition: .5s;

                              }

                              transition: .1s;
                              // border-bottom: 2px solid blue;

                         }
                    }
               }

               .open {
                    width: 110px;
                    height: 40px;
                    background-color: #fff;
                    border-radius: 30px;
                    line-height: 40px;
                    text-align: center;
                    font-weight: var(--button-fontWeight);
                    font-family: var(--nomal-font_family);
                    color: var(--title-font-color);
                    box-shadow: 0 0 0 3px;
                    font-family: var(--nomal-font_family);

                    &:hover {
                         transition: .4s;
                    }
               }

               .loginAndMenu {
                    display: none;

                    @media screen and (max-width:1024px) {
                         display: flex;
                    }

                    // display: flex;
                    .open {
                         width: 80px;
                         font-size: 13px;
                         font-weight: 300;
                    }

                    img {
                         height: 40px;
                         width: 40px;
                         // object-fit: cover;
                         margin-left: 20px;

                         &:hover {
                              transition: .5s;
                              cursor: pointer;
                              border: 2px solid black;
                              border-radius: 50%;
                         }
                    }
               }
          }

          .picAndText {
               // border: var(--border-production);
               margin: 0 auto;
               margin-top: 10px;
               background-image: url('../assets/background/background2.png');
               background-attachment: fixed;
               object-fit: cover;
               // background-size: cover;
               // background-position: 50% 50%;
               background-position: center;
               background-repeat: no-repeat;
               overflow-x: hidden;
               height: 600px;
               display: flex;
               flex-direction: column;
               justify-content: center;
               align-items: center;
               text-align: center;
               color: #fff;

               @media screen and (max-width:768px) {
                    background-attachment: local;
                    height: 70vh;
               }

               .text {
                    width: 80vw;
                    font-family: var(--nomal-font_family);
                    padding-bottom: 28px;

                    // border: var(--border-production);
                    @media screen and (max-width:768px) {
                         width: 90vw;
                    }

                    span {
                         font-size: 60px;
                         font-weight: 600;
                         padding-bottom: 10px;
                         display: block;
                         font-family: Montserrat-BlackItalic;

                         @media screen and (max-width:768px) {
                              font-size: 26px;
                              width: 100vw;
                              padding-right: 100px;
                              text-align: left;
                         }
                    }

                    p {
                         font-size: 20px;
                         font-weight: 350;

                         @media screen and (max-width:768px) {
                              font-size: 15px;
                              text-align: left;
                         }
                    }

               }

               button {
                    margin-bottom: 50px;
                    font-family: var(--nomal-font_family);
                    height: 50px;
                    width: 250px;
                    border: none;
                    border-radius: 25px;
                    color: var(--title-font-color);
                    background-color: #fff;
                    font-size: var(--initTextFontSize);
                    font-weight: 550;
                    box-shadow: 0 0 0 3px;

               }
          }
     }

     section {
          width: 100vw;
          margin: 0 auto;

          .part {
               &:nth-child(3) {
                    display: none;
               }

               height: 600px;

               // @media screen and (max-width:1260px) {
               //      height: 600px;
               // }

               @media screen and (max-width:768px) {
                    &:nth-child(3) {
                         display: flex;
                    }
               }

               // border-bottom: 2px dashed blue;
               .together {
                    margin: 0 auto;
                    width: 80vw;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    height: 100%;

                    img {
                         height: 75%;

                         @media screen and (max-width:768px) {
                              width: 80vw;
                         }
                    }

                    .text {
                         display: flex;
                         flex-direction: column;
                         justify-content: space-around;
                         width: 20vw;
                         height: 250px;
                         // border: 1px solid black;
                         position: relative;

                         @media screen and (max-width:768px) {
                              padding-bottom: 30px;
                         }

                         span {
                              // width: 50%;
                              font-family: Montserrat-BlackItalic;
                              font-size: 35px;

                              @media screen and (max-width:1024px) {
                                   font-size: 25px;
                              }

                              @media screen and (max-width:768px) {
                                   width: 50vw;
                                   font-size: 17px;
                                   // position: absolute;
                                   // top: 0;
                                   // left: 100%;
                                   transform: translateX(-50%)
                              }

                              // font-weight: 200;
                         }

                         p {
                              width: 150%;
                              font-family: var(--nomal-font_family);
                              font-weight: 100;
                              font-size: 17px;

                              @media screen and (max-width:1024px) {
                                   font-size: 14px;
                              }

                              @media screen and (max-width:768px) {
                                   width: 50vw;
                                   // position: absolute;
                                   // bottom: 50%;
                                   // left: 100%;
                                   transform: translateX(-50%);
                                   font-size: 15px;
                              }
                         }

                    }
               }
          }

          .part4 {
               height: 1200px;

               @media screen and (max-width: 1024px) and (min-width:768px) {
                    height: 950px;
               }

               @media screen and (max-width:768px) {
                    height: 800px;
               }

               .together {
                    height: 80%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    align-items: center;

                    .other {
                         display: flex;
                         flex-direction: column;
                         row-gap: 30px;
                         align-items: center;
                         height: 400px;

                         span {
                              font-family: var(--nomal-font_family);
                              font-size: 30px;
                              font-weight: 500;
                         }

                         button {
                              width: 200px;
                              height: 50px;
                              border-radius: 20px;
                              font-size: 20px;
                              font-family: var(--nomal-font_family);
                              border: none;
                              color: #fff;
                              background-color: rgb(77, 102, 212);
                         }
                    }

                    img {
                         width: 70vw;
                    }

                    .text {
                         // display: flex;
                         width: 100vw;
                         margin-top: 160px;

                         // width: 60vw;
                         span {
                              font-family: Montserrat-BlackItalic;
                              font-weight: 700;
                              width: 60vw;
                              display: block;
                              font-size: 45px;

                              @media screen and (max-width:768px) {
                                   width: 100vw;
                                   transform: translateX(0)
                              }
                         }

                         P {
                              width: 50vw;

                              @media screen and (max-width:768px) {
                                   width: 100vw;
                                   transform: translateX(0)
                              }
                         }

                         span,
                         p {
                              margin: 0 auto;
                              text-align: center;
                         }
                    }
               }


          }

          .part:nth-child(1) {
               background-color: #fff;
          }

          .part:nth-child(2) {
               background-color: rgb(244, 244, 244);
          }

          .part:nth-child(4) {
               background-color: #fff;
          }

          // .part:nth-child(4) {
          //      background-color:  rgb(244, 244, 244);
          // }
     }

     // border: 2px dashed black;
     footer {
          height: 600px;
          width: 100vw; //26 29 31
          background-color: rgb(35, 39, 42);
          display: flex;
          justify-content: center;
          align-items: center;

          @media screen and (max-width:768px) {
               height: auto;
          }

          .box {
               // border: var(--border-production);
               width: 90vw;
               height: 70%;
               display: flex;
               flex-direction: column;
               justify-content: space-between;

               .upper {
                    // border-bottom: 2px solid rgb(61, 51, 138);
                    height: 80%;
                    width: 100%;
                    display: flex;

                    @media screen and (max-width:768px) {
                         padding-top: 20px;
                         flex-direction: column;
                    }

                    // justify-content: space-between;
                    .left {
                         width: 30%;
                         height: 100%;

                         // border-right: 1px dashed blue;
                         .lang {
                              padding-top: 10px;
                              position: relative;
                              // border: 1px dashed pink;
                              display: flex;

                              ul {
                                   border: 1px solid #ddd;
                                   position: absolute;
                                   bottom: 25px;
                                   overflow: scroll;
                                   left: 0;
                                   border-radius: 4px;
                                   background-color: #fff;
                                   height: 200px;
                                   display: none;

                                   li {
                                        border-radius: 2px;
                                        margin: 2px 0;
                                        padding: 8px 0;
                                        display: flex;

                                        span {
                                             color: black;
                                        }

                                        &:hover {
                                             background-color: #ddd;
                                        }
                                   }
                              }

                              .active {
                                   display: block;
                              }

                              // justify-content: center;
                              // align-items: center;
                              // row-gap: 10px;
                              img {
                                   height: 17px;
                                   padding-right: 10px;
                              }

                              span {
                                   display: block;
                                   color: #fff;
                                   font-size: 14px;
                                   padding-right: 5px;
                              }
                         }

                         .medium {
                              display: flex;
                              padding-top: 50px;

                              li {
                                   @media screen and (min-width:768px) and (max-width: 1024px) {
                                        padding-right: 12px;

                                        img {
                                             scale: 0.9;
                                        }
                                   }

                                   ;
                                   padding-right: 20px;
                              }
                         }
                    }

                    .right {
                         // border-left: 1px dashed #fff;
                         width: 70%;
                         // height: 100%;
                         // background-color: #fff;
                         display: flex;
                         justify-content: space-between;

                         @media screen and (max-width:768px) {
                              width: 100vw;
                              display: grid;
                              grid-template-rows: repeat(2, 50vw);
                              ;
                              grid-template-columns: repeat(2, 50%);
                              ;
                         }

                         .link {
                              flex: 1;
                              // border-right: 1px dashed blue;
                              padding-left: 20px;

                              @media screen and (max-width:768px) {
                                   padding-left: 0;
                              }

                              span {
                                   color: rgb(74, 93, 198);
                                   font-family: Montserrat-BlackItalic;
                                   display: block;
                                   padding-bottom: 20px;
                              }

                              ul {
                                   color: #fff;

                                   li {
                                        font-family: var(--nomal-font_family);
                                        padding-bottom: 10px;
                                        font-size: 14px;
                                   }
                              }
                         }

                    }
               }

               .lower {
                    padding-top: 20px;
                    border-top: 2px solid rgb(61, 51, 138);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    @media screen and (max-width:768px) {
                         margin-top: 80px;
                         padding-bottom: 10px;
                    }

                    // height: 100px;
                    .logo {
                         display: flex;
                         height: 40px;

                         span {
                              font-family: Montserrat-BlackItalic;
                              font-size: 20px;
                              height: 40px;
                              line-height: 40px;
                              font-weight: 800;
                              color: #fff;
                         }
                    }

                    button {
                         font-family: var(--nomal-font_family);
                         height: 40px;
                         width: 80px;
                         border: none;
                         border-radius: 20px;
                         font-size: 15px;
                         color: #fff;
                         background-color: rgb(74, 93, 198);
                    }
               }
          }
     }
}

@media screen and (max-width:1260px) {
     .part {
          .together {
               img {
                    width: 55vw;
               }

               .text {
                    span {
                         font-size: 30px;
                    }

                    p {
                         font-size: 14px;
                    }
               }
          }
     }
}

@media screen and (max-width:1024px) and (min-width: 768px) {
     .part {
          img {
               width: 60vw;
          }
     }
}

@media screen and (max-width:768px) {
     .part {
          &:nth-child(2) {
               display: none;
          }

          .together {
               flex-direction: column;
          }
     }
}
</style>