/**
 * 人格基因评分引擎
 * 负责计算维度得分、匹配基因、跨场景推测
 */

const GeneEngine = {
    /**
     * 计算原始维度得分
     * @param {Array} answers - 用户作答数组 [{qIndex, optIndex}, ...]
     * @param {string} scenario - 场景标识
     * @returns {Object} 各维度原始总分
     */
    calcRawScores(answers, scenario) {
        const scores = { S: 0, E: 0, R: 0, X: 0, C: 0, P: 0, M: 0, I: 0 };
        const questions = QUESTIONS[scenario];

        answers.forEach(({ qIndex, optIndex }) => {
            const q = questions[qIndex];
            if (!q) return;
            const opt = q.opts[optIndex];
            if (!opt || !opt.scores) return;

            Object.entries(opt.scores).forEach(([dim, val]) => {
                scores[dim] += val;
            });
        });

        return scores;
    },

    /**
     * 将原始分数归一化到 0-100
     * 使用基于实际题目的动态范围
     */
    normalizeScores(rawScores, scenario) {
        const questions = QUESTIONS[scenario];
        // 计算每个维度的理论最大最小值
        const ranges = {};
        DIMENSIONS.forEach(d => {
            let min = 0, max = 0;
            questions.forEach(q => {
                const vals = q.opts.map(o => (o.scores[d.key] || 0));
                min += Math.min(...vals);
                max += Math.max(...vals);
            });
            ranges[d.key] = { min, max };
        });

        const normalized = {};
        DIMENSIONS.forEach(d => {
            const { min, max } = ranges[d.key];
            const range = max - min;
            if (range === 0) {
                normalized[d.key] = 50;
            } else {
                // 归一化到 0-100
                normalized[d.key] = Math.round(((rawScores[d.key] - min) / range) * 100);
                // 加入少量随机偏移以增加基因多样性 (±3)
                normalized[d.key] += Math.round((Math.random() - 0.5) * 6);
                normalized[d.key] = Math.max(0, Math.min(100, normalized[d.key]));
            }
        });

        return normalized;
    },

    /**
     * 使用余弦相似度匹配最接近的基因
     */
    matchGene(normalizedScores, scenario) {
        const genes = GENES[scenario];
        let bestGene = null;
        let bestSimilarity = -Infinity;

        // 构建用户向量
        const userVec = DIMENSIONS.map(d => normalizedScores[d.key]);

        genes.forEach(gene => {
            const geneVec = DIMENSIONS.map(d => gene.profile[d.key]);
            const similarity = this.cosineSimilarity(userVec, geneVec);

            if (similarity > bestSimilarity) {
                bestSimilarity = similarity;
                bestGene = gene;
            }
        });

        return { gene: bestGene, similarity: bestSimilarity };
    },

    /**
     * 余弦相似度
     */
    cosineSimilarity(a, b) {
        let dotProduct = 0;
        let normA = 0;
        let normB = 0;

        for (let i = 0; i < a.length; i++) {
            dotProduct += a[i] * b[i];
            normA += a[i] * a[i];
            normB += b[i] * b[i];
        }

        if (normA === 0 || normB === 0) return 0;
        return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
    },

    /**
     * 跨场景推测
     * 对维度得分应用转换权重并加入噪声
     */
    predictCrossScenario(normalizedScores, fromScenario, toScenario) {
        const weightKey = `${fromScenario}_to_${toScenario}`;
        const weights = CROSS_PREDICTION_WEIGHTS[weightKey];
        if (!weights) return null;

        const predicted = {};
        DIMENSIONS.forEach(d => {
            const base = normalizedScores[d.key];
            const weight = weights[d.key];
            // 应用转换权重 + 向50回归 + 随机噪声
            const regressed = base * weight + 50 * (1 - weight);
            const noise = (Math.random() - 0.5) * 15;
            predicted[d.key] = Math.max(0, Math.min(100, Math.round(regressed + noise)));
        });

        return predicted;
    },

    /**
     * 获取完整结果
     */
    getResult(answers, scenario) {
        const rawScores = this.calcRawScores(answers, scenario);
        const normalized = this.normalizeScores(rawScores, scenario);
        const { gene, similarity } = this.matchGene(normalized, scenario);

        // 跨场景推测
        const otherScenarios = Object.keys(QUESTIONS).filter(s => s !== scenario);
        const predictions = {};

        otherScenarios.forEach(targetScenario => {
            const predictedScores = this.predictCrossScenario(normalized, scenario, targetScenario);
            const { gene: predictedGene } = this.matchGene(predictedScores, targetScenario);
            predictions[targetScenario] = {
                gene: predictedGene,
                scores: predictedScores,
                confidence: Math.round(
                    (CROSS_PREDICTION_WEIGHTS[`${scenario}_to_${targetScenario}`]
                        ? Object.values(CROSS_PREDICTION_WEIGHTS[`${scenario}_to_${targetScenario}`]).reduce((a, b) => a + b, 0) / 8
                        : 0.7) * 100
                )
            };
        });

        return {
            scenario,
            gene,
            similarity,
            scores: normalized,
            rawScores,
            predictions
        };
    }
};
