<template>
  <div id="app">
    <md-card>
      <md-toolbar class="md-transparent">
        <h3>Neighborhood Water Watch</h3>
      </md-toolbar>
      <md-card-area>
        <md-tabs class="md-transparent navbar-tabs" md-right>
          <md-tab id="logdata" md-label="Log Data">
            <div class="app-body">
              TODO lul
            </div>
          </md-tab>

          <md-tab id="collectionsites" md-label="Collection Sites">
            <div class="app-body">
              <collection-sites></collection-sites>
            </div>
          </md-tab>

          <md-tab id="reports" md-label="Reports">
            <div class="app-body">
              TODO lul
            </div>
          </md-tab>

          <md-tab id="manageusers" md-label="Manage Users">
            <div class="app-body">
              TODO lul
            </div>
          </md-tab>

          <md-tab id="signout" md-label="Sign Out">
            <div class="app-body">
              TODO lul
            </div>
          </md-tab>
        </md-tabs>
      </md-card-area>
    </md-card>
  </div>
</template>

<script>
  import CollectionSites from './components/collection-sites'

  export default {
    name: 'app',
    data: function() {
      return {
        msg: "App loaded"
      }
    },
    components: {
      'collection-sites': CollectionSites
    }
  }
</script>

<style>
  .navbar-tabs {
    margin-top: -48px;
  }

  .app-body {
	   background-color: #F3F3F3;
     padding: 36px 48px;
     margin: -16px;
  }
</style>
