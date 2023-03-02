"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');
const logDir = 'logs'; // 'logs' 디렉토리
const level = () => {
    const env = process.env.NODE_ENV || 'development';
    const isDevelopment = env === 'development';
    return isDevelopment ? 'debug' : 'warn';
};
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'blue',
};
winston.addColors(colors);
const format = winston.format.combine(winston.format.timestamp({ format: ' YYYY-MM-DD HH:MM:SS' }), winston.format.colorize({ all: true }), winston.format.printf((info) => `${info.timestamp} [ ${info.level} ] ▶ ${info.message}`));
// 로거 생성
exports.log = winston.createLogger({
    format,
    level: level(),
    transports: [
        // 로그 파일에 찍힐 내용을 콘솔에도 찍어줌
        new winston.transports.Console({
            format: winston.format.combine(winston.format.splat(), winston.format.colorize()
            // winston.format.simple() // `${info.level}: ${info.message} JSON.stringify({ ...rest })` 포맷
            ),
        }),
        new winstonDaily({
            level: 'info',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            filename: `%DATE%.log`,
            dirname: logDir,
            maxFiles: 30, // 30일치 로그 파일 저장
        }),
        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            filename: `%DATE%.error.log`,
            dirname: logDir + '/error',
            maxFiles: 30,
        }),
    ],
});
//# sourceMappingURL=logger.js.map