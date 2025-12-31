/* script.js - 终极优化版 (移除拖拽，保留滚轮与本地视频) */

const track = document.getElementById('track');
const progress = document.getElementById('progress');
const cardItems = document.querySelectorAll('.card-item');

// === 1. 获取 UI 元素 ===
const spotlight = document.getElementById('spotlight');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalSubtitle = document.getElementById('modal-subtitle');
const modalDesc = document.querySelector('.modal-desc');
const bgMusic = document.getElementById('bg-music');
const soundIcon = document.getElementById('sound-icon');
const soundText = document.getElementById('sound-text');

// 视频播放器元素
const modalVideoContainer = document.getElementById('modal-video-container');
const modalVideo = document.getElementById('modal-video');
const playBtnOverlay = document.getElementById('play-btn-overlay');

// === 🌟 核心数据：13 套戏服详解 (纯净版，已去除引用标注) ===
const cardData = [
    {
        title: "K - 男蟒",
        sub: "Python Ceremonial Robe",
        desc: "<p><b>【形制特点】</b> 蟒袍是帝王将相的最高礼服，取材自朝廷礼服。男蟒造型为齐肩圆领，大襟阔袖，袍长及足。周身刺绣团龙或大龙，尤显威武。</p><p><b>【适用角色】</b> 帝王、将相、元帅等高贵身份人物。</p><p><b>【经典剧目】</b> 如《帝女花》中驸马周世显身穿红色男蟒。</p>"
    },
    {
        title: "Q - 女蟒",
        sub: "Python Ceremonial Robe",
        desc: "<p><b>【形制特点】</b> 专属于后妃、公主等皇室女性的礼服。大红女蟒表示身份高、气派大。通常配以云肩、凤冠。</p><p><b>【适用角色】</b> 皇后、公主、郡主。</p><p><b>【经典剧目】</b> 《帝女花》中长平公主身穿红色女蟒，身段婀娜多姿。</p>"
    },
    {
        title: "J - 女大靠",
        sub: "Grand Armour (Female)",
        desc: "<p><b>【形制特点】</b> 古代女将帅出征穿用。通常绣有凤凰、牡丹，衬托英武形象与阴柔之美。背插靠旗，头戴七星额并插雉鸡尾。</p><p><b>【适用角色】</b> 穆桂英等巾帼英雄。</p><p><b>【经典剧目】</b> 《杨门女将》中穆桂英的典型造型。</p>"
    },
    {
        title: "A - 男大靠",
        sub: "Grand Armour (Male)",
        desc: "<p><b>【形制特点】</b> 武生所穿，插有靠旗表示处于临战状态。头戴大额子，胸前佩英雄花球，八面威风。</p><p><b>【适用角色】</b> 赵云等高级武将。</p><p><b>【经典剧目】</b> 《六国大封相》中的威武造型。</p>"
    },
    {
        title: "10 - 宫装",
        sub: "Palace Attire",
        desc: "<p><b>【形制特点】</b> 后妃礼服，圆领对襟，长及脚面。配有水袖，下摆缀有长短各20条飘带，腰部加秋叶与排穗。绣有凤或花纹图案。</p><p><b>【适用角色】</b> 王室贵妃、后妃。</p>"
    },
    {
        title: "9 - 海青",
        sub: "Sloping Collar Gown",
        desc: "<p><b>【形制特点】</b> 粤剧便服、常服，特点是斜领、阔袖缀水袖，直身开裾。文、武、老、少均可穿用。</p><p><b>【适用角色】</b> 文人雅士或落魄书生。</p>"
    },
    {
        title: "8 - 开氅",
        sub: "Cloak",
        desc: "<p><b>【形制特点】</b> 又称“海长”，高级武将、权臣的闲居常服。大领斜襟，阔袖长袍。</p><p><b>【适用角色】</b> 武角或权臣，身份比穿蟒者低。</p>"
    },
    {
        title: "7 - 帔风",
        sub: "Vertical Collar Gown",
        desc: "<p><b>【形制特点】</b> 帝后、官宦在家居场合穿着的便服。对襟长直领，左右开裾。</p><p><b>【适用角色】</b> 达官贵人、乡绅。</p>"
    },
    {
        title: "6 - 衣 (男)",
        sub: "Coat (Male)",
        desc: "<p><b>【形制特点】</b> 凡不入蟒、靠、帔、官衣等正规形制的统称为“衣”。男衣包括汉装、兵衣等。</p>"
    },
    {
        title: "5 - 衣 (女)",
        sub: "Coat (Female)",
        desc: "<p><b>【形制特点】</b> 女性衣类包括小古装、小姐装等。上衣配云肩，绣蝶花，突显婀娜气质。</p>"
    },
    {
        title: "4 - 官衣",
        sub: "Official Robe",
        desc: "<p><b>【形制特点】</b> 文职官员官服，圆领阔袖。胸前及背后各钉一块方形丝绣“补子”，腰挂玉带。</p><p><b>【适用角色】</b> 知县等文武官员。</p>"
    },
    {
        title: "3 - 座马",
        sub: "Horse Stance / Arrow Dress",
        desc: "<p><b>【形制特点】</b> 又称“箭衣”，是武林人物及英雄侠士所穿。圆领大襟，窄袖直身，前后开叉以便武打动作。</p>"
    },
    {
        title: "2 - 车装",
        sub: "Che Zhuang",
        desc: "<p><b>【形制特点】</b> 花旦或武旦推车时穿的戏服。圆领对襟，束腰束袖，下穿灯笼裤配罗伞裙。</p>"
    }
];

