<template>
  <footer class="app__footer">
    <div class="icon-group">
      <a href="https://www.facebook.com/chattahoocheeriverkeeper/" target="_blank">
        <i class="fa fa-facebook icon-group__facebook"></i>
      </a>
      <a href="https://twitter.com/CRKeeper" target="_blank">
        <i class="fa fa-twitter icon-group__twitter"></i>
      </a>
      <a href="https://www.instagram.com/crkeeper/#" target="_blank">
        <i class="fa fa-instagram icon-group__instagram"></i>
      </a>
      <a href="https://vimeo.com/crkeeper" target="_blank">
        <i class="fa fa-vimeo icon-group__vimeo"></i>
      </a>
      <a href="https://www.youtube.com/user/UCRiverkeeperVideos" target="_blank">
        <i class="fa fa-youtube-play icon-group__youtube"></i>
      </a>
    </div>
    <div class="footer-info">
      <div class="footer-info__text">
        Copyright
        <i class="fa fa-copyright" aria-hidden="true"></i>
        2017 Chattahoochee Riverkeeper | All Rights Reserved
      </div>
      <div class="footer-info__text">
        Phone (404) 352-9828 |
        <a href="mailto:info@chattahoochee.org" class="footer-info__text--underline footer-info__text--active">info@chattahoochee.org</a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'app-footer'
}
</script>

<style lang="scss" scoped>
@import "../scss/colors";

.icon-group {
  display: flex;

  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
  width: 161px;

  &__facebook {
    @extend %font-awesome-icon;
    width: 12px;
  }

  &__twitter {
    @extend %font-awesome-icon;
    width: 19px;
  }

  &__instagram {
    @extend %font-awesome-icon;
    width: 18px;
  }

  &__vimeo {
    @extend %font-awesome-icon;
    width: 20px;
  }

  &__youtube {
    @extend %font-awesome-icon;
    width: 20px;
  }
}

%font-awesome-icon {
  height: 20px;

  color: $color-finn-white;
  font-family: FontAwesome;
  font-size: 20px;
  line-height: 20px;
}

.footer-info {
  height: 48px;

  color: $color-finn-white;
  text-align: center;

  &__text {
    font-family: Roboto;
    font-size: 14px;
    line-height: 24px;

    &--underline {
      @extend .footer-info__text;
      text-decoration: underline;
    }

    &--active {
      color: $color-nww-green;
    }
  }
}
</style>
