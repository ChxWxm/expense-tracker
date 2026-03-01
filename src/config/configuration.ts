export const configuration = () => {
  return {
    database: {
      host: process.env.DB_HOST,
      port: Number.parseInt(process.env.DB_PORT ?? '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      name: process.env.DB_NAME,
      isDevMode: process.env.IS_DEV_MODE === 'true',
    },
    jwtSecret: process.env.JWT_SECRET,
    admin: {
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    },
  };
};
