// 题库数据类型定义
export interface Question {
  id: string;
  question: string;
  options: string[];
  answer: number; // 正确答案的索引（0-3）
  explanation: string; // 答案解析
}

export type QuestionType = 'wenyan' | 'idiom' | 'poetry';

// 文言文字词题目
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
    options: ['厌恶', '厌倦', '讨厌', '厌烦'],
    answer: 1,
    explanation: '"厌"意为满足，"不厌"指永不满足，学习永不厌倦。'
  },
  {
    id: 'wenyan-10',
    question: '"己所不欲，勿施于人"中"施"的意思是？',
    options: ['施展', '实施', '施加', '施舍'],
    answer: 2,
    explanation: '"施"意为施加，把自己不想要的强加给别人。'
  }
];

// 成语题目
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
  }
];

// 古诗词题目
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
  }
];

// 根据题型获取题目
export function getQuestionsByType(type: QuestionType, count: number = 10): Question[] {
  switch (type) {
    case 'wenyan':
      return wenyanQuestions.slice(0, count);
    case 'idiom':
      return idiomQuestions.slice(0, count);
    case 'poetry':
      return poetryQuestions.slice(0, count);
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
