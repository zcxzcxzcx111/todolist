import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Modal, Dimensions,
} from 'react-native';
import { TravelProgress } from '../types';
import { cities } from '../data/cities';
import { colors, typography, spacing, radius, shadow } from '../theme';
import StickerDesign from '../components/StickerDesign';
import { ForbiddenCitySticker, GreatWallSticker, OperaMaskSticker, DumplingSticker, PandaSticker } from '../components/BeijingStickers';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface Sticker {
  emoji: string;
  name: string;
  description: string;
  rarity: 'common' | 'rare' | 'legendary';
}

// 每个国家的标志性贴纸（含详细文化故事和稀有度）
const CITY_STICKERS: Record<string, Sticker[]> = {
  beijing: [
    {
      emoji: '🏯', name: '紫禁城',
      description: '明清两代24位皇帝的皇宫，始建于1406年，历时14年建成。拥有9999间半房间，传说天上的宫殿有10000间，人间的皇帝不敢超越天庭，所以少了半间。故宫占地72万平方米，是世界上现存规模最大、保存最完整的木质结构古建筑群。每年接待游客超过1900万人次。',
      rarity: 'rare',
    },
    {
      emoji: '🧱', name: '万里长城',
      description: '始建于西周时期，秦始皇统一六国后将其连接扩建。总长度超过21000公里，横跨15个省份。长城不是一道连续的墙，而是由城墙、敌楼、关城、烽火台等多种防御工事组成的完整军事防御体系。民间流传"不到长城非好汉"，每年吸引超过1000万游客。1987年被列入世界文化遗产。',
      rarity: 'legendary',
    },
    {
      emoji: '🎭', name: '京剧脸谱',
      description: '京剧形成于清朝乾隆年间，至今已有200多年历史。脸谱是京剧演员面部化妆的图案，每种颜色代表不同性格：红色代表忠诚勇猛（如关羽），黑色代表刚直不阿（如包拯），白色代表奸诈阴险（如曹操），蓝色代表刚强骁勇，绿色代表侠骨义胆。京剧被誉为"国粹"，2010年被列入人类非物质文化遗产。',
      rarity: 'common',
    },
    {
      emoji: '🥟', name: '饺子',
      description: '相传由东汉医圣张仲景发明，最初是用面皮包裹药材，治疗百姓冻伤的耳朵。饺子形似元宝，象征招财进宝，是北方除夕夜必吃的传统美食。一家人围坐在一起包饺子，是中国人最温馨的家庭时光。有句俗语："好吃不过饺子，舒服不过倒着。"春节吃饺子还有"更岁交子"之意。',
      rarity: 'common',
    },
    {
      emoji: '🐼', name: '大熊猫',
      description: '已在地球上生存了800万年，被誉为"活化石"。成年大熊猫体重可达100-150公斤，但刚出生时只有100克左右，相当于母亲体重的千分之一。大熊猫每天要吃12-38公斤竹子，但只能消化吸收其中的17%。它们有"第六指"——伪拇指，专门用来抓握竹子。目前全球野生大熊猫约1864只，是中国的国宝和和平使者。',
      rarity: 'legendary',
    },
  ],
  tokyo: [
    {
      emoji: '🗼', name: '东京塔',
      description: '建于1958年，高333米，以巴黎埃菲尔铁塔为蓝本，但比埃菲尔铁塔高出13米。塔身涂成橙红色和白色相间，这是航空安全法规的要求。东京塔是东京的象征，曾出现在无数动漫和电影中。夜晚亮灯时，塔身会根据季节变换颜色：夏天是清凉的白色，冬天是温暖的橙色。登上展望台，天气晴好时可以看到富士山。',
      rarity: 'common',
    },
    {
      emoji: '🍣', name: '寿司',
      description: '寿司的起源可以追溯到公元8世纪，最初是一种用盐和米饭腌制鱼肉的保存方法。现代握寿司是江户时代（19世纪）东京的街头快餐。寿司师傅需要经过10年以上的学徒训练，才能独立捏制寿司。金枪鱼大腹（toro）是最珍贵的部位，入口即化。吃寿司的传统是先吃白身鱼，再吃红身鱼，最后吃�的卷物。',
      rarity: 'common',
    },
    {
      emoji: '🌸', name: '樱花',
      description: '日本有超过600种樱花，最常见的是染井吉野樱，占全国樱花的80%。樱花从南到北依次开放，形成"樱花前线"。日本人赏樱（花见）的传统始于奈良时代，已有千年历史。樱花的花期只有7-10天，象征着生命的短暂与美好，与武士道精神中的"刹那即永恒"相呼应。每年春天，整个日本沉浸在粉色的花海中。',
      rarity: 'rare',
    },
    {
      emoji: '⛩️', name: '鸟居',
      description: '鸟居是神社的入口标志，分隔神界与人间。"鸟居"在日语中意为"鸟停留的地方"，传说天照大神躲入洞穴时，一只公鸡停在鸟居上啼叫，唤醒了太阳。鸟居通常涂成朱红色，这是古代日本人认为可以辟邪的颜色。最著名的鸟居是京都伏见稻荷大社的千本鸟居——数千座朱红色鸟居形成一条隧道，绵延数公里。',
      rarity: 'common',
    },
    {
      emoji: '🐱', name: '招财猫',
      description: '招财猫起源于江户时代的东京豪德寺传说：一位贫困的和尚收养了一只猫，某天猫举起前爪招呼路过的领主进寺避雨，领主感激不已，成为寺庙的赞助人。举左手招客人，举右手招财运，双手举起则同时招财招客。白色招财猫代表招福，金色代表财运亨通，黑色辟邪消灾。如今招财猫已成为全球知名的日本文化符号。',
      rarity: 'legendary',
    },
  ],
  paris: [
    {
      emoji: '🗼', name: '埃菲尔铁塔',
      description: '1889年为巴黎世博会而建，由工程师古斯塔夫·埃菲尔设计。建造时遭到巴黎市民的强烈反对，300位艺术家联名抗议，称其为"钢铁怪物"。铁塔高324米，使用了18038块钢铁和250万颗铆钉。原计划20年后拆除，但因无线电天线的存在而保留。每年有700万游客登塔，是世界上参观人数最多的付费纪念碑。夜晚铁塔会闪烁2万盏灯光。',
      rarity: 'rare',
    },
    {
      emoji: '🥐', name: '牛角面包',
      description: '关于牛角面包的起源众说纷纭，最流行的说法是1683年维也纳面包师为庆祝击退土耳其军队而发明，形状模仿土耳其旗帜上的弯月。另一种说法是1770年奥地利公主玛丽·安托瓦内特嫁给路易十六时，将这种面包带到了巴黎。正宗的法式牛角面包必须使用黄油层层折叠，烤出来才有酥脆的金黄色外壳和柔软的蜂窝状内芯。',
      rarity: 'common',
    },
    {
      emoji: '🎨', name: '印象派画作',
      description: '1874年，一群被巴黎官方沙龙拒绝的画家举办了独立画展。评论家路易·勒鲁瓦嘲笑莫奈的《印象·日出》说："这只是个印象！"这个贬义词反而成为了艺术流派的名称。印象派画家走出画室，在户外捕捉光影的瞬间变化，开创了现代艺术的先河。代表人物有莫奈、雷诺阿、德加、毕沙罗等。巴黎的奥赛美术馆收藏了世界上最多的印象派作品。',
      rarity: 'rare',
    },
    {
      emoji: '🍷', name: '波尔多红酒',
      description: '波尔多是世界上最著名的葡萄酒产区，拥有超过7000家酒庄。法国人平均每人每年消费42升葡萄酒。波尔多红酒以赤霞珠和梅洛葡萄为主，需要在橡木桶中陈酿12-24个月。最昂贵的波尔多酒是罗曼尼·康帝，一瓶1945年的拍出了55.8万美元。法国法律规定，只有在香槟地区生产的起泡酒才能叫"香槟"。',
      rarity: 'common',
    },
    {
      emoji: '👒', name: '法式贝雷帽',
      description: '贝雷帽起源于17世纪的法国巴斯克地区，最初是牧羊人的帽子。20世纪初，法国军队将贝雷帽作为军用装备，不同兵种佩戴不同颜色。后来贝雷帽成为艺术家和知识分子的标志，毕加索、海明威等名人都常戴贝雷帽。法国每年生产约200万顶贝雷帽，其中大部分出口到日本。一顶手工制作的正宗贝雷帽需要经过30多道工序。',
      rarity: 'common',
    },
  ],
  london: [
    {
      emoji: '🎡', name: '伦敦眼',
      description: '2000年为迎接千禧年而建，由建筑师大卫·马克斯和朱莉娅·巴菲尔德设计。高135米，曾是世界上最大的摩天轮（现被新加坡飞行者超越）。每个座舱重10吨，可容纳25人，旋转一圈需要30分钟。从最高点可以俯瞰40公里外的景色。伦敦眼原本只是临时建筑，因为太受欢迎而被保留。夜晚亮灯时，它是泰晤士河畔最闪亮的风景。',
      rarity: 'common',
    },
    {
      emoji: '📞', name: '红色电话亭',
      description: '1924年由英国邮政总局设计师贾尔斯·吉尔伯特·斯科特设计，型号为K2。最初是银色的，后来改为标志性的红色。在鼎盛时期，英国共有超过7万个红色电话亭。如今大部分已被拆除，但仍保留了约1万个作为文化遗产。许多被改造成微型图书馆、咖啡馆、甚至急救站。在伦敦街头偶遇一个红色电话亭，是每个游客必拍的照片。',
      rarity: 'rare',
    },
    {
      emoji: '💂', name: '皇家卫兵',
      description: '白金汉宫的皇家卫兵身穿红色制服、头戴熊皮高帽，是英国最著名的形象之一。熊皮帽高18英寸（46厘米），重约1.5磅。卫兵们必须保持绝对静止，不能与游客互动。曾经有游客试图逗笑卫兵，但卫兵会突然举枪对准捣乱者，并大喊"退后！"皇家卫兵换岗仪式是伦敦最受欢迎的旅游景点之一，每天上午11:30举行。',
      rarity: 'rare',
    },
    {
      emoji: '🫖', name: '英式红茶',
      description: '英国人每天喝掉1.65亿杯茶，人均茶叶消费量居世界第三。下午茶传统始于1840年代，贝德福德公爵夫人安娜因为下午饥饿，开始在午餐和晚餐之间加一顿茶点。英式红茶通常加牛奶，有些人还加糖。茶包是1908年由美国商人托马斯·沙利文意外发明的。英国最著名的茶品牌是川宁（Twinings），创立于1706年，至今仍在伦敦斯特兰德大街的原址经营。',
      rarity: 'common',
    },
    {
      emoji: '☔', name: '伦敦雨伞',
      description: '伦敦每年平均有106天下雨，但多是小雨或毛毛雨，很少有暴雨。英国人对雨伞的热爱可以追溯到18世纪，当时雨伞还是女性用品。1750年代，英国绅士乔纳斯·汉威成为第一个公开打伞的男性，曾被人嘲笑。如今，一把手工制作的英国雨伞是绅士的必备品，最著名的品牌是James Smith & Sons，创立于1830年。在伦敦，打伞是一种优雅的生活态度。',
      rarity: 'common',
    },
  ],
  newyork: [
    {
      emoji: '🗽', name: '自由女神',
      description: '1886年由法国赠送，由雕塑家弗雷德里克·奥古斯特·巴托尔迪设计，内部结构由埃菲尔铁塔的设计师古斯塔夫·埃菲尔设计。女神像高46米，加上基座总高93米。她右手高举的火炬象征自由之光，左手持《独立宣言》，脚下踩着断裂的锁链象征摆脱压迫。皇冠上的七道光芒代表七大洲。每年有超过400万游客参观。',
      rarity: 'rare',
    },
    {
      emoji: '🍕', name: '纽约披萨',
      description: '纽约披萨的独特之处在于使用纽约自来水制作面团，纽约人坚信这是披萨美味的秘诀。正宗纽约披萨必须薄底、大块、对折吃。第一间披萨店是1905年在曼哈顿小意大利开业的Lombardi餐厅。纽约人平均每人每年吃掉46片披萨。纽约全城有超过400家披萨店，竞争激烈。一美元一片的披萨是纽约最实惠的街头美食。',
      rarity: 'common',
    },
    {
      emoji: '🚕', name: '黄色出租车',
      description: '纽约黄色出租车始于1907年，当时汽车租赁公司为了与马车竞争，将车辆涂成醒目的黄色。如今纽约有超过13000辆持牌出租车，司机多为移民。出租车顶灯的亮灭表示是否空车：亮灯表示可以载客。纽约出租车司机每天工作12小时，平均行驶180英里。打车时需要告诉司机街道地址，而不是地标名称。小费通常是车费的15-20%。',
      rarity: 'common',
    },
    {
      emoji: '🎬', name: '百老汇',
      description: '百老汇是纽约曼哈顿的一条大道，因两旁聚集了大量剧院而闻名。狭义的百老汇指42街至53街之间的41家大型剧院。百老汇音乐剧起源于19世纪末，融合了歌唱、舞蹈和戏剧。最著名的剧目包括《歌剧魅影》（连续演出35年）、《狮子王》、《汉密尔顿》等。一场百老汇演出的平均票价为120美元，热门剧目常常一票难求。',
      rarity: 'rare',
    },
    {
      emoji: '🌳', name: '中央公园',
      description: '建于1857年，由景观设计师弗雷德里克·劳·奥姆斯特德和卡尔弗特·沃克斯设计。公园占地341公顷（843英亩），比欧洲的摩纳哥国家还大。每年接待4200万游客，是美国参观人数最多的城市公园。公园内有9000张长椅、36座桥梁和拱门、21个游乐场。冬天的沃尔曼溜冰场是纽约最浪漫的地方之一。中央公园是纽约的绿色心脏，也是无数电影的取景地。',
      rarity: 'common',
    },
  ],
  sydney: [
    {
      emoji: '🎭', name: '悉尼歌剧院',
      description: '1957年，丹麦建筑师约恩·乌松的设计方案从233个参赛作品中脱颖而出。建造过程困难重重，最终耗时16年、耗资1.02亿澳元（超出预算14倍），乌松因此被迫辞职，再也没有回到悉尼看过自己的作品。歌剧院由105.6万块瑞典制造的白色瓷砖覆盖，屋顶形状灵感来自橙子瓣。2007年被列入世界文化遗产，每年举办1500多场演出。',
      rarity: 'rare',
    },
    {
      emoji: '🐨', name: '考拉',
      description: '考拉不是熊，是有袋类动物。它们每天睡18-22小时，因为桉树叶营养极低，需要大量休息来消化。考拉有指纹，与人类几乎无法区分，连FBI都曾为此困扰。考拉的脑容量仅占体重的0.2%，是所有哺乳动物中比例最小的。小考拉出生时只有2厘米长，会吃母亲的粪便来获取消化桉树叶所需的肠道菌群。由于栖息地减少和疾病，考拉数量急剧下降。',
      rarity: 'rare',
    },
    {
      emoji: '🦘', name: '袋鼠',
      description: '澳大利亚有超过50种袋鼠，数量约5000万只，比人口还多。袋鼠只会向前跳，不会后退，因此被选入澳大利亚国徽，象征国家永远前进。袋鼠的尾巴相当于"第五条腿"，在慢速移动时起到平衡作用。红袋鼠是最大的种类，站起来可达2米。袋鼠可以跳到3米高、9米远。在澳大利亚高速公路上，黄昏和黎明是遇到袋鼠最危险的时段。',
      rarity: 'common',
    },
    {
      emoji: '🏄', name: '冲浪板',
      description: '冲浪起源于古代波利尼西亚，夏威夷人将其发展为运动。澳大利亚是世界上冲浪文化最浓厚的国家之一，邦迪海滩（Bondi Beach）是全球最著名的冲浪圣地。"Bondi"在原住民语言中意为"水拍打岩石的声音"。澳大利亚有超过1.1万公里的海岸线，拥有无数世界级浪点。每年举办的邦迪冲浪比赛吸引全球顶尖选手。冲浪板从最初的实木板发展到如今的轻质复合材料。',
      rarity: 'common',
    },
    {
      emoji: '🏖️', name: '邦迪海滩',
      description: '邦迪海滩位于悉尼东郊，全长1公里。每天有超过4万人来此，夏天高峰时可达10万人。邦迪救生俱乐部成立于1907年，是世界上第一个冲浪救生俱乐部。海滩旁的冰山泳池建在海边岩石上，海浪会直接涌入池中。2004年，一群半裸的背包客在海滩上打板球，引发了关于公共场合着装的全国大讨论。邦迪海滩是悉尼最具代表性的地标之一。',
      rarity: 'common',
    },
  ],
  cairo: [
    {
      emoji: '🏛️', name: '吉萨金字塔',
      description: '吉萨大金字塔建于公元前2560年，是古埃及法老胡夫的陵墓。原高146.5米，由230万块石头建成，每块平均重2.5吨，最重的达80吨。金字塔的四个底边长度误差不超过58毫米，精度惊人。建造方法至今仍是谜，最流行的理论是斜坡+滚轮。金字塔内部温度常年保持20°C。4500年来，它一直是世界上最高的人工建筑，直到1311年被英国林肯大教堂超越。',
      rarity: 'legendary',
    },
    {
      emoji: '🐫', name: '骆驼',
      description: '骆驼被称为"沙漠之舟"，可以在没有水的情况下生存7天，在没有食物的情况下生存一个月。骆驼的驼峰储存的不是水，而是脂肪，在食物匮乏时可以提供能量。骆驼可以在50°C的高温和-40°C的严寒中生存。它们的红细胞是椭圆形的，即使脱水也不会堵塞血管。骆驼的奔跑速度可达65公里/小时。在埃及，骑骆驼游览金字塔是最受欢迎的体验之一。',
      rarity: 'common',
    },
    {
      emoji: '👑', name: '法老头饰',
      description: '法老的头饰有多种样式，最著名的是"双冠"——白色上埃及王冠和红色下埃及王冠合二为一，象征统一。奈费尔提蒂的彩绘半身像展示了精美的蓝色王冠。法老还佩戴假胡子，象征与神的联系。图坦卡蒙的黄金面具重达11公斤，镶嵌着青金石、绿松石等宝石。法老的权力象征还包括连枷和弯钩，分别代表惩罚和保护。',
      rarity: 'rare',
    },
    {
      emoji: '📜', name: '莎草纸',
      description: '莎草纸是人类最早的书写材料之一，比中国的造纸术早了约2000年。它由尼罗河三角洲的纸莎草制成：将茎切成薄片，交叉铺叠，用石头压平晾干。古埃及人用芦苇笔蘸墨水书写，创造了象形文字。现存最长的莎草纸是《亡灵书》，长达37米。莎草纸非常耐用，出土的3000年前的莎草纸仍可阅读。"paper"一词就源自"papyrus"（莎草纸）。',
      rarity: 'rare',
    },
    {
      emoji: '🪲', name: '圣甲虫',
      description: '圣甲虫（屎壳郎）在古埃及是最神圣的动物。古埃及人观察到圣甲虫推动粪球的行为，将其与太阳神推动太阳穿越天空联系起来。圣甲虫象征重生和再生，被制成护身符佩戴。在葬礼中，心脏形状的圣甲虫护符被放在死者心脏位置，以保护来世。法老的印章也刻有圣甲虫图案。如今，圣甲虫仍是埃及最受欢迎的旅游纪念品之一。',
      rarity: 'common',
    },
  ],
  rio: [
    {
      emoji: '⛪', name: '基督像',
      description: '里约基督救世主像建于1922-1931年，由法国雕塑家保罗·兰多夫斯基设计，巴西工程师海托尔·达·席尔瓦·科斯塔建造。雕像高38米，臂展28米，重1145吨，建在科科瓦多山顶710米处。雕像表面由 soapstone（皂石）马赛克覆盖，能抵抗强风和雷击。2007年被评为世界新七大奇迹之一。每年有超过200万游客登顶参观，站在基督像脚下，可以俯瞰整个里约热内卢。',
      rarity: 'rare',
    },
    {
      emoji: '⚽', name: '足球',
      description: '巴西是唯一参加过所有20届世界杯的国家，五次夺冠（1958、1962、1970、1994、2002），是世界杯历史上最成功的国家。足球在巴西不仅是一项运动，更是一种文化。贫民窟的孩子们在沙滩上踢球，培养了巴西足球特有的灵性和创造力。贝利被广泛认为是足球史上最伟大的球员，职业生涯打进1283球。巴西国家队的黄色球衣是世界上最易识别的运动服装之一。',
      rarity: 'common',
    },
    {
      emoji: '💃', name: '桑巴舞',
      description: '桑巴起源于非洲奴隶带到巴西的舞蹈，融合了非洲节奏和欧洲旋律。1920年代，桑巴从贫民窟走向主流社会。每年二月的里约狂欢节是世界上最大的派对，持续5天，吸引超过200万游客。桑巴学校需要花一整年准备狂欢节表演，每支队伍可达5000人。桑巴舞的基本步伐是"三步"，看似简单却需要极强的节奏感和髋部灵活性。',
      rarity: 'common',
    },
    {
      emoji: '🎭', name: '桑巴面具',
      description: '里约狂欢节的面具和服装是艺术与工程的结合。每件服装都需要数千小时手工制作，使用羽毛、亮片、水晶等材料。最华丽的服装重达15公斤，穿着者需要极大的体力。面具的设计灵感来自神话人物、动物和抽象艺术。狂欢节皇后会佩戴镶嵌施华洛世奇水晶的面具，价值数千美元。面具背后是巴西人对自由、快乐和自我表达的追求。',
      rarity: 'rare',
    },
    {
      emoji: '🏖️', name: '科帕卡巴纳',
      description: '科帕卡巴纳海滩全长4公里，是世界上最著名的海滩之一。海滩上的人行路采用独特的波浪形黑白石子图案，由巴西景观建筑师罗伯托·伯利·马克斯于1970年设计。海滩旁的科帕卡巴纳宫酒店曾接待过迈克尔·杰克逊、麦当娜等名人。每年新年前夕，超过200万人聚集在海滩上观看烟花，人们穿着白色衣服，按照传统跳过七道海浪许愿。',
      rarity: 'common',
    },
  ],
  istanbul: [
    {
      emoji: '🕌', name: '蓝色清真寺',
      description: '蓝色清真寺建于1609-1616年，由苏丹艾哈迈德一世下令建造。它的正式名称是苏丹艾哈迈德清真寺，因内部使用了2万多块蓝色伊兹尼克瓷砖而得名"蓝色清真寺"。它是世界上唯一拥有六座宣礼塔的清真寺，当时引起争议，因为只有麦加的清真寺才有六座。为平息争议，苏丹出资为麦加清真寺增建了第七座宣礼塔。清真寺可容纳1万名信徒。',
      rarity: 'rare',
    },
    {
      emoji: '🏮', name: '土耳其灯',
      description: '土耳其灯（也叫摩洛哥灯）是伊斯坦布尔大巴扎最受欢迎的纪念品。每盏灯都是手工制作的，使用彩色玻璃和黄铜，需要数天完成。灯罩上的几何图案源自伊斯兰艺术传统，避免描绘人物形象。夜晚点亮时，彩色光影会在墙壁和天花板上跳舞，营造出梦幻氛围。在大巴扎砍价买灯是一种文化体验，开价通常可以砍掉一半。',
      rarity: 'common',
    },
    {
      emoji: '🧆', name: '烤肉串',
      description: '土耳其烤肉（Kebab）有上百种变体。旋转烤肉（Döner Kebab）是19世纪在布尔萨发明的：将腌制的肉片层层叠放，竖立在旋转烤架上慢慢烤熟。土耳其人平均每人每年消费超过50公斤肉。最正宗的吃法是配着薄饼、酸奶和烤蔬菜。伊斯坦布尔的烤肉店从清晨营业到深夜，是市民生活中不可或缺的一部分。',
      rarity: 'common',
    },
    {
      emoji: '🧿', name: '恶魔之眼',
      description: '恶魔之眼（Nazar）是土耳其最常见的护身符，由蓝色、白色、黄色和黑色玻璃制成。它源于一个古老传说：嫉妒的目光会带来厄运，而恶魔之眼可以吸收这种负面能量。土耳其人将恶魔之眼挂在门口、汽车、婴儿摇篮甚至牲畜身上。在伊斯坦布尔的大巴扎，你可以找到各种尺寸的恶魔之眼，从小如硬币到大如餐盘。它是土耳其最受欢迎的旅游纪念品。',
      rarity: 'common',
    },
    {
      emoji: '🛁', name: '土耳其浴',
      description: '土耳其浴（Hammam）源自古罗马的沐浴文化，经拜占庭和奥斯曼帝国传承至今已有千年历史。沐浴过程包括：在加热的大理石台上蒸桑拿、用粗糙手套搓去死皮、涂满泡沫按摩、最后用冷水冲洗。伊斯坦布尔最著名的浴室是建于1741年的加拉塔萨雷浴场。传统上，土耳其浴是重要的社交场合，新娘婚前会在浴室举行派对。如今它是游客必体验的项目。',
      rarity: 'rare',
    },
  ],
  capetown: [
    {
      emoji: '⛰️', name: '桌山',
      description: '桌山是开普敦的标志，海拔1085米，山顶平坦如桌。它已有6亿年历史，是世界上最古老的山脉之一。桌山有超过2000种植物，比整个英国还多。1936年开通的缆车每6分钟旋转一圈，让游客360度欣赏风景。桌山顶上常有云层覆盖，当地人称之为"桌布"。传说这是魔鬼和一个叫范·洪克斯的吸烟者打赌的烟雾。2012年桌山被评为世界新七大自然奇观。',
      rarity: 'rare',
    },
    {
      emoji: '🐧', name: '非洲企鹅',
      description: '非洲企鹅是唯一生活在非洲的企鹅品种，身高约60厘米，叫声像驴，因此也叫"驴企鹅"。它们的栖息地就在开普敦的博尔德斯海滩，游客可以在木栈道上近距离观察。非洲企鹅是濒危物种，数量从1900年的150万只减少到现在的不到5万只。它们胸前的黑色斑点就像人类的指纹，每只都不同。企鹅是一夫一妻制，伴侣之间会互相梳理羽毛表达爱意。',
      rarity: 'rare',
    },
    {
      emoji: '🗿', name: '非洲木雕',
      description: '非洲木雕是非洲最古老的艺术形式，已有数千年历史。每件作品都有特定的文化含义：面具用于宗教仪式，人像纪念祖先，动物雕塑象征力量和智慧。马孔德族的木雕最为著名，使用非洲黑木（乌木）雕刻，质地坚硬如铁。雕刻师通常不用设计图，直接在木头上创作。一件精美的大型木雕可能需要数周才能完成。非洲木雕影响了毕加索等西方现代艺术家。',
      rarity: 'common',
    },
    {
      emoji: '💎', name: '南非钻石',
      description: '南非是现代钻石工业的发源地。1866年，一个15岁男孩在奥兰治河畔捡到了一颗闪亮的石头——这是南非发现的第一颗钻石"尤里卡"。1869年发现的"非洲之星"重3106克拉，是迄今发现的最大宝石级金刚石，被切割成9颗大钻石和96颗小钻石，最大的一颗镶嵌在英国国王的权杖上。南非金伯利大洞是人工挖掘的最大洞穴，深240米。',
      rarity: 'legendary',
    },
    {
      emoji: '🌺', name: '帝王花',
      description: '帝王花（Protea）是南非国花，以希腊神话中海神普罗透斯命名，因为它有惊人的变形能力。帝王花有超过100个品种，颜色从粉红到鲜红到白色不等。它的花朵可以长到30厘米直径，是世界上最古老的花属之一，有3亿年历史。帝王花可以在火灾后重生，象征南非人民的坚韧精神。它是世界上最受欢迎的切花之一，可以保持新鲜数周。',
      rarity: 'common',
    },
  ],
  rome: [
    {
      emoji: '🏛️', name: '罗马斗兽场',
      description: '罗马斗兽场建于公元70-80年，由维斯帕先皇帝下令建造，使用6万名犹太奴隶劳工。它是世界上最大的圆形竞技场，可容纳5万观众。斗兽场有80个入口，可在10分钟内疏散全部观众。地下有复杂的隧道系统，关押着狮子、老虎、大象等野兽，通过升降机将它们送到竞技场。角斗士比赛持续了400多年，直到公元435年被废除。每年有超过700万游客参观。',
      rarity: 'legendary',
    },
    {
      emoji: '🍕', name: '意式披萨',
      description: '现代披萨起源于18世纪的那不勒斯。传说1889年，那不勒斯披萨师傅拉斐尔·埃斯波西托为玛格丽特王后制作了三种披萨，王后最喜欢的一种使用了番茄（红）、马苏里拉奶酪（白）和罗勒叶（绿），恰好是意大利国旗的三种颜色，因此被命名为"玛格丽特披萨"。正宗的那不勒斯披萨必须使用圣马扎诺番茄和水牛马苏里拉，在485°C的木炭炉中烤90秒。',
      rarity: 'common',
    },
    {
      emoji: '🍝', name: '意大利面',
      description: '意大利面有超过300种形状，每种形状都适合不同的酱料。意大利人平均每人每年消费26公斤意大利面。最受欢迎的形状是通心粉和直面条。意大利面的"al dente"（有嚼劲）是意大利人最看重的口感，煮面时间精确到秒。最经典的酱料是番茄肉酱（Bolognese）和培根蛋酱（Carbonara）。意大利面的发明常常被归功于马可·波罗从中国带回面条，但这其实是个传说。',
      rarity: 'common',
    },
    {
      emoji: '⛲', name: '许愿池',
      description: '特莱维喷泉（许愿池）是世界上最有名的喷泉，由建筑师尼古拉·萨尔维设计，1762年完工。喷泉高26米，宽49米，背景建筑是波利宫。中心是海神尼普顿驾驭战车的雕像。每天约有3000欧元被扔入池中，这些钱被捐给慈善机构。传统是背对喷泉，右手持硬币从左肩抛出，许下重返罗马的愿望。抛两枚硬币会遇到爱情，三枚则会结婚。夜晚的许愿池更加梦幻。',
      rarity: 'rare',
    },
    {
      emoji: '⚔️', name: '角斗士',
      description: '角斗士起源于伊特鲁里亚人的葬礼仪式，后来成为罗马最受欢迎的娱乐。角斗士大多是奴隶、战俘或罪犯，经过专业训练。有多种类型的角斗士：持三叉戟和网的追网者、持短剑和大盾的鱼人、骑马作战的骑手等。获胜的角斗士会成为明星，得到女性崇拜者的追捧。最著名的斯巴达克斯起义有7万名角斗士参加。角斗士比赛直到公元404年才被废除。',
      rarity: 'rare',
    },
  ],
  dubai: [
    {
      emoji: '🏗️', name: '哈利法塔',
      description: '哈利法塔建于2004-2010年，高828米，是世界上最高的人工建筑。它使用了33万立方米混凝土、3.9万吨钢材和10.3万平方米玻璃。建筑外观设计灵感来自沙漠之花蜘蛛兰。电梯速度达10米/秒，从底层到124层观景台只需60秒。建造高峰期有1.2万名工人同时施工。哈利法塔在建造过程中改过多次名字，最终以阿布扎比酋长哈利法的名字命名。',
      rarity: 'legendary',
    },
    {
      emoji: '🐫', name: '金骆驼',
      description: '骆驼在阿联酋文化中占有特殊地位，被称为"沙漠之舟"和"上帝的礼物"。骆驼赛驼是阿联酋最受欢迎的传统运动，最高奖金可达数百万美元。与古代不同，现代骆驼赛驼使用机器人骑手。阿联酋有专门的骆驼医院和骆驼美容院。纯种骆驼的价格可达数百万美元。在迪拜，你可以参观骆驼农场，了解贝都因人与骆驼的千年共生关系。',
      rarity: 'rare',
    },
    {
      emoji: '💎', name: '黄金',
      description: '迪拜被称为"黄金之城"，迪拜黄金市场是世界上最大的黄金零售市场之一。市场里有超过300家金店，陈列着数吨黄金首饰。迪拜的黄金价格是世界上最低的之一，因为没有增值税。世界上最重的金戒指"纳马克"重达63.8公斤，就陈列在迪拜。每年的迪拜购物节期间，黄金市场会举办抽奖活动，奖品包括金条和金币。',
      rarity: 'rare',
    },
    {
      emoji: '🏜️', name: '沙漠',
      description: '迪拜位于阿拉伯沙漠中心，城市周围是连绵的红色沙丘。沙漠冲沙是最受欢迎的旅游项目：乘坐4x4越野车在沙丘上飞驰，像坐过山车一样刺激。日落时分，沙漠会变成金色、橙色和紫色的渐变色，美得令人窒息。在沙漠营地可以体验骑骆驼、滑沙、抽水烟、看肚皮舞表演。贝都因人在沙漠中生活了数千年，他们的生存智慧令人敬佩。',
      rarity: 'common',
    },
    {
      emoji: '🏨', name: '帆船酒店',
      description: '帆船酒店（Burj Al Arab）建在一座人工岛上，高321米，是世界上最高的酒店建筑。它的帆船造型模仿了阿拉伯单桅帆船的风帆。酒店内部使用了超过2.4万平米的大理石和2.1万平米的黄金装饰。最便宜的套房每晚超过1500美元，皇家套房每晚超过2.8万美元。酒店有私人直升机和劳斯莱斯车队接送客人。它被公认为世界上唯一的七星级酒店。',
      rarity: 'legendary',
    },
  ],
  bangkok: [
    {
      emoji: '🛕', name: '大皇宫',
      description: '大皇宫建于1782年，是泰国王室的居所长达150年。占地21.8万平方米，四周有1900米长的白色围墙。玉佛寺是皇宫中最神圣的建筑，供奉着泰国国宝——翡翠玉佛。玉佛高66厘米，由整块翡翠雕刻而成，每年换三次衣服，分别对应泰国的三季。大皇宫的建筑融合了泰国、柬埔寨和欧洲风格，金碧辉煌，令人叹为观止。游客必须穿着得体才能入内参观。',
      rarity: 'rare',
    },
    {
      emoji: '🐘', name: '大象',
      description: '大象是泰国的国宝和国家象征，泰国国旗上曾经就有大象图案。在泰国历史上，白象是最神圣的动物，只有国王才能拥有。传说泰国王室拥有白象的数量代表了国王的威望。大象在泰国文化中象征智慧、力量和长寿。泰国目前有约3000-4000头大象，其中约一半在旅游营地工作。近年来，越来越多的营地转向"观察而非骑乘"的大象友好旅游模式。',
      rarity: 'common',
    },
    {
      emoji: '🍜', name: '泰式炒河粉',
      description: '泰式炒河粉（Pad Thai）是泰国的国菜，但它的历史其实不长。1930年代，泰国总理銮披汶颂堪为了建立国家认同，推广了这道融合中国和泰国风味的炒面。正宗的泰式炒河粉使用罗望子酱、鱼露、棕榈糖调味，配以虾、豆腐、豆芽和花生碎。在曼谷街头，一份泰式炒河粉只需30-50泰铢（约6-10元人民币）。它是世界上最受欢迎的街头美食之一。',
      rarity: 'common',
    },
    {
      emoji: '💆', name: '泰式按摩',
      description: '泰式按摩有2500多年历史，传说由佛陀的御医创制。它结合了印度阿育吠陀医学和中国传统按摩技术。与西式按摩不同，泰式按摩不用精油，而是通过拉伸、按压和扭曲身体来放松。按摩师会用肘部、膝盖甚至脚来施压。在泰国，按摩是一种受人尊敬的职业，按摩师需要学习至少800小时。曼谷的卧佛寺是泰式按摩的发源地，至今仍是学习按摩的圣地。',
      rarity: 'common',
    },
    {
      emoji: '🛶', name: '水上市场',
      description: '泰国水上市场已有数百年历史，是东南亚最独特的文化景观之一。小贩们驾驶木船，船上堆满热带水果、椰子冰淇淋和各种小吃。最著名的丹嫩沙多水上市场距曼约100公里，每天有数百艘小船穿梭。买卖双方在船上讨价还价，热闹非凡。水上市场曾是泰国人的主要购物场所，如今更多是旅游景点。清晨是最佳参观时间，可以避开人群，体验最原始的水上交易。',
      rarity: 'rare',
    },
  ],
  moscow: [
    {
      emoji: '🏰', name: '克里姆林宫',
      description: '克里姆林宫建于1156年，原是一座木制堡垒，后来不断扩建。它的红色围墙长2235米，有20座塔楼。克里姆林宫内有4座宫殿、4座大教堂和1座武器库。武器库收藏着法贝热彩蛋、沙皇冠冕和伊凡雷帝的象牙宝座。克里姆林宫的钟王重202吨，是世界上最大的钟，但从未被敲响过。炮王重40吨，也从未发射过。如今克里姆林宫是俄罗斯总统的官邸。',
      rarity: 'rare',
    },
    {
      emoji: '⛪', name: '圣瓦西里大教堂',
      description: '圣瓦西里大教堂建于1555-1561年，由伊凡雷帝下令建造，纪念征服喀山汗国。教堂由9座礼拜堂组成，每座都有独特的彩色洋葱顶。传说伊凡雷帝弄瞎了建筑师的眼睛，使他们无法再创造出如此美丽的作品，但这只是传说。教堂的名字来自圣瓦西里，他是一位在莫斯科街头游行的"圣愚"。如今教堂是莫斯科最具标志性的地标，也是俄罗斯最常被拍摄的建筑。',
      rarity: 'legendary',
    },
    {
      emoji: '🪆', name: '俄罗斯套娃',
      description: '俄罗斯套娃（Matryoshka）诞生于1890年，由艺术家谢尔盖·马柳京设计，灵感来自日本的福禄寿木偶。第一个套娃是一个穿围裙的农村女孩，里面藏着8个孩子。套娃通常用椴木或白桦木制作，需要经过15道工序。最贵的套娃售价可达数万美元。套娃象征家庭、母性和生育。在俄罗斯，收到一套精美的套娃是珍贵的礼物。最大的套娃有50多层。',
      rarity: 'common',
    },
    {
      emoji: '🧊', name: '伏特加',
      description: '伏特加是俄罗斯的"国饮"，人均消费量居世界前列。"伏特加"一词源自俄语"voda"，意为"水"。传统伏特加用谷物或土豆酿造，经过多次蒸馏，酒精含量通常为40%。俄罗斯人喝伏特加有一套规矩：必须一口干掉，不能小口品尝；吃酸黄瓜或黑面包做下酒菜；不能空腹饮酒。据说俄罗斯人平均每人每年喝掉15升伏特加。最著名的品牌是斯米尔诺夫和绝对伏特加。',
      rarity: 'common',
    },
    {
      emoji: '🛷', name: '三驾马车',
      description: '三驾马车（Troika）是俄罗斯最独特的交通工具，由三匹马拉一辆雪橇或马车。三匹马并排奔跑，中间的马小跑，两边的马大步飞奔。三驾马车的速度可达48公里/小时，在19世纪是最快的陆地交通工具。它是俄罗斯冬季文化的重要组成部分，经常出现在文学和音乐作品中。柴可夫斯基的《胡桃夹子》中就有三驾马车的音乐。如今，三驾马车主要在旅游景点和节日庆典中出现。',
      rarity: 'rare',
    },
  ],
  seoul: [
    {
      emoji: '🏯', name: '景福宫',
      description: '景福宫是朝鲜王朝的正宫，建于1395年，名字取自《诗经》中"君子万年，介尔景福"。它曾是朝鲜王朝500年的权力中心。1592年壬辰倭乱中被日军焚毁，直到1868年才重建。景福宫的勤政殿是国王处理政务的地方，庆会楼是举行宴会的水上建筑。光化门的守门将换岗仪式是首尔最受欢迎的文化体验之一。穿着韩服可以免费参观景福宫。',
      rarity: 'rare',
    },
    {
      emoji: '🎤', name: 'K-POP',
      description: 'K-POP（韩国流行音乐）已成为全球文化现象。BTS是史上最成功的K-POP组合，他们的专辑销量超过1亿张。BLACKPINK是YouTube上订阅人数最多的音乐团体。韩国娱乐公司每年投入数百万美元培训练习生，通常需要3-7年的训练才能出道。K-POP的标志性元素包括：整齐划一的舞蹈、华丽的MV、粉丝应援文化。首尔的江南区是K-POP的中心，各大娱乐公司总部都设在那里。',
      rarity: 'common',
    },
    {
      emoji: '🥘', name: '韩式拌饭',
      description: '韩式拌饭（Bibimbap）是韩国最具代表性的传统美食。"Bibim"意为"混合"，"bap"意为"米饭"。传统拌饭使用石锅，锅底会形成一层焦脆的锅巴。配料包括：牛肉、鸡蛋、各种蔬菜（菠菜、豆芽、胡萝卜、蕨菜等）和辣椒酱。吃之前要用力搅拌，让所有食材和米饭混合。拌饭起源于朝鲜时代的宫廷料理，象征五方五行。全州拌饭被认为是最正宗的，因为全州是朝鲜王朝的发源地。',
      rarity: 'common',
    },
    {
      emoji: '🎎', name: '韩服',
      description: '韩服是韩国传统服饰，女性韩服上衣短小，裙子宽大飘逸；男性韩服上衣宽松，裤子肥大。韩服的颜色有严格的等级制度：王室穿黄色，平民穿白色。现代韩服主要用于婚礼、节日和重要场合。在首尔的北村韩屋村，可以租借韩服漫步在传统韩屋之间，是最受欢迎的旅游体验。一件手工制作的高级韩服价格可达数百万韩元。韩服的设计强调优雅和端庄。',
      rarity: 'rare',
    },
    {
      emoji: '📺', name: '韩剧',
      description: '韩剧是"韩流"的重要组成部分，从1990年代开始风靡亚洲。《大长今》是第一部在中东播出的韩剧，开创了韩剧全球化的先河。韩剧的标志性元素包括：浪漫爱情、家族纠葛、美食场景、帅气男主。《来自星星的你》在中国创下28亿次播放记录。首尔的许多景点因韩剧而闻名，如南山塔、梨花壁画村等。韩剧每年为韩国带来数十亿美元的经济收入。',
      rarity: 'common',
    },
  ],
  mumbai: [
    {
      emoji: '🕌', name: '印度门',
      description: '印度门建于1911-1924年，是为纪念英国国王乔治五世访问印度而建。它采用印度-撒拉逊建筑风格，融合了莫卧儿和哥特式元素。印度门高26米，由黄色砂岩和混凝土建造。它是孟买最著名的地标，每天有数万游客参观。印度门前的广场是孟买最繁忙的地方之一，小贩、游客和当地人交织在一起。夜晚的印度门灯火辉煌，倒映在阿拉伯海中，美不胜收。',
      rarity: 'rare',
    },
    {
      emoji: '🍛', name: '咖喱',
      description: '"咖喱"一词源自泰米尔语"kari"，意为"酱汁"。印度咖喱不是一种调味料，而是泛指各种用香料烹制的菜肴。印度有数百种香料，每种咖喱的配方都不同。常见的香料包括：姜黄、孜然、芫荽、辣椒、肉桂、丁香等。印度人相信食物有药用价值，姜黄可以消炎，孜然可以助消化。在印度，用手吃饭是传统，用右手抓取食物，左手不接触食物。咖喱是印度文化的灵魂。',
      rarity: 'common',
    },
    {
      emoji: '🧘', name: '瑜伽',
      description: '瑜伽起源于5000年前的印度，最初是一种精神修炼方法。"瑜伽"在梵文中意为"连接"，指身体、心灵和精神的统一。瑜伽有多种流派：哈他瑜伽强调体位法，业瑜伽强调无私行动，奉爱瑜伽强调虔诚。帕坦伽利的《瑜伽经》是瑜伽的经典著作，定义了瑜伽的八支分法。印度总理莫迪推动联合国将6月21日定为国际瑜伽日。如今全世界有超过3亿人练习瑜伽。',
      rarity: 'common',
    },
    {
      emoji: '🎬', name: '宝莱坞',
      description: '宝莱坞位于孟买，是世界上最大的电影产业之一，每年生产超过1500部电影。宝莱坞电影的特点是：歌舞片段、夸张的情节、三小时以上的片长。宝莱坞的名字模仿好莱坞，取自孟买的旧称"Bombay"。印度电影观众每年超过20亿人次，远超好莱坞。最著名的宝莱坞明星包括沙鲁克·汗、阿米尔·汗和萨尔曼·汗。宝莱坞电影不仅是娱乐，更是印度文化的输出。',
      rarity: 'rare',
    },
    {
      emoji: '👘', name: '纱丽',
      description: '纱丽是印度女性的传统服饰，有超过5000年历史。一块纱丽长达6-9米，宽约1.2米，不需要针线缝制，全靠缠绕。不同地区的穿法不同：南方女性将纱丽缠绕在腰间，北方女性则遮住头部。纱丽的材质从日常的棉布到婚礼的丝绸不等。最昂贵的纱丽使用金线编织，价格可达数万美元。纱丽的颜色也有讲究：红色象征已婚，白色象征寡妇，黄色象征吉祥。',
      rarity: 'common',
    },
  ],
  hawaii: [
    {
      emoji: '🌋', name: '基拉韦厄火山',
      description: '基拉韦厄火山位于夏威夷大岛，是世界上最活跃的火山之一，从1983年至今持续喷发。它属于夏威夷热点火山链，太平洋板块在热点上方缓慢移动，形成了一系列火山。基拉韦厄火山的熔岩温度高达1200°C，流入大海时会产生壮观的蒸汽和新陆地。夏威夷原住民认为火山女神佩蕾住在基拉韦厄火山口中。火山国家公园每年接待超过100万游客。',
      rarity: 'legendary',
    },
    {
      emoji: '🌺', name: '夏威夷花环',
      description: '夏威夷花环（Lei）是Aloha精神的象征。传统花环用鸡蛋花、茉莉花或栀子花编织而成。到达夏威夷时，当地人会为你戴上花环，表示欢迎和祝福。花环的戴法也有讲究：应该披在肩上，而不是挂在脖子上。花环不应该随便丢弃，应该归还自然——挂在树上或放入海中。在婚礼、毕业典礼和生日等重要场合，花环是必不可少的。夏威夷花环代表着爱、尊重和连接。',
      rarity: 'common',
    },
    {
      emoji: '🏄', name: '冲浪',
      description: '冲浪起源于古代夏威夷，被称为"运动之王"。在古夏威夷，冲浪是贵族运动，只有酋长和勇士才能冲最大的浪。冲浪板最初由重达70公斤的红木制成。现代冲浪板由轻质泡沫和玻璃纤维制成，重约3公斤。夏威夷的北岸是世界上最好的冲浪圣地，冬季浪高可达15米。每年11月至2月，世界冲浪联赛在北岸举办比赛。冲浪不仅是一项运动，更是一种生活方式和精神追求。',
      rarity: 'common',
    },
    {
      emoji: '🥥', name: '椰子',
      description: '椰子树被称为"生命之树"，因为它全身都是宝：椰子水是天然运动饮料，椰肉可以食用或榨油，椰壳可以做工艺品，椰棕可以做绳索，椰叶可以编篮子。椰子树可以长到30米高，每年结60-200个椰子。椰子水的成分与人体血浆相似，在二战时曾被用作紧急输液。在夏威夷，椰子是热带天堂的象征，但要注意：每年有150人被掉落的椰子砸伤。',
      rarity: 'common',
    },
    {
      emoji: '💃', name: '草裙舞',
      description: '草裙舞（Hula）是夏威夷最重要的文化传统。草裙舞最初是宗教仪式，用来敬拜神灵和讲述创世故事。传教士曾禁止草裙舞，认为它是异教仪式，直到1874年卡拉卡瓦国王恢复了它。草裙舞分为两种：古老风格（hula kahiko）和现代风格（hula ʻauana）。舞者的每一个手势都有含义：手掌向上代表生命，向下代表大地。草裙舞已被列入联合国非物质文化遗产。',
      rarity: 'rare',
    },
  ],
  reykjavik: [
    {
      emoji: '🌌', name: '北极光',
      description: '北极光（Aurora Borealis）是太阳风粒子与地球大气碰撞产生的自然现象。粒子与氧原子碰撞产生绿色或红色光，与氮原子碰撞产生蓝色或紫色光。冰岛是世界上观赏北极光最佳的地点之一，从9月到次年4月都有机会看到。最佳观赏条件是晴朗无云的夜晚，远离城市灯光。北极光的颜色和形状不断变化：有时像飘动的窗帘，有时像旋转的漩涡。在北欧神话中，北极光是女武神盔甲的反射。',
      rarity: 'legendary',
    },
    {
      emoji: '♨️', name: '蓝湖温泉',
      description: '蓝湖温泉是冰岛最著名的旅游景点，位于一座地热发电厂旁边。温泉水温约38-40°C，富含硅和�ite，对皮肤有益。蓝湖的乳蓝色来自水中的硅藻和蓝绿藻。温泉水每48小时更换一次。在蓝湖泡温泉，即使外面下着雪，也感觉温暖舒适。蓝湖的门票约100美元，包含一杯饮料和面膜。它是冰岛最受欢迎的景点，每天接待数千游客。夜晚的蓝湖在灯光下更加梦幻。',
      rarity: 'rare',
    },
    {
      emoji: '🧊', name: '冰川',
      description: '冰岛有约4500平方公里的冰川，覆盖国土面积的11%。瓦特纳冰川是欧洲最大的冰川，面积约8100平方公里，厚度可达1000米。冰川下面隐藏着活火山，2010年艾雅法拉火山喷发，火山灰导致欧洲航空瘫痪一周。冰川徒步是冰岛最受欢迎的活动之一，游客可以在蓝冰上行走，欣赏冰洞和冰裂缝。由于全球变暖，冰岛的冰川正在以每年1米的速度后退。',
      rarity: 'rare',
    },
    {
      emoji: '🐋', name: '鲸鱼',
      description: '冰岛海域有超过20种鲸鱼，包括座头鲸、小须鲸、蓝鲸和虎鲸。观鲸是冰岛最受欢迎的旅游活动之一，成功率超过95%。胡萨维克被称为"欧洲观鲸之都"，从这里出发的观鲸船可以看到座头鲸的壮观表演。冰岛也是世界上少数仍在捕鲸的国家之一，这引起了国际争议。冰岛人与鲸鱼有着深厚的文化联系，鲸鱼出现在许多传说和艺术作品中。',
      rarity: 'common',
    },
    {
      emoji: '🌋', name: '间歇泉',
      description: '英语"geyser"（间歇泉）一词就源自冰岛的盖锡尔间歇泉。盖锡尔曾是世界上最著名的间歇泉，但自1916年起停止活动。如今最活跃的是旁边的史托克间歇泉，每隔6-10分钟喷发一次，水柱高达20-40米。间歇泉的原理是：地下水被地热加热到沸点，突然汽化膨胀，将水柱推向高空。冰岛有超过20个活跃的间歇泉。间歇泉周围的土地色彩斑斓，是矿物质沉积的结果。',
      rarity: 'common',
    },
  ],
  antarctica: [
    {
      emoji: '🐧', name: '帝企鹅',
      description: '帝企鹅是企鹅家族中最大的种类，身高可达120厘米，体重可达45公斤。它们是唯一在南极冬季繁殖的企鹅，在-40°C的严寒中孵蛋。雄性帝企鹅将蛋放在脚上，用腹部的育儿袋保温，在长达65天的孵蛋期间不吃不喝，体重会减少一半。帝企鹅可以潜入500米深的海中，在水下屏息长达22分钟。它们在冰面上滑行时，腹部着地，用鳍状肢推动自己前进，速度可达5公里/小时。',
      rarity: 'rare',
    },
    {
      emoji: '🧊', name: '冰山',
      description: '南极洲的冰山是地球上最大的淡水储备，占全球淡水的70%。最大的冰山B-15面积达11000平方公里，比牙买加还大。冰山的98%藏在水下，只露出一角，这就是"冰山一角"的由来。冰山的颜色从白色到蓝色不等，蓝色冰山是被压缩了数千年的老冰，气泡被挤出，只反射蓝光。每年约有200亿吨冰从南极冰架断裂入海。冰山是气候变化的敏感指标。',
      rarity: 'rare',
    },
    {
      emoji: '🔬', name: '科考站',
      description: '南极洲有来自30个国家的70多个科考站。美国的麦克默多站是最大的，可以容纳1200人。中国的长城站建于1985年，是第一个中国南极科考站。科考站的研究涵盖气候变化、冰川学、天文学、生物学等领域。南极的空气是地球上最纯净的，是研究宇宙微波背景辐射的理想地点。科考站的生活条件艰苦，冬季温度可低至-89°C，工作人员需要在完全黑暗中度过数月。',
      rarity: 'legendary',
    },
    {
      emoji: '🌨️', name: '暴风雪',
      description: '南极洲是地球上风力最大的大陆，平均风速19公里/小时，最大风速可达320公里/小时。南极的暴风雪被称为"白色黑暗"，能见度降为零，温度骤降。在这种条件下，即使距离建筑物几米远，也可能迷路。科考站之间用绳索连接，方便在暴风雪中移动。南极的降水极少，年均降水量仅50毫米，比撒哈拉沙漠还少。南极洲实际上是地球上最大的沙漠。',
      rarity: 'common',
    },
    {
      emoji: '🌍', name: '地球尽头',
      description: '南极洲是地球上最后被发现的大陆，直到1820年才有人类首次看到它。它是地球上最冷、最干燥、风力最大、海拔最高的大陆。南极洲没有永久居民，只有约1000名科学家和后勤人员在科考站过冬，夏季增加到5000人。根据1959年的《南极条约》，南极洲只用于和平目的，不属于任何国家。它是地球上最后的净土，也是人类探索精神的象征。',
      rarity: 'legendary',
    },
  ],
};

