<template>
  
  <div class="app">
    
    <nav class="navbar is-link-dark" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">
          <p><strong>AMLmini</strong></p>
        </router-link>
      </div>
      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start navbar-links">
          <router-link to="/generations" class="navbar-item">
            Generations
          </router-link>
          <router-link to="/estimations" class="navbar-item">
            Estimations
          </router-link>
        </div>
        <div class="navbar-end">
          <a class="navbar-item">
            <span class="icon">
              <i class="fas fa-question-circle"></i>
            </span>
          </a>
        </div>
      </div>
    </nav>

    <router-view/>

    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          Copyright © Lamsumchat. All rights reserved.
        </p>
      </div>
    </footer>

  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>


.app {
  background-color: aqua;
  min-height: 100vh;  /* 保持整个视图高度 */
  min-width: 100vw;
  display: flex;
  flex-direction: column; /* 水平排列 */
  margin-left: -7.77vw;
}

.navbar-item {
  margin: 0 8em;
}

.navbar-item:hover {
  color: yellow
}

.footer {
  margin-top: auto; /* 保持在底部 */
}

</style>