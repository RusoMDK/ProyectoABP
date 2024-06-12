export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api/v1/',
  loginUrl: 'http://localhost:8000/',
  sentryUrl: '',
  // 'http://65ba5ead87524c59bb583bc2a3cdd9c6@sentry.akademos.prod.uci.cu/3',
  openmap_server: 'http://map.akademos.prod.uci.cu/',
  storage_server: 'http://storage.akademos.mined.gob.cu/',
  forgot_password_url: 'http://localhost:8000/user/password/reset/',
  // openmap_server: 'http://{s}.tile.openstreetmap.org/'
  minioConnection: {
    accessKey: 'minio',
    secretKey: 'minio1234',
    endPoint: 'storage.akademos.prod.uci.cu',
    useSSL: false,
  },
};