interface PostcardScreenProps {
  visible: boolean;
  travel: TravelProgress;
  onClose: () => void;
}

export default function PostcardScreen({ visible, travel, onClose }: PostcardScreenProps) {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedSticker, setSelectedSticker] = useState<Sticker | null>(null);

  const collectedCities = cities.filter(c => travel.collectedPostcards.includes(c.id));
  const uncollectedCities = cities.filter(c => !travel.collectedPostcards.includes(c.id));
  const selected = selectedCity ? cities.find(c => c.id === selectedCity) : null;

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeBtnText}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.title}>📮 明信册</Text>
          <Text style={styles.count}>{collectedCities.length}/{cities.length}</Text>
        </View>

        {/* 明信片详情弹窗 */}
        {selected && (
          <Modal visible transparent animationType="fade" onRequestClose={() => setSelectedCity(null)}>
            <View style={styles.detailOverlay}>
              <View style={styles.detailCard}>
                {/* 明信片正面 */}
                <View style={[styles.postcardFront, { backgroundColor: getCityColor(selected.id) }]}>
                  <Text style={styles.postcardEmoji}>{selected.emoji}</Text>
                  <Text style={styles.postcardCityName}>{selected.name}</Text>
                  <Text style={styles.postcardCountry}>{selected.country}</Text>
                  <View style={styles.postcardDecoration}>
                    <Text style={styles.decoText}>✦ ✦ ✦</Text>
                  </View>
                </View>

                {/* 贴纸收集区 */}
                <View style={styles.stickerSection}>
                  <Text style={styles.stickerTitle}>🏷️ 标志性贴纸收集</Text>
                  <View style={styles.stickerGrid}>
                    {(CITY_STICKERS[selected.id] || []).map((sticker, idx) => {
                      // 北京使用精细贴纸
                      const getBeijingSticker = (name: string, s: number) => {
                        if (selected.id !== 'beijing') return null;
                        switch (name) {
                          case '紫禁城': return <ForbiddenCitySticker size={s} />;
                          case '万里长城': return <GreatWallSticker size={s} />;
                          case '京剧脸谱': return <OperaMaskSticker size={s} />;
                          case '饺子': return <DumplingSticker size={s} />;
                          case '大熊猫': return <PandaSticker size={s} />;
                          default: return null;
                        }
                      };

                      const customSticker = getBeijingSticker(sticker.name, 64);

                      return (
                        <TouchableOpacity
                          key={idx}
                          style={styles.stickerItem}
                          onPress={() => setSelectedSticker(sticker)}
                          activeOpacity={0.7}
                        >
                          {customSticker || (
                            <StickerDesign
                              emoji={sticker.emoji}
                              name={sticker.name}
                              rarity={sticker.rarity}
                              size={64}
                            />
                          )}
                          <Text style={styles.stickerName}>{sticker.name}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                  <View style={styles.souvenirRow}>
                    <Text style={styles.souvenirTitle}>🎁 旅行纪念品</Text>
                    <View style={styles.souvenirCard}>
                      <Text style={styles.souvenirEmoji}>{selected.souvenir.emoji}</Text>
                      <View style={styles.souvenirInfo}>
                        <Text style={styles.souvenirName}>{selected.souvenir.name}</Text>
                        <Text style={styles.souvenirEffect}>{selected.souvenir.effect}</Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* 明信片背面 */}
                <View style={styles.postcardBack}>
                  <View style={styles.stampArea}>
                    <Text style={styles.stampEmoji}>{selected.emoji}</Text>
                    <Text style={styles.stampText}>已到达</Text>
                  </View>
                  <View style={styles.quoteArea}>
                    <Text style={styles.quoteText}>"{selected.postcard.quote}"</Text>
                    <Text style={styles.quoteAuthor}>— {selected.postcard.author}</Text>
                  </View>
                  <View style={styles.lineSeparator} />
                  <Text style={styles.storyTitle}>📖 {selected.stories[0].title}</Text>
                  <Text style={styles.storyContent}>{selected.stories[0].content}</Text>
                  <Text style={styles.funFact}>💡 {selected.stories[0].funFact}</Text>
                </View>

                <TouchableOpacity style={styles.closeDetailBtn} onPress={() => setSelectedCity(null)}>
                  <Text style={styles.closeDetailText}>关闭</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}

        {/* 贴纸大图弹窗 */}
        {selectedSticker && (
          <Modal visible transparent animationType="fade" onRequestClose={() => setSelectedSticker(null)}>
            <View style={styles.stickerOverlay}>
              <View style={styles.stickerDetailCard}>
                {(() => {
                  const getBeijingStickerLarge = (name: string) => {
                    switch (name) {
                      case '紫禁城': return <ForbiddenCitySticker size={120} />;
                      case '万里长城': return <GreatWallSticker size={120} />;
                      case '京剧脸谱': return <OperaMaskSticker size={120} />;
                      case '饺子': return <DumplingSticker size={120} />;
                      case '大熊猫': return <PandaSticker size={120} />;
                      default: return null;
                    }
                  };
                  const customLarge = getBeijingStickerLarge(selectedSticker.name);
                  return customLarge || (
                    <StickerDesign
                      emoji={selectedSticker.emoji}
                      name={selectedSticker.name}
                      rarity={selectedSticker.rarity}
                      size={120}
                    />
                  );
                })()}
                <Text style={styles.stickerDetailName}>{selectedSticker.name}</Text>
                {selectedSticker.rarity === 'rare' && <Text style={[styles.rarityTagLarge, { color: '#5B8DEF' }]}>✨ 稀有贴纸</Text>}
                {selectedSticker.rarity === 'legendary' && <Text style={[styles.rarityTagLarge, { color: '#FFD700' }]}>👑 传说贴纸</Text>}
                {selectedSticker.rarity === 'common' && <Text style={styles.rarityTagLarge}>普通贴纸</Text>}
                <View style={styles.stickerDescBox}>
                  <Text style={styles.stickerDetailDesc}>{selectedSticker.description}</Text>
                </View>
                <TouchableOpacity style={styles.closeStickerBtn} onPress={() => setSelectedSticker(null)}>
                  <Text style={styles.closeStickerText}>收下贴纸</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
          {/* 已收集 */}
          {collectedCities.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>✅ 已收集 ({collectedCities.length})</Text>
              <View style={styles.grid}>
                {collectedCities.map(city => (
                  <TouchableOpacity
                    key={city.id}
                    style={styles.card}
                    onPress={() => setSelectedCity(city.id)}
                    activeOpacity={0.8}
                  >
                    <View style={[styles.cardBg, { backgroundColor: getCityColor(city.id) }]}>
                      <Text style={styles.cardEmoji}>{city.emoji}</Text>
                    </View>
                    <Text style={styles.cardName}>{city.name}</Text>
                    <Text style={styles.cardCountry}>{city.country}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          {/* 未收集 */}
          {uncollectedCities.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>🔒 未解锁 ({uncollectedCities.length})</Text>
              <View style={styles.grid}>
                {uncollectedCities.map(city => (
                  <View key={city.id} style={[styles.card, styles.cardLocked]}>
                    <View style={[styles.cardBg, styles.cardBgLocked]}>
                      <Text style={styles.cardEmojiLocked}>❓</Text>
                    </View>
                    <Text style={styles.cardNameLocked}>???</Text>
                    <Text style={styles.cardCountryLocked}>未到达</Text>
                  </View>
                ))}
              </View>
            </>
          )}

          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    </Modal>
  );
}

function getCityColor(cityId: string): string {
  const colorMap: Record<string, string> = {
    beijing: '#FF6B6B',
    tokyo: '#FFB7C5',
    paris: '#87CEEB',
    london: '#DDA0DD',
    newyork: '#FFD700',
    sydney: '#FF8C42',
    cairo: '#F4A460',
    rio: '#32CD32',
    istanbul: '#9B59B6',
    capetown: '#FF69B4',
    rome: '#E74C3C',
    dubai: '#FFD700',
    bangkok: '#FF69B4',
    moscow: '#3498DB',
    seoul: '#FF69B4',
    mumbai: '#FF8C42',
    hawaii: '#00CED1',
    reykjavik: '#87CEEB',
    antarctica: '#B0E0E6',
  };
  return colorMap[cityId] || '#87CEEB';
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingTop: 50, paddingBottom: spacing.lg, paddingHorizontal: spacing.xl,
    backgroundColor: colors.surface,
    borderBottomWidth: 0.5, borderBottomColor: colors.separator,
  },
  closeBtn: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center',
  },
  closeBtnText: { fontSize: 16, color: colors.textSecondary, fontWeight: '600' },
  title: { flex: 1, ...typography.title3, color: colors.textPrimary, textAlign: 'center' },
  count: { ...typography.subhead, color: colors.primary, fontWeight: '600' },
  scroll: { padding: spacing.xl },
  sectionTitle: {
    ...typography.headline, color: colors.textPrimary,
    marginBottom: spacing.md, marginTop: spacing.lg,
  },
  grid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md,
  },
  card: {
    width: (SCREEN_WIDTH - spacing.xl * 2 - spacing.md * 2) / 3,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: colors.separator,
    ...shadow.subtle,
  },
  cardLocked: { opacity: 0.5 },
  cardBg: {
    height: 80, justifyContent: 'center', alignItems: 'center',
  },
  cardBgLocked: { backgroundColor: '#E0E0E0' },
  cardEmoji: { fontSize: 32 },
  cardEmojiLocked: { fontSize: 24, color: '#AAA' },
  cardName: {
    ...typography.caption1, color: colors.textPrimary, fontWeight: '600',
    textAlign: 'center', marginTop: spacing.xs,
  },
  cardCountry: {
    ...typography.caption2, color: colors.textSecondary,
    textAlign: 'center', marginBottom: spacing.sm,
  },
  cardNameLocked: {
    ...typography.caption1, color: colors.textTertiary,
    textAlign: 'center', marginTop: spacing.xs,
  },
  cardCountryLocked: {
    ...typography.caption2, color: colors.textTertiary,
    textAlign: 'center', marginBottom: spacing.sm,
  },
  // 详情弹窗
  detailOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center', paddingHorizontal: spacing.xl,
  },
  detailCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    overflow: 'hidden',
    ...shadow.elevated,
  },
  postcardFront: {
    height: 160, justifyContent: 'center', alignItems: 'center',
    position: 'relative',
  },
  postcardEmoji: { fontSize: 48 },
  postcardCityName: {
    ...typography.title2, color: '#FFF', fontWeight: '700',
    marginTop: spacing.sm, textShadowColor: 'rgba(0,0,0,0.3)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 4,
  },
  postcardCountry: {
    ...typography.subhead, color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  postcardDecoration: {
    position: 'absolute', bottom: spacing.sm, right: spacing.md,
  },
  decoText: { color: 'rgba(255,255,255,0.5)', fontSize: 12 },
  postcardBack: { padding: spacing.lg },
  stampArea: {
    flexDirection: 'row', alignItems: 'center',
    alignSelf: 'flex-end',
    borderWidth: 1, borderColor: colors.primary,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm, paddingVertical: spacing.xs,
    marginBottom: spacing.md,
  },
  stampEmoji: { fontSize: 16, marginRight: spacing.xs },
  stampText: { ...typography.caption2, color: colors.primary, fontWeight: '600' },
  quoteArea: {
    backgroundColor: colors.background,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  quoteText: {
    ...typography.body, color: colors.textPrimary,
    fontStyle: 'italic', lineHeight: 24,
  },
  quoteAuthor: {
    ...typography.caption1, color: colors.textSecondary,
    marginTop: spacing.sm, textAlign: 'right',
  },
  lineSeparator: {
    height: 1, backgroundColor: colors.separator,
    marginVertical: spacing.md,
  },
  storyTitle: {
    ...typography.headline, color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  storyContent: {
    ...typography.subhead, color: colors.textSecondary,
    lineHeight: 22, marginBottom: spacing.md,
  },
  funFact: {
    ...typography.caption1, color: colors.primary,
    backgroundColor: colors.primaryLight,
    padding: spacing.md, borderRadius: radius.sm,
  },
  // 贴纸收集
  stickerSection: {
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  stickerTitle: {
    ...typography.headline,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  stickerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  stickerItem: {
    width: (SCREEN_WIDTH - spacing.lg * 2 - spacing.md * 4) / 5,
    alignItems: 'center',
  },
  stickerName: {
    ...typography.caption2,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
  souvenirRow: {
    marginTop: spacing.sm,
  },
  souvenirTitle: {
    ...typography.headline,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  souvenirCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.primary + '30',
    ...shadow.subtle,
  },
  souvenirEmoji: {
    fontSize: 36,
    marginRight: spacing.lg,
  },
  souvenirInfo: { flex: 1 },
  souvenirName: {
    ...typography.headline,
    color: colors.textPrimary,
  },
  souvenirEffect: {
    ...typography.caption1,
    color: colors.primary,
    marginTop: 2,
  },
  closeDetailBtn: {
    margin: spacing.lg,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  closeDetailText: { ...typography.headline, color: '#FFF' },
  // 贴纸稀有度
  stickerBgRare: {
    borderColor: '#007AFF',
    backgroundColor: '#007AFF10',
  },
  stickerBgLegendary: {
    borderColor: '#FFD700',
    backgroundColor: '#FFD70015',
  },
  rarityTag: {
    ...typography.caption2,
    color: '#007AFF',
    fontWeight: '700',
    marginTop: 2,
  },
  rarityTagLegendary: {
    color: '#FFD700',
  },
  rarityTagLarge: {
    ...typography.subhead,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  // 贴纸大图弹窗
  stickerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xxl,
  },
  stickerDetailCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xxl,
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
    ...shadow.elevated,
  },
  stickerDetailName: {
    ...typography.title2,
    color: colors.textPrimary,
    fontWeight: '700',
    marginTop: spacing.md,
  },
  stickerDescBox: {
    backgroundColor: colors.background,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginTop: spacing.lg,
    width: '100%',
  },
  stickerDetailDesc: {
    ...typography.subhead,
    color: colors.textSecondary,
    lineHeight: 22,
    textAlign: 'center',
  },
  closeStickerBtn: {
    marginTop: spacing.xl,
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.xxxl,
    paddingVertical: spacing.md,
  },
  closeStickerText: {
    ...typography.headline,
    color: '#FFF',
  },
});