// === 2. 滚动控制 (物理参数) ===
let scrollConfig = {
    current: 0,
    target: 0,
    ease: 0.05,
    speed: 1.5
};

let maxScroll = 0;
let snapTimeout; // 用于存放自动对齐的计时器

function updateMaxScroll() {
    if (track) {
        maxScroll = track.offsetWidth - window.innerWidth;
    }
}

window.onload = () => {
    updateMaxScroll();
    animate();
};

window.addEventListener('resize', updateMaxScroll);

/* --- script.js 替换部分 1：滚轮监听 --- */

/* script.js - 修复滚轮监听逻辑 */

window.addEventListener('wheel', (e) => {
    // 1. 如果竖向卷轴打开了，不处理横向滚动
    if (document.getElementById('vertical-scroll-overlay') && document.getElementById('vertical-scroll-overlay').classList.contains('active')) return;

    e.preventDefault();

    // 2. 🚀 修复核心：检测是否触发结局
    // 原来的 scrollConfig.target 改为 scrollConfig.current (视觉位置)
    // 意思是：只有当画面真的“滚到了”最后区域 (距离终点 300px 以内)，且用户还在往右滚时，才触发
    if (maxScroll > 0 && scrollConfig.current >= maxScroll - 300 && e.deltaY > 0) {
        openVerticalScroll(); // 触发水墨转场
        return;
    }

    // 3. 正常横向滚动
    scrollConfig.target += e.deltaY * scrollConfig.speed;
    scrollConfig.target = Math.max(0, Math.min(scrollConfig.target, maxScroll));

    clearTimeout(snapTimeout);
    snapTimeout = setTimeout(scrollToNearestCard, 150);
}, { passive: false });

