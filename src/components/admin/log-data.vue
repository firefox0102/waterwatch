<template>
  <div class="log-data">
    <div class="log-data-header">
      <div class="log-data-header__text">
        Log Data
      </div>
      <div class="log-data-header__text--small">
        Log new data for a collection site
      </div>
    </div>
    <div class="log-data-body">
      <form class="log-data-body__form">
        <div class="log-data-body__column">
          <div class="log-data-body__header">
            Collection Details
          </div>
          <md-input-container>
            <label>Logbook #</label>
            <md-input type="number"></md-input>
            <span>Last Logbook # was **TODO**</span>
          </md-input-container>
          Date
          Station Name
          <md-input-container>
            <label>Notes</label>
            <md-textarea></md-textarea>
          </md-input-container>
        </div>

        <div class="log-data-body__column">
          <div class="log-data-body__header">
            Incubation and Parameters
          </div>
        </div>

        <div class="log-data-body__column">
          <div class="log-data-body__header">
            Total Coliform
          </div>
        </div>

        <div class="log-data-body__column">
          <div class="log-data-body__header">
            E. Coli
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'log-data',
  data: function() {
    return {
      testData: []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .log-data {
    margin: 24px;
    box-shadow: 0 1px 3px 0 rgba(155,155,155,0.5);
  }

  .log-data-header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: #F7F7F7;
    padding: 22px 56px;

    &__text {
    	height: 38px;
    	color: #4A4A4A;
    	font-family: Roboto;
    	font-size: 32px;
    	font-weight: 300;
    	letter-spacing: 1px;
    	line-height: 38px;
    	text-align: center;
      margin-bottom: 5px;

      &--small {
        @extend .log-data-header__text;
        height: 16px;
        color: #9B9B9B;
        font-family: Roboto;
        font-size: 13px;
        line-height: 16px;
      }
    }
  }

  .log-data-body {
    padding: 33px 106px;
    background-color: #FFFFFF;
  }
</style>
