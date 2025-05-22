/**
 * 盆栽ToDoデータベース
 * 樹木ごとの月別ToDo情報を管理します
 */

// 地域の気候区分（簡易版）
const CLIMATE_ZONES = {
    // 寒冷地（北海道など）
    cold: ['札幌', '旭川', '釧路', '函館', '青森', '秋田', '盛岡'],
    
    // 温暖地（本州中心）
    temperate: ['東京', '横浜', '名古屋', '大阪', '京都', '神戸', '広島', '仙台', '新潟', '金沢', '福岡'],
    
    // 亜熱帯（沖縄など）
    subtropical: ['那覇', '石垣', '宮古島', '鹿児島']
};

// 月ごとの季節（日本の一般的な区分）
const SEASONS = {
    1: '冬', 2: '冬', 3: '春', 4: '春', 5: '春',
    6: '夏', 7: '夏', 8: '夏', 9: '秋', 10: '秋',
    11: '秋', 12: '冬'
};

// 気候区分による季節のずれ（月単位）
const SEASON_SHIFT = {
    cold: 1,      // 寒冷地は温暖地より1ヶ月遅れる
    temperate: 0, // 基準
    subtropical: -1 // 亜熱帯は温暖地より1ヶ月早まる
};

/**
 * 盆栽の種類ごとのToDo情報
 * 構造:
 * {
 *   '樹木名': {
 *     'シーズン_行動': {
 *       title: 'ToDoタイトル',
 *       description: '詳細説明'
 *     }
 *   }
 * }
 */
