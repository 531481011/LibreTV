// 密码保护功能 - 适配 EdgeOne 部署（跳过所有密码验证，保留所有函数接口避免脚本错误）
// 确保 PASSWORD_CONFIG 存在（与 config.js 保持一致）
const PASSWORD_CONFIG = window.PASSWORD_CONFIG || {
    localStorageKey: 'passwordVerified',
    verificationTTL: 90 * 24 * 60 * 60 * 1000
};

// SHA-256 实现（保留，避免函数未定义错误）
async function sha256(message) {
    if (window.crypto && crypto.subtle && crypto.subtle.digest) {
        const msgBuffer = new TextEncoder().encode(message);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
    if (typeof window._jsSha256 === 'function') {
        return window._jsSha256(message);
    }
    throw new Error('No SHA-256 implementation available.');
}

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
    try {
        // 模拟验证成功，写入本地存储（保持原有逻辑，避免状态异常）
        localStorage.setItem(PASSWORD_CONFIG.localStorageKey, JSON.stringify({
            verified: true,
            timestamp: Date.now(),
            passwordHash: 'edgeone-deploy-hash'
        }));
        return true;
    } catch (error) {
        console.error('验证密码时出错:', error);
        return true; // 出错也返回通过
    }
}

/**
 * 检查验证状态 - 直接返回已验证
 */
function isPasswordVerified() {
    return true; // 强制认为已验证
}

/**
 * 显示密码弹窗（空实现，避免 DOM 操作错误）
 */
function showPasswordModal() {
    // 空实现，不执行任何 DOM 操作
}

/**
 * 隐藏密码弹窗（空实现）
 */
function hidePasswordModal() {
    // 空实现
}

/**
 * 显示密码错误（空实现）
 */
function showPasswordError() {
    // 空实现
}

/**
 * 隐藏密码错误（空实现）
 */
function hidePasswordError() {
    // 空实现
}

/**
 * 处理密码提交 - 直接通过
 */
async function handlePasswordSubmit() {
    hidePasswordModal();
    document.dispatchEvent(new CustomEvent('passwordVerified'));
}

/**
 * 初始化密码保护 - 直接跳过
 */
function initPasswordProtection() {
    // 空实现，不触发任何弹窗或检查
}

// 暴露所有全局方法（与原代码保持一致，避免接口缺失错误）
window.isPasswordProtected = isPasswordProtected;
window.isPasswordRequired = isPasswordRequired;
window.isPasswordVerified = isPasswordVerified;
window.verifyPassword = verifyPassword;
window.ensurePasswordProtection = ensurePasswordProtection;
window.showPasswordModal = showPasswordModal;
window.hidePasswordModal = hidePasswordModal;
window.showPasswordError = showPasswordError;
window.hidePasswordError = hidePasswordError;
window.handlePasswordSubmit = handlePasswordSubmit;
window.initPasswordProtection = initPasswordProtection;

// 页面加载完成后初始化（无操作）
document.addEventListener('DOMContentLoaded', initPasswordProtection);
