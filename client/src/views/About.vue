<template>
  <div>
    <EntryBoard/>
    <NavHeader/>
    <div class="articleBox">
      <Article postTitle="WELCOME TO OUR WORLD">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut dolorum iusto repudiandae cupiditate alias quaerat dolorem, esse nostrum architecto laudantium quae itaque repellendus, deleniti temporibus adipisci, cum ex ullam soluta!</p>
        <p>Facilis, numquam soluta eaque hic corporis, exercitationem aliquid quo possimus, vero necessitatibus excepturi quasi sapiente suscipit ut deleniti sed eos voluptatibus ducimus! Lorem ipsum dolor sit, amet ectetur adipisicing elit. Beatae, voluptates totam atur ratione tempore aliquid. Molestias, nisi. Nobis reiciendis similique accusamus harum. Necessitatibus dolore, dicta sunt adipisci est labo explicabo.</p>
        <transition appear enter-active-class="animated fadeIn">
          <img :src="articles.article1.src" alt="img">
        </transition>
      </Article>
      <Article postTitle="WELCOME TO OUR WORLD">
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur earum velit exercitationem distinctio, totam unde similique accusantium aperiam, iste laboriosam recusandae numquam officiis dolorem? Eius asperiores error eligendi officia laboriosam.</p>
        <transition appear enter-active-class="animated fadeIn">
          <img :src="articles.article2.src" alt="img">
        </transition>
      </Article>
    </div>
    <NavFooter/>
  </div>
</template>

<script>
import EntryBoard from "./../components/EntryBoard.vue";
import NavHeader from "./../components/NavHeader.vue";
import Article from "./../components/Article.vue";
import NavFooter from "./../components/NavFooter.vue";
import Drawer from "../components/Drawer.vue";
import axios from "axios";

import article1Src from "./../../static/about/article1.jpg";
import article2Src from "./../../static/about/article2.jpg";

export default {
  data() {
    return {
      articles: {
        article1: {
          src: article1Src
        },
        article2: {
          src: article2Src
        }
      }
    };
  },
  components: {
    EntryBoard,
    NavHeader,
    Article,
    NavFooter,
    Drawer
  }
};
</script>

<style scoped>
</style>
