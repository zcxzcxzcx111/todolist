// ========== 特殊事件系统 ==========
export interface TravelEvent {
  id: string;
  type: 'festival' | 'storm' | 'meet_friend' | 'package' | 'discount' | 'challenge' | 'lucky' | 'weather' | 'culture' | 'food';
  emoji: string;
  title: string;
  message: string;
  milesBonus: number;
  durationHours?: number;
  triggerCondition: 'random' | 'streak' | 'city_arrival' | 'task_complete' | 'time_based';
}

export const allEvents: TravelEvent[] = [
  // ========== 节日庆典 ==========
  {
    id: 'festival_spring',
    type: 'festival',
    emoji: '🧧',
    title: '春节庆典',
    message: '你在旅途中遇到了中国春节！当地人邀请你一起包饺子，获得双倍里程！',
    milesBonus: 100,
    durationHours: 24,
    triggerCondition: 'time_based',
  },
  {
    id: 'festival_cherry',
    type: 'festival',
    emoji: '🌸',
    title: '樱花季',
    message: '东京的樱花盛开了！你在樱花树下野餐，获得额外里程奖励。',
    milesBonus: 80,
    durationHours: 12,
    triggerCondition: 'city_arrival',
  },
  {
    id: 'festival_carnival',
    type: 'festival',
    emoji: '🎭',
    title: '里约狂欢节',
    message: '你赶上了里约热内卢的狂欢节！桑巴舞步中获得了大量里程！',
    milesBonus: 150,
    durationHours: 48,
    triggerCondition: 'city_arrival',
  },
  {
    id: 'festival_oktoberfest',
    type: 'festival',
    emoji: '🍺',
    title: '慕尼黑啤酒节',
    message: '虽然不在行程中，但你在旅途中偶遇了啤酒节的庆祝活动！',
    milesBonus: 60,
    durationHours: 12,
    triggerCondition: 'random',
  },
  {
    id: 'festival_diwali',
    type: 'festival',
    emoji: '🪔',
    title: '排灯节',
    message: '印度排灯节到了！万家灯火照亮了你的旅途，获得里程奖励。',
    milesBonus: 90,
    durationHours: 24,
    triggerCondition: 'city_arrival',
  },
  {
    id: 'festival_christmas',
    type: 'festival',
    emoji: '🎄',
    title: '圣诞节',
    message: '圣诞老人送来了礼物！你获得了双倍里程加成。',
    milesBonus: 120,
    durationHours: 24,
    triggerCondition: 'time_based',
  },
  {
    id: 'festival_newyear',
    type: 'festival',
    emoji: '🎆',
    title: '跨年夜',
    message: '新年钟声敲响！你获得了新年里程大礼包！',
    milesBonus: 200,
    durationHours: 24,
    triggerCondition: 'time_based',
  },

  // ========== 暴风雨 ==========
  {
    id: 'storm_light',
    type: 'storm',
    emoji: '🌧️',
    title: '小雨绵绵',
    message: '旅途中遇到了小雨，行程稍微受阻。里程获取减半 12 小时。',
    milesBonus: -20,
    durationHours: 12,
    triggerCondition: 'random',
  },
  {
    id: 'storm_heavy',
    type: 'storm',
    emoji: '⛈️',
    title: '暴风雨来袭',
    message: '暴风雨迫使你滞留一天，但你在旅馆里完成了额外任务！',
    milesBonus: 30,
    durationHours: 24,
    triggerCondition: 'random',
  },
  {
    id: 'storm_snow',
    type: 'storm',
    emoji: '❄️',
    title: '大雪封路',
    message: '大雪覆盖了前方的道路，你不得不绕路而行。',
    milesBonus: -50,
    durationHours: 12,
    triggerCondition: 'random',
  },

  // ========== 遇见旅友 ==========
  {
    id: 'meet_local',
    type: 'meet_friend',
    emoji: '🤝',
    title: '遇见当地人',
    message: '一位热情的当地人带你参观了隐藏的美景，获得了额外里程！',
    milesBonus: 50,
    triggerCondition: 'random',
  },
  {
    id: 'meet_traveler',
    type: 'meet_friend',
    emoji: '🎒',
    title: '偶遇背包客',
    message: '你遇到了一位环球旅行的背包客，他分享了省钱攻略！',
    milesBonus: 40,
    triggerCondition: 'random',
  },
  {
    id: 'meet_artist',
    type: 'meet_friend',
    emoji: '🎨',
    title: '街头艺术家',
    message: '一位街头艺术家为你画了一幅速写，获得了文化里程！',
    milesBonus: 35,
    triggerCondition: 'random',
  },
  {
    id: 'meet_chef',
    type: 'meet_friend',
    emoji: '👨‍🍳',
    title: '大厨传授秘方',
    message: '当地大厨教你做了一道地道美食，获得美食里程！',
    milesBonus: 45,
    triggerCondition: 'random',
  },

  // ========== 意外包裹 ==========
  {
    id: 'package_gift',
    type: 'package',
    emoji: '📦',
    title: '神秘包裹',
    message: '你在旅馆发现了一个被遗忘的包裹，里面是珍贵的纪念品！',
    milesBonus: 60,
    triggerCondition: 'random',
  },
  {
    id: 'package_map',
    type: 'package',
    emoji: '🗺️',
    title: '古老地图',
    message: '你在旧书店发现了一张古老的地图，指引了一条捷径！',
    milesBonus: 80,
    triggerCondition: 'random',
  },
  {
    id: 'package_letter',
    type: 'package',
    emoji: '✉️',
    title: '来自未来的信',
    message: '你收到了一封来自"未来自己"的信，鼓励你继续前行！',
    milesBonus: 30,
    triggerCondition: 'streak',
  },

  // ========== 特价机票 ==========
  {
    id: 'discount_flight',
    type: 'discount',
    emoji: '✈️',
    title: '特价机票',
    message: '你抢到了一张特价机票！下一个城市所需里程减半！',
    milesBonus: 0,
    durationHours: 48,
    triggerCondition: 'task_complete',
  },
  {
    id: 'discount_train',
    type: 'discount',
    emoji: '🚄',
    title: '火车通票',
    message: '你获得了一张欧洲火车通票，相邻城市距离减半！',
    milesBonus: 0,
    durationHours: 72,
    triggerCondition: 'random',
  },
  {
    id: 'discount_boat',
    type: 'discount',
    emoji: '🚢',
    title: '邮轮特价',
    message: '邮轮公司搞活动，跨洋航行只需半价里程！',
    milesBonus: 0,
    durationHours: 48,
    triggerCondition: 'random',
  },

  // ========== 挑战事件 ==========
  {
    id: 'challenge_speed',
    type: 'challenge',
    emoji: '⚡',
    title: '闪电挑战',
    message: '24小时内完成5个任务，获得3倍里程奖励！',
    milesBonus: 200,
    durationHours: 24,
    triggerCondition: 'streak',
  },
  {
    id: 'challenge_marathon',
    type: 'challenge',
    emoji: '🏃',
    title: '马拉松挑战',
    message: '连续7天每天完成至少3个任务，获得超级里程包！',
    milesBonus: 500,
    durationHours: 168,
    triggerCondition: 'streak',
  },
  {
    id: 'challenge_pomodoro',
    type: 'challenge',
    emoji: '🍅',
    title: '番茄大师挑战',
    message: '一天内完成10个番茄钟，获得专注里程大奖！',
    milesBonus: 150,
    durationHours: 24,
    triggerCondition: 'random',
  },

  // ========== 幸运事件 ==========
  {
    id: 'lucky_coin',
    type: 'lucky',
    emoji: '🪙',
    title: '捡到金币',
    message: '你在路上捡到了一枚古 coins！获得幸运里程！',
    milesBonus: 25,
    triggerCondition: 'random',
  },
  {
    id: 'lucky_rainbow',
    type: 'lucky',
    emoji: '🌈',
    title: '双彩虹',
    message: '天空出现了双彩虹！这是好运的象征，获得额外里程。',
    milesBonus: 40,
    triggerCondition: 'random',
  },
  {
    id: 'lucky_shooting_star',
    type: 'lucky',
    emoji: '🌠',
    title: '流星许愿',
    message: '你看到了一颗流星！许下愿望后获得了神秘里程加成。',
    milesBonus: 55,
    triggerCondition: 'random',
  },
  {
    id: 'lucky_four_leaf',
    type: 'lucky',
    emoji: '🍀',
    title: '四叶草',
    message: '你找到了一片四叶草！幸运值爆表，获得双倍里程！',
    milesBonus: 70,
    triggerCondition: 'random',
  },

  // ========== 天气事件 ==========
  {
    id: 'weather_sunny',
    type: 'weather',
    emoji: '☀️',
    title: '阳光明媚',
    message: '今天天气特别好！好天气让旅途更加愉快，获得额外里程。',
    milesBonus: 20,
    triggerCondition: 'random',
  },
  {
    id: 'weather_rainbow',
    type: 'weather',
    emoji: '🌤️',
    title: '雨后天晴',
    message: '雨后天空出现了美丽的彩虹，获得清新里程！',
    milesBonus: 30,
    triggerCondition: 'random',
  },
  {
    id: 'weather_aurora',
    type: 'weather',
    emoji: '🌌',
    title: '极光出现',
    message: '天空出现了壮观的极光！你获得了天文级别的里程奖励。',
    milesBonus: 100,
    triggerCondition: 'city_arrival',
  },

  // ========== 文化体验 ==========
  {
    id: 'culture_tea',
    type: 'culture',
    emoji: '🍵',
    title: '茶道体验',
    message: '你参加了一场传统茶道，体验了东方哲学的宁静。',
    milesBonus: 35,
    triggerCondition: 'random',
  },
  {
    id: 'culture_dance',
    type: 'culture',
    emoji: '💃',
    title: '学习当地舞蹈',
    message: '当地人教你跳了一支传统舞蹈，你的旅途增添了色彩！',
    milesBonus: 40,
    triggerCondition: 'random',
  },
  {
    id: 'culture_meditation',
    type: 'culture',
    emoji: '🧘',
    title: '冥想体验',
    message: '你在寺庙里体验了冥想，内心平静获得了精神里程。',
    milesBonus: 30,
    triggerCondition: 'random',
  },
  {
    id: 'culture_calligraphy',
    type: 'culture',
    emoji: '✒️',
    title: '书法体验',
    message: '你学习了当地书法，写下了自己的名字作为纪念。',
    milesBonus: 25,
    triggerCondition: 'random',
  },

  // ========== 美食事件 ==========
  {
    id: 'food_street',
    type: 'food',
    emoji: '🍜',
    title: '街头美食',
    message: '你发现了当地最棒的街头小吃！美食给旅途增添了能量。',
    milesBonus: 25,
    triggerCondition: 'random',
  },
  {
    id: 'food_cooking',
    type: 'food',
    emoji: '🍳',
    title: '学做当地菜',
    message: '你学会了做一道地道的当地菜，获得了美食里程！',
    milesBonus: 35,
    triggerCondition: 'random',
  },
  {
    id: 'food_market',
    type: 'food',
    emoji: '🛒',
    title: '逛当地市场',
    message: '你在当地市场发现了奇特的食材，旅途充满了惊喜。',
    milesBonus: 20,
    triggerCondition: 'random',
  },
  {
    id: 'food_feast',
    type: 'food',
    emoji: '🍽️',
    title: '盛宴邀请',
    message: '当地人邀请你参加了一场盛宴，你感受到了异国的温暖。',
    milesBonus: 50,
    triggerCondition: 'random',
  },
];

// 根据条件获取随机事件
export function getRandomEvent(condition: TravelEvent['triggerCondition']): TravelEvent | null {
  const eligible = allEvents.filter(e => e.triggerCondition === condition);
  if (eligible.length === 0) return null;
  // 30% 概率触发事件
  if (Math.random() > 0.3) return null;
  return eligible[Math.floor(Math.random() * eligible.length)];
}

// 根据城市获取相关事件
export function getCityEvents(cityId: string): TravelEvent[] {
  const cityEventMap: Record<string, string[]> = {
    tokyo: ['festival_cherry', 'culture_tea', 'food_sushi'],
    paris: ['culture_art', 'food_cooking', 'lucky_rainbow'],
    rio: ['festival_carnival', 'culture_dance', 'food_street'],
    istanbul: ['culture_calligraphy', 'food_market', 'lucky_coin'],
    mumbai: ['festival_diwali', 'food_feast', 'culture_meditation'],
    reykjavik: ['weather_aurora', 'food_street', 'lucky_shooting_star'],
    hawaii: ['weather_sunny', 'culture_dance', 'food_street'],
  };

  const eventIds = cityEventMap[cityId] || [];
  return allEvents.filter(e => eventIds.includes(e.id));
}