const BONSAI_TODO_DATA = {
    // 黒松（人気の盆栽樹種）
    '黒松': {
        '春_水やり': {
            title: '水やり（朝・夕）',
            description: '新芽の成長期です。土の表面が乾いたらたっぷりと水を与えましょう。'
        },
        '春_肥料': {
            title: '元肥を与える',
            description: '春の成長期に備えて緩効性の肥料を与えます。土の表面に置き肥するのがおすすめです。'
        },
        '春_芽摘み': {
            title: '芽摘み',
            description: '新芽（キャンドル）が伸びてきたら、強すぎる芽や不要な芽を摘み取ります。'
        },
        '夏_水やり': {
            title: '水やり（朝・夕2回）',
            description: '暑い時期は朝夕2回の水やりが必要です。葉水も忘れずに行いましょう。'
        },
        '夏_害虫対策': {
            title: '害虫チェック',
            description: '毎日葉の裏などをチェックし、アブラムシなどの害虫がいないか確認しましょう。'
        },
        '夏_遮光': {
            title: '適度な遮光',
            description: '真夏の直射日光は強すぎることがあります。午後は50%程度の遮光をしましょう。'
        },
        '秋_水やり': {
            title: '水やり（調整）',
            description: '気温の低下に合わせて水やりの量と頻度を減らしていきます。'
        },
        '秋_剪定': {
            title: '秋の整枝剪定',
            description: '樹形を整えるための軽い剪定を行います。強い剪定は避けましょう。'
        },
        '秋_肥料': {
            title: '秋肥を与える',
            description: '冬に備えてリン酸やカリウムを多く含む肥料を与えましょう。'
        },
        '冬_水やり': {
            title: '控えめな水やり',
            description: '休眠期なので水やりは控えめに。土が完全に乾いてから少量与えます。'
        },
        '冬_防寒': {
            title: '防寒対策',
            description: '寒風から守るために風通しの良い場所に移動させ、霜よけの対策をしましょう。'
        },
        '冬_観察': {
            title: '樹形の観察',
            description: '葉がない時期に全体の樹形をよく観察し、来春の育成計画を立てましょう。'
        }
    },
    
    // もみじ（カエデ）
    'もみじ': {
        '春_水やり': {
            title: '水やり（定期的に）',
            description: '新芽の時期です。土が乾いたらたっぷりと水を与えましょう。'
        },
        '春_肥料': {
            title: '液体肥料を与える',
            description: '葉の展開時期に合わせて液体肥料を薄めて与えましょう。'
        },
        '春_剪定': {
            title: '芽欠き・芽摘み',
            description: '不要な芽や内向きに成長する芽を摘み取り、樹形を整えます。'
        },
        '夏_水やり': {
            title: '水やり（たっぷりと）',
            description: 'もみじは乾燥に弱いので、特に夏場は水切れに注意しましょう。'
        },
        '夏_遮光': {
            title: '日陰での管理',
            description: '真夏の直射日光は葉焼けの原因になります。明るい日陰で管理しましょう。'
        },
        '夏_病害虫対策': {
            title: 'うどんこ病対策',
            description: 'もみじはうどんこ病にかかりやすいので、葉の状態を確認し予防しましょう。'
        },
        '秋_水やり': {
            title: '水やり（調整）',
            description: '紅葉の時期に入るので、水やりを徐々に減らしていきます。'
        },
        '秋_紅葉観賞': {
            title: '紅葉の鑑賞準備',
            description: '紅葉を美しく見せるため、日当たりの良い場所に移動させましょう。'
        },
        '秋_落葉準備': {
            title: '落葉の準備',
            description: '自然な落葉を促すため、肥料を控え、水やりを調整します。'
        },
        '冬_水やり': {
            title: '最小限の水やり',
            description: '休眠期は水やりを最小限にし、根腐れを防ぎます。'
        },
        '冬_防寒': {
            title: '霜対策',
            description: '強い霜から保護するため、軒下など霜の当たりにくい場所に置きましょう。'
        },
        '冬_鉢の確認': {
            title: '鉢の状態確認',
            description: '凍結による鉢の割れを防ぐため、鉢の状態を確認しておきましょう。'
        }
    },
    
    // 梅
    '梅': {
        '春_水やり': {
            title: '水やり（定期的に）',
            description: '花後の新芽の時期です。土の表面が乾いたら水を与えましょう。'
        },
        '春_剪定': {
            title: '花後の剪定',
            description: '花が終わったら、枝の込み具合を見て整理剪定を行います。'
        },
        '春_肥料': {
            title: '春の肥料',
            description: '新芽の成長を促すため、チッソ分を多く含む肥料を与えましょう。'
        },
        '夏_水やり': {
            title: '朝の水やり',
            description: '夏場は朝の涼しい時間に水やりをするのがベストです。'
        },
        '夏_病害虫対策': {
            title: 'カイガラムシ対策',
            description: '梅はカイガラムシが付きやすいので、定期的に枝をチェックしましょう。'
        },
        '夏_摘果': {
            title: '実の摘果',
            description: '実がなりすぎると樹に負担がかかるので、適度に間引きましょう。'
        },
        '秋_水やり': {
            title: '水やり（控えめに）',
            description: '秋は水やりを控えめにし、木を休眠に導きます。'
        },
        '秋_肥料': {
            title: '実肥（みごえ）',
            description: '来年の花芽のために、リン酸とカリを多く含む肥料を与えましょう。'
        },
        '秋_剪定': {
            title: '秋の整枝',
            description: '来年の花芽を傷つけないよう注意しながら、軽く形を整えます。'
        },
        '冬_水やり': {
            title: '控えめな水やり',
            description: '休眠期は水やりを最小限にします。乾燥しすぎないよう注意。'
        },
        '冬_観察': {
            title: '花芽の観察',
            description: '冬に膨らむ花芽の状態を観察し、開花の準備をしましょう。'
        },
        '冬_配置': {
            title: '日当たり調整',
            description: '花芽の充実のため、日当たりの良い場所に配置しましょう。'
        }
    },
    
    // 五葉松
    '五葉松': {
        '春_水やり': {
            title: '水やり（朝・夕）',
            description: '新芽の成長期です。土の表面が乾いたらたっぷりと水を与えましょう。'
        },
        '春_肥料': {
            title: '元肥を与える',
            description: '春の成長期に備えて緩効性の肥料を与えます。'
        },
        '春_芽摘み': {
            title: '芽摘み・芽切り',
            description: '新芽が伸びてきたら、バランスを考えて芽摘みや芽切りを行います。'
        },
        '夏_水やり': {
            title: '水やり（朝・夕2回）',
            description: '暑い時期は朝夕2回の水やりが必要です。葉水も忘れずに。'
        },
        '夏_遮光': {
            title: '半日陰での管理',
            description: '真夏は直射日光を避け、風通しの良い半日陰で管理します。'
        },
        '夏_針金調整': {
            title: '針金の食い込みチェック',
            description: '成長期は針金が枝に食い込みやすいので、定期的に確認しましょう。'
        },
        '秋_水やり': {
            title: '水やり（調整）',
            description: '気温の低下に合わせて水やりの量と頻度を減らしていきます。'
        },
        '秋_肥料': {
            title: '秋肥を与える',
            description: '冬に備えてリン酸やカリウムを多く含む肥料を与えましょう。'
        },
        '秋_針金掛け': {
            title: '針金掛け',
            description: '樹形を整えるのに適した時期です。必要に応じて針金掛けを行いましょう。'
        },
        '冬_水やり': {
            title: '控えめな水やり',
            description: '休眠期なので水やりは控えめに。土が完全に乾いてから少量与えます。'
        },
        '冬_防寒': {
            title: '防寒対策',
            description: '寒風から守るために風通しの良い場所に移動させ、霜よけの対策をしましょう。'
        },
        '冬_剪定': {
            title: '冬の剪定',
            description: '休眠期に入ったら、全体のバランスを見ながら剪定を行います。'
        }
    },
    
    // シンプルフォールバック（未登録の樹種用）
    'デフォルト': {
        '春_水やり': {
            title: '水やり（成長期）',
            description: '春は成長期なので、土の表面が乾いたらたっぷりと水を与えましょう。'
        },
        '春_肥料': {
            title: '春の肥料',
            description: '成長期に備えて、緩効性の肥料を与えましょう。'
        },
        '春_観察': {
            title: '新芽の観察',
            description: '新芽の成長を観察し、樹形の計画を立てましょう。'
        },
        '夏_水やり': {
            title: '水やり（夏場）',
            description: '暑い時期は水切れに注意し、朝夕の涼しい時間に水やりをしましょう。'
        },
        '夏_遮光': {
            title: '夏の遮光管理',
            description: '強い直射日光から守るために、半日陰での管理を検討しましょう。'
        },
        '夏_病害虫対策': {
            title: '害虫チェック',
            description: '夏は害虫が発生しやすい時期です。こまめにチェックしましょう。'
        },
        '秋_水やり': {
            title: '水やり（調整）',
            description: '気温の低下に合わせて水やりの量と頻度を減らしていきましょう。'
        },
        '秋_剪定': {
            title: '秋の整枝',
            description: '来年の成長に備えて、軽く樹形を整えましょう。'
        },
        '秋_肥料': {
            title: '秋肥',
            description: '冬に備えてリン酸やカリを多く含む肥料を与えましょう。'
        },
        '冬_水やり': {
            title: '控えめな水やり',
            description: '休眠期は水やりを控えめにし、根腐れを防ぎましょう。'
        },
        '冬_防寒': {
            title: '冬の防寒対策',
            description: '寒さから守るために、適切な場所に移動したり保護したりしましょう。'
        },
        '冬_計画': {
            title: '来年の育成計画',
            description: '休眠期に全体の樹形を観察し、来年の育成計画を立てましょう。'
        }
    }
};

