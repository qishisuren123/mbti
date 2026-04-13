/**
 * 人格基因测试 - 主应用逻辑
 */

const App = {
    currentScenario: null,
    currentQuestion: 0,
    answers: [],
    result: null,

    init() {
        this.bindEvents();
    },

    // ==================== 事件绑定 ====================
    bindEvents() {
        // 场景卡片点击
        document.querySelectorAll('.scenario-card').forEach(card => {
            card.addEventListener('click', () => {
                this.startTest(card.dataset.scenario);
            });
        });

        // 返回按钮
        document.getElementById('btn-back').addEventListener('click', () => {
            if (this.currentQuestion > 0) {
                this.currentQuestion--;
                this.answers.pop();
                this.renderQuestion();
            } else {
                this.showScreen('landing');
            }
        });

        // 分享按钮
        document.getElementById('btn-share').addEventListener('click', () => {
            this.shareResult();
        });

        // 截图按钮
        document.getElementById('btn-screenshot').addEventListener('click', () => {
            this.showToast('长按/截屏保存结果卡片即可分享');
        });

        // 重测按钮
        document.getElementById('btn-retry').addEventListener('click', () => {
            this.showScreen('landing');
        });
    },

    // ==================== 屏幕切换 ====================
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(`screen-${screenId}`).classList.add('active');
        window.scrollTo(0, 0);
    },

    // ==================== 开始测试 ====================
    startTest(scenario) {
        this.currentScenario = scenario;
        this.currentQuestion = 0;
        this.answers = [];

        // 设置场景标签
        const badgeText = { academic: '学业', work: '工作', life: '生活' };
        document.getElementById('scenario-badge').textContent = badgeText[scenario];

        this.showScreen('question');
        this.renderQuestion();
    },

    // ==================== 渲染题目 ====================
    renderQuestion() {
        const questions = QUESTIONS[this.currentScenario];
        const q = questions[this.currentQuestion];
        const total = questions.length;

        // 更新进度
        document.getElementById('progress-text').textContent = `${this.currentQuestion + 1} / ${total}`;
        document.getElementById('progress-fill').style.width = `${((this.currentQuestion + 1) / total) * 100}%`;
        document.getElementById('strand-progress').style.width = `${((this.currentQuestion) / total) * 100}%`;

        // 更新题号和题目
        document.getElementById('question-number').textContent = `Q${this.currentQuestion + 1}`;
        document.getElementById('question-text').textContent = q.q;

        // 渲染选项
        const labels = ['A', 'B', 'C', 'D'];
        const container = document.getElementById('options-container');
        container.innerHTML = '';

        q.opts.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerHTML = `<span class="option-label">${labels[i]}</span><span class="option-text">${opt.text}</span>`;
            btn.addEventListener('click', () => this.selectOption(i));
            container.appendChild(btn);
        });

        // 动画
        const body = document.getElementById('question-body');
        body.classList.remove('slide-in');
        void body.offsetWidth; // force reflow
        body.classList.add('slide-in');
    },

    // ==================== 选择选项 ====================
    selectOption(optIndex) {
        const questions = QUESTIONS[this.currentScenario];

        // 记录答案
        this.answers.push({
            qIndex: this.currentQuestion,
            optIndex: optIndex
        });

        // 高亮选中
        const btns = document.querySelectorAll('.option-btn');
        btns.forEach(b => b.classList.remove('selected'));
        btns[optIndex].classList.add('selected');

        // 延迟后进入下一题
        setTimeout(() => {
            if (this.currentQuestion < questions.length - 1) {
                this.currentQuestion++;
                this.renderQuestion();
            } else {
                this.showAnalyzing();
            }
        }, 350);
    },

    // ==================== 分析动画 ====================
    showAnalyzing() {
        this.showScreen('analyzing');

        const texts = [
            '扫描牛马特征中',
            '分析摸鱼基因浓度',
            '计算内卷指数',
            '检测甩锅倾向',
            '测量精神内耗值',
            '匹配牛马品种库',
            '生成牛马报告'
        ];

        const fill = document.getElementById('analyzing-fill');
        const textEl = document.getElementById('analyzing-text');
        let step = 0;

        const interval = setInterval(() => {
            step++;
            const progress = Math.min((step / texts.length) * 100, 100);
            fill.style.width = `${progress}%`;

            if (step <= texts.length) {
                textEl.textContent = texts[Math.min(step - 1, texts.length - 1)];
            }

            if (step >= texts.length + 1) {
                clearInterval(interval);
                this.showResult();
            }
        }, 500);
    },

    // ==================== 显示结果 ====================
    showResult() {
        // 计算结果
        this.result = GeneEngine.getResult(this.answers, this.currentScenario);
        const { gene, scores, predictions, scenario } = this.result;

        // 填充基因信息
        document.getElementById('result-scenario').textContent = SCENARIO_NAMES[scenario];
        document.getElementById('gene-name').textContent = gene.name;
        document.getElementById('gene-subtitle').textContent = gene.subtitle;
        document.getElementById('gene-description').textContent = gene.desc;

        // 渲染维度条
        this.renderDimensionBars(scores);

        // 渲染雷达图
        this.renderRadar(scores);

        // 渲染特征标签
        this.renderTraits(gene.traits);

        // 渲染跨场景推测
        this.renderPredictions(predictions);

        this.showScreen('result');
    },

    // ==================== 维度条渲染 ====================
    renderDimensionBars(scores) {
        const container = document.getElementById('dimension-bars');
        container.innerHTML = '';

        DIMENSIONS.forEach(dim => {
            const val = scores[dim.key];
            const item = document.createElement('div');
            item.className = 'dim-bar-item';
            item.innerHTML = `
                <div class="dim-bar-label">
                    <span class="dim-bar-name">${dim.name}</span>
                    <span class="dim-bar-value">${val}</span>
                </div>
                <div class="dim-bar-track">
                    <div class="dim-bar-fill" style="width: 0%; background: ${dim.color}"></div>
                </div>
            `;
            container.appendChild(item);

            // 动画延迟
            setTimeout(() => {
                item.querySelector('.dim-bar-fill').style.width = `${val}%`;
            }, 100);
        });
    },

    // ==================== 雷达图渲染 ====================
    renderRadar(scores) {
        const canvas = document.getElementById('radar-canvas');
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;

        canvas.width = 300 * dpr;
        canvas.height = 300 * dpr;
        canvas.style.width = '300px';
        canvas.style.height = '300px';
        ctx.scale(dpr, dpr);

        const cx = 150, cy = 150, radius = 110;
        const dims = DIMENSIONS;
        const n = dims.length;

        ctx.clearRect(0, 0, 300, 300);

        // 背景网格
        for (let level = 1; level <= 4; level++) {
            const r = (radius / 4) * level;
            ctx.beginPath();
            for (let i = 0; i <= n; i++) {
                const angle = (Math.PI * 2 / n) * i - Math.PI / 2;
                const x = cx + r * Math.cos(angle);
                const y = cy + r * Math.sin(angle);
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        // 轴线
        for (let i = 0; i < n; i++) {
            const angle = (Math.PI * 2 / n) * i - Math.PI / 2;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(cx + radius * Math.cos(angle), cy + radius * Math.sin(angle));
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        // 数据区域
        ctx.beginPath();
        for (let i = 0; i <= n; i++) {
            const idx = i % n;
            const angle = (Math.PI * 2 / n) * idx - Math.PI / 2;
            const val = scores[dims[idx].key] / 100;
            const x = cx + radius * val * Math.cos(angle);
            const y = cy + radius * val * Math.sin(angle);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();

        // 渐变填充
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        gradient.addColorStop(0, 'rgba(124, 92, 255, 0.3)');
        gradient.addColorStop(1, 'rgba(0, 212, 170, 0.1)');
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.strokeStyle = 'rgba(124, 92, 255, 0.8)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // 数据点
        for (let i = 0; i < n; i++) {
            const angle = (Math.PI * 2 / n) * i - Math.PI / 2;
            const val = scores[dims[i].key] / 100;
            const x = cx + radius * val * Math.cos(angle);
            const y = cy + radius * val * Math.sin(angle);

            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fillStyle = dims[i].color;
            ctx.fill();
        }

        // 标签
        ctx.font = '12px "Noto Sans SC", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        for (let i = 0; i < n; i++) {
            const angle = (Math.PI * 2 / n) * i - Math.PI / 2;
            const labelR = radius + 22;
            const x = cx + labelR * Math.cos(angle);
            const y = cy + labelR * Math.sin(angle);
            ctx.fillStyle = dims[i].color;
            ctx.fillText(dims[i].name, x, y);
        }
    },

    // ==================== 特征标签渲染 ====================
    renderTraits(traits) {
        const container = document.getElementById('gene-traits');
        container.innerHTML = '';

        traits.forEach(trait => {
            const tag = document.createElement('span');
            if (trait.startsWith('+')) {
                tag.className = 'trait-tag positive';
                tag.textContent = trait.slice(1);
            } else if (trait.startsWith('-')) {
                tag.className = 'trait-tag negative';
                tag.textContent = trait.slice(1);
            } else {
                tag.className = 'trait-tag neutral';
                tag.textContent = trait;
            }
            container.appendChild(tag);
        });
    },

    // ==================== 跨场景推测渲染 ====================
    renderPredictions(predictions) {
        const container = document.getElementById('prediction-cards');
        container.innerHTML = '';

        Object.entries(predictions).forEach(([scenario, pred]) => {
            const card = document.createElement('div');
            card.className = 'prediction-card';
            card.innerHTML = `
                <div class="prediction-card-header">
                    <span class="prediction-scenario">${SCENARIO_ICONS[scenario]} ${SCENARIO_NAMES[scenario]}</span>
                    <span class="prediction-confidence">置信度 ${pred.confidence}%</span>
                </div>
                <div class="prediction-gene">${pred.gene.name}</div>
                <div class="prediction-desc">${pred.gene.subtitle}</div>
                <div class="prediction-cta">👆 点这里测测你在这个场景是什么牛马</div>
            `;
            card.addEventListener('click', () => {
                this.startTest(scenario);
            });
            container.appendChild(card);
        });
    },

    // ==================== 分享功能 ====================
    shareResult() {
        if (!this.result) return;

        const { gene, scenario, scores } = this.result;

        // 找出最高和最低维度
        const dimEntries = DIMENSIONS.map(d => ({ name: d.name, value: scores[d.key] }));
        dimEntries.sort((a, b) => b.value - a.value);
        const highest = dimEntries[0];
        const lowest = dimEntries[dimEntries.length - 1];

        const text = [
            `🐂 我的 NMTI 牛马测试结果：`,
            `${SCENARIO_NAMES[scenario]}里我是【${gene.name}】`,
            `"${gene.subtitle}"`,
            ``,
            `最强属性：${highest.name} ${highest.value}`,
            `最弱属性：${lowest.name} ${lowest.value}`,
            ``,
            `你是哪种牛马？👉 qishisuren123.github.io/mbti`,
            `#NMTI牛马测试 #evomap`
        ].join('\n');

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                this.showToast('分享文案已复制到剪贴板！');
            }).catch(() => {
                this.fallbackCopy(text);
            });
        } else {
            this.fallbackCopy(text);
        }
    },

    fallbackCopy(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            this.showToast('分享文案已复制到剪贴板！');
        } catch (e) {
            this.showToast('复制失败，请手动复制');
        }
        document.body.removeChild(textarea);
    },

    // ==================== Toast ====================
    showToast(msg) {
        const toast = document.getElementById('toast');
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2500);
    }
};

// 启动
document.addEventListener('DOMContentLoaded', () => App.init());
