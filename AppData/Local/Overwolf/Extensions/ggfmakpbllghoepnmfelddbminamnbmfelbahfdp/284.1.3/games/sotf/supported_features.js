define({
  match_info: {
    name: 'match_info',
    events: {
      match_start: {
        name: 'match_start',
        data: null
      },
      match_end: {
        name: 'match_end',
        data: null
      },
      death: {
        name: 'death',
        data: null
      },
    },
  },
  location: {
    name: 'location',
    info: {
      location: {
        category: 'match_info',
        key: 'location'
      },
      npc_location: {
        category: 'match_info',
        key: 'npc_location'
      },
      gps_locator: {
        category: 'match_info',
        key: 'gps_locator',
        usePluginKey : true,
      },
    }
  },
})