// 密码保护功能 - 适配 EdgeOne 部署（跳过所有密码验证）
const PASSWORD_CONFIG = {
    localStorageKey: 'passwordVerified',
    verificationTTL: 90 * 24 * 60 * 60 * 1000
};

/**
 * 强制跳过密码保护检查
 */
function isPasswordProtected() {
    return true; // 强制认为已设置密码
}

/**
 * 强制跳过“需要设置密码”检查
 */
function isPasswordRequired() {
    return false; // 强制不要求设置密码
}

/**
 * 强制密码保护检查 - 直接通过
 */
function ensurePasswordProtection() {
    return true; // 无校验，直接返回成功
}

/**
 * 验证密码 - 直接通过
 */
async function verifyPassword(password) {
    // 模拟验证成功，写入本地存储
    localStorage.setItem(PASSWORD_CONFIG.localStorageKey, JSON.stringify({
        verified: true,
        timestamp: Date.now(),
        passwordHash: 'edgeone-deploy'
    }));
    return true;
}

/**
 * 检查验证状态 - 直接返回已验证
 */
function isPasswordVerified() {
    return true;
}

/**
 * 显示密码弹窗（实际不会执行，因已跳过校验）
 */
function showPasswordModal() {
    // 空实现，避免报错
}

/**
 * 隐藏密码弹窗
 */
function hidePasswordModal() {
    // 空实现
}

/**
 * 显示密码错误
 */
function showPasswordError() {
    // 空实现
}

/**
 * 隐藏密码错误
 */
function hidePasswordError() {
    // 空实现
}

/**
 * 处理密码提交
 */
async function handlePasswordSubmit() {
    hidePasswordModal();
    document.dispatchEvent(new CustomEvent('passwordVerified'));
}

/**
 * 初始化密码保护 - 直接跳过
 */
function initPasswordProtection() {
    // 空实现，不执行任何弹窗逻辑
}

// 暴露全局方法
window.isPasswordProtected = isPasswordProtected;
window.isPasswordRequired = isPasswordRequired;
window.isPasswordVerified = isPasswordVerified;
window.verifyPassword = verifyPassword;
window.ensurePasswordProtection = ensurePasswordProtection;
window.handlePasswordSubmit = handlePasswordSubmit;

// 页面加载后初始化（无操作）
document.addEventListener('DOMContentLoaded', initPasswordProtection);
