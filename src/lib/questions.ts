// 题库数据类型定义
export interface Question {
  id: string;
  question: string;
  options: string[];
  answer: number; // 正确答案的索引（0-3）
  explanation: string; // 答案解析
}

export type QuestionType = 'wenyan' | 'idiom' | 'poetry';

// 文言文字词题目（120道）
export const wenyanQuestions: Question[] = [
  {
    id: 'wenyan-1',
    question: '"学而时习之，不亦说乎"中"说"的意思是？',
    options: ['说话', '高兴', '劝说', '告诉'],
    answer: 1,
    explanation: '"说"通"悦"，意思是高兴、喜悦。'
  },
  {
    id: 'wenyan-2',
    question: '"温故而知新，可以为师矣"中"故"的意思是？',
    options: ['所以', '缘故', '旧的知识', '因此'],
    answer: 2,
    explanation: '"故"指旧的知识，已经学过的内容。'
  },
  {
    id: 'wenyan-3',
    question: '"学而不思则罔，思而不学则殆"中"罔"的意思是？',
    options: ['迷茫', '困苦', '危险', '忧虑'],
    answer: 0,
    explanation: '"罔"意思是迷惑、迷茫，指学习而不思考就会一无所得。'
  },
  {
    id: 'wenyan-4',
    question: '"三人行，必有我师焉"中"三"的意思是？',
    options: ['三个人', '三五个', '几个', '多次'],
    answer: 2,
    explanation: '"三"在文言文中常表示虚数，意思是"几个"或"多个人"。'
  },
  {
    id: 'wenyan-5',
    question: '"吾日三省吾身"中"省"的意思是？',
    options: ['节省', '省略', '反省', '省份'],
    answer: 2,
    explanation: '"省"意为反省、检查。'
  },
  {
    id: 'wenyan-6',
    question: '"逝者如斯夫，不舍昼夜"中"舍"的意思是？',
    options: ['房子', '停止', '舍弃', '居住'],
    answer: 1,
    explanation: '"舍"意为停止，指时间不停流逝。'
  },
  {
    id: 'wenyan-7',
    question: '"人不知而不愠，不亦君子乎"中"愠"的意思是？',
    options: ['怨恨', '犹豫', '恩惠', '温和'],
    answer: 0,
    explanation: '"愠"意思是怨恨、生气。'
  },
  {
    id: 'wenyan-8',
    question: '"见贤思齐焉，见不贤而内自省也"中"齐"的意思是？',
    options: ['整齐', '平等', '看齐', '一起'],
    answer: 2,
    explanation: '"齐"意为看齐、向他学习，引申为向他看齐。'
  },
  {
    id: 'wenyan-9',
    question: '"学而不厌，诲人不倦"中"厌"的意思是？',
    options: ['厌恶', '厌倦', '满足', '厌烦'],
    answer: 2,
    explanation: '"厌"意为满足，"不厌"指永不满足，学习永不厌倦。'
  },
  {
    id: 'wenyan-10',
    question: '"己所不欲，勿施于人"中"施"的意思是？',
    options: ['施展', '实施', '施加', '施舍'],
    answer: 2,
    explanation: '"施"意为施加，把自己不想要的强加给别人。'
  },
  {
    id: 'wenyan-11',
    question: '"有朋自远方来，不亦乐乎"中"乐"的意思是？',
    options: ['音乐', '快乐', '乐器', '娱乐'],
    answer: 1,
    explanation: '"乐"通"悦"，意思是快乐、高兴。'
  },
  {
    id: 'wenyan-12',
    question: '"温故而知新"中"知"的意思是？',
    options: ['知道', '知识', '领悟', '了解'],
    answer: 2,
    explanation: '"知"在这里是领悟、获得新知识的意思。'
  },
  {
    id: 'wenyan-13',
    question: '"敏而好学，不耻下问"中"敏"的意思是？',
    options: ['敏捷', '聪明', '敏感', '迅速'],
    answer: 1,
    explanation: '"敏"意为聪明、天资聪慧。'
  },
  {
    id: 'wenyan-14',
    question: '"知之为知之，不知为不知"中"为"的意思是？',
    options: ['认为', '是', '为了', '作为'],
    answer: 1,
    explanation: '"为"在这里是"是"的意思。'
  },
  {
    id: 'wenyan-15',
    question: '"三人行，必有我师焉"中"焉"的意思是？',
    options: ['语气词', '哪里', '于是', '的样子'],
    answer: 0,
    explanation: '"焉"在这里是语气词，表示肯定。'
  },
  {
    id: 'wenyan-16',
    question: '"岁寒，然后知松柏之后凋也"中"凋"的意思是？',
    options: ['凋谢', '衰落', '寒冷', '零落'],
    answer: 0,
    explanation: '"凋"意为凋谢、枯萎。'
  },
  {
    id: 'wenyan-17',
    question: '"士不可以不弘毅，任重而道远"中"弘毅"的意思是？',
    options: ['宽大刚强', '宽容坚毅', '宏大勇敢', '广阔坚毅'],
    answer: 0,
    explanation: '"弘毅"意为抱负远大，意志坚强。'
  },
  {
    id: 'wenyan-18',
    question: '"博学而笃志"中"笃"的意思是？',
    options: ['笃定', '坚定', '笃厚', '笃实'],
    answer: 1,
    explanation: '"笃"意为坚定、坚守。'
  },
  {
    id: 'wenyan-19',
    question: '"切问而近思"中"切"的意思是？',
    options: ['切近', '切实', '急切', '恳切'],
    answer: 2,
    explanation: '"切"意为恳切、诚恳。'
  },
  {
    id: 'wenyan-20',
    question: '"子曰：吾十有五而志于学"中"志"的意思是？',
    options: ['志向', '立志', '意志', '志愿'],
    answer: 1,
    explanation: '"志"在这里作动词，意为立志。'
  },
  {
    id: 'wenyan-21',
    question: '"三十而立，四十而不惑"中"立"的意思是？',
    options: ['站立', '独立', '自立', '建立'],
    answer: 2,
    explanation: '"立"意为自立，指自立于社会。'
  },
  {
    id: 'wenyan-22',
    question: '"不患人之不己知，患不知人也"中第一个"患"的意思是？',
    options: ['担心', '祸患', '忧虑', '疾病'],
    answer: 0,
    explanation: '"患"意为担心、忧虑。'
  },
  {
    id: 'wenyan-23',
    question: '"工欲善其事，必先利其器"中"利"的意思是？',
    options: ['锋利', '使锋利', '顺利', '便利'],
    answer: 1,
    explanation: '"利"在这里是使动用法，意为使锋利、磨快。'
  },
  {
    id: 'wenyan-24',
    question: '"欲速则不达"中"达"的意思是？',
    options: ['到达', '通达', '达到目的', '表达'],
    answer: 2,
    explanation: '"达"意为达到目的、成功。'
  },
  {
    id: 'wenyan-25',
    question: '"质胜文则野，文胜质则史"中"质"的意思是？',
    options: ['质量', '本质', '朴实', '体质'],
    answer: 2,
    explanation: '"质"指朴实、本质。'
  },
  {
    id: 'wenyan-26',
    question: '"己欲立而立人，己欲达而达人"中两个"立"字的意思是？',
    options: ['站立，建立', '自立，使别人自立', '建立，成就', '独立，确立'],
    answer: 1,
    explanation: '第一个"立"是自立，第二个"立"是使别人自立。'
  },
  {
    id: 'wenyan-27',
    question: '"见义勇为"中"义"的意思是？',
    options: ['义气', '正义', '情义', '义务'],
    answer: 1,
    explanation: '"义"指正义、正当。'
  },
  {
    id: 'wenyan-28',
    question: '"不义而富且贵，于我如浮云"中"浮云"的意思是？',
    options: ['云彩', '虚幻不实的东西', '飘浮的云', '云朵'],
    answer: 1,
    explanation: '"浮云"比喻不值得重视的东西。'
  },
  {
    id: 'wenyan-29',
    question: '"学而不厌"中的"厌"通？',
    options: ['餍', '懑', '恹', '恚'],
    answer: 0,
    explanation: '"厌"通"餍"，意为满足。'
  },
  {
    id: 'wenyan-30',
    question: '"发愤忘食"中"发"的意思是？',
    options: ['出发', '激发', '奋发', '发出'],
    answer: 2,
    explanation: '"发"意为奋发、激发。'
  },
  {
    id: 'wenyan-31',
    question: '"乐以忘忧"中"乐"的意思是？',
    options: ['音乐', '快乐', '乐观', '享乐'],
    answer: 1,
    explanation: '"乐"意为快乐、以学习为乐。'
  },
  {
    id: 'wenyan-32',
    question: '"不知老之将至"中"之"的意思是？',
    options: ['的', '助词', '它', '到'],
    answer: 1,
    explanation: '"之"在这里是助词，无实义。'
  },
  {
    id: 'wenyan-33',
    question: '"三人行"中"行"的意思是？',
    options: ['行走', '行为', '同行', '行动'],
    answer: 2,
    explanation: '"行"意为同行、一起走。'
  },
  {
    id: 'wenyan-34',
    question: '"必有我师焉"中"必"的意思是？',
    options: ['必须', '必然', '一定', '务必'],
    answer: 2,
    explanation: '"必"意为一定、必定。'
  },
  {
    id: 'wenyan-35',
    question: '"择其善者而从之"中"从"的意思是？',
    options: ['跟从', '学习', '遵从', '听从'],
    answer: 1,
    explanation: '"从"意为学习、模仿。'
  },
  {
    id: 'wenyan-36',
    question: '"其不善者而改之"中"改"的意思是？',
    options: ['改正', '改变', '更改', '改过'],
    answer: 0,
    explanation: '"改"意为改正（自己的缺点）。'
  },
  {
    id: 'wenyan-37',
    question: '"过则勿惮改"中"惮"的意思是？',
    options: ['担心', '害怕', '忌惮', '顾虑'],
    answer: 1,
    explanation: '"惮"意为害怕、畏惧。'
  },
  {
    id: 'wenyan-38',
    question: '"君子坦荡荡，小人长戚戚"中"坦荡荡"的意思是？',
    options: ['宽阔的样子', '心胸宽广的样子', '平坦的样子', '坦然的样子'],
    answer: 1,
    explanation: '"坦荡荡"形容心胸宽广、坦然。'
  },
  {
    id: 'wenyan-39',
    question: '"长戚戚"中"戚戚"的意思是？',
    options: ['忧愁的样子', '悲戚的样子', '忧虑的样子', '悲伤的样子'],
    answer: 0,
    explanation: '"戚戚"形容忧愁、患得患失的样子。'
  },
  {
    id: 'wenyan-40',
    question: '"岁寒"指的是？',
    options: ['寒冷的冬天', '每年的冬天', '比喻艰苦的环境', '比喻乱世'],
    answer: 2,
    explanation: '"岁寒"比喻艰苦的环境或动荡的时代。'
  },
  {
    id: 'wenyan-41',
    question: '"仁以为己任"中"仁"的意思是？',
    options: ['仁慈', '仁爱', '仁德', '仁义'],
    answer: 2,
    explanation: '"仁"指仁德、仁爱之道。'
  },
  {
    id: 'wenyan-42',
    question: '"死而后已"中"已"的意思是？',
    options: ['已经', '完毕', '停止', '完成'],
    answer: 2,
    explanation: '"已"意为停止、中止。'
  },
  {
    id: 'wenyan-43',
    question: '"不亦君子乎"中"君子"的意思是？',
    options: ['君子兰', '品德高尚的人', '统治阶级', '知识分子'],
    answer: 1,
    explanation: '"君子"指品德高尚的人。'
  },
  {
    id: 'wenyan-44',
    question: '"人不知而不愠"中"知"的意思是？',
    options: ['知道', '了解', '理解', '赏识'],
    answer: 1,
    explanation: '"知"意为了解、赏识。'
  },
  {
    id: 'wenyan-45',
    question: '"不耻下问"中"耻"的意思是？',
    options: ['耻辱', '羞耻', '以...为耻', '可耻'],
    answer: 2,
    explanation: '"耻"意为以...为耻，形容词的意动用法。'
  },
  {
    id: 'wenyan-46',
    question: '"下问"中"下"的意思是？',
    options: ['下面', '地位低的人', '向下', '下层'],
    answer: 1,
    explanation: '"下"指地位比自己低的人。'
  },
  {
    id: 'wenyan-47',
    question: '"学而不思则罔"中"思"的意思是？',
    options: ['思想', '思考', '思维', '思想感情'],
    answer: 1,
    explanation: '"思"意为思考、思索。'
  },
  {
    id: 'wenyan-48',
    question: '"思而不学则殆"中"殆"的意思是？',
    options: ['危险', '怠慢', '疲倦', '疑惑'],
    answer: 3,
    explanation: '"殆"意为疑惑、精神疲倦而无所得。'
  },
  {
    id: 'wenyan-49',
    question: '"可以为师矣"中"以"的意思是？',
    options: ['因为', '用来', '凭', '已经'],
    answer: 2,
    explanation: '"以"意为凭、凭借。'
  },
  {
    id: 'wenyan-50',
    question: '"好古，敏以求之者也"中"好"的意思是？',
    options: ['爱好', '喜好', '喜欢', '美好的'],
    answer: 0,
    explanation: '"好"意为爱好、喜爱，读作hào。'
  },
  {
    id: 'wenyan-51',
    question: '"敏以求之"中"之"的意思是？',
    options: ['的', '代指知识', '助词', '它'],
    answer: 1,
    explanation: '"之"代指古代的知识。'
  },
  {
    id: 'wenyan-52',
    question: '"默而识之"中"识"的意思是？',
    options: ['认识', '记住', '识别', '知识'],
    answer: 1,
    explanation: '"识"意为记住，读作zhì。'
  },
  {
    id: 'wenyan-53',
    question: '"学而不厌，诲人不倦"中"诲"的意思是？',
    options: ['教导', '教诲', '告诉', '讲解'],
    answer: 0,
    explanation: '"诲"意为教导。'
  },
  {
    id: 'wenyan-54',
    question: '"何有于我哉"中"何有"的意思是？',
    options: ['有什么', '哪里有', '怎能', '如何'],
    answer: 0,
    explanation: '"何有"意为有什么、哪有。'
  },
  {
    id: 'wenyan-55',
    question: '"三思而后行"中"三"的意思是？',
    options: ['三次', '三个', '多次', '三番'],
    answer: 2,
    explanation: '"三"表示多次，反复思考。'
  },
  {
    id: 'wenyan-56',
    question: '"朝闻道，夕死可矣"中"闻"的意思是？',
    options: ['闻见', '听见', '领悟', '闻知'],
    answer: 2,
    explanation: '"闻"意为领悟、明白。'
  },
  {
    id: 'wenyan-57',
    question: '"君子务本"中"务"的意思是？',
    options: ['务必', '任务', '致力于', '服务'],
    answer: 2,
    explanation: '"务"意为致力于、专心从事。'
  },
  {
    id: 'wenyan-58',
    question: '"本立而道生"中"本"的意思是？',
    options: ['根本', '本来', '书本', '自己'],
    answer: 0,
    explanation: '"本"指根本、基础。'
  },
  {
    id: 'wenyan-59',
    question: '"道生"中"道"的意思是？',
    options: ['道路', '道义', '道理', '道德'],
    answer: 2,
    explanation: '"道"指道理、正道。'
  },
  {
    id: 'wenyan-60',
    question: '"信近于义"中"信"的意思是？',
    options: ['信任', '信用', '守信', '相信'],
    answer: 2,
    explanation: '"信"意为守信、诚实。'
  },
  {
    id: 'wenyan-61',
    question: '《论语》中"有朋自远方来，不亦乐乎"中的"朋"指的是？',
    options: ['朋友', '志同道合的人', '同学', '亲戚'],
    answer: 1,
    explanation: '"朋"指志同道合的人，这里指同学。'
  },
  {
    id: 'wenyan-62',
    question: '"温故而知新，可以为师矣"中"为"的意思是？',
    options: ['为了', '成为', '作为', '是'],
    answer: 1,
    explanation: '"为"意为成为。'
  },
  {
    id: 'wenyan-63',
    question: '"学而时习之"中"习"的意思是？',
    options: ['习惯', '复习', '练习', '学习'],
    answer: 1,
    explanation: '"习"意为复习、温习。'
  },
  {
    id: 'wenyan-64',
    question: '"学而不厌"中"厌"的意思是？',
    options: ['讨厌', '厌倦', '满足', '厌恶'],
    answer: 2,
    explanation: '"厌"通"餍"，意为满足。'
  },
  {
    id: 'wenyan-65',
    question: '"默而识之"中"识"的意思是？',
    options: ['知识', '识别', '记住', '认识'],
    answer: 2,
    explanation: '"识"意为记住，读作zhì。'
  },
  {
    id: 'wenyan-66',
    question: '"三十而立"中"立"的意思是？',
    options: ['站立', '独立', '自立', '确立'],
    answer: 2,
    explanation: '"立"意为自立于社会。'
  },
  {
    id: 'wenyan-67',
    question: '"四十而不惑"中"惑"的意思是？',
    options: ['迷惑', '困惑', '疑惑', '糊涂'],
    answer: 1,
    explanation: '"惑"意为困惑、迷惑。'
  },
  {
    id: 'wenyan-68',
    question: '"五十而知天命"中"天命"的意思是？',
    options: ['上天', '命运', '自然规律', '天意'],
    answer: 1,
    explanation: '"天命"指命运、上天的旨意。'
  },
  {
    id: 'wenyan-69',
    question: '"六十而耳顺"中"耳顺"的意思是？',
    options: ['听力好', '能听懂话', '能听进各种意见', '耳朵顺从'],
    answer: 2,
    explanation: '"耳顺"意为能听进各种不同的意见。'
  },
  {
    id: 'wenyan-70',
    question: '"七十而从心所欲，不逾矩"中"逾"的意思是？',
    options: ['超过', '越过', '违背', '超过界限'],
    answer: 2,
    explanation: '"逾"意为违背、超过。'
  },
  {
    id: 'wenyan-71',
    question: '"己所不欲，勿施于人"中"施"的意思是？',
    options: ['实施', '施加', '给予', '施舍'],
    answer: 1,
    explanation: '"施"意为施加。'
  },
  {
    id: 'wenyan-72',
    question: '"三人行，必有我师焉"中"三"的意思是？',
    options: ['三个', '三五个', '多个', '许多'],
    answer: 2,
    explanation: '"三"表示虚数，意为多个、几个。'
  },
  {
    id: 'wenyan-73',
    question: '"择其善者而从之"中"从"的意思是？',
    options: ['跟从', '学习', '遵从', '跟随'],
    answer: 1,
    explanation: '"从"意为学习、模仿。'
  },
  {
    id: 'wenyan-74',
    question: '"其不善者而改之"中"改"的意思是？',
    options: ['改变', '改正', '修改', '更改'],
    answer: 1,
    explanation: '"改"意为改正自己的缺点。'
  },
  {
    id: 'wenyan-75',
    question: '"过则勿惮改"中"惮"的意思是？',
    options: ['担心', '忌惮', '害怕', '顾虑'],
    answer: 2,
    explanation: '"惮"意为害怕、畏惧。'
  },
  {
    id: 'wenyan-76',
    question: '"见贤思齐焉"中"齐"的意思是？',
    options: ['整齐', '平等', '看齐', '一致'],
    answer: 2,
    explanation: '"齐"意为看齐、向他学习。'
  },
  {
    id: 'wenyan-77',
    question: '"见不贤而内自省也"中"省"的意思是？',
    options: ['省略', '节省', '反省', '省份'],
    answer: 2,
    explanation: '"省"意为反省、检讨。'
  },
  {
    id: 'wenyan-78',
    question: '"学而不思则罔"中"罔"的意思是？',
    options: ['欺骗', '迷惘', '困苦', '危险'],
    answer: 1,
    explanation: '"罔"意为迷惘、迷惑。'
  },
  {
    id: 'wenyan-79',
    question: '"思而不学则殆"中"殆"的意思是？',
    options: ['危险', '疑惑', '疲倦', '松懈'],
    answer: 1,
    explanation: '"殆"意为疑惑、精神疲倦。'
  },
  {
    id: 'wenyan-80',
    question: '"知之为知之，不知为不知"中"为"的意思是？',
    options: ['认为', '是', '作为', '因为'],
    answer: 1,
    explanation: '"为"意为是。'
  },
  {
    id: 'wenyan-81',
    question: '"是知也"中"知"的意思是？',
    options: ['知道', '智慧', '知识', '通"智"'],
    answer: 3,
    explanation: '"知"通"智"，意为智慧。'
  },
  {
    id: 'wenyan-82',
    question: '"人而无信，不知其可也"中"信"的意思是？',
    options: ['信任', '信用', '守信', '诚实'],
    answer: 2,
    explanation: '"信"意为守信、诚信。'
  },
  {
    id: 'wenyan-83',
    question: '"其可也"中"可"的意思是？',
    options: ['可以', '可能', '认可', '行得通'],
    answer: 3,
    explanation: '"可"意为行得通、可行。'
  },
  {
    id: 'wenyan-84',
    question: '"事父母几谏"中"几"的意思是？',
    options: ['几次', '几乎', '轻微', '委婉'],
    answer: 3,
    explanation: '"几"意为委婉、轻微。'
  },
  {
    id: 'wenyan-85',
    question: '"见志不从"中"从"的意思是？',
    options: ['跟从', '听从', '顺从', '跟随'],
    answer: 1,
    explanation: '"从"意为听从。'
  },
  {
    id: 'wenyan-86',
    question: '"又敬不违"中"违"的意思是？',
    options: ['违背', '离开', '违反', '反抗'],
    answer: 0,
    explanation: '"违"意为违背、违抗。'
  },
  {
    id: 'wenyan-87',
    question: '"劳而不怨"中"怨"的意思是？',
    options: ['抱怨', '怨恨', '埋怨', '怨言'],
    answer: 1,
    explanation: '"怨"意为怨恨。'
  },
  {
    id: 'wenyan-88',
    question: '"父母在，不远游"中"远"的意思是？',
    options: ['远方', '长远', '远离', '距离远'],
    answer: 2,
    explanation: '"远"意为远离。'
  },
  {
    id: 'wenyan-89',
    question: '"游必有方"中"方"的意思是？',
    options: ['方向', '地方', '正当', '方法'],
    answer: 1,
    explanation: '"方"意为地方、去处。'
  },
  {
    id: 'wenyan-90',
    question: '"父母之年，不可不知也"中第一个"知"的意思是？',
    options: ['知道', '记住', '了解', '认识'],
    answer: 1,
    explanation: '"知"意为记住。'
  },
  {
    id: 'wenyan-91',
    question: '"一则以喜，一则以惧"中"惧"的意思是？',
    options: ['恐惧', '担忧', '害怕', '畏惧'],
    answer: 1,
    explanation: '"惧"意为担忧、忧虑。'
  },
  {
    id: 'wenyan-92',
    question: '"古者言之不出"中"言"的意思是？',
    options: ['语言', '说话', '话语', '言论'],
    answer: 1,
    explanation: '"言"意为说话、言语。'
  },
  {
    id: 'wenyan-93',
    question: '"耻躬之不逮也"中"躬"的意思是？',
    options: ['身体', '亲自', '躬身', '自身'],
    answer: 3,
    explanation: '"躬"意为自身。'
  },
  {
    id: 'wenyan-94',
    question: '"耻躬之不逮也"中"逮"的意思是？',
    options: ['到达', '赶上', '及得上', '达到'],
    answer: 2,
    explanation: '"逮"意为及得上、达到。'
  },
  {
    id: 'wenyan-95',
    question: '"君子欲讷于言而敏于行"中"讷"的意思是？',
    options: ['说话慢', '说话谨慎', '不善言辞', '结巴'],
    answer: 1,
    explanation: '"讷"意为说话谨慎、迟缓。'
  },
  {
    id: 'wenyan-96',
    question: '"敏于行"中"敏"的意思是？',
    options: ['敏捷', '聪明', '勤勉', '迅速'],
    answer: 2,
    explanation: '"敏"意为勤勉、敏捷。'
  },
  {
    id: 'wenyan-97',
    question: '"德不孤，必有邻"中"孤"的意思是？',
    options: ['孤独', '孤单', '孤立', '寂寞'],
    answer: 2,
    explanation: '"孤"意为孤立。'
  },
  {
    id: 'wenyan-98',
    question: '"必有邻"中"邻"的意思是？',
    options: ['邻居', '伙伴', '朋友', '支持者'],
    answer: 1,
    explanation: '"邻"意为伙伴、志同道合的人。'
  },
  {
    id: 'wenyan-99',
    question: '"朽木不可雕也"中"雕"的意思是？',
    options: ['雕刻', '塑造', '雕琢', '加工'],
    answer: 2,
    explanation: '"雕"意为雕琢、雕刻。'
  },
  {
    id: 'wenyan-100',
    question: '"粪土之墙不可圬也"中"圬"的意思是？',
    options: ['建筑', '涂抹', '粉刷', '修饰'],
    answer: 1,
    explanation: '"圬"意为涂抹、粉刷。'
  },
  {
    id: 'wenyan-101',
    question: '"始吾于人也"中"于"的意思是？',
    options: ['对于', '在', '向', '对'],
    answer: 0,
    explanation: '"于"意为对于。'
  },
  {
    id: 'wenyan-102',
    question: '"听其言而信其行"中"信"的意思是？',
    options: ['相信', '信任', '守信', '信用'],
    answer: 0,
    explanation: '"信"意为相信。'
  },
  {
    id: 'wenyan-103',
    question: '"今吾于人也"中"于"的意思是？',
    options: ['对于', '在', '向', '对'],
    answer: 0,
    explanation: '"于"意为对于。'
  },
  {
    id: 'wenyan-104',
    question: '"听其言而观其行"中"观"的意思是？',
    options: ['观看', '观察', '审视', '看'],
    answer: 1,
    explanation: '"观"意为观察。'
  },
  {
    id: 'wenyan-105',
    question: '"质胜文则野"中"文"的意思是？',
    options: ['文章', '文化', '文采', '文明'],
    answer: 2,
    explanation: '"文"意为文采、礼乐修养。'
  },
  {
    id: 'wenyan-106',
    question: '"文胜质则史"中"史"的意思是？',
    options: ['历史', '史官', '浮华', '文辞华丽'],
    answer: 3,
    explanation: '"史"意为浮华、文辞华丽。'
  },
  {
    id: 'wenyan-107',
    question: '"文质彬彬"中"彬彬"的意思是？',
    options: ['文雅', '文质兼备的样子', '优雅', '斯文'],
    answer: 1,
    explanation: '"彬彬"意为文质兼备、配合适宜的样子。'
  },
  {
    id: 'wenyan-108',
    question: '"然后君子"中"然后"的意思是？',
    options: ['这样之后', '然后', '之后', '最后'],
    answer: 0,
    explanation: '"然后"意为这样之后。'
  },
  {
    id: 'wenyan-109',
    question: '"知之者不如好之者"中"好"的意思是？',
    options: ['爱好', '喜好', '喜爱', '喜欢'],
    answer: 1,
    explanation: '"好"意为爱好、喜好。'
  },
  {
    id: 'wenyan-110',
    question: '"好之者不如乐之者"中"乐"的意思是？',
    options: ['音乐', '快乐', '以...为乐', '享乐'],
    answer: 2,
    explanation: '"乐"意为以...为乐。'
  },
  {
    id: 'wenyan-111',
    question: '"中人以上，可以语上也"中"语"的意思是？',
    options: ['语言', '说话', '告诉', '谈论'],
    answer: 2,
    explanation: '"语"意为告诉、告诉...关于...的事。'
  },
  {
    id: 'wenyan-112',
    question: '"中人以下，不可以语上也"中两个"上"的意思是？',
    options: ['上面', '上等，高深的道理', '向上', '上级'],
    answer: 1,
    explanation: '"上"指高深的学问或道理。'
  },
  {
    id: 'wenyan-113',
    question: '"知者乐水"中第一个"乐"的意思是？',
    options: ['快乐', '喜爱', '音乐', '乐观'],
    answer: 1,
    explanation: '"乐"意为喜爱。'
  },
  {
    id: 'wenyan-114',
    question: '"仁者乐山"中"乐"的意思是？',
    options: ['快乐', '喜爱', '音乐', '乐观'],
    answer: 1,
    explanation: '"乐"意为喜爱。'
  },
  {
    id: 'wenyan-115',
    question: '"知者动，仁者静"中"动"的意思是？',
    options: ['运动', '行动', '活跃', '变动'],
    answer: 2,
    explanation: '"动"意为活跃、灵动。'
  },
  {
    id: 'wenyan-116',
    question: '"知者乐，仁者寿"中"寿"的意思是？',
    options: ['长寿', '寿命', '健康', '年老'],
    answer: 0,
    explanation: '"寿"意为长寿。'
  },
  {
    id: 'wenyan-117',
    question: '"逝者如斯夫"中"逝"的意思是？',
    options: ['消逝', '流逝', '去世', '消失'],
    answer: 1,
    explanation: '"逝"意为流逝。'
  },
  {
    id: 'wenyan-118',
    question: '"不舍昼夜"中"舍"的意思是？',
    options: ['舍弃', '停止', '放弃', '离开'],
    answer: 1,
    explanation: '"舍"意为停止。'
  },
  {
    id: 'wenyan-119',
    question: '"譬如为山，未成一篑"中"篑"的意思是？',
    options: ['筐', '篓子', '土筐', '容器'],
    answer: 2,
    explanation: '"篑"指装土的筐子。'
  },
  {
    id: 'wenyan-120',
    question: '"止，吾止也"中"止"的意思是？',
    options: ['停止', '终止', '中止', '中止'],
    answer: 0,
    explanation: '"止"意为停止。'
  }
];

