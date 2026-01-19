// 题库数据类型定义
export interface Question {
  id: string;
  question: string;
  options: string[];
  answer: number; // 正确答案的索引（0-3）
  explanation: string; // 答案解析
}

export type QuestionType = 'wenyan' | 'idiom' | 'poetry';

// 文言文字词题目（60道）
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
  }
];

// 成语典故题目（60道）
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
  }
];

// 古诗词题目（60道）
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
