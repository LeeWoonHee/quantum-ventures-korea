module.exports = {
  publicPath           : '/',
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],
  configureWebpack     : {
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  },
  pluginOptions        : {
    s3Deploy: {
      awsProfile       : 'quantumvk-s3-deployer',
      region           : 'ap-northeast-2',
      bucket           : 'quantumdataengine.com',
      uploadConcurrency: 3,
      registry         : undefined,
      overrideEndpoint : false,
      createBucket     : true,
      staticHosting    : true,
      assetPath        : 'dist',
      assetMatch       : '**',
      deployPath       : '/',
      acl              : 'bucket-owner-full-control',
      pwa              : false,
      enableCloudfront : true,
      cloudfrontId     : 'E3IDN3597PE7AZ',
      pluginVersion    : '4.0.0-rc3',
      staticIndexPage  : 'index.html',
      staticErrorPage  : 'index.html'
    }
  }
}

