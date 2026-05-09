import { generateDummyPassword } from "./db/utils";


export const isProductionEnvironment = process.env.NODE_ENV === "production";
export const isDevelopmentEnvironment = process.env.NODE_ENV === "development";
export const isTestEnvironment = Boolean(
  process.env.PLAYWRIGHT_TEST_BASE_URL ||
    process.env.PLAYWRIGHT ||
    process.env.CI_PLAYWRIGHT
);

// If true, use Groq endpoint instead of Vercel AI Gateway
export const OnlyGroq = true;


export const guestRegex = /^guest-\d+$/;

export const DUMMY_PASSWORD = generateDummyPassword();

export const suggestions = [
  "Chuyển 300 USD cho mẹ ở Việt Nam bằng cách tiết kiệm phí nhất",
  "Tháng này mình có đủ khả năng mua MacBook không?",
  "So sánh phí chuyển tiền sang Singapore giữa ngân hàng và stablecoin",
  "Phân tích chi tiêu tháng này và gợi ý cách tối ưu tài chính",
];
