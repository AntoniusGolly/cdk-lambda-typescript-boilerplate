const config = [
  {
    path: '/',
    handlers: [
      {
        method: 'GET',
        handler: 'baseHandler'
      }, {
        method: 'POST',
        handler: 'baseHandler'
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
            handler: 'postAssetHandler'
          }
        ],
        resources: [
          {
            path: '/list',
            handlers: [
              {
                method: 'GET',
                handler: 'listAssetHandler'
              }
            ]
          }
        ]
      }
    ]
  }
]

export default config
