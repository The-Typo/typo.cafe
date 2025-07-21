export function formatDate(dateString) {
    const now = new Date();
    const past = new Date(dateString);
    const diffMs = now - past;
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    // 1分钟内
    if (diffSecs < 60) {
        return `${diffSecs}秒前`;
    }
    // 1小时内
    else if (diffMins < 60) {
        return `${diffMins}分钟前`;
    }
    // 24小时内
    else if (diffHours < 24) {
        return `${diffHours}小时前`;
    }
    // 7天内
    else if (diffDays < 7) {
        return `${diffDays}天前`;
    }
    // 超过7天
    else {
        const year = past.getFullYear();
        const currentYear = now.getFullYear();
        const month = past.getMonth() + 1;
        const day = past.getDate();

        // 当年的显示月日，往年的显示年月日
        if (year === currentYear) {
            return `${month}月${day}日`;
        } else {
            return `${year}年${month}月${day}日`;
        }
    }
}