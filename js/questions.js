/**
 * NMTI 牛马人格测试题库
 * 8维度: S(谋略) E(共情) R(冒险) X(社交) C(控制) P(表达) M(底线) I(独立)
 * 每题≤30中文字，选项精短有梗
 */

const QUESTIONS = {
    // ==================== 学业场景 ====================
    academic: [
        {
            q: "期末分组，学霸邀你入组但好朋友落单了",
            opts: [
                { text: "果断上车，朋友会理解的", scores: { S: 2, E: -1, I: 1 } },
                { text: "带朋友一起上车", scores: { X: 2, E: 1, S: 1 } },
                { text: "陪朋友，成绩差点就差点", scores: { E: 2, M: 1, I: -1 } },
                { text: "两边都答应，到时候再说", scores: { S: 1, R: 2, M: -1 } }
            ]
        },
        {
            q: "室友偷偷用你的付费网课账号",
            opts: [
                { text: "直接改密码，啥都不说", scores: { C: 2, I: 1, X: -1 } },
                { text: "委婉提一嘴让TA自己买", scores: { P: 1, E: 1, M: 1 } },
                { text: "无所谓，反正我也用不完", scores: { E: 2, C: -1, I: -1 } },
                { text: "记着，以后有事找TA帮忙", scores: { S: 2, C: 1, M: -1 } }
            ]
        },
        {
            q: "小组作业你写了80%，组长说是集体成果",
            opts: [
                { text: "私下找老师说明情况", scores: { C: 2, I: 1, X: -1 } },
                { text: "汇报时插话强调我的部分", scores: { P: 2, C: 1, R: 1 } },
                { text: "算了，分数一样就行", scores: { E: 1, M: 1, C: -1 } },
                { text: "记着，下次让组长还人情", scores: { S: 2, X: 1, R: -1 } }
            ]
        },
        {
            q: "考试前夜收到疑似泄题资料",
            opts: [
                { text: "看完背下来，不寒碜", scores: { R: 2, S: 1, M: -2 } },
                { text: "扫一眼方向但不背原题", scores: { S: 2, R: 1, M: 0 } },
                { text: "举报！这不公平", scores: { M: 2, I: 1, X: -1 } },
                { text: "不看也不举报，与我无关", scores: { I: 1, M: 1, E: 1 } }
            ]
        },
        {
            q: "一门课给分超高但没用，另一门难但有用",
            opts: [
                { text: "选高分课，GPA是爹", scores: { S: 2, R: -1, C: 1 } },
                { text: "选有用的，学到东西才是真", scores: { I: 2, M: 1, R: 1 } },
                { text: "都选，大不了退一门", scores: { R: 2, S: 1, C: -1 } },
                { text: "先问学长哪个性价比高", scores: { X: 2, S: 1, I: -1 } }
            ]
        },
        {
            q: "导师让你假期帮师兄改论文，但你有DDL",
            opts: [
                { text: "先帮师兄，导师面子大", scores: { X: 2, E: 1, I: -1 } },
                { text: "直说我忙，找别人吧", scores: { I: 2, P: 1, X: -1 } },
                { text: "答应但随便改改交差", scores: { S: 2, M: -1, R: 1 } },
                { text: "自己的先赶完再熬夜帮", scores: { E: 2, C: 1, I: 0 } }
            ]
        },
        {
            q: "答辩时评委问了个你完全不懂的问题",
            opts: [
                { text: "自信bluff过去", scores: { S: 2, P: 2, R: 1 } },
                { text: "坦白说不懂，回去学", scores: { M: 2, P: 1, E: 1 } },
                { text: "反问教授能否换个问题", scores: { R: 2, C: 1, X: 1 } },
                { text: "沉默三秒说我需要研究", scores: { I: 1, C: 1, P: -1 } }
            ]
        },
        {
            q: "发现同学论文和网上一篇高度重合",
            opts: [
                { text: "私下告诉TA赶紧改", scores: { E: 2, X: 1, M: 0 } },
                { text: "匿名举报", scores: { M: 2, I: 1, E: -1 } },
                { text: "不管，跟我没关系", scores: { I: 2, M: -1, E: -1 } },
                { text: "截图存着，以后可能有用", scores: { S: 2, C: 1, M: -1 } }
            ]
        },
        {
            q: "保研名额只剩一个，你和好朋友都够格",
            opts: [
                { text: "友情归友情，这次必须争", scores: { C: 2, I: 2, E: -1 } },
                { text: "嘴上说你去吧，暗中准备", scores: { S: 2, P: -1, M: -1 } },
                { text: "真心让给TA，我考研也行", scores: { E: 2, M: 2, C: -1 } },
                { text: "一起找老师争取多一个名额", scores: { X: 2, R: 1, E: 1 } }
            ]
        },
        {
            q: "上课发现老师讲的内容有明显错误",
            opts: [
                { text: "当场举手指出", scores: { R: 2, P: 2, C: 1 } },
                { text: "下课后私下跟老师说", scores: { E: 2, M: 1, X: 0 } },
                { text: "发班群让大家讨论", scores: { X: 2, P: 1, S: 1 } },
                { text: "默默记下，考试写正确答案", scores: { S: 2, I: 1, M: 0 } }
            ]
        },
        {
            q: "你发了一篇不错的论文，发朋友圈吗",
            opts: [
                { text: "低调转发：记录一下", scores: { P: 1, S: 1, X: 1 } },
                { text: "不发，怕被说装", scores: { I: 2, P: -1, E: 1 } },
                { text: "精心编辑文案大方晒", scores: { P: 2, X: 2, C: 0 } },
                { text: "只发导师能看到的分组", scores: { S: 2, X: 1, C: 1 } }
            ]
        },
        {
            q: "你的毕设选题被另一个同学抢了",
            opts: [
                { text: "找导师理论，我先想到的", scores: { C: 2, P: 1, I: 1 } },
                { text: "换个更好的题目打脸TA", scores: { R: 2, S: 1, C: 1 } },
                { text: "私下沟通看能不能协调", scores: { X: 2, E: 1, M: 1 } },
                { text: "算了再想一个差不多的", scores: { E: 1, I: 1, C: -1 } }
            ]
        },
        {
            q: "竞选学生会，对手在背后说你坏话拉票",
            opts: [
                { text: "收集证据公开反击", scores: { C: 2, R: 2, S: 1 } },
                { text: "更努力拉票但不搞黑手段", scores: { M: 1, C: 1, I: 1 } },
                { text: "也去打听对手黑料备着", scores: { S: 2, R: 1, M: -1 } },
                { text: "退出，这破事不值得", scores: { I: 2, M: 1, C: -1 } }
            ]
        },
        {
            q: "替同学代课被老师点名发现了",
            opts: [
                { text: "坦白说是帮朋友来的", scores: { M: 1, E: 2, P: 1 } },
                { text: "装听错名字糊弄过去", scores: { S: 2, R: 2, M: -1 } },
                { text: "以后再也不帮这种忙", scores: { I: 2, M: 1, E: -1 } },
                { text: "偷偷溜走装作不存在", scores: { R: 1, I: 1, P: -1 } }
            ]
        },
        {
            q: "图书馆只剩一个插座位，你和人同时到",
            opts: [
                { text: "先坐下，先到先得", scores: { C: 2, R: 1, E: -1 } },
                { text: "你先用吧，我找别的", scores: { E: 2, I: 1, C: -1 } },
                { text: "商量一人用一半时间", scores: { X: 2, E: 1, S: 1 } },
                { text: "假装等人路过，观察对方", scores: { S: 2, P: -1, R: 1 } }
            ]
        },
        {
            q: "导师叫你假期来加班，你已买好回家票",
            opts: [
                { text: "退票，好的老师", scores: { E: 1, C: -2, I: -1 } },
                { text: "编个理由说不在本地", scores: { S: 2, R: 1, M: -1 } },
                { text: "直说有安排但节后补上", scores: { I: 2, P: 1, M: 1 } },
                { text: "答应来但到时候拖着", scores: { S: 1, R: 1, M: -1 } }
            ]
        },
        {
            q: "别人问你GPA多少",
            opts: [
                { text: "看谁问的再决定说不说", scores: { S: 2, C: 1, X: 0 } },
                { text: "大方告诉，没啥好藏的", scores: { P: 2, X: 1, I: 1 } },
                { text: "往低了说一点免得遭嫉", scores: { S: 1, E: 1, R: -1 } },
                { text: "\"还行吧\"带过去", scores: { I: 1, P: -1, X: 0 } }
            ]
        },
        {
            q: "发现课程评分标准有bug可以刷高分",
            opts: [
                { text: "闷声发大财，自己偷偷用", scores: { S: 2, R: 1, M: -1, I: 1 } },
                { text: "分享给几个关系好的", scores: { X: 2, E: 1, S: 0 } },
                { text: "告诉老师让TA修复", scores: { M: 2, E: 1, S: -1 } },
                { text: "全班群里发，快乐要一起", scores: { X: 2, P: 2, R: 1 } }
            ]
        },
        {
            q: "论文被审稿人狠批了一通",
            opts: [
                { text: "这审稿人水平不行", scores: { C: 2, I: 2, P: 1 } },
                { text: "自我怀疑，我是不是真不行", scores: { E: 1, C: -2, I: -1 } },
                { text: "冷静分析哪些批评有道理", scores: { M: 1, I: 1, S: 1 } },
                { text: "先骂两句再改", scores: { P: 2, R: 1, E: 0 } }
            ]
        },
        {
            q: "同学借笔记，但TA从不来上课",
            opts: [
                { text: "不借，不上课还想白嫖？", scores: { M: 2, I: 1, C: 1 } },
                { text: "借，但发个拍糊了的版本", scores: { S: 2, E: 0, R: 1 } },
                { text: "大方借给TA", scores: { E: 2, X: 1, C: -1 } },
                { text: "借，但让TA请我吃饭", scores: { S: 1, X: 1, C: 1 } }
            ]
        },
        {
            q: "图书馆旁边有人视频外放",
            opts: [
                { text: "直接说请你小声点", scores: { C: 2, P: 1, R: 1 } },
                { text: "默默收拾换个位置", scores: { I: 1, E: 1, C: -1 } },
                { text: "用更大噪音压过TA", scores: { R: 2, P: 2, M: -1 } },
                { text: "找管理员处理", scores: { S: 1, M: 1, X: 0 } }
            ]
        },
        {
            q: "匿名给最讨厌的教授打分，你会",
            opts: [
                { text: "详细列问题并给建议", scores: { M: 2, P: 1, I: 1 } },
                { text: "毫不留情吐槽到底", scores: { P: 2, R: 2, C: 1 } },
                { text: "给低分不写评语怕被猜到", scores: { S: 2, R: -1, I: 1 } },
                { text: "算了不评了给个中等", scores: { E: 1, C: -1, M: 0 } }
            ]
        },
        {
            q: "实验数据全丢了，你第一反应",
            opts: [
                { text: "骂一句然后想办法恢复", scores: { R: 1, I: 2, P: 1 } },
                { text: "崩溃大哭找人诉苦", scores: { P: 2, E: 1, I: -1 } },
                { text: "冷静想有没有备份可能", scores: { S: 1, C: 1, I: 1 } },
                { text: "编一组差不多的糊弄过去", scores: { R: 2, S: 2, M: -2 } }
            ]
        },
        {
            q: "学术会议上发现大佬报告有错误",
            opts: [
                { text: "当场提问指出", scores: { R: 2, P: 2, C: 1 } },
                { text: "会后私下跟大佬说", scores: { E: 2, S: 1, X: 1 } },
                { text: "委婉引导大佬自己发现", scores: { S: 2, X: 1, E: 1 } },
                { text: "不说了万一我理解错了", scores: { I: 1, R: -1, M: 0 } }
            ]
        },
        {
            q: "有人造谣说你论文数据造假",
            opts: [
                { text: "晒原始数据自证清白", scores: { P: 2, C: 2, R: 1 } },
                { text: "找到造谣者私下警告", scores: { C: 2, S: 1, R: 1 } },
                { text: "让导师帮我澄清", scores: { X: 1, I: -1, S: 1 } },
                { text: "不理会，清者自清", scores: { I: 2, M: 1, P: -1 } }
            ]
        },
        {
            q: "穿越回大一，你最想对自己说啥",
            opts: [
                { text: "别太老实，该争就争", scores: { C: 2, S: 1, I: 1 } },
                { text: "多交朋友，人脉比成绩重要", scores: { X: 2, E: 1, S: 1 } },
                { text: "享受校园时光别那么卷", scores: { E: 1, I: 1, R: 1 } },
                { text: "早点定方向少走弯路", scores: { S: 2, C: 1, M: 1 } }
            ]
        },
        {
            q: "给导师取个背地里的外号",
            opts: [
                { text: "甲方爸爸——要求多不给钱", scores: { P: 2, R: 1, X: 1 } },
                { text: "人间清醒——严格但有理", scores: { E: 1, M: 2, I: 1 } },
                { text: "不敢取万一传出去完了", scores: { S: 1, R: -1, C: -1 } },
                { text: "PUA大师——精神控制一流", scores: { P: 2, R: 2, C: 1 } }
            ]
        },
        {
            q: "成绩排名突然全校公开透明了",
            opts: [
                { text: "无所谓我本来就不差", scores: { C: 2, P: 1, I: 1 } },
                { text: "赶紧突击不能丢人", scores: { X: 1, C: 1, R: 1 } },
                { text: "反对！成绩是隐私", scores: { I: 2, M: 1, P: 1 } },
                { text: "趁机看\"没怎么学\"的人几分", scores: { S: 2, X: 1, C: 1 } }
            ]
        },
        {
            q: "实验室有人天天偷你的试剂耗材",
            opts: [
                { text: "贴名字宣示主权", scores: { C: 1, P: 1, I: 1 } },
                { text: "群里阴阳怪气提一嘴", scores: { P: 2, S: 1, X: 1 } },
                { text: "直接锁柜子完事", scores: { I: 2, C: 2, X: -1 } },
                { text: "跟导师告状让导师管", scores: { X: 1, E: 0, C: 1 } }
            ]
        },
        {
            q: "你的研究方向突然火了很多人来套思路",
            opts: [
                { text: "大部分来套路的，防着点", scores: { S: 2, C: 2, X: -1 } },
                { text: "学术交流挺好的多聊聊", scores: { X: 2, E: 2, I: -1 } },
                { text: "来者不拒但核心不分享", scores: { S: 1, X: 1, M: 1 } },
                { text: "只跟导师认可的人交流", scores: { I: 1, C: 1, X: 0 } }
            ]
        }
    ],

    // ==================== 工作场景 ====================
    work: [
        {
            q: "领导安排你最讨厌的人跟你搭档",
            opts: [
                { text: "无所谓，打工而已", scores: { I: 2, M: 1, C: 0 } },
                { text: "表面和气暗中划清界限", scores: { S: 2, C: 1, X: 0 } },
                { text: "找领导委婉想换人", scores: { P: 1, C: 1, I: 1 } },
                { text: "想办法让对方主动退出", scores: { S: 2, C: 2, M: -1 } }
            ]
        },
        {
            q: "无意间看到同事工资比你高30%",
            opts: [
                { text: "装没看到，默默更新简历", scores: { S: 2, I: 1, R: 1 } },
                { text: "直接找领导谈涨薪", scores: { C: 2, P: 1, R: 2 } },
                { text: "不爽但安慰自己各有所长", scores: { E: 1, I: 1, C: -1 } },
                { text: "打听更多人的搞清楚行情", scores: { S: 1, X: 2, C: 1 } }
            ]
        },
        {
            q: "开会时你的方案被同事当众否定",
            opts: [
                { text: "据理力争当场辩论", scores: { C: 2, P: 2, R: 1 } },
                { text: "微笑说好的，回去憋大招", scores: { S: 2, C: 1, P: -1 } },
                { text: "虚心接受确实可能有问题", scores: { E: 2, M: 1, C: -1 } },
                { text: "会后私下找那人聊聊", scores: { X: 2, S: 1, E: 1 } }
            ]
        },
        {
            q: "发现公司流程有严重问题但没人管",
            opts: [
                { text: "写方案直接交给高层", scores: { R: 2, C: 2, I: 1 } },
                { text: "先跟直属领导提", scores: { S: 2, X: 1, M: 1 } },
                { text: "不归我管，多一事不如少一事", scores: { I: 1, M: -1, R: -1 } },
                { text: "私下吐槽完拉倒", scores: { P: 1, X: 1, C: -1 } }
            ]
        },
        {
            q: "新来的实习生天天帮你带咖啡讨好你",
            opts: [
                { text: "TA只是想学东西，人不错", scores: { E: 2, X: 1, S: -1 } },
                { text: "有目的但能理解，收着", scores: { S: 2, C: 1, M: 0 } },
                { text: "直说不用这样正常相处", scores: { M: 2, P: 1, I: 1 } },
                { text: "享受但不会给TA特殊待遇", scores: { C: 2, S: 1, X: 0 } }
            ]
        },
        {
            q: "同事甩锅给你领导正在气头上",
            opts: [
                { text: "当场澄清不是我的问题", scores: { P: 2, C: 2, R: 1 } },
                { text: "先扛着回头找同事算账", scores: { S: 2, C: 1, E: 0 } },
                { text: "默默接受大局为重", scores: { E: 2, M: 1, I: -1 } },
                { text: "\"无意\"转发之前的分工邮件", scores: { S: 2, R: 1, M: 0 } }
            ]
        },
        {
            q: "公司年会要表演节目",
            opts: [
                { text: "主动报名，露脸好机会", scores: { X: 2, P: 2, R: 1 } },
                { text: "坚决不去谁爱去谁去", scores: { I: 2, P: -1, X: -1 } },
                { text: "被叫到就参加随大流", scores: { E: 1, X: 0, I: -1 } },
                { text: "负责幕后台前让别人来", scores: { S: 1, C: 1, X: 1 } }
            ]
        },
        {
            q: "下属当着其他人面质疑你的决定",
            opts: [
                { text: "当场压下去权威不能丢", scores: { C: 2, P: 1, R: 1 } },
                { text: "认真听完再决定改不改", scores: { E: 2, M: 1, I: 1 } },
                { text: "会后单独谈TA这么做不合适", scores: { S: 2, C: 1, X: 0 } },
                { text: "表面不气心里记上了", scores: { S: 1, C: 1, P: -1 } }
            ]
        },
        {
            q: "升职机会但得去偏远地区出差半年",
            opts: [
                { text: "二话不说接了升职最重要", scores: { R: 2, C: 2, I: 1 } },
                { text: "了解详情后再决定", scores: { S: 2, M: 1, I: 1 } },
                { text: "跟家人商量后再说", scores: { E: 2, X: 1, I: -1 } },
                { text: "婉拒生活比升职重要", scores: { I: 1, M: 1, R: -1 } }
            ]
        },
        {
            q: "发现领导在报销中虚报费用",
            opts: [
                { text: "装没看到跟我没关系", scores: { S: 2, I: 1, M: -1 } },
                { text: "匿名举报到合规部门", scores: { M: 2, R: 1, I: 2 } },
                { text: "截图存着以后可能有用", scores: { S: 2, C: 2, M: -1 } },
                { text: "私下暗示领导我知道了", scores: { S: 1, R: 2, C: 2 } }
            ]
        },
        {
            q: "领导一直给你敬酒但你酒量不行",
            opts: [
                { text: "硬喝不能扫领导面子", scores: { X: 1, E: 1, I: -2 } },
                { text: "直说不能喝以茶代酒", scores: { I: 2, P: 1, M: 1 } },
                { text: "假装接电话溜出去", scores: { S: 2, R: 1, X: 0 } },
                { text: "找能喝的同事帮忙挡", scores: { X: 2, S: 1, E: 0 } }
            ]
        },
        {
            q: "刚入职就被老员工使唤做杂事",
            opts: [
                { text: "忍一阵先立足再说", scores: { S: 2, E: 1, I: -1 } },
                { text: "划清界限我不是来伺候人的", scores: { I: 2, C: 2, P: 1 } },
                { text: "做了但记住这些人", scores: { S: 1, C: 1, M: -1 } },
                { text: "笑着做完然后找人吐槽", scores: { X: 2, P: 1, E: 1 } }
            ]
        },
        {
            q: "你的成果被领导拿去汇报没提你名字",
            opts: [
                { text: "找机会在高层面前提到", scores: { S: 2, C: 1, R: 1 } },
                { text: "直接跟领导谈要求署名", scores: { C: 2, P: 1, I: 1 } },
                { text: "算了领导用就用吧", scores: { E: 1, I: -1, C: -1 } },
                { text: "以后重要的先群发邮件", scores: { S: 2, C: 2, R: 0 } }
            ]
        },
        {
            q: "裁员风声很紧",
            opts: [
                { text: "马上投简历两手准备", scores: { S: 2, R: 1, I: 2 } },
                { text: "比平时更努力表现", scores: { C: 2, E: 0, I: -1 } },
                { text: "暗中打听内部消息", scores: { X: 2, S: 1, R: 0 } },
                { text: "正常上班该来的总会来", scores: { I: 1, M: 1, R: -1 } }
            ]
        },
        {
            q: "匿名给领导的领导力打分满分10",
            opts: [
                { text: "真实打分哪怕只有3分", scores: { M: 2, P: 2, R: 1 } },
                { text: "给7-8分留点面子", scores: { S: 2, E: 1, X: 1 } },
                { text: "给10分万一不匿名呢", scores: { S: 1, R: -1, I: -1 } },
                { text: "看别人给多少再填", scores: { X: 1, S: 1, I: -1 } }
            ]
        },
        {
            q: "周五5:55领导说这个周一要",
            opts: [
                { text: "二话不说加班搞定", scores: { E: 1, C: -1, I: -1 } },
                { text: "假装没看到周一早起弄", scores: { S: 2, R: 1, I: 1 } },
                { text: "回复收到然后周末抽空", scores: { S: 1, E: 1, M: 1 } },
                { text: "直接问清楚优先级和DDL", scores: { I: 2, C: 1, P: 1 } }
            ]
        },
        {
            q: "团队里有人能力强但极难相处",
            opts: [
                { text: "能力第一其他的我协调", scores: { S: 2, E: 1, C: 1 } },
                { text: "找机会让TA去更合适的岗位", scores: { C: 2, S: 1, I: 1 } },
                { text: "一对一谈话尝试改变TA", scores: { X: 2, E: 1, P: 1 } },
                { text: "影响团队就劝退", scores: { C: 2, M: 1, R: 1 } }
            ]
        },
        {
            q: "竞争对手开两倍工资挖你",
            opts: [
                { text: "直接跳钱才是真的", scores: { R: 2, I: 2, M: -1 } },
                { text: "拿offer跟现公司谈涨薪", scores: { S: 2, C: 2, R: 1 } },
                { text: "综合考虑发展空间再定", scores: { S: 1, M: 1, I: 1 } },
                { text: "有感情不想走", scores: { E: 2, M: 2, R: -1 } }
            ]
        },
        {
            q: "开会有人一直打断你说话",
            opts: [
                { text: "请让我说完，然后继续", scores: { C: 2, P: 2, I: 1 } },
                { text: "不说了爱谁谁", scores: { I: 1, P: -1, C: -1 } },
                { text: "等TA说完再用更好的盖过去", scores: { S: 2, C: 1, R: 1 } },
                { text: "私下找TA说以后注意", scores: { X: 1, E: 1, S: 1 } }
            ]
        },
        {
            q: "隐身24小时在办公室你最想干啥",
            opts: [
                { text: "听领导关门后说什么", scores: { S: 2, C: 2, R: 1 } },
                { text: "看看谁背后说我坏话", scores: { S: 1, C: 1, P: 1 } },
                { text: "纯摸鱼终于不用装了", scores: { I: 2, R: 1, M: 0 } },
                { text: "看看公司到底怎么运作的", scores: { S: 1, I: 1, C: 1 } }
            ]
        },
        {
            q: "你心目中理想的辞职方式",
            opts: [
                { text: "提前交接然后体面走人", scores: { M: 2, E: 1, S: 1 } },
                { text: "最需要你的时候提辞职谈条件", scores: { S: 2, C: 2, M: -1 } },
                { text: "写封走心告别信", scores: { P: 2, E: 2, X: 1 } },
                { text: "安静消失别搞形式", scores: { I: 2, P: -1, X: -1 } }
            ]
        },
        {
            q: "你觉得不靠谱的同事被提拔了",
            opts: [
                { text: "TA肯定有我不知道的手段", scores: { S: 2, C: 1, M: 0 } },
                { text: "说明公司看人标准有问题", scores: { M: 2, P: 1, C: 1 } },
                { text: "也许TA有我没看到的优点", scores: { E: 2, M: 1, I: 0 } },
                { text: "无所谓做好自己就行", scores: { I: 2, M: 1, R: 0 } }
            ]
        },
        {
            q: "你加班做的方案别人用AI十分钟搞定",
            opts: [
                { text: "焦虑赶紧学AI工具", scores: { R: 1, S: 2, C: 0 } },
                { text: "无所谓我的质量更高", scores: { I: 2, C: 2, M: 1 } },
                { text: "以后我也用别跟自己过不去", scores: { S: 2, R: 1, I: 1 } },
                { text: "跟领导强调人工打磨的价值", scores: { P: 1, C: 1, M: 1 } }
            ]
        },
        {
            q: "工作中可以有一项超能力你选",
            opts: [
                { text: "读心术——知道所有人想法", scores: { S: 2, C: 2, X: 1 } },
                { text: "时间暂停——永远不赶DDL", scores: { I: 2, R: 1, C: 1 } },
                { text: "说服力MAX——提啥都过", scores: { P: 2, X: 2, C: 1 } },
                { text: "隐身——摸鱼不被发现", scores: { R: 2, I: 1, M: -1 } }
            ]
        },
        {
            q: "同事微信群里明显阴阳怪气针对你",
            opts: [
                { text: "截图保存但不回应", scores: { S: 2, C: 1, I: 1 } },
                { text: "更阴阳地回击", scores: { P: 2, R: 2, M: -1 } },
                { text: "私聊对方问有事直说", scores: { I: 1, P: 1, C: 1 } },
                { text: "群里装没看到转移话题", scores: { S: 1, X: 1, E: 1 } }
            ]
        },
        {
            q: "厕所只剩一坑你和同事同时到门口",
            opts: [
                { text: "假装看手机让TA先", scores: { E: 2, X: 1, S: 1 } },
                { text: "加速冲进去生理需求优先", scores: { R: 2, C: 1, I: 1 } },
                { text: "你先请，然后尴尬站着", scores: { E: 1, P: -1, I: -1 } },
                { text: "转身去别的楼层避免尴尬", scores: { S: 2, I: 1, X: -1 } }
            ]
        },
        {
            q: "公司匿名树洞让你吐槽一件事",
            opts: [
                { text: "某某人表面一套背后一套", scores: { P: 2, S: 1, C: 1 } },
                { text: "领导不懂还瞎指挥", scores: { P: 2, R: 1, M: 1 } },
                { text: "不用怕不是真匿名", scores: { S: 2, R: -1, C: 1 } },
                { text: "感谢某个帮过我的人", scores: { E: 2, X: 1, M: 1 } }
            ]
        },
        {
            q: "邮件暗示你要被转去不想去的部门",
            opts: [
                { text: "找领导探探口风", scores: { S: 2, X: 1, C: 1 } },
                { text: "立刻找外部机会", scores: { R: 2, I: 2, S: 1 } },
                { text: "联系想去的部门领导自荐", scores: { S: 2, X: 2, R: 1 } },
                { text: "等正式通知也许不是真的", scores: { I: 1, M: 1, R: -1 } }
            ]
        },
        {
            q: "领导问你对某个同事的真实评价",
            opts: [
                { text: "说真话但注意措辞", scores: { M: 1, S: 1, P: 1 } },
                { text: "只说好的不说坏的", scores: { E: 2, S: 1, M: 0 } },
                { text: "反问领导为什么问这个", scores: { S: 2, C: 1, R: 1 } },
                { text: "看对自己有啥影响再决定", scores: { S: 2, C: 2, M: -1 } }
            ]
        }
    ],

    // ==================== 生活场景 ====================
    life: [
        {
            q: "伴侣翻了你手机你的第一反应",
            opts: [
                { text: "坦荡给看我没啥好藏的", scores: { M: 2, P: 1, E: 1 } },
                { text: "生气——这是我的隐私", scores: { I: 2, C: 2, P: 1 } },
                { text: "表面不介意以后设密码", scores: { S: 2, C: 1, R: 0 } },
                { text: "赶紧想有没有删干净", scores: { S: 1, R: 1, M: -2 } }
            ]
        },
        {
            q: "好朋友借5000三个月没还也没提",
            opts: [
                { text: "直接问啥时候方便还", scores: { I: 2, P: 1, C: 1 } },
                { text: "发朋友圈暗示借钱要还", scores: { P: 2, S: 1, X: 0 } },
                { text: "算了吧朋友嘛", scores: { E: 2, M: 0, C: -1 } },
                { text: "下次TA借直接拒绝就行", scores: { S: 2, I: 1, M: 1 } }
            ]
        },
        {
            q: "前任深夜发了一条\"你还好吗\"",
            opts: [
                { text: "不回删掉假装没看到", scores: { I: 2, C: 1, M: 1 } },
                { text: "简单回一句就不聊了", scores: { E: 1, M: 1, S: 1 } },
                { text: "认真回复聊了起来", scores: { E: 2, R: 1, I: -1 } },
                { text: "截图发给闺蜜/兄弟吐槽", scores: { X: 2, P: 2, S: 1 } }
            ]
        },
        {
            q: "如果你出轨了你选什么方式联系",
            opts: [
                { text: "共享文档——鬼才想到", scores: { S: 2, R: 1, C: 2 } },
                { text: "视频弹幕——人海中找你", scores: { R: 2, P: 2, X: 1 } },
                { text: "不可能出轨这种事", scores: { M: 2, I: 1, E: 1 } },
                { text: "阅后即焚app", scores: { S: 2, R: 1, M: -1 } }
            ]
        },
        {
            q: "亲戚聚会被催婚你内心想",
            opts: [
                { text: "微笑点头当天就溜", scores: { S: 2, I: 1, E: 0 } },
                { text: "怼回去你管好自己吧", scores: { P: 2, R: 2, C: 1 } },
                { text: "认真解释自己的想法", scores: { P: 1, M: 1, E: 1 } },
                { text: "提前编好假对象信息", scores: { S: 2, X: 1, R: 1 } }
            ]
        },
        {
            q: "发现好朋友的对象出轨了",
            opts: [
                { text: "立刻告诉好朋友", scores: { M: 2, E: 2, R: 1 } },
                { text: "先搜集更多证据再说", scores: { S: 2, C: 1, M: 1 } },
                { text: "不是我的事不掺和", scores: { I: 2, M: -1, E: -1 } },
                { text: "匿名提醒朋友注意", scores: { S: 1, E: 1, R: 0 } }
            ]
        },
        {
            q: "捡到钱包有5000现金和身份证",
            opts: [
                { text: "原封不动送派出所", scores: { M: 2, E: 1, I: 0 } },
                { text: "联系失主暗示想要报酬", scores: { S: 1, M: 0, P: 1 } },
                { text: "拿走现金把证件寄回", scores: { S: 2, M: -2, R: 1 } },
                { text: "联系失主直接归还", scores: { E: 2, M: 2, X: 1 } }
            ]
        },
        {
            q: "半夜朋友哭着要来你家但你明天面试",
            opts: [
                { text: "来吧朋友比面试重要", scores: { E: 2, X: 1, M: 1 } },
                { text: "安慰几句建议TA明天再说", scores: { S: 1, I: 1, E: 0 } },
                { text: "直说有事但帮TA联系别人", scores: { S: 1, E: 1, X: 1 } },
                { text: "假装没醒没接到", scores: { I: 2, R: 1, E: -1 } }
            ]
        },
        {
            q: "你的朋友圈人设是什么风格",
            opts: [
                { text: "岁月静好精致生活", scores: { P: 2, S: 1, X: 1 } },
                { text: "从不发朋友圈", scores: { I: 2, P: -1, X: -1 } },
                { text: "真实到翻车的吐槽日常", scores: { P: 2, R: 2, M: 1 } },
                { text: "三天可见精心筛选", scores: { S: 2, C: 2, P: 0 } }
            ]
        },
        {
            q: "聚餐长辈说了你极不认同的观点",
            opts: [
                { text: "当场反驳对错要分清", scores: { P: 2, R: 2, M: 2 } },
                { text: "低头吃菜当没听到", scores: { I: 1, E: 0, S: 1 } },
                { text: "巧妙换个话题转移", scores: { S: 2, X: 1, E: 1 } },
                { text: "事后发条朋友圈含沙射影", scores: { P: 2, S: 1, R: 1 } }
            ]
        },
        {
            q: "必须跟一个朋友绝交你选什么方式",
            opts: [
                { text: "找事大吵一架彻底断", scores: { P: 2, R: 2, C: 1 } },
                { text: "慢慢减少联系自然消失", scores: { S: 2, I: 1, E: 0 } },
                { text: "直接拉黑不解释", scores: { C: 2, I: 2, R: 1 } },
                { text: "真诚说清楚为什么", scores: { M: 2, P: 1, E: 1 } }
            ]
        },
        {
            q: "被人当面开了让你不舒服的玩笑",
            opts: [
                { text: "笑着开一个更狠的回去", scores: { R: 2, P: 2, S: 1 } },
                { text: "表情管理但内心已拉黑", scores: { S: 2, C: 1, P: -1 } },
                { text: "直说这个笑话不好笑", scores: { C: 2, P: 1, M: 1 } },
                { text: "装没听到转移话题", scores: { E: 1, S: 1, I: 1 } }
            ]
        },
        {
            q: "最好的朋友和你喜欢的人在一起了",
            opts: [
                { text: "祝福但会默默保持距离", scores: { E: 1, I: 2, M: 1 } },
                { text: "表面祝福心里恨死了", scores: { S: 1, P: -1, C: 1 } },
                { text: "真心为他们高兴", scores: { E: 2, M: 2, I: 0 } },
                { text: "找机会让TA们知道我也喜欢过", scores: { P: 2, R: 2, C: 1 } }
            ]
        },
        {
            q: "和另一半冷战中TA朋友来调解",
            opts: [
                { text: "跟调解人大倒苦水", scores: { P: 2, X: 1, C: -1 } },
                { text: "我们的事不用别人管", scores: { I: 2, C: 2, P: 0 } },
                { text: "借台阶下和好", scores: { S: 1, E: 1, X: 1 } },
                { text: "趁机问对方怎么说我的", scores: { S: 2, C: 1, X: 1 } }
            ]
        },
        {
            q: "可以偷看一个人手机你最想看啥",
            opts: [
                { text: "聊天记录看背后怎么说我", scores: { C: 2, S: 1, X: 0 } },
                { text: "相册了解TA真实生活", scores: { E: 1, X: 1, P: 0 } },
                { text: "备忘录想知道TA的秘密", scores: { S: 2, C: 1, R: 1 } },
                { text: "不看这种事做不出来", scores: { M: 2, I: 1, E: 1 } }
            ]
        },
        {
            q: "关系中被冷暴力了你会",
            opts: [
                { text: "主动找TA沟通直到开口", scores: { E: 2, P: 1, I: -1 } },
                { text: "以冷暴力回应冷暴力", scores: { C: 2, S: 1, E: -1 } },
                { text: "该干嘛干嘛TA想通会来找我", scores: { I: 2, C: 1, M: 1 } },
                { text: "找共同朋友了解情况", scores: { X: 2, S: 1, E: 0 } }
            ]
        },
        {
            q: "有人匿名在网上挂了你配了照片",
            opts: [
                { text: "查出是谁报警", scores: { C: 2, R: 1, S: 1 } },
                { text: "写篇更精彩的回应帖", scores: { P: 2, R: 2, X: 1 } },
                { text: "让朋友帮举报低调处理", scores: { S: 2, X: 1, I: 0 } },
                { text: "无视网上的事认真就输了", scores: { I: 2, M: 1, R: 0 } }
            ]
        },
        {
            q: "伴侣和异性深夜一对一吃饭",
            opts: [
                { text: "直接问清楚什么情况", scores: { C: 2, P: 1, I: 0 } },
                { text: "表示信任但偷偷关注", scores: { S: 2, C: 1, E: 0 } },
                { text: "完全信任不至于", scores: { E: 2, M: 1, I: 1 } },
                { text: "也约异性吃饭让TA体验下", scores: { R: 2, S: 1, M: -1 } }
            ]
        },
        {
            q: "邻居每天半夜制造噪音",
            opts: [
                { text: "上门直接对峙", scores: { C: 2, R: 1, P: 1 } },
                { text: "用更大噪音反击", scores: { R: 2, C: 1, M: -1 } },
                { text: "写便条贴TA门口", scores: { S: 1, P: 1, E: 1 } },
                { text: "联系物业或报警", scores: { S: 1, M: 1, I: 1 } }
            ]
        },
        {
            q: "朋友群聊里发了你不想公开的照片",
            opts: [
                { text: "立刻让TA撤回并私聊说清", scores: { C: 2, P: 1, I: 1 } },
                { text: "自嘲一番化解尴尬", scores: { X: 2, P: 1, E: 1 } },
                { text: "记着以后不分享任何东西给TA", scores: { S: 2, C: 1, I: 1 } },
                { text: "不说什么但很难受", scores: { E: 1, P: -1, I: -1 } }
            ]
        },
        {
            q: "匿名说一个秘密大概是关于",
            opts: [
                { text: "对某个人的真实看法", scores: { S: 1, C: 1, P: 1 } },
                { text: "做过的一件不光彩的事", scores: { R: 1, M: -1, P: 1 } },
                { text: "不为人知的野心或欲望", scores: { C: 2, R: 1, I: 1 } },
                { text: "我真没什么不能说的", scores: { M: 2, P: 2, E: 1 } }
            ]
        },
        {
            q: "约好跟朋友吃饭但你不想出门了",
            opts: [
                { text: "编个理由取消", scores: { S: 1, I: 1, E: -1 } },
                { text: "硬着头皮去答应了不能食言", scores: { M: 2, E: 1, I: -1 } },
                { text: "直说状态不好想改时间", scores: { P: 2, I: 1, M: 1 } },
                { text: "去了但全程看手机想早走", scores: { S: 1, I: 1, X: -1 } }
            ]
        },
        {
            q: "你在意别人对你的评价吗",
            opts: [
                { text: "非常在意会因此调整行为", scores: { X: 1, E: 1, I: -2 } },
                { text: "在意但不会因此改变自己", scores: { I: 1, M: 1, P: 0 } },
                { text: "只在意重要的人怎么看", scores: { S: 1, E: 1, C: 1 } },
                { text: "完全不在意走自己的路", scores: { I: 2, C: 1, R: 1 } }
            ]
        },
        {
            q: "人生秘密副本在云端你最怕被看到",
            opts: [
                { text: "我对身边人的真实排名", scores: { S: 2, C: 1, E: -1 } },
                { text: "最脆弱崩溃的时刻", scores: { P: 1, I: 1, E: 1 } },
                { text: "偷偷做过的小坏事", scores: { R: 1, M: -1, S: 1 } },
                { text: "内心真正想要的东西", scores: { C: 1, I: 2, P: 1 } }
            ]
        },
        {
            q: "朋友创业找你投10万关系很好",
            opts: [
                { text: "了解项目再决定公事公办", scores: { S: 2, M: 1, I: 1 } },
                { text: "给一万意思下说手头紧", scores: { S: 1, E: 1, R: -1 } },
                { text: "义气投朋友需要就够了", scores: { E: 2, R: 2, M: 0 } },
                { text: "直接拒绝投资友情要分开", scores: { I: 2, M: 2, E: -1 } }
            ]
        },
        {
            q: "要分手了对方送了超用心的生日礼物",
            opts: [
                { text: "不影响该分还是分", scores: { I: 2, C: 2, M: 1 } },
                { text: "再给这段关系一次机会", scores: { E: 2, R: 1, I: -1 } },
                { text: "先收礼物过完生日再说", scores: { S: 2, R: 1, M: -1 } },
                { text: "愧疚地提前坦白想法", scores: { M: 2, P: 2, E: 1 } }
            ]
        },
        {
            q: "一段关系中你更容易扮演什么角色",
            opts: [
                { text: "掌控者——大小事我来定", scores: { C: 2, I: 1, S: 1 } },
                { text: "付出者——比起被爱更擅长去爱", scores: { E: 2, P: 1, I: -1 } },
                { text: "观察者——我需要足够空间", scores: { I: 2, S: 1, P: -1 } },
                { text: "表演者——不同关系不同的我", scores: { X: 2, S: 2, P: 1 } }
            ]
        },
        {
            q: "和伴侣对未来规划有严重分歧",
            opts: [
                { text: "我的人生我做主谈不拢就分", scores: { I: 2, C: 2, M: 1 } },
                { text: "爱就要学会妥协", scores: { E: 2, M: 1, I: -1 } },
                { text: "表面答应暗中按自己的来", scores: { S: 2, C: 1, M: -1 } },
                { text: "找个双方都能接受的折中", scores: { X: 1, E: 1, S: 1 } }
            ]
        },
        {
            q: "有app能显示每个人对你的好感度你敢看吗",
            opts: [
                { text: "当然！我要知道谁真谁假", scores: { C: 2, S: 1, R: 1 } },
                { text: "不看有些真相不如不知道", scores: { E: 2, M: 1, I: 1 } },
                { text: "只看暗恋对象那一个", scores: { R: 2, P: 1, X: 0 } },
                { text: "看完删app当没看过", scores: { S: 2, R: 1, P: -1 } }
            ]
        }
    ]
};