/* --- 局部修改 script.js 中的 animate 函数 --- */
// === 核心动画循环：修复滚不动及加入疏密感交互 ===
function animate() {
    // 1. 物理滚动平滑计算
    scrollConfig.current += (scrollConfig.target - scrollConfig.current) * scrollConfig.ease;

    // 防止微小偏移导致的持续计算
    if (Math.abs(scrollConfig.target - scrollConfig.current) < 0.1) {
        scrollConfig.current = scrollConfig.target;
    }

    if (track) {
        // 应用主轨道位移
        track.style.transform = `translate3d(-${scrollConfig.current}px, 0, 0)`;

        // 2. 计算滚动产生的倾斜速度 (skew)
        let velocity = scrollConfig.target - scrollConfig.current;
        let skew = velocity * 0.005;
        // 限制倾斜角度在 -5 到 5 度之间
        if (skew > 5) skew = 5;
        if (skew < -5) skew = -5;

        // 3. 处理卡片间距的疏密感与层级
        const centerScreenX = window.innerWidth / 2;
        const items = document.querySelectorAll('.item-content');

        items.forEach((item) => {
            const rect = item.getBoundingClientRect();
            const itemCenterX = rect.left + rect.width / 2;
            const distanceFromCenter = itemCenterX - centerScreenX;
            const absDistance = Math.abs(distanceFromCenter);

            // 🚀 核心：非线性疏密算法
            // 在中心 250px 保护区内不收缩，超出后开始聚拢
            let squeeze = 0;
            if (absDistance > 250) {
                const extraDist = absDistance - 250;
                // 0.5 为收缩强度，数值越大远处越挤
                squeeze = extraDist * 0.5 * (distanceFromCenter > 0 ? -1 : 1);
            }

            // 🚀 动态层级：离中心越近，Z-index 越高 (最高 1000)
            const zIndex = Math.floor(1000 - absDistance);
            // 修改 item 祖父元素 (.item) 的层级
            const parentItem = item.closest('.item');
            if (parentItem) {
                parentItem.style.zIndex = zIndex;
            }

            // 🚀 动态缩放：增加空间纵深感
            const scale = Math.max(0.85, 1 - absDistance / 4000);

            // 4. 执行变换：倾斜 + 疏密位移 + 缩放
            item.style.transform = `
                skewX(${-skew}deg) 
                translateX(${squeeze}px) 
                scale(${scale})
            `;
        });
    }

    // 更新底部进度条
    if (progress && maxScroll > 0) {
        let percentage = (scrollConfig.current / maxScroll) * 100;
        progress.style.width = `${percentage}%`;
    }

    // 检查翻转状态
    checkCardFlips();

    // 继续下一帧动画
    requestAnimationFrame(animate);
}

// === 5. 翻转判断 & 追光灯控制 ===
function checkCardFlips() {
    const centerScreenX = window.innerWidth / 2;
    const flipZone = window.innerWidth * 0.25;
    let closestDist = Infinity;
    let activeCardCenter = null;

    cardItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        const itemCenterX = rect.left + rect.width / 2;
        const distanceFromCenter = Math.abs(centerScreenX - itemCenterX);

        if (distanceFromCenter < flipZone) {
            item.classList.add('is-flipped');
            if (distanceFromCenter < closestDist) {
                closestDist = distanceFromCenter;
                activeCardCenter = itemCenterX;
            }
        } else {
            item.classList.remove('is-flipped');
        }
    });

    if (spotlight) {
        if (activeCardCenter !== null) {
            spotlight.style.opacity = 1;
            spotlight.style.left = `${activeCardCenter}px`;
        } else {
            spotlight.style.opacity = 0;
        }
    }
}

// === 6. 卡片交互 (3D悬浮视差 + 点击弹窗) ===
cardItems.forEach((card, index) => {
    // 3D 悬浮效果
    card.addEventListener('mousemove', (e) => {
        if (!card.classList.contains('is-flipped')) return;
        const content = card.querySelector('.card-flipper');
        const shine = card.querySelector('.card-shine');
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const percentX = (x - centerX) / centerX;
        const percentY = (y - centerY) / centerY;
        const maxRotate = 15;
        const rotateX = -percentY * maxRotate;
        const rotateY = percentX * maxRotate;
        content.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        if (shine) {
            const moveX = percentX * 50;
            const moveY = percentY * 50;
            shine.style.backgroundPosition = `${moveX}% ${moveY}%`;
        }
    });

    /* --- 局部修改：修复 3D 悬浮后无法翻转的问题 --- */
    card.addEventListener('mouseleave', () => {
        const content = card.querySelector('.card-flipper');
        if (content) {
            content.style.transition = 'transform 0.5s ease';

            // ✅ 核心修复：清空行内 transform 样式
            // 这样它就会重新听从 CSS 类 (.card-item.is-flipped .card-flipper) 的指挥
            content.style.transform = '';
        }
    });

    // 点击打开详情弹窗 (由于移除了拖拽，这里直接触发)
    const img = card.querySelector('.card-front .art-img');
    if (img) {
        card.addEventListener('click', () => {
            const data = cardData[index];

            modalImg.src = img.src;
            modalImg.style.display = 'block';

            if (data) {
                modalTitle.innerText = data.title;
                modalSubtitle.innerText = data.sub;
                modalDesc.innerHTML = data.desc;
            }

            // 重置并设置本地视频路径 (videos/v1.mp4 ...)
            modalVideoContainer.style.display = 'none';
            modalVideo.pause();
            modalVideo.src = "";
            const videoFileName = `videos/v${index + 1}.mp4`;

            playBtnOverlay.classList.add('show');
            playBtnOverlay.dataset.videoSrc = videoFileName;

            modal.classList.add('active');
        });
    }
});