// データへのアクセス用ヘルパー関数

/**
 * 地域名から気候区分を判定する
 * @param {string} location - 地域名（例：東京、札幌）
 * @return {string} - 気候区分（cold, temperate, subtropical）
 */
function getClimateZone(location) {
    // 完全一致で探す
    for (const [zone, cities] of Object.entries(CLIMATE_ZONES)) {
        if (cities.includes(location)) {
            return zone;
        }
    }
    
    // 部分一致で探す（例：「札幌市」→「札幌」）
    for (const [zone, cities] of Object.entries(CLIMATE_ZONES)) {
        for (const city of cities) {
            if (location.includes(city)) {
                return zone;
            }
        }
    }
    
    // デフォルトは温暖地
    return 'temperate';
}

/**
 * 月と気候区分から調整後の季節を取得
 * @param {number} month - 月（1-12）
 * @param {string} climateZone - 気候区分
 * @return {string} - 季節（春、夏、秋、冬）
 */
function getAdjustedSeason(month, climateZone) {
    // 気候区分による月のシフト
    const shift = SEASON_SHIFT[climateZone] || 0;
    
    // 調整後の月（1-12の範囲に収める）
    let adjustedMonth = month - shift;
    if (adjustedMonth < 1) adjustedMonth += 12;
    if (adjustedMonth > 12) adjustedMonth -= 12;
    
    // 調整後の月から季節を返す
    return SEASONS[adjustedMonth];
}

/**
 * 樹木名、季節、気候区分からToDoリストを生成
 * @param {string} treeName - 樹木名（例：黒松、もみじ）
 * @param {number} month - 月（1-12）
 * @param {string} location - 地域名（例：東京、札幌）
 * @return {Array} - ToDoオブジェクトの配列
 */
function generateTodoList(treeName, month, location) {
    // 気候区分を取得
    const climateZone = getClimateZone(location);
    
    // 調整後の季節を取得
    const season = getAdjustedSeason(month, climateZone);
    
    // 樹木データを取得（なければデフォルトを使用）
    const treeData = BONSAI_TODO_DATA[treeName] || BONSAI_TODO_DATA['デフォルト'];
    
    // 季節に合ったToDoを抽出
    const todoList = [];
    for (const [key, todo] of Object.entries(treeData)) {
        const [todoSeason] = key.split('_');
        if (todoSeason === season) {
            todoList.push({
                id: key,
                title: todo.title,
                description: todo.description
            });
        }
    }
    
    return todoList;
}

/**
 * 基本情報の生成
 * @param {string} treeName - 樹木名
 * @param {string} location - 地域名
 * @param {number} month - 月
 * @return {Object} - 基本情報オブジェクト
 */
function generateBonsaiInfo(treeName, location, month) {
    const climateZone = getClimateZone(location);
    const season = getAdjustedSeason(month, climateZone);
    
    // 気候区分の日本語表記
    const climateLabels = {
        cold: '寒冷地',
        temperate: '温暖地',
        subtropical: '亜熱帯'
    };
    
    return {
        treeName: treeName,
        location: location,
        month: month,
        season: season,
        climateZone: climateLabels[climateZone] || '温暖地'
    };
} 