const NodeMediaServer = require('node-media-server');
var MySql = require('sync-mysql');

var connection = new MySql({
  host: 'bdd',
  user: 'admin',
  password: 'admin',
  database: 'coditube'
});


const config = {
  rtmp: {
    port: 1936,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8090,
    mediaroot: './media',
    allow_origin: '*'
  },
  trans: {
    ffmpeg: '/usr/bin/ffmpeg',
    tasks: [
      {
        app: 'live',
        mp4: true,
        mp4Flags: '[movflags=frag_keyframe+empty_moov]',
      }
    ]
  }
};

var nms = new NodeMediaServer(config)
nms.run();

nms.on('prePublish', (id, streamPath, args) => {
  const session = nms.getSession(id);

  const result = connection.query("SELECT stream_key FROM channel WHERE stream_key = '" + streamPath.replace('/live/', "") + "'");
  if(result.length < 1)
  {
    session.reject();
  }
});
