
export const noticeAboutDeprecation = (message) => {
    const env = process.env.NODE_ENV;
    const isDevelopmetEnv = env === 'dev' || env === 'development'  || env === 'labs';
    isDevelopmetEnv && console.error(`[Design System] ${message}`)
}