// === 7. 详情页内视频控制 (本地文件) ===
function playVideo() {
    const videoSrc = playBtnOverlay.dataset.videoSrc;
    if (!videoSrc) return;

    modalImg.style.display = 'none';
    playBtnOverlay.classList.remove('show');

    modalVideoContainer.style.display = 'block';
    modalVideo.src = videoSrc;
    modalVideo.play();
}

// 关闭弹窗
function closeModal() {
    modal.classList.remove('active');
    modalVideo.pause();
    modalVideo.src = "";
    modalVideoContainer.style.display = 'none';
    modalImg.style.display = 'block';
}

// === 8. 背景音乐控制 ===
let isMusicPlaying = false;
function toggleSound() {
    if (isMusicPlaying) {
        bgMusic.pause();
        soundIcon.innerText = "🔇";
        soundText.innerText = "入戏";
    } else {
        bgMusic.play().catch(e => console.log("需交互后播放"));
        soundIcon.innerText = "🔊";
        soundText.innerText = "听曲";
    }
    isMusicPlaying = !isMusicPlaying;
}
// === 修复版：自动吸附逻辑（支持回到主页） ===
function scrollToNearestCard() {
    const centerScreenX = window.innerWidth / 2;

    // 1. 检查是否应该吸附到主页 (Intro)
    // 如果当前的滚动距离小于半个屏幕，说明用户想回主页
    if (scrollConfig.target < window.innerWidth * 0.4) {
        scrollConfig.target = 0;
        return; // 直接返回，不再计算卡片吸附
    }

    let closestCardIndex = -1;
    let minDistance = Infinity;

    // 2. 遍历所有卡片，找到离屏幕中心最近的那张
    cardItems.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const dist = Math.abs(centerScreenX - cardCenter);

        if (dist < minDistance) {
            minDistance = dist;
            closestCardIndex = index;
        }
    });

    // 3. 执行卡片吸附位移
    if (closestCardIndex !== -1) {
        const targetCard = cardItems[closestCardIndex];
        const rect = targetCard.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const offset = cardCenter - centerScreenX;

        scrollConfig.target += offset;
        // 确保吸附不会超出总长度边界
        scrollConfig.target = Math.max(0, Math.min(scrollConfig.target, maxScroll));
    }
}
// === 优化版：更具动力学的入场跳转 ===
function startTour() {
    const firstCard = document.querySelector('.card-item');
    if (firstCard) {
        const firstCardPos = firstCard.offsetLeft;
        const centerOffset = (window.innerWidth - firstCard.offsetWidth) / 2;
        
        // 🚀 核心修改：不仅仅是设置 target，还给 current 一个“推力”
        // 让我们稍微把 current 设置得离 target 远一点点，产生一个加速冲刺的效果
        scrollConfig.target = firstCardPos - centerOffset;
        
        // 确保边界
        scrollConfig.target = Math.max(0, Math.min(scrollConfig.target, maxScroll));

        // 💡 重点：如果当前就在主页，我们稍微改变一下缓动参数
        // 让这次特定的跳转比平时的滚轮滑动更具仪式感
        const originalEase = scrollConfig.ease;
        scrollConfig.ease = 0.05; // 调小 ease，让滑动行程更长、更优雅
        
        // 动画结束后还原 ease (3秒后还原)
        setTimeout(() => {
            scrollConfig.ease = originalEase;
        }, 3000);

        if (bgMusic.paused) toggleSound();
    }
}
/* === 在 script.js 最末尾追加以下代码 === */

/* ===========================================
   📜 V3.1 新增：竖向长卷核心逻辑
   =========================================== */
const verticalOverlay = document.getElementById('vertical-scroll-overlay');
const inkContainer = document.getElementById('ink-container');
const scrollContent = document.getElementById('scroll-content');
let verticalObserver = null;

// 1. 生成双列网格内容 (Grid Layout)
function initVerticalRows() {
    if (!scrollContent || scrollContent.children.length > 0) return;

    cardData.forEach((data, index) => {
        const item = document.createElement('div');
        item.className = 'scroll-item';

        const img = document.createElement('img');
        img.src = `card${index + 1}.jpg`; // 确保文件名对应
        img.className = 'scroll-img';
        // 点击图片，调用原来的详情页逻辑
        img.onclick = () => { if (cardItems[index]) cardItems[index].click(); };

        const text = document.createElement('div');
        text.className = 'scroll-text';
        // 只取中文名，去掉 "K - "
        const rawTitle = (data.title.split('-')[1] || data.title).trim();
        text.innerText = rawTitle;

        item.appendChild(img);
        item.appendChild(text);
        scrollContent.appendChild(item);
    });
}

// 2. 开启滚动滑入动画 (Scroll Reveal)
function startScrollObserver() {
    if (verticalObserver) verticalObserver.disconnect();
    const options = { threshold: 0.1 }; // 露出 10% 触发

    verticalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('reveal-active');
        });
    }, options);

    document.querySelectorAll('.scroll-item').forEach(item => verticalObserver.observe(item));
}

// 3. 打开竖向长卷 (触发水墨)
function openVerticalScroll() {
    // 如果元素不存在（HTML没加对），直接返回防报错
    if (!verticalOverlay) return;

    initVerticalRows();
    verticalOverlay.classList.add('active');
    if (inkContainer) inkContainer.classList.add('active');

    // 延迟 0.5s 启动观察者，等待水墨铺开
    setTimeout(() => startScrollObserver(), 500);
}

/* script.js - 修改 closeVerticalScroll 函数 */

/* script.js - 找到 closeVerticalScroll 函数并替换 */

// 接收一个参数 backToHome，默认为 false
function closeVerticalScroll(backToHome = false) {
    if (!verticalOverlay) return;

    // 1. 开始关闭遮罩
    verticalOverlay.classList.remove('active');
    if (inkContainer) inkContainer.classList.remove('active');

    // 2. 🚀 逻辑分叉
    if (backToHome) {
        // 【情况 A：点击按钮】直接瞬移回序言
        scrollConfig.target = 0;
        scrollConfig.current = 0;
        if (progress) progress.style.width = '0%';
    } else {
        // 【情况 B：滚轮向上】退回到最后一张卡片
        scrollConfig.target = maxScroll;
        // 这里不需要改 current，因为它本来就在最后的位置
    }

    // 3. 清理工作
    setTimeout(() => {
        verticalOverlay.scrollTop = 0;
        document.querySelectorAll('.scroll-item').forEach(r => r.classList.remove('reveal-active'));

        // 如果是回首页，强制重置一下轨道位置
        if (backToHome && track) track.style.transform = `translate3d(0px, 0, 0)`;

    }, 2000);
}
// 5. 🆕 监听竖向容器滚轮：向上滚回上一页
if (verticalOverlay) {
    verticalOverlay.addEventListener('wheel', (e) => {
        // 在顶部 (scrollTop 0) + 向上滚 (deltaY < 0) + 力度够大
        if (verticalOverlay.scrollTop <= 0 && e.deltaY < -30) {
            e.preventDefault();
            closeVerticalScroll();
        }
    }, { passive: false });
}