<template>
  <div class="articleBox">
    <Article postTitle="WELCOME TO OUR WORLD">
      <p
        class="wow fadeIn"
      >Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut dolorum iusto repudiandae cupiditate alias quaerat dolorem, esse nostrum architecto laudantium quae itaque repellendus, deleniti temporibus adipisci, cum ex ullam soluta!</p>
      <p
        class="wow fadeIn"
      >Facilis, numquam soluta eaque hic corporis, exercitationem aliquid quo possimus, vero necessitatibus excepturi quasi sapiente suscipit ut deleniti sed eos voluptatibus ducimus! Lorem ipsum dolor sit, amet ectetur adipisicing elit. Beatae, voluptates totam atur ratione tempore aliquid. Molestias, nisi. Nobis reiciendis similique accusamus harum. Necessitatibus dolore, dicta sunt adipisci est labo explicabo.</p>
      <div class="imgBox wow fadeIn">
        <img :src="articles.article1.src" alt="img">
      </div>
    </Article>
    <Article postTitle="WELCOME TO OUR WORLD">
      <p
        class="wow fadeIn"
      >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur earum velit exercitationem distinctio, totam unde similique accusantium aperiam, iste laboriosam recusandae numquam officiis dolorem? Eius asperiores error eligendi officia laboriosam.</p>
      <div class="imgBox wow fadeIn">
        <img :src="articles.article2.src" alt="img">
      </div>
    </Article>
  </div>
</template>

<script>
import Article from "./../components/Article.vue";

import article1Src from "../assets/images/about/article1.jpg";
import article2Src from "../assets/images/about/article2.jpg";

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
    Article
  }
};
</script>

<style scoped>
.imgBox {
  overflow: hidden;
  font-size: 0;
}
img {
  transition: all 2s ease-in-out;
}
img:hover {
  transform: scale(1.1);
}
</style>
