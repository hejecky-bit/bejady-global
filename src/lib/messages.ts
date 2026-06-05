/**
 * 直接加载消息文件，不依赖 getTranslations（避免 headers() 调用）
 * 用于 static export (output: "export") 兼容
 */
export function loadMessages(locale: string) {
  try {
    return require(`../messages/${locale}/common.json`);
  } catch {
    return require(`../messages/en/common.json`);
  }
}

export function t(locale: string, namespace: string, key: string): string {
  const messages = loadMessages(locale);
  const ns = messages[namespace];
  if (!ns) return key;
  const keys = key.split(".");
  let val = ns;
  for (const k of keys) {
    val = val?.[k];
  }
  return typeof val === "string" ? val : key;
}
