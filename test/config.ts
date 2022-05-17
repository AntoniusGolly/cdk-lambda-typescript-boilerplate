const config = [
  {
    path: '/',
    handlers: [
      {
        method: 'GET',
        handler: 'baseHandlerGET'
      }, {
        method: 'POST',
        handler: 'baseHandlerPOST'
      }
    ],
    resources: [
      {
        path: '/oauth2',
        resources: [
          {
            path: "/token",
            handlers: [
              {
                method: 'POST',
                handler: 'tokenHandler',
                params: 'grant_type'
              }
            ]
          }
        ]
      },
      {
        path: '/assets',
        handlers: [
          {
            method: 'POST',
            handler: 'assetHandlerPost'
          }
        ],
        resources: [
          {
            path: '/list',
            handlers: [
              {
                method: 'GET',
                handler: 'assetListHandlerGET',
                params: 'some,,,fancy  , params'
              }
            ]
          }
        ]
      }
    ]
  }
]

export default config