// 成语典故题目（120道）
export const idiomQuestions: Question[] = [
  {
    id: 'idiom-1',
    question: '"画蛇添足"这个成语的意思是？',
    options: ['画蛇的艺术', '做事恰到好处', '做多余的事', '蛇有四条腿'],
    answer: 2,
    explanation: '"画蛇添足"比喻做了多余的事，反而不好。'
  },
  {
    id: 'idiom-2',
    question: '"守株待兔"这个成语比喻？',
    options: ['坚持等待', '心存侥幸，想不劳而获', '爱护动物', '耐心观察'],
    answer: 1,
    explanation: '"守株待兔"比喻死守狭隘的经验，不知变通；也比喻心存侥幸，想不劳而获。'
  },
  {
    id: 'idiom-3',
    question: '"掩耳盗铃"这个成语的意思是？',
    options: ['保护耳朵', '偷铃铛', '自己欺骗自己', '聋子偷东西'],
    answer: 2,
    explanation: '"掩耳盗铃"比喻自己欺骗自己，明明掩盖不住的事情偏要想法子掩盖。'
  },
  {
    id: 'idiom-4',
    question: '"亡羊补牢"这个成语的意思是？',
    options: ['羊死了', '羊圈坏了', '出了问题及时补救', '补修羊圈'],
    answer: 2,
    explanation: '"亡羊补牢"比喻出了问题以后想办法补救，可以防止继续受损失。'
  },
  {
    id: 'idiom-5',
    question: '"刻舟求剑"这个成语讽刺的是？',
    options: ['船工', '剑客', '死守教条，不知变通的人', '做记号的人'],
    answer: 2,
    explanation: '"刻舟求剑"比喻死守教条，拘泥成法，固执不知变通。'
  },
  {
    id: 'idiom-6',
    question: '"井底之蛙"这个成语比喻？',
    options: ['青蛙', '眼光短浅的人', '井水', '游泳的人'],
    answer: 1,
    explanation: '"井底之蛙"比喻眼界狭窄，见识短浅的人。'
  },
  {
    id: 'idiom-7',
    question: '"杯弓蛇影"这个成语形容的是？',
    options: ['酒杯的影子', '弓箭的形状', '疑神疑鬼，自相惊扰', '蛇的形状'],
    answer: 2,
    explanation: '"杯弓蛇影"比喻疑神疑鬼，自相惊扰。'
  },
  {
    id: 'idiom-8',
    question: '"狐假虎威"这个成语的意思是？',
    options: ['狐狸和老虎做朋友', '狐狸比老虎厉害', '借别人的威势欺压人', '老虎帮助狐狸'],
    answer: 2,
    explanation: '"狐假虎威"比喻依仗别人的势力来欺压人。'
  },
  {
    id: 'idiom-9',
    question: '"对牛弹琴"这个成语比喻？',
    options: ['牛的音乐', '牛的听力', '对不讲道理的人讲道理', '弹琴给牛听'],
    answer: 2,
    explanation: '"对牛弹琴"比喻对不讲道理的人讲道理，或对不懂这种艺术的人谈论这种艺术。'
  },
  {
    id: 'idiom-10',
    question: '"盲人摸象"这个成语说明的道理是？',
    options: ['大象很可爱', '盲人喜欢大象', '只了解局部，不了解整体', '大象有四个部分'],
    answer: 2,
    explanation: '"盲人摸象"比喻对事物只了解一部分，缺乏全面的认识。'
  },
  {
    id: 'idiom-11',
    question: '"拔苗助长"这个成语比喻？',
    options: ['帮助生长', '违反事物规律，急于求成', '拔草', '勤劳工作'],
    answer: 1,
    explanation: '"拔苗助长"比喻违反事物发展的客观规律，急于求成，反而把事情弄糟。'
  },
  {
    id: 'idiom-12',
    question: '"掩耳盗铃"中的"盗"的意思是？',
    options: ['偷', '盗贼', '抢劫', '偷窃'],
    answer: 0,
    explanation: '"盗"意为偷、偷窃。'
  },
  {
    id: 'idiom-13',
    question: '"自相矛盾"这个成语出自？',
    options: ['《韩非子》', '《孟子》', '《庄子》', '《论语》'],
    answer: 0,
    explanation: '"自相矛盾"出自《韩非子·难一》，讲述卖矛和盾的故事。'
  },
  {
    id: 'idiom-14',
    question: '"滥竽充数"这个成语讽刺的是？',
    options: ['会吹竽的人', '不会吹竽的人', '南郭先生', '齐宣王'],
    answer: 1,
    explanation: '"滥竽充数"比喻没有真才实学的人混在行家里面充数。'
  },
  {
    id: 'idiom-15',
    question: '"望梅止渴"这个成语比喻？',
    options: ['吃梅子', '用空想安慰自己', '看到梅子', '渴望得到'],
    answer: 1,
    explanation: '"望梅止渴"比喻用空想来安慰自己。'
  },
  {
    id: 'idiom-16',
    question: '"胸有成竹"这个成语形容的是？',
    options: ['胸中有竹子', '做事之前已经有计划', '画画很好', '心中有数'],
    answer: 1,
    explanation: '"胸有成竹"比喻做事之前已经有成熟的计划。'
  },
  {
    id: 'idiom-17',
    question: '"纸上谈兵"这个成语讽刺的是？',
    options: ['会写字的人', '纸上画画', '空谈理论，不能解决实际问题', '读书人'],
    answer: 2,
    explanation: '"纸上谈兵"比喻空谈理论，不能解决实际问题。'
  },
  {
    id: 'idiom-18',
    question: '"指鹿为马"这个成语比喻？',
    options: ['指鹿给马看', '颠倒黑白，混淆是非', '养鹿养马', '动物分类'],
    answer: 1,
    explanation: '"指鹿为马"比喻颠倒黑白，混淆是非。'
  },
  {
    id: 'idiom-19',
    question: '"负荆请罪"这个成语出自？',
    options: ['廉颇和蔺相如', '项羽和刘邦', '荆轲和秦王', '曹操和关羽'],
    answer: 0,
    explanation: '"负荆请罪"出自廉颇和蔺相如的故事。'
  },
  {
    id: 'idiom-20',
    question: '"三顾茅庐"这个成语讲述的是？',
    options: ['诸葛亮', '刘备', '曹操', '孙权'],
    answer: 1,
    explanation: '"三顾茅庐"讲述刘备三次拜访诸葛亮的故事。'
  },
  {
    id: 'idiom-21',
    question: '"草船借箭"这个故事的主人公是？',
    options: ['周瑜', '诸葛亮', '曹操', '鲁肃'],
    answer: 1,
    explanation: '"草船借箭"的主人公是诸葛亮。'
  },
  {
    id: 'idiom-22',
    question: '"卧薪尝胆"这个成语形容的是？',
    options: ['睡觉', '吃苦受罪，发愤图强', '吃苦', '生活艰苦'],
    answer: 1,
    explanation: '"卧薪尝胆"形容人刻苦自励，发愤图强。'
  },
  {
    id: 'idiom-23',
    question: '"破釜沉舟"这个成语出自？',
    options: ['项羽', '刘邦', '韩信', '曹操'],
    answer: 0,
    explanation: '"破釜沉舟"出自项羽破釜沉舟、背水一战的故事。'
  },
  {
    id: 'idiom-24',
    question: '"四面楚歌"这个成语形容的是？',
    options: ['唱歌', '四面受敌，孤立无援', '楚国的歌声', '音乐'],
    answer: 1,
    explanation: '"四面楚歌"比喻陷入四面受敌、孤立无援的境地。'
  },
  {
    id: 'idiom-25',
    question: '"闻鸡起舞"这个成语形容的是？',
    options: ['养鸡', '早起锻炼', '勤奋刻苦', '跳舞'],
    answer: 2,
    explanation: '"闻鸡起舞"形容勤奋刻苦，有志向。'
  },
  {
    id: 'idiom-26',
    question: '"悬梁刺股"这个成语讲述的是？',
    options: ['苏秦和孙敬', '孙膑和庞涓', '廉颇和蔺相如', '韩非和李斯'],
    answer: 0,
    explanation: '"悬梁刺股"讲述苏秦悬梁、孙敬刺股刻苦学习的故事。'
  },
  {
    id: 'idiom-27',
    question: '"凿壁偷光"这个成语讲述的是？',
    options: ['匡衡', '孙康', '车胤', '王羲之'],
    answer: 0,
    explanation: '"凿壁偷光"讲述匡衡凿壁借光读书的故事。'
  },
  {
    id: 'idiom-28',
    question: '"囊萤映雪"这个成语中的"萤"指的是？',
    options: ['萤火虫', '萤光', '萤火', '明亮'],
    answer: 0,
    explanation: '"萤"指萤火虫，借光读书。'
  },
  {
    id: 'idiom-29',
    question: '"程门立雪"这个成语讲述的是？',
    options: ['程颐', '杨时', '程颢', '朱熹'],
    answer: 1,
    explanation: '"程门立雪"讲述杨时尊敬老师程颐的故事。'
  },
  {
    id: 'idiom-30',
    question: '"画饼充饥"这个成语比喻？',
    options: ['画画', '做饼', '用空想来安慰自己', '饥饿'],
    answer: 2,
    explanation: '"画饼充饥"比喻用空想来安慰自己。'
  },
  {
    id: 'idiom-31',
    question: '"望洋兴叹"这个成语形容的是？',
    options: ['看海洋', '感到力量不足而无可奈何', '感叹', '旅游'],
    answer: 1,
    explanation: '"望洋兴叹"比喻感到力量不足而无可奈何。'
  },
  {
    id: 'idiom-32',
    question: '"叶公好龙"这个成语讽刺的是？',
    options: ['喜欢龙', '口头上说喜欢某事，实际上并不真喜欢', '画画', '迷信'],
    answer: 1,
    explanation: '"叶公好龙"比喻口头上说喜欢某事，实际上并不真喜欢。'
  },
  {
    id: 'idiom-33',
    question: '"黔驴技穷"这个成语比喻？',
    options: ['驴', '本领有限', '黔地的驴', '技术高超'],
    answer: 1,
    explanation: '"黔驴技穷"比喻本领有限，技穷。'
  },
  {
    id: 'idiom-34',
    question: '"南辕北辙"这个成语的意思是？',
    options: ['南北方向', '行动和目的相反', '驾车', '旅行'],
    answer: 1,
    explanation: '"南辕北辙"比喻行动和目的相反。'
  },
  {
    id: 'idiom-35',
    question: '"缘木求鱼"这个成语比喻？',
    options: ['钓鱼', '爬树', '方法不对，达不到目的', '生活'],
    answer: 2,
    explanation: '"缘木求鱼"比喻方法不对，达不到目的。'
  },
  {
    id: 'idiom-36',
    question: '"买椟还珠"这个成语讽刺的是？',
    options: ['买珍珠', '没有眼光，取舍不当', '卖珍珠', '包装'],
    answer: 1,
    explanation: '"买椟还珠"比喻没有眼光，取舍不当。'
  },
  {
    id: 'idiom-37',
    question: '"滥竽充数"这个成语中的"滥"的意思是？',
    options: ['泛滥', '超过', '失实', '随意'],
    answer: 2,
    explanation: '"滥"意为失实、虚假。'
  },
  {
    id: 'idiom-38',
    question: '"自相矛盾"这个成语中的"矛"是指？',
    options: ['兵器', '攻击', '长矛', '武器'],
    answer: 2,
    explanation: '"矛"指古代的一种兵器长矛。'
  },
  {
    id: 'idiom-39',
    question: '"自相矛盾"这个成语中的"盾"是指？',
    options: ['盾牌', '防护', '防御', '保护'],
    answer: 0,
    explanation: '"盾"指盾牌，古代的防御武器。'
  },
  {
    id: 'idiom-40',
    question: '"邯郸学步"这个成语比喻？',
    options: ['学走路', '模仿别人不得要领，连自己原有的技能也丢了', '邯郸的步法', '旅行'],
    answer: 1,
    explanation: '"邯郸学步"比喻模仿别人不得要领，连自己原有的技能也丢了。'
  },
  {
    id: 'idiom-41',
    question: '"东施效颦"这个成语讽刺的是？',
    options: ['丑女', '盲目模仿，效果不好', '西施', '学美'],
    answer: 1,
    explanation: '"东施效颦"比喻盲目模仿，效果不好。'
  },
  {
    id: 'idiom-42',
    question: '"黔驴技穷"中的"黔"指的是？',
    options: ['贵州', '地名', '黑色', '贫穷'],
    answer: 0,
    explanation: '"黔"指贵州一带。'
  },
  {
    id: 'idiom-43',
    question: '"对牛弹琴"中的"琴"指的是？',
    options: ['钢琴', '古琴', '乐器', '音乐'],
    answer: 1,
    explanation: '"琴"指古琴。'
  },
  {
    id: 'idiom-44',
    question: '"守株待兔"中的"株"指的是？',
    options: ['树桩', '树', '木桩', '竹子'],
    answer: 0,
    explanation: '"株"指树桩。'
  },
  {
    id: 'idiom-45',
    question: '"亡羊补牢"中的"牢"指的是？',
    options: ['牢固', '牢房', '羊圈', '监狱'],
    answer: 2,
    explanation: '"牢"指羊圈。'
  },
  {
    id: 'idiom-46',
    question: '"刻舟求剑"中的"舟"指的是？',
    options: ['船', '舟山', '小船', '渔船'],
    answer: 0,
    explanation: '"舟"指船。'
  },
  {
    id: 'idiom-47',
    question: '"掩耳盗铃"中的"铃"指的是？',
    options: ['铃铛', '铃声', '铃铛声', '声音'],
    answer: 0,
    explanation: '"铃"指铃铛。'
  },
  {
    id: 'idiom-48',
    question: '"画蛇添足"中的"足"指的是？',
    options: ['脚', '手脚', '蛇足', '尾巴'],
    answer: 0,
    explanation: '"足"指脚。'
  },
  {
    id: 'idiom-49',
    question: '"杯弓蛇影"中的"影"指的是？',
    options: ['影子', '影像', '倒影', '图像'],
    answer: 0,
    explanation: '"影"指影子。'
  },
  {
    id: 'idiom-50',
    question: '"井底之蛙"中的"蛙"指的是？',
    options: ['青蛙', '蛤蟆', '牛蛙', '蟾蜍'],
    answer: 0,
    explanation: '"蛙"指青蛙。'
  },
  {
    id: 'idiom-51',
    question: '"一箭双雕"这个成语比喻？',
    options: ['射箭', '做一件事达到两个目的', '两只雕', '狩猎'],
    answer: 1,
    explanation: '"一箭双雕"比喻做一件事达到两个目的。'
  },
  {
    id: 'idiom-52',
    question: '"一举两得"这个成语的意思是？',
    options: ['一举成名', '做一件事得到两种好处', '举重', '考试'],
    answer: 1,
    explanation: '"一举两得"指做一件事得到两种好处。'
  },
  {
    id: 'idiom-53',
    question: '"两全其美"这个成语形容的是？',
    options: ['两人都好', '两方面都圆满', '两件事都做好', '完美'],
    answer: 1,
    explanation: '"两全其美"指两方面都圆满。'
  },
  {
    id: 'idiom-54',
    question: '"两败俱伤"这个成语比喻？',
    options: ['两个人受伤', '双方都受损', '打斗', '战争'],
    answer: 1,
    explanation: '"两败俱伤"比喻双方都受损。'
  },
  {
    id: 'idiom-55',
    question: '"鹬蚌相争，渔翁得利"这个成语的意思是？',
    options: ['吃鹬蚌', '双方争执不下，第三者从中得利', '打渔', '争斗'],
    answer: 1,
    explanation: '"鹬蚌相争，渔翁得利"比喻双方争执不下，第三者从中得利。'
  },
  {
    id: 'idiom-56',
    question: '"坐享其成"这个成语比喻？',
    options: ['坐着成功', '自己不出力而享受别人的劳动成果', '成功', '幸福'],
    answer: 1,
    explanation: '"坐享其成"比喻自己不出力而享受别人的劳动成果。'
  },
  {
    id: 'idiom-57',
    question: '"不劳而获"这个成语的意思是？',
    options: ['不劳动', '自己不劳动而占有别人的劳动成果', '不用工作', '轻松'],
    answer: 1,
    explanation: '"不劳而获"指自己不劳动而占有别人的劳动成果。'
  },
  {
    id: 'idiom-58',
    question: '"半途而废"这个成语比喻？',
    options: ['半路停止', '做事不能坚持到底', '放弃', '失败'],
    answer: 1,
    explanation: '"半途而废"比喻做事不能坚持到底。'
  },
  {
    id: 'idiom-59',
    question: '"有始有终"这个成语的意思是？',
    options: ['有开始有结束', '做事能坚持到底', '完整', '完美'],
    answer: 1,
    explanation: '"有始有终"指做事能坚持到底。'
  },
  {
    id: 'idiom-60',
    question: '"精益求精"这个成语形容的是？',
    options: ['精华', '好上加好', '追求完美', '进步'],
    answer: 2,
    explanation: '"精益求精"形容追求完美，好上加好。'
  },
  {
    id: 'idiom-61',
    question: '"熟能生巧"这个成语的意思是？',
    options: ['熟练了就巧妙', '反复练习就能掌握技巧', '熟练后自然巧妙', '熟能生巧技艺高'],
    answer: 1,
    explanation: '"熟能生巧"指反复练习就能掌握技巧，越做越熟练。'
  },
  {
    id: 'idiom-62',
    question: '"笨鸟先飞"这个成语比喻？',
    options: ['鸟飞得早', '能力差的人先行动', '勤奋努力', '早做准备'],
    answer: 1,
    explanation: '"笨鸟先飞"比喻能力差的人怕落后，比别人先行动。'
  },
  {
    id: 'idiom-63',
    question: '"勤能补拙"这个成语的意思是？',
    options: ['勤奋补拙劣', '勤奋可以弥补天资的不足', '勤劳能补差', '勤奋能成功'],
    answer: 1,
    explanation: '"勤能补拙"指勤奋可以弥补天资的不足。'
  },
  {
    id: 'idiom-64',
    question: '"铁杵成针"这个成语比喻？',
    options: ['铁杵变针', '只要有毅力，再难的事也能成功', '磨铁杵', '针的由来'],
    answer: 1,
    explanation: '"铁杵成针"比喻只要有毅力，再难的事也能成功。'
  },
  {
    id: 'idiom-65',
    question: '"水滴石穿"这个成语说明的道理是？',
    options: ['水很厉害', '坚持就能成功', '石头被穿', '水的力量'],
    answer: 1,
    explanation: '"水滴石穿"比喻只要坚持不懈，微小的力量也能成就大事。'
  },
  {
    id: 'idiom-66',
    question: '"积少成多"这个成语的意思是？',
    options: ['积累变多', '一点点积累就能由少变多', '积少为多', '积累财富'],
    answer: 1,
    explanation: '"积少成多"指只要不断积累，就会从少变多。'
  },
  {
    id: 'idiom-67',
    question: '"聚沙成塔"这个成语比喻？',
    options: ['沙子堆成塔', '积少成多，积小成大', '建塔', '收集沙子'],
    answer: 1,
    explanation: '"聚沙成塔"比喻聚少成多，积小成大。'
  },
  {
    id: 'idiom-68',
    question: '"集腋成裘"这个成语中的"腋"指的是？',
    options: ['腋下', '狐狸腋下的皮毛', '皮毛', '动物'],
    answer: 1,
    explanation: '"腋"指狐狸腋下的皮毛。'
  },
  {
    id: 'idiom-69',
    question: '"九牛一毛"这个成语形容？',
    options: ['九头牛', '微不足道', '牛毛', '数量多'],
    answer: 1,
    explanation: '"九牛一毛"比喻极大数量中极微小的数量，微不足道。'
  },
  {
    id: 'idiom-70',
    question: '"沧海一粟"这个成语比喻？',
    options: ['大海中的米粒', '渺小', '数量少', '米粒'],
    answer: 1,
    explanation: '"沧海一粟"比喻非常渺小。'
  },
  {
    id: 'idiom-71',
    question: '"杯水车薪"这个成语的意思是？',
    options: ['杯子水车', '力量太小，无济于事', '水车', '帮助'],
    answer: 1,
    explanation: '"杯水车薪"比喻力量太小，解决不了问题。'
  },
  {
    id: 'idiom-72',
    question: '"螳臂当车"这个成语讽刺的是？',
    options: ['螳螂', '不自量力', '螳螂挡车', '勇敢'],
    answer: 1,
    explanation: '"螳臂当车"比喻做力量达不到的事情，必然失败。'
  },
  {
    id: 'idiom-73',
    question: '"蚍蜉撼树"这个成语比喻？',
    options: ['蚂蚁撼树', '不自量力', '蚂蚁', '撼动'],
    answer: 1,
    explanation: '"蚍蜉撼树"比喻力量很小而妄想动摇强大的事物。'
  },
  {
    id: 'idiom-74',
    question: '"以卵击石"这个成语比喻？',
    options: ['鸡蛋碰石头', '不自量力，自取灭亡', '石头', '击打'],
    answer: 1,
    explanation: '"以卵击石"比喻不自量力，自取灭亡。'
  },
  {
    id: 'idiom-75',
    question: '"班门弄斧"这个成语讽刺的是？',
    options: ['弄斧', '在行家面前卖弄本领', '班门', '斧子'],
    answer: 1,
    explanation: '"班门弄斧"比喻在行家面前卖弄本领。'
  },
  {
    id: 'idiom-76',
    question: '"关公面前耍大刀"这个成语的意思是？',
    options: ['耍大刀', '在行家面前卖弄', '关羽', '武术'],
    answer: 1,
    explanation: '"关公面前耍大刀"比喻在行家面前卖弄本领。'
  },
  {
    id: 'idiom-77',
    question: '"井底之蛙"这个成语比喻？',
    options: ['青蛙', '见识短浅的人', '井水', '游泳'],
    answer: 1,
    explanation: '"井底之蛙"比喻见识短浅的人。'
  },
  {
    id: 'idiom-78',
    question: '"管中窥豹"这个成语的意思是？',
    options: ['看豹子', '只看到一部分', '管子', '豹子'],
    answer: 1,
    explanation: '"管中窥豹"比喻只看到事物的一部分，不能全面了解。'
  },
  {
    id: 'idiom-79',
    question: '"坐井观天"这个成语比喻？',
    options: ['看天', '眼界狭小', '井里', '天空'],
    answer: 1,
    explanation: '"坐井观天"比喻眼界狭小，见识有限。'
  },
  {
    id: 'idiom-80',
    question: '"鼠目寸光"这个成语形容的是？',
    options: ['老鼠', '眼光短浅', '视力', '眼睛'],
    answer: 1,
    explanation: '"鼠目寸光"比喻眼光短浅，见识浅薄。'
  },
  {
    id: 'idiom-81',
    question: '"盲人摸象"这个成语说明的道理是？',
    options: ['盲人摸象', '只了解局部，不了解整体', '大象', '触摸'],
    answer: 1,
    explanation: '"盲人摸象"比喻只了解局部，不了解整体。'
  },
  {
    id: 'idiom-82',
    question: '"一叶障目"这个成语比喻？',
    options: ['叶子遮眼', '被局部现象迷惑，看不到全局', '障目', '眼睛'],
    answer: 1,
    explanation: '"一叶障目"比喻被局部的或暂时的现象所迷惑，看不到全局。'
  },
  {
    id: 'idiom-83',
    question: '"因小失大"这个成语的意思是？',
    options: ['小的变大的', '为了小的利益而造成大的损失', '失去', '损失'],
    answer: 1,
    explanation: '"因小失大"指为了小的利益而造成大的损失。'
  },
  {
    id: 'idiom-84',
    question: '"得不偿失"这个成语形容的是？',
    options: ['得失', '所得的抵不上所失的', '得失相当', '划算'],
    answer: 1,
    explanation: '"得不偿失"指所得的抵不上所失的。'
  },
  {
    id: 'idiom-85',
    question: '"捡了芝麻丢了西瓜"这个成语比喻？',
    options: ['捡芝麻', '因小失大', '西瓜', '收获'],
    answer: 1,
    explanation: '"捡了芝麻丢了西瓜"比喻因小失大。'
  },
  {
    id: 'idiom-86',
    question: '"杀鸡取卵"这个成语比喻？',
    options: ['杀鸡', '只图眼前利益，不顾长远利益', '取卵', '贪心'],
    answer: 1,
    explanation: '"杀鸡取卵"比喻只图眼前利益，不顾长远利益。'
  },
  {
    id: 'idiom-87',
    question: '"竭泽而渔"这个成语的意思是？',
    options: ['捕鱼', '只图眼前利益，不顾后果', '渔网', '沼泽'],
    answer: 1,
    explanation: '"竭泽而渔"比喻只图眼前利益，不顾长远利益。'
  },
  {
    id: 'idiom-88',
    question: '"饮鸩止渴"这个成语比喻？',
    options: ['喝毒酒', '用错误的办法解决眼前的困难', '止渴', '饮鸩'],
    answer: 1,
    explanation: '"饮鸩止渴"比喻用错误的办法解决眼前的困难，不顾后果。'
  },
  {
    id: 'idiom-89',
    question: '"抱薪救火"这个成语的意思是？',
    options: ['救火', '用错误的方法，反而使问题更严重', '抱柴', '火灾'],
    answer: 1,
    explanation: '"抱薪救火"比喻用错误的方法，反而使问题更严重。'
  },
  {
    id: 'idiom-90',
    question: '"火上浇油"这个成语比喻？',
    options: ['倒油', '使事情更加严重', '火烧', '添油'],
    answer: 1,
    explanation: '"火上浇油"比喻使人更加愤怒或使事态更加严重。'
  },
  {
    id: 'idiom-91',
    question: '"雪上加霜"这个成语形容的是？',
    options: ['雪霜', '接连遭受灾难，苦上加苦', '冬天', '寒冷'],
    answer: 1,
    explanation: '"雪上加霜"比喻接连遭受灾难，苦上加苦。'
  },
  {
    id: 'idiom-92',
    question: '"落井下石"这个成语的意思是？',
    options: ['扔石头', '乘人危难时加以陷害', '井', '落石'],
    answer: 1,
    explanation: '"落井下石"比喻乘人危难时加以陷害。'
  },
  {
    id: 'idiom-93',
    question: '"趁火打劫"这个成语比喻？',
    options: ['火灾', '趁人之危，掠夺财物', '打劫', '抢劫'],
    answer: 1,
    explanation: '"趁火打劫"比喻趁人之危，掠夺财物。'
  },
  {
    id: 'idiom-94',
    question: '"浑水摸鱼"这个成语的意思是？',
    options: ['摸鱼', '趁混乱时获取不正当利益', '浑水', '捕鱼'],
    answer: 1,
    explanation: '"浑水摸鱼"比喻趁混乱时获取不正当利益。'
  },
  {
    id: 'idiom-95',
    question: '"顺手牵羊"这个成语比喻？',
    options: ['牵羊', '顺手拿走别人的东西', '偷窃', '顺手'],
    answer: 1,
    explanation: '"顺手牵羊"比喻顺手拿走别人的东西。'
  },
  {
    id: 'idiom-96',
    question: '"守株待兔"这个成语讽刺的是？',
    options: ['兔子', '死守狭隘经验，不知变通', '树桩', '等待'],
    answer: 1,
    explanation: '"守株待兔"讽刺死守狭隘经验，不知变通的人。'
  },
  {
    id: 'idiom-97',
    question: '"刻舟求剑"这个成语讽刺的是？',
    options: ['剑', '拘泥成法，不知变通', '船', '刻记号'],
    answer: 1,
    explanation: '"刻舟求剑"讽刺拘泥成法，不知变通的人。'
  },
  {
    id: 'idiom-98',
    question: '"按图索骥"这个成语的意思是？',
    options: ['找马', '机械地照搬教条', '画图', '索骥'],
    answer: 1,
    explanation: '"按图索骥"比喻机械地照搬教条，不知变通。'
  },
  {
    id: 'idiom-99',
    question: '"照猫画虎"这个成语比喻？',
    options: ['画画', '只是模仿，缺乏创造性', '猫虎', '临摹'],
    answer: 1,
    explanation: '"照猫画虎"比喻只是模仿，缺乏创造性。'
  },
  {
    id: 'idiom-100',
    question: '"鹦鹉学舌"这个成语讽刺的是？',
    options: ['鹦鹉', '只会模仿，没有主见', '学舌', '鸟'],
    answer: 1,
    explanation: '"鹦鹉学舌"讽刺只会模仿，没有主见的人。'
  },
  {
    id: 'idiom-101',
    question: '"东施效颦"这个成语讽刺的是？',
    options: ['丑女', '盲目模仿，适得其反', '西施', '效仿'],
    answer: 1,
    explanation: '"东施效颦"讽刺盲目模仿，适得其反。'
  },
  {
    id: 'idiom-102',
    question: '"邯郸学步"这个成语比喻？',
    options: ['学走路', '模仿别人，反而失掉自己原有的技能', '邯郸', '步法'],
    answer: 1,
    explanation: '"邯郸学步"比喻模仿别人，反而失掉自己原有的技能。'
  },
  {
    id: 'idiom-103',
    question: '"叶公好龙"这个成语讽刺的是？',
    options: ['喜欢龙', '口头上说喜欢，实际上并不真喜欢', '叶公', '爱好'],
    answer: 1,
    explanation: '"叶公好龙"讽刺口头上说喜欢，实际上并不真喜欢的人。'
  },
  {
    id: 'idiom-104',
    question: '"掩耳盗铃"这个成语讽刺的是？',
    options: ['铃铛', '自己欺骗自己', '偷窃', '耳朵'],
    answer: 1,
    explanation: '"掩耳盗铃"讽刺自己欺骗自己的人。'
  },
  {
    id: 'idiom-105',
    question: '"自欺欺人"这个成语的意思是？',
    options: ['欺骗', '欺骗自己，也欺骗别人', '欺人', '自欺'],
    answer: 1,
    explanation: '"自欺欺人"指欺骗自己，也欺骗别人。'
  },
  {
    id: 'idiom-106',
    question: '"弄虚作假"这个成语比喻？',
    options: ['做假', '耍手段，搞欺骗', '虚假', '弄虚'],
    answer: 1,
    explanation: '"弄虚作假"指耍手段，搞欺骗。'
  },
  {
    id: 'idiom-107',
    question: '"招摇撞骗"这个成语的意思是？',
    options: ['招摇', '假借名义，到处诈骗', '撞骗', '欺骗'],
    answer: 1,
    explanation: '"招摇撞骗"指假借名义，到处诈骗。'
  },
  {
    id: 'idiom-108',
    question: '"口是心非"这个成语形容的是？',
    options: ['口不对心', '嘴里说的和心里想的相反', '是非', '矛盾'],
    answer: 1,
    explanation: '"口是心非"形容嘴里说的和心里想的相反。'
  },
  {
    id: 'idiom-109',
    question: '"阳奉阴违"这个成语的意思是？',
    options: ['阴阳', '表面服从，暗中违背', '奉承', '违背'],
    answer: 1,
    explanation: '"阳奉阴违"指表面服从，暗中违背。'
  },
  {
    id: 'idiom-110',
    question: '"两面三刀"这个成语比喻？',
    options: ['刀', '阴险狡猾，当面一套背后一套', '两面', '狡猾'],
    answer: 1,
    explanation: '"两面三刀"比喻阴险狡猾，当面一套背后一套。'
  },
  {
    id: 'idiom-111',
    question: '"表里不一"这个成语形容的是？',
    options: ['内外不同', '表面和内心不一致', '里外', '一致'],
    answer: 1,
    explanation: '"表里不一"形容表面和内心不一致。'
  },
  {
    id: 'idiom-112',
    question: '"口蜜腹剑"这个成语比喻？',
    options: ['蜜剑', '嘴甜心毒，阴险狡诈', '蜜蜂', '宝剑'],
    answer: 1,
    explanation: '"口蜜腹剑"比喻嘴甜心毒，阴险狡诈。'
  },
  {
    id: 'idiom-113',
    question: '"笑里藏刀"这个成语的意思是？',
    options: ['藏刀', '外表和善，内心险恶', '笑容', '刀子'],
    answer: 1,
    explanation: '"笑里藏刀"形容外表和善，内心险恶。'
  },
  {
    id: 'idiom-114',
    question: '"绵里藏针"这个成语比喻？',
    options: ['藏针', '外表柔弱，内心刚强', '棉花', '针'],
    answer: 1,
    explanation: '"绵里藏针"比喻外表柔弱，内心刚强。'
  },
  {
    id: 'idiom-115',
    question: '"刚柔相济"这个成语的意思是？',
    options: ['刚柔', '刚强的和柔和的互相补充', '刚强', '柔和'],
    answer: 1,
    explanation: '"刚柔相济"指刚强的和柔和的互相补充。'
  },
  {
    id: 'idiom-116',
    question: '"恩威并施"这个成语比喻？',
    options: ['恩威', '恩惠和威严同时使用', '施恩', '威严'],
    answer: 1,
    explanation: '"恩威并施"指恩惠和威严同时使用。'
  },
  {
    id: 'idiom-117',
    question: '"宽猛相济"这个成语的意思是？',
    options: ['宽猛', '宽大和严厉互相补充', '宽容', '严厉'],
    answer: 1,
    explanation: '"宽猛相济"指宽大和严厉互相补充。'
  },
  {
    id: 'idiom-118',
    question: '"恩怨分明"这个成语形容的是？',
    options: ['恩怨', '恩惠和怨仇分得清楚', '分明', '清楚'],
    answer: 1,
    explanation: '"恩怨分明"形容恩惠和怨仇分得清楚。'
  },
  {
    id: 'idiom-119',
    question: '"爱憎分明"这个成语的意思是？',
    options: ['爱憎', '爱和恨的界限分明', '分明', '清楚'],
    answer: 1,
    explanation: '"爱憎分明"指爱和恨的界限分明。'
  },
  {
    id: 'idiom-120',
    question: '"是非分明"这个成语比喻？',
    options: ['是非', '对错分得清楚', '分明', '清晰'],
    answer: 1,
    explanation: '"是非分明"指对错分得清楚。'
  }
];

