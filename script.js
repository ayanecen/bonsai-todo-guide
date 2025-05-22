/**
 * 盆栽ToDo - メインスクリプト
 * フォーム入力とToDo表示を管理します
 */

// DOM要素の取得
const bonsaiForm = document.getElementById('bonsai-form');
const treeTypeInput = document.getElementById('tree-type');
const locationInput = document.getElementById('location');
const monthSelect = document.getElementById('month');
const getLocationBtn = document.getElementById('get-location');
const currentMonthBtn = document.getElementById('current-month');
const resultSection = document.getElementById('result-section');
const bonsaiInfoElement = document.getElementById('bonsai-info');
const todoListElement = document.getElementById('todo-list');

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', () => {
    // 今月を自動選択
    setCurrentMonth();
    
    // イベントリスナーの設定
    bonsaiForm.addEventListener('submit', handleFormSubmit);
    getLocationBtn.addEventListener('click', getCurrentLocation);
    currentMonthBtn.addEventListener('click', setCurrentMonth);
    
    // 人気の盆栽リストを表示（オートコンプリート風）
    setupTreeTypeAutocomplete();
});

/**
 * 現在の月を自動選択
 */
function setCurrentMonth() {
    const now = new Date();
    const currentMonth = now.getMonth() + 1; // JavaScript の月は 0 始まり
    monthSelect.value = currentMonth;
}

/**
 * フォーム送信時の処理
 * @param {Event} e - イベントオブジェクト
 */
function handleFormSubmit(e) {
    e.preventDefault();
    
    // フォームの値を取得
    const treeName = treeTypeInput.value.trim();
    const location = locationInput.value.trim();
    const month = parseInt(monthSelect.value);
    
    // 入力チェック
    if (!treeName || !location) {
        alert('樹木名と育成場所を入力してください');
        return;
    }
    
    // ToDo生成
    generateAndShowTodos(treeName, location, month);
}

/**
 * ToDo生成と表示
 * @param {string} treeName - 樹木名
 * @param {string} location - 地域名
 * @param {number} month - 月
 */
function generateAndShowTodos(treeName, location, month) {
    // ローディング表示
    todoListElement.innerHTML = '<div class="loading">情報を取得中</div>';
    resultSection.classList.add('active');
    
    // スクロール
    resultSection.scrollIntoView({ behavior: 'smooth' });
    
    // 少し遅延を入れてUXを向上（実際のAPIリクエストをシミュレート）
    setTimeout(() => {
        // 盆栽情報の生成
        const bonsaiInfo = generateBonsaiInfo(treeName, location, month);
        
        // ToDo情報の生成
        const todoList = generateTodoList(treeName, month, location);
        
        // 画面に表示
        displayBonsaiInfo(bonsaiInfo);
        displayTodoList(todoList);
    }, 800);
}

/**
 * 盆栽の基本情報を表示
 * @param {Object} info - 盆栽の基本情報
 */
function displayBonsaiInfo(info) {
    bonsaiInfoElement.innerHTML = `
        <h2>${info.treeName}の育成プラン</h2>
        <p>地域: ${info.location}（${info.climateZone}）</p>
        <p>時期: ${info.month}月（${info.season}）</p>
    `;
}

/**
 * ToDoリストを表示
 * @param {Array} todoList - ToDoオブジェクトの配列
 */
function displayTodoList(todoList) {
    if (todoList.length === 0) {
        todoListElement.innerHTML = '<div class="no-data">この時期にすべきことは特にありません。ゆっくり観賞を楽しみましょう。</div>';
        return;
    }
    
    let html = '';
    
    // ToDo項目をカード形式で表示
    todoList.forEach(todo => {
        html += `
            <div class="todo-card">
                <h3>${todo.title}</h3>
                <p>${todo.description}</p>
            </div>
        `;
    });
    
    todoListElement.innerHTML = html;
}

/**
 * 位置情報を取得して地域名に変換
 */
function getCurrentLocation() {
    if (!navigator.geolocation) {
        alert('お使いのブラウザは位置情報をサポートしていません。');
        return;
    }
    
    // ボタンを無効化して処理中表示
    getLocationBtn.disabled = true;
    getLocationBtn.textContent = '取得中...';
    
    navigator.geolocation.getCurrentPosition(
        // 成功時
        async (position) => {
            try {
                const { latitude, longitude } = position.coords;
                
                // 本来はここでReverseGeocodingのAPIを呼び出して地名を取得する
                // 今回はシンプルなデモのため、東京を仮設定
                
                // APIが利用できる場合は以下のようなコード
                // const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
                // const data = await response.json();
                // locationInput.value = data.address.city || data.address.town || '東京';
                
                // デモ用（実際は位置情報から取得すべき）
                locationInput.value = '東京';
                
                // ボタンを元に戻す
                getLocationBtn.disabled = false;
                getLocationBtn.textContent = '現在地を取得';
                
            } catch (error) {
                console.error('位置情報の変換に失敗しました', error);
                locationInput.value = '東京'; // フォールバック
                
                // ボタンを元に戻す
                getLocationBtn.disabled = false;
                getLocationBtn.textContent = '現在地を取得';
            }
        },
        // 失敗時
        (error) => {
            console.error('位置情報の取得に失敗しました', error);
            alert('位置情報の取得に失敗しました。手動で入力してください。');
            
            // ボタンを元に戻す
            getLocationBtn.disabled = false;
            getLocationBtn.textContent = '現在地を取得';
        }
    );
}

/**
 * 樹木名の候補表示（簡易版）
 * 本来はより洗練されたオートコンプリートを実装すべき
 */
function setupTreeTypeAutocomplete() {
    // 登録済みの樹種名をデータから取得
    const treeNames = Object.keys(BONSAI_TODO_DATA).filter(name => name !== 'デフォルト');
    
    // フォーカス時に候補リストを表示するイベント
    treeTypeInput.addEventListener('focus', () => {
        if (treeTypeInput.value.trim() === '') {
            // 入力が空の場合、人気の樹種を薄く表示
            treeTypeInput.placeholder = treeNames.join('、');
        }
    });
    
    // フォーカスが外れたときに元に戻す
    treeTypeInput.addEventListener('blur', () => {
        treeTypeInput.placeholder = '例：黒松、もみじ、梅...';
    });
    
    // 将来的な拡張: 本格的なオートコンプリートの実装
    // 現在の入力に合わせて候補をフィルタリングするなど
} 