export const environment = {
  production: true,
  apiUrl: 'http://server.akademos.mined.gob.cu/api/v1/',
  loginUrl: 'http://server.akademos.mined.gob.cu/',
  sentryUrl:
    'http://063de234e3bd4d15879c9deb19a0cf60@sentry.akademos.mined.gob.cu/3',
  openmap_server: 'http://map.akademos.mined.gob.cu/',
  storage_server: 'http://storage.akademos.mined.gob.cu/',
  forgot_password_url:
    'http://server.akademos.mined.gob.cu/user/password/reset/',
  minioConnection: {
    accessKey: 'minio',
    secretKey: 'minio1234',
    endPoint: 'storage.akademos.mined.gob.cu',
    useSSL: false,
  },
};