// 古诗词题目（120道）
export const poetryQuestions: Question[] = [
  {
    id: 'poetry-1',
    question: '"床前明月光，疑是地上霜"的作者是？',
    options: ['杜甫', '白居易', '李白', '王维'],
    answer: 2,
    explanation: '这首《静夜思》的作者是李白，唐代著名诗人。'
  },
  {
    id: 'poetry-2',
    question: '"春眠不觉晓，处处闻啼鸟"的下一句是？',
    options: ['夜来风雨声', '花落知多少', '润物细无声', '明月松间照'],
    answer: 1,
    explanation: '全诗是：春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。'
  },
  {
    id: 'poetry-3',
    question: '"大漠孤烟直，长河落日圆"描写的季节是？',
    options: ['春季', '夏季', '秋季', '冬季'],
    answer: 2,
    explanation: '这是王维《使至塞上》中的诗句，描写的是边塞秋日的景象。'
  },
  {
    id: 'poetry-4',
    question: '"随风潜入夜，润物细无声"描写的是？',
    options: ['春风', '春雨', '秋雨', '冬雪'],
    answer: 1,
    explanation: '这是杜甫《春夜喜雨》中的诗句，描写的是春雨。'
  },
  {
    id: 'poetry-5',
    question: '"但使龙城飞将在，不教胡马度阴山"中的"飞将"指的是？',
    options: ['韩信', '李广', '卫青', '霍去病'],
    answer: 1,
    explanation: '"飞将"指西汉名将李广，英勇善战，匈奴称其为"汉之飞将军"。'
  },
  {
    id: 'poetry-6',
    question: '"采菊东篱下，悠然见南山"的作者是？',
    options: ['谢灵运', '陶渊明', '王维', '孟浩然'],
    answer: 1,
    explanation: '这是陶渊明《饮酒》中的名句。'
  },
  {
    id: 'poetry-7',
    question: '"落红不是无情物，化作春泥更护花"表达的是？',
    options: ['爱情的悲剧', '对春天的眷恋', '奉献精神', '对花的怜惜'],
    answer: 2,
    explanation: '这是龚自珍的诗句，表达的是无私奉献的精神。'
  },
  {
    id: 'poetry-8',
    question: '"不识庐山真面目，只缘身在此山中"蕴含的哲理是？',
    options: ['庐山很美', '山高路险', '当局者迷，旁观者清', '要身临其境'],
    answer: 2,
    explanation: '这句诗说明当事者往往因为局限于局部而无法看清全局。'
  },
  {
    id: 'poetry-9',
    question: '"粉身碎骨浑不怕，要留清白在人间"的作者是？',
    options: ['文天祥', '于谦', '岳飞', '辛弃疾'],
    answer: 1,
    explanation: '这是于谦《石灰吟》中的诗句。'
  },
  {
    id: 'poetry-10',
    question: '"山重水复疑无路，柳暗花明又一村"出自？',
    options: ['王安石', '陆游', '苏轼', '杨万里'],
    answer: 1,
    explanation: '这是陆游《游山西村》中的名句。'
  },
  {
    id: 'poetry-11',
    question: '"欲穷千里目，更上一层楼"的作者是？',
    options: ['李白', '王之涣', '杜甫', '白居易'],
    answer: 1,
    explanation: '这是王之涣《登鹳雀楼》中的诗句。'
  },
  {
    id: 'poetry-12',
    question: '"海内存知己，天涯若比邻"的作者是？',
    options: ['李白', '王勃', '杜甫', '王维'],
    answer: 1,
    explanation: '这是王勃《送杜少府之任蜀州》中的名句。'
  },
  {
    id: 'poetry-13',
    question: '"野火烧不尽，春风吹又生"描写的植物是？',
    options: ['树木', '花草', '野草', '庄稼'],
    answer: 2,
    explanation: '这是白居易《赋得古原草送别》中的诗句，描写的是野草。'
  },
  {
    id: 'poetry-14',
    question: '"谁知盘中餐，粒粒皆辛苦"的作者是？',
    options: ['李白', '杜甫', '李绅', '白居易'],
    answer: 2,
    explanation: '这是李绅《悯农》中的诗句。'
  },
  {
    id: 'poetry-15',
    question: '"人生自古谁无死，留取丹心照汗青"的作者是？',
    options: ['岳飞', '文天祥', '于谦', '辛弃疾'],
    answer: 1,
    explanation: '这是文天祥《过零丁洋》中的名句。'
  },
  {
    id: 'poetry-16',
    question: '"风萧萧兮易水寒，壮士一去兮不复还"中的"壮士"指的是？',
    options: ['荆轲', '高渐离', '樊於期', '太子丹'],
    answer: 0,
    explanation: '"壮士"指荆轲，战国时期著名的刺客。'
  },
  {
    id: 'poetry-17',
    question: '"少小离家老大回，乡音无改鬓毛衰"的作者是？',
    options: ['李白', '贺知章', '杜甫', '白居易'],
    answer: 1,
    explanation: '这是贺知章《回乡偶书》中的诗句。'
  },
  {
    id: 'poetry-18',
    question: '"两岸猿声啼不住，轻舟已过万重山"描写的江河是？',
    options: ['黄河', '长江', '珠江', '淮河'],
    answer: 1,
    explanation: '这是李白《早发白帝城》中的诗句，描写的是长江。'
  },
  {
    id: 'poetry-19',
    question: '"孤帆远影碧空尽，唯见长江天际流"的作者是？',
    options: ['李白', '孟浩然', '杜甫', '王维'],
    answer: 0,
    explanation: '这是李白《黄鹤楼送孟浩然之广陵》中的诗句。'
  },
  {
    id: 'poetry-20',
    question: '"飞流直下三千尺，疑是银河落九天"描写的是？',
    options: ['瀑布', '河流', '雨景', '银河'],
    answer: 0,
    explanation: '这是李白《望庐山瀑布》中的诗句，描写的是瀑布。'
  },
  {
    id: 'poetry-21',
    question: '"国破山河在，城春草木深"的作者是？',
    options: ['李白', '杜甫', '白居易', '王维'],
    answer: 1,
    explanation: '这是杜甫《春望》中的诗句。'
  },
  {
    id: 'poetry-22',
    question: '"感时花溅泪，恨别鸟惊心"表达的情感是？',
    options: ['喜悦', '忧伤', '思念', '悲愤'],
    answer: 3,
    explanation: '表达了诗人对国破家亡的悲愤之情。'
  },
  {
    id: 'poetry-23',
    question: '"安能摧眉折腰事权贵，使我不得开心颜"的作者是？',
    options: ['杜甫', '李白', '白居易', '苏轼'],
    answer: 1,
    explanation: '这是李白《梦游天姥吟留别》中的诗句。'
  },
  {
    id: 'poetry-24',
    question: '"天生我材必有用，千金散尽还复来"表达了诗人？',
    options: ['悲伤', '乐观自信', '消沉', '愤慨'],
    answer: 1,
    explanation: '表达了诗人乐观自信的人生态度。'
  },
  {
    id: 'poetry-25',
    question: '"会当凌绝顶，一览众山小"的作者是？',
    options: ['李白', '杜甫', '王维', '孟浩然'],
    answer: 1,
    explanation: '这是杜甫《望岳》中的诗句。'
  },
  {
    id: 'poetry-26',
    question: '"国破山河在"中"国"的意思是？',
    options: ['国家', '国都', '国土', '国度'],
    answer: 1,
    explanation: '"国"指国都，指长安。'
  },
  {
    id: 'poetry-27',
    question: '"烽火连三月"中"烽火"指的是？',
    options: ['火光', '战争', '信号', '烽火台'],
    answer: 1,
    explanation: '"烽火"指战争。'
  },
  {
    id: 'poetry-28',
    question: '"家书抵万金"中"抵"的意思是？',
    options: ['抵抗', '抵达', '抵得上', '抵押'],
    answer: 2,
    explanation: '"抵"意为抵得上、相当。'
  },
  {
    id: 'poetry-29',
    question: '"白日依山尽"中的"白日"指的是？',
    options: ['白色的太阳', '太阳', '白天', '中午'],
    answer: 1,
    explanation: '"白日"指太阳。'
  },
  {
    id: 'poetry-30',
    question: '"黄河入海流"描写的是？',
    options: ['河流的流向', '黄河的气势', '海水的流动', '自然景观'],
    answer: 1,
    explanation: '描写黄河奔腾入海的气势。'
  },
  {
    id: 'poetry-31',
    question: '"劝君更尽一杯酒"中"更"的意思是？',
    options: ['更加', '再', '更改', '更换'],
    answer: 1,
    explanation: '"更"意为再、再喝。'
  },
  {
    id: 'poetry-32',
    question: '"西出阳关无故人"的作者是？',
    options: ['李白', '王维', '杜甫', '王之涣'],
    answer: 1,
    explanation: '这是王维《送元二使安西》中的诗句。'
  },
  {
    id: 'poetry-33',
    question: '"独在异乡为异客"中"异客"的意思是？',
    options: ['外国客人', '他乡的客人', '陌生人', '异国他乡的人'],
    answer: 1,
    explanation: '"异客"指客居他乡的人。'
  },
  {
    id: 'poetry-34',
    question: '"每逢佳节倍思亲"的作者是？',
    options: ['李白', '王维', '杜甫', '白居易'],
    answer: 1,
    explanation: '这是王维《九月九日忆山东兄弟》中的诗句。'
  },
  {
    id: 'poetry-35',
    question: '"两岸青山相对出"的下一句是？',
    options: ['孤帆一片日边来', '轻舟已过万重山', '唯见长江天际流', '碧水东流至此回'],
    answer: 0,
    explanation: '这是李白《望天门山》中的诗句。'
  },
  {
    id: 'poetry-36',
    question: '"桃花潭水深千尺"的下一句是？',
    options: ['不及汪伦送我情', '唯见长江天际流', '孤帆远影碧空尽', '轻舟已过万重山'],
    answer: 0,
    explanation: '这是李白《赠汪伦》中的诗句。'
  },
  {
    id: 'poetry-37',
    question: '"慈母手中线，游子身上衣"的作者是？',
    options: ['李白', '孟郊', '杜甫', '白居易'],
    answer: 1,
    explanation: '这是孟郊《游子吟》中的诗句。'
  },
  {
    id: 'poetry-38',
    question: '"谁言寸草心，报得三春晖"表达的是？',
    options: ['母爱的伟大', '春天的美好', '寸草的心意', '三春的阳光'],
    answer: 0,
    explanation: '表达了母爱的伟大，难以报答。'
  },
  {
    id: 'poetry-39',
    question: '"春江潮水连海平，海上明月共潮生"出自？',
    options: ['张若虚', '李白', '杜甫', '王维'],
    answer: 0,
    explanation: '这是张若虚《春江花月夜》中的诗句。'
  },
  {
    id: 'poetry-40',
    question: '"海上生明月，天涯共此时"的作者是？',
    options: ['李白', '张九龄', '杜甫', '王维'],
    answer: 1,
    explanation: '这是张九龄《望月怀远》中的诗句。'
  },
  {
    id: 'poetry-41',
    question: '"露从今夜白，月是故乡明"的作者是？',
    options: ['李白', '杜甫', '王维', '白居易'],
    answer: 1,
    explanation: '这是杜甫《月夜忆舍弟》中的诗句。'
  },
  {
    id: 'poetry-42',
    question: '"举杯邀明月，对影成三人"的作者是？',
    options: ['杜甫', '李白', '王维', '白居易'],
    answer: 1,
    explanation: '这是李白《月下独酌》中的诗句。'
  },
  {
    id: 'poetry-43',
    question: '"明月松间照，清泉石上流"的作者是？',
    options: ['李白', '王维', '杜甫', '孟浩然'],
    answer: 1,
    explanation: '这是王维《山居秋暝》中的诗句。'
  },
  {
    id: 'poetry-44',
    question: '"停车坐爱枫林晚"中"坐"的意思是？',
    options: ['坐下', '因为', '坐车', '休息'],
    answer: 1,
    explanation: '"坐"意为因为。'
  },
  {
    id: 'poetry-45',
    question: '"霜叶红于二月花"的作者是？',
    options: ['李白', '杜牧', '杜甫', '白居易'],
    answer: 1,
    explanation: '这是杜牧《山行》中的诗句。'
  },
  {
    id: 'poetry-46',
    question: '"清明时节雨纷纷"的下一句是？',
    options: ['路上行人欲断魂', '牧童遥指杏花村', '借问酒家何处有', '此情可待成追忆'],
    answer: 0,
    explanation: '这是杜牧《清明》中的诗句。'
  },
  {
    id: 'poetry-47',
    question: '"借问酒家何处有，牧童遥指杏花村"的作者是？',
    options: ['李白', '杜牧', '杜甫', '白居易'],
    answer: 1,
    explanation: '这是杜牧《清明》中的诗句。'
  },
  {
    id: 'poetry-48',
    question: '"商女不知亡国恨，隔江犹唱后庭花"的作者是？',
    options: ['李白', '杜牧', '杜甫', '李商隐'],
    answer: 1,
    explanation: '这是杜牧《泊秦淮》中的诗句。'
  },
  {
    id: 'poetry-49',
    question: '"夕阳无限好，只是近黄昏"的作者是？',
    options: ['李白', '杜牧', '李商隐', '杜甫'],
    answer: 2,
    explanation: '这是李商隐《乐游原》中的诗句。'
  },
  {
    id: 'poetry-50',
    question: '"春蚕到死丝方尽，蜡炬成灰泪始干"的作者是？',
    options: ['李商隐', '杜牧', '李白', '杜甫'],
    answer: 0,
    explanation: '这是李商隐《无题》中的名句。'
  },
  {
    id: 'poetry-51',
    question: '"身无彩凤双飞翼，心有灵犀一点通"表达的是？',
    options: ['身体残疾', '心灵相通', '爱情', '思念'],
    answer: 1,
    explanation: '表达了两人心灵相通的深厚感情。'
  },
  {
    id: 'poetry-52',
    question: ' "何当共剪西窗烛，却话巴山夜雨时"的作者是？',
    options: ['李商隐', '杜牧', '李白', '杜甫'],
    answer: 0,
    explanation: '这是李商隐《夜雨寄北》中的诗句。'
  },
  {
    id: 'poetry-53',
    question: '"锦瑟无端五十弦"中的"锦瑟"指的是？',
    options: ['美丽的琴', '瑟', '古琴', '琵琶'],
    answer: 1,
    explanation: '"锦瑟"指瑟，一种乐器。'
  },
  {
    id: 'poetry-54',
    question: '"昨夜星辰昨夜风"的下一句是？',
    options: ['画楼西畔桂堂东', '身无彩凤双飞翼', '心有灵犀一点通', '春蚕到死丝方尽'],
    answer: 0,
    explanation: '这是李商隐《无题》中的诗句。'
  },
  {
    id: 'poetry-55',
    question: ' "风劲角弓鸣"中"角弓"指的是？',
    options: ['角的弓', '用兽角装饰的弓', '弯曲的弓', '弓箭'],
    answer: 1,
    explanation: '"角弓"指用兽角装饰的弓。'
  },
  {
    id: 'poetry-56',
    question: '"大漠沙如雪，燕山月似钩"的作者是？',
    options: ['李白', '李贺', '杜甫', '王维'],
    answer: 1,
    explanation: '这是李贺《马诗》中的诗句。'
  },
  {
    id: 'poetry-57',
    question: ' "黑云压城城欲摧"的下一句是？',
    options: ['甲光向日金鳞开', '角声满天秋色里', '塞上燕脂凝夜紫', '提携玉龙为君死'],
    answer: 0,
    explanation: '这是李贺《雁门太守行》中的诗句。'
  },
  {
    id: 'poetry-58',
    question: '"长风破浪会有时，直挂云帆济沧海"的作者是？',
    options: ['杜甫', '李白', '白居易', '苏轼'],
    answer: 1,
    explanation: '这是李白《行路难》中的名句。'
  },
  {
    id: 'poetry-59',
    question: '"抽刀断水水更流，举杯消愁愁更愁"表达了诗人？',
    options: ['豪迈', '愁苦无奈', '潇洒', '乐观'],
    answer: 1,
    explanation: '表达了诗人内心的愁苦和无奈。'
  },
  {
    id: 'poetry-60',
    question: ' "蜀道之难，难于上青天"的作者是？',
    options: ['杜甫', '李白', '白居易', '王维'],
    answer: 1,
    explanation: '这是李白《蜀道难》中的名句。'
  },
  {
    id: 'poetry-61',
    question: '"春风又绿江南岸，明月何时照我还"的作者是？',
    options: ['王安石', '苏轼', '欧阳修', '辛弃疾'],
    answer: 0,
    explanation: '这是王安石《泊船瓜洲》中的诗句。'
  },
  {
    id: 'poetry-62',
    question: '"不畏浮云遮望眼，自缘身在最高层"表达的是？',
    options: ['站得高', '不被假象迷惑，要有远见', '不畏困难', '自信'],
    answer: 1,
    explanation: '表达了不被假象迷惑，要有远见的哲理。'
  },
  {
    id: 'poetry-63',
    question: '"横看成岭侧成峰，远近高低各不同"蕴含的哲理是？',
    options: ['山的多姿', '从不同角度看问题，结果不同', '山水之美', '远近高低'],
    answer: 1,
    explanation: '说明从不同角度看问题，会得到不同的结论。'
  },
  {
    id: 'poetry-64',
    question: '"春色满园关不住，一枝红杏出墙来"的作者是？',
    options: ['叶绍翁', '杨万里', '范成大', '陆游'],
    answer: 0,
    explanation: '这是叶绍翁《游园不值》中的诗句。'
  },
  {
    id: 'poetry-65',
    question: '"小荷才露尖尖角，早有蜻蜓立上头"描写的是？',
    options: ['荷花', '初夏的景象', '蜻蜓', '池塘'],
    answer: 1,
    explanation: '描写初夏时节荷叶初长、蜻蜓停立的景象。'
  },
  {
    id: 'poetry-66',
    question: '"接天莲叶无穷碧，映日荷花别样红"的作者是？',
    options: ['杨万里', '范成大', '陆游', '苏轼'],
    answer: 0,
    explanation: '这是杨万里《晓出净慈寺送林子方》中的诗句。'
  },
  {
    id: 'poetry-67',
    question: '"水光潋滟晴方好，山色空蒙雨亦奇"描写的是？',
    options: ['西湖', '太湖', '洞庭湖', '鄱阳湖'],
    answer: 0,
    explanation: '这是苏轼《饮湖上初晴后雨》中的诗句，描写西湖。'
  },
  {
    id: 'poetry-68',
    question: '"欲把西湖比西子，淡妆浓抹总相宜"中的"西子"指的是？',
    options: ['西施', '西子', '美人', '女子'],
    answer: 0,
    explanation: '"西子"指西施，古代四大美女之一。'
  },
  {
    id: 'poetry-69',
    question: '"不识庐山真面目，只缘身在此山中"的作者是？',
    options: ['李白', '杜甫', '苏轼', '王维'],
    answer: 2,
    explanation: '这是苏轼《题西林壁》中的诗句。'
  },
  {
    id: 'poetry-70',
    question: '"竹外桃花三两枝，春江水暖鸭先知"描写的季节是？',
    options: ['春季', '夏季', '秋季', '冬季'],
    answer: 0,
    explanation: '描写的是早春时节的景象。'
  },
  {
    id: 'poetry-71',
    question: '"几处早莺争暖树，谁家新燕啄春泥"的作者是？',
    options: ['白居易', '杜甫', '李白', '王维'],
    answer: 0,
    explanation: '这是白居易《钱塘湖春行》中的诗句。'
  },
  {
    id: 'poetry-72',
    question: '"乱花渐欲迷人眼，浅草才能没马蹄"描写的是？',
    options: ['春天', '夏天', '秋天', '冬天'],
    answer: 0,
    explanation: '描写早春时节花草初长的景象。'
  },
  {
    id: 'poetry-73',
    question: '"枯藤老树昏鸦，小桥流水人家"的作者是？',
    options: ['马致远', '白朴', '关汉卿', '王实甫'],
    answer: 0,
    explanation: '这是马致远《天净沙·秋思》中的句子。'
  },
  {
    id: 'poetry-74',
    question: '"夕阳西下，断肠人在天涯"表达的情感是？',
    options: ['喜悦', '悲伤', '思乡', '忧愁'],
    answer: 2,
    explanation: '表达了游子思乡的凄凉之情。'
  },
  {
    id: 'poetry-75',
    question: '"渭城朝雨浥轻尘，客舍青青柳色新"的作者是？',
    options: ['王维', '李白', '杜甫', '白居易'],
    answer: 0,
    explanation: '这是王维《送元二使安西》中的诗句。'
  },
  {
    id: 'poetry-76',
    question: '"劝君更尽一杯酒"中"更"的意思是？',
    options: ['更加', '再', '更改', '更换'],
    answer: 1,
    explanation: '"更"意为再。'
  },
  {
    id: 'poetry-77',
    question: '"孤帆远影碧空尽，唯见长江天际流"表达的送别之情是？',
    options: ['不舍', '欢乐', '平静', '悲伤'],
    answer: 0,
    explanation: '表达了对友人的依依不舍之情。'
  },
  {
    id: 'poetry-78',
    question: '"桃花潭水深千尺"运用的修辞手法是？',
    options: ['比喻', '夸张', '拟人', '对偶'],
    answer: 1,
    explanation: '运用夸张手法，表现友情之深。'
  },
  {
    id: 'poetry-79',
    question: '"海内存知己，天涯若比邻"表达的是？',
    options: ['友情', '爱情', '亲情', '乡情'],
    answer: 0,
    explanation: '表达了深厚的友情，距离不是问题。'
  },
  {
    id: 'poetry-80',
    question: '"无为在歧路，儿女共沾巾"中的"儿女"指的是？',
    options: ['子女', '年轻人', '普通人', '男女'],
    answer: 2,
    explanation: '"儿女"指普通人，这里指青年男女。'
  },
  {
    id: 'poetry-81',
    question: '"山重水复疑无路，柳暗花明又一村"表达的哲理是？',
    options: ['山多水多', '困境中蕴含希望', '景色美丽', '路途曲折'],
    answer: 1,
    explanation: '表达了在困境中蕴含着希望的哲理。'
  },
  {
    id: 'poetry-82',
    question: '"萧鼓追随春社近，衣冠简朴古风存"的作者是？',
    options: ['陆游', '范成大', '杨万里', '苏轼'],
    answer: 0,
    explanation: '这是陆游《游山西村》中的诗句。'
  },
  {
    id: 'poetry-83',
    question: '"纸上得来终觉浅，绝知此事要躬行"的意思是？',
    options: ['读书有用', '从书本上得到的知识还要亲身实践', '实践重要', '知识浅显'],
    answer: 1,
    explanation: '强调实践的重要性，理论必须联系实际。'
  },
  {
    id: 'poetry-84',
    question: '"等闲识得东风面，万紫千红总是春"的作者是？',
    options: ['朱熹', '程颢', '陆游', '范成大'],
    answer: 0,
    explanation: '这是朱熹《春日》中的诗句。'
  },
  {
    id: 'poetry-85',
    question: '"问渠那得清如许，为有源头活水来"中"渠"指的是？',
    options: ['水渠', '池塘', '河流', '沟渠'],
    answer: 1,
    explanation: '"渠"指池塘。'
  },
  {
    id: 'poetry-86',
    question: '"为有源头活水来"蕴含的哲理是？',
    options: ['水要流动', '不断学习新知识，才能保持活力', '源头很重要', '活水好'],
    answer: 1,
    explanation: '说明要不断学习新知识，才能保持思想的活力。'
  },
  {
    id: 'poetry-87',
    question: '"人生自古谁无死，留取丹心照汗青"中"汗青"指的是？',
    options: ['汗', '青史', '史册', '历史'],
    answer: 2,
    explanation: '"汗青"指史册。古人用竹简书写，先用火烤干竹青，叫汗青。'
  },
  {
    id: 'poetry-88',
    question: '"辛苦遭逢起一经"中"一经"指的是？',
    options: ['一经书', '经书', '经典', '一经考试'],
    answer: 1,
    explanation: '"一经"指儒家经典。'
  },
  {
    id: 'poetry-89',
    question: '"干戈寥落四周星"中"干戈"指的是？',
    options: ['武器', '战争', '兵器', '干戈'],
    answer: 1,
    explanation: '"干戈"指战争。'
  },
  {
    id: 'poetry-90',
    question: '"山河破碎风飘絮，身世浮沉雨打萍"运用了什么修辞手法？',
    options: ['比喻', '拟人', '夸张', '对偶'],
    answer: 0,
    explanation: '运用比喻，将国家命运比作风中柳絮，个人命运比作雨打浮萍。'
  },
  {
    id: 'poetry-91',
    question: '"惶恐滩头说惶恐，零丁洋里叹零丁"中的"惶恐"和"零丁"分别指？',
    options: ['地名和心情', '心情和地名', '都是地名', '都是心情'],
    answer: 1,
    explanation: '"惶恐"是地名（惶恐滩），"零丁"是地名（零丁洋），也双关孤独无依的心情。'
  },
  {
    id: 'poetry-92',
    question: '"粉身碎骨浑不怕，要留清白在人间"中"浑"的意思是？',
    options: ['浑浊', '全', '浑身', '都'],
    answer: 1,
    explanation: '"浑"意为全、都。'
  },
  {
    id: 'poetry-93',
    question: '"千锤万凿出深山"中"千锤万凿"形容的是？',
    options: ['开采艰难', '开采次数多', '锤炼', '打凿'],
    answer: 0,
    explanation: '形容开采石灰石的艰难过程。'
  },
  {
    id: 'poetry-94',
    question: '"烈火焚烧若等闲"中"若等闲"的意思是？',
    options: ['好像很闲', '看得平常', '很悠闲', '若无其事'],
    answer: 1,
    explanation: '"若等闲"意为看得平常，不当回事。'
  },
  {
    id: 'poetry-95',
    question: '"咬定青山不放松"的作者是？',
    options: ['郑燮', '李白', '杜甫', '苏轼'],
    answer: 0,
    explanation: '这是郑燮（郑板桥）《竹石》中的诗句。'
  },
  {
    id: 'poetry-96',
    question: '"立根原在破岩中"中"原"的意思是？',
    options: ['原来', '原来就', '本', '根本'],
    answer: 1,
    explanation: '"原"意为本来。'
  },
  {
    id: 'poetry-97',
    question: '"千磨万击还坚劲"中"坚劲"的意思是？',
    options: ['坚定强劲', '坚强', '强劲', '刚强'],
    answer: 0,
    explanation: '"坚劲"意为坚定强劲。'
  },
  {
    id: 'poetry-98',
    question: '"任尔东西南北风"中"任"的意思是？',
    options: ['任务', '任凭', '让', '任命'],
    answer: 1,
    explanation: '"任"意为任凭、无论。'
  },
  {
    id: 'poetry-99',
    question: '"落红不是无情物，化作春泥更护花"中"落红"指的是？',
    options: ['红花', '落花', '红色', '花朵'],
    answer: 1,
    explanation: '"落红"指落花。'
  },
  {
    id: 'poetry-100',
    question: '"浩荡离愁白日斜"中"浩荡"形容的是？',
    options: ['广阔', '无边无际', '深沉', '巨大'],
    answer: 1,
    explanation: '"浩荡"形容离愁之深广无边。'
  },
  {
    id: 'poetry-101',
    question: '"吟鞭东指即天涯"中"吟鞭"的意思是？',
    options: ['吟诗的鞭子', '诗人的马鞭', '吟唱', '鞭子'],
    answer: 1,
    explanation: '"吟鞭"指诗人的马鞭。'
  },
  {
    id: 'poetry-102',
    question: '"我劝天公重抖擞"中"抖擞"的意思是？',
    options: ['振作', '振奋', '抖动', '精神'],
    answer: 0,
    explanation: '"抖擞"意为振作、振奋。'
  },
  {
    id: 'poetry-103',
    question: '"不拘一格降人才"中"不拘一格"的意思是？',
    options: ['不拘泥于一种格式', '不限规格', '不拘束', '自由'],
    answer: 0,
    explanation: '"不拘一格"意为不拘泥于一种格式，多种多样。'
  },
  {
    id: 'poetry-104',
    question: '"九州生气恃风雷"中"恃"的意思是？',
    options: ['依靠', '凭借', '等待', '依赖'],
    answer: 0,
    explanation: '"恃"意为依靠、依赖。'
  },
  {
    id: 'poetry-105',
    question: '"万马齐喑究可哀"中"喑"的意思是？',
    options: ['暗', '哑', '沉默', '无声'],
    answer: 1,
    explanation: '"喑"意为哑、沉默。'
  },
  {
    id: 'poetry-106',
    question: '"青海长云暗雪山"的作者是？',
    options: ['王昌龄', '王之涣', '李白', '杜甫'],
    answer: 0,
    explanation: '这是王昌龄《从军行》中的诗句。'
  },
  {
    id: 'poetry-107',
    question: '"黄沙百战穿金甲，不破楼兰终不还"表达的情感是？',
    options: ['悲壮', '豪迈坚定', '忧伤', '思念'],
    answer: 1,
    explanation: '表达了将士们豪迈坚定的报国情怀。'
  },
  {
    id: 'poetry-108',
    question: '"黄河远上白云间，一片孤城万仞山"的作者是？',
    options: ['王之涣', '王昌龄', '李白', '杜甫'],
    answer: 0,
    explanation: '这是王之涣《凉州词》中的诗句。'
  },
  {
    id: 'poetry-109',
    question: '"羌笛何须怨杨柳，春风不度玉门关"中"杨柳"指的是？',
    options: ['柳树', '折杨柳曲', '杨柳枝', '柳絮'],
    answer: 1,
    explanation: '"杨柳"指《折杨柳》曲，古代送别曲。'
  },
  {
    id: 'poetry-110',
    question: '"葡萄美酒夜光杯"的下一句是？',
    options: ['欲饮琵琶马上催', '醉卧沙场君莫笑', '古来征战几人回', '秦时明月汉时关'],
    answer: 0,
    explanation: '这是王翰《凉州词》中的诗句。'
  },
  {
    id: 'poetry-111',
    question: '"醉卧沙场君莫笑，古来征战几人回"表达的是？',
    options: ['豪迈豁达', '悲伤凄凉', '思乡之情', '壮志难酬'],
    answer: 0,
    explanation: '表达了将士们豪迈豁达、视死如归的情怀。'
  },
  {
    id: 'poetry-112',
    question: '"秦时明月汉时关"的作者是？',
    options: ['王昌龄', '王之涣', '李白', '杜甫'],
    answer: 0,
    explanation: '这是王昌龄《出塞》中的诗句。'
  },
  {
    id: 'poetry-113',
    question: '"但使龙城飞将在，不教胡马度阴山"中"飞将"指的是？',
    options: ['李广', '卫青', '霍去病', '韩信'],
    answer: 0,
    explanation: '"飞将"指西汉名将李广。'
  },
  {
    id: 'poetry-114',
    question: '"黑云压城城欲摧"的作者是？',
    options: ['李贺', '李白', '杜甫', '王昌龄'],
    answer: 0,
    explanation: '这是李贺《雁门太守行》中的诗句。'
  },
  {
    id: 'poetry-115',
    question: '"甲光向日金鳞开"中"甲光"指的是？',
    options: ['甲壳的光', '铠甲迎着太阳闪出的光', '光芒', '阳光'],
    answer: 1,
    explanation: '"甲光"指铠甲迎着太阳闪出的光。'
  },
  {
    id: 'poetry-116',
    question: '"角声满天秋色里"中"角"指的是？',
    options: ['角落', '号角', '角兽', '角度'],
    answer: 1,
    explanation: '"角"指号角。'
  },
  {
    id: 'poetry-117',
    question: '"塞上燕脂凝夜紫"中"燕脂"指的是？',
    options: ['胭脂', '胭脂色', '红色的土壤', '血迹'],
    answer: 1,
    explanation: '"燕脂"同"胭脂"，指胭脂色，形容边塞夜色。'
  },
  {
    id: 'poetry-118',
    question: '"报君黄金台上意，提携玉龙为君死"中"玉龙"指的是？',
    options: ['玉做的龙', '宝剑', '龙', '玉石'],
    answer: 1,
    explanation: '"玉龙"指宝剑。'
  },
  {
    id: 'poetry-119',
    question: '"十年生死两茫茫"的作者是？',
    options: ['苏轼', '李白', '杜甫', '李商隐'],
    answer: 0,
    explanation: '这是苏轼《江城子·乙卯正月二十日夜记梦》中的句子。'
  },
  {
    id: 'poetry-120',
    question: '"不思量，自难忘"表达的是？',
    options: ['忘记', '思念深切，难以忘怀', '记不住', '不想'],
    answer: 1,
    explanation: '表达了对亡妻的深切思念，难以忘怀。'
  }
];

// 根据题型获取题目
export function getQuestionsByType(type: QuestionType, count: number = 10): Question[] {
  switch (type) {
    case 'wenyan':
      return shuffleArray([...wenyanQuestions]).slice(0, count);
    case 'idiom':
      return shuffleArray([...idiomQuestions]).slice(0, count);
    case 'poetry':
      return shuffleArray([...poetryQuestions]).slice(0, count);
    default:
      return [];
  }
}

// 随机打乱数组
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}
