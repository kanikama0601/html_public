const baseurl = 'https://www.jma.go.jp/bosai/forecast/data/';
const baseurl_amedas = 'https://www.jma.go.jp/bosai/amedas/data/map/';
const dateurl = 'https://www.jma.go.jp/bosai/amedas/data/latest_time.txt';
//気象庁のjsonデータを使用
//東京は130000
//https://www.jma.go.jp/bosai/amedas/data/map/20240901175000.json
//↑アメダスで現在の気温を取得
//https://qiita.com/T_Ryota/items/ef96d6575404a0fd46dd
const weather_codes = {
    '100': '晴れ',
    '101': '晴れ時々くもり',
    '102': '晴れ一時雨',
    '103': '晴れ時々雨',
    '104': '晴れ一時雪',
    '105': '晴れ時々雪',
    '106': '晴れ一時雨か雪',
    '107': '晴れ時々雨か雪',
    '108': '晴れ一時雨か雷雨',
    '110': '晴れのち時々くもり',
    '111': '晴れのちくもり',
    '112': '晴れのち一時雨',
    '113': '晴れのち時々雨',
    '114': '晴れのち雨',
    '115': '晴れのち一時雪',
    '116': '晴れのち時々雪',
    '117': '晴れのち雪',
    '118': '晴れのち雨か雪',
    '119': '晴れのち雨か雷雨',
    '120': '晴れ 朝夕 一時雨',
    '121': '晴れ 朝のうち 雨',
    '122': '晴れ 夕方一時 雨',
    '123': '晴れ 山沿い　雷雨',
    '124': '晴れ 山沿い　雪',
    '125': '晴れ 午後は雷雨',
    '126': '晴れ 昼頃から雨',
    '127': '晴れ 夕方から雨',
    '128': '晴れ 夜は雨',
    '129': '晴れ 夜半から雨',
    '130': '朝のうち霧 のち雨',
    '131': '晴れ 明け方 霧',
    '132': '晴れ 朝夕 くもり',
    '140': '晴れ時々雨で雷を伴う',
    '160': '晴れ一時雪か雨',
    '170': '晴れ時々雪か雨',
    '181': '晴れのち雪か雨',
    '200': 'くもり',
    '201': 'くもり時々晴れ',
    '202': 'くもり一時雨',
    '203': 'くもり時々雨',
    '204': 'くもり一時雪',
    '205': 'くもり時々雪',
    '206': 'くもり一時雨か雪',
    '207': 'くもり時々雨か雪',
    '208': 'くもり一時雨か雷雨',
    '209': '霧',
    '210': 'くもりのち時々晴れ',
    '211': 'くもりのち晴れ',
    '212': 'くもりのち一時雨',
    '213': 'くもりのち時々雨',
    '214': 'くもりのち雨',
    '215': 'くもりのち一時雪',
    '216': 'くもりのち時々雪',
    '217': 'くもりのち雪',
    '218': 'くもりのち雨か雪',
    '219': 'くもりのち雨か雷雨',
    '220': 'くもり 朝夕 一時雨',
    '221': 'くもり 朝のうち 雨',
    '222': 'くもり 夕方一時 雨',
    '223': 'くもり 日中時々晴れ',
    '224': 'くもり 昼頃から雨',
    '225': 'くもり 夕方から雨',
    '226': 'くもり 夜は雨',
    '227': 'くもり 夜半から雨',
    '228': 'くもり 昼頃から雪',
    '229': 'くもり 夕方から雪',
    '230': 'くもり 夜は雪',
    '231': 'くもり 会場海岸は霧か霧雨',
    '240': 'くもり 時々雨 雷を伴う',
    '250': 'くもり 時々雪 雷を伴う',
    '260': 'くもり一時雪か雨',
    '270': 'くもり時々雪か雨',
    '281': 'くもりのち雪か雨',
    '300': '雨',
    '301': '雨時々晴れ',
    '302': '雨時々止む',
    '303': '雨時々雪',
    '304': '雨か雪',
    '306': '大雨',
    '307': '風雨ともに強い',
    '308': '雨で暴風を伴う',
    '309': '雨一時雪',
    '311': '雨のち晴れ',
    '313': '雨のちくもり',
    '314': '雨のち時々雪',
    '315': '雨のち雪',
    '316': '雨か雪 のち 晴れ',
    '317': '雨か雪 のちくもり',
    '320': '朝のうち雨 のち晴れ',
    '321': '朝のうち雨 のちくもり',
    '322': '雨 朝晩一時雪',
    '323': '雨 昼ごろから晴れ',
    '324': '雨 夕方からくもり',
    '325': '雨 夜は晴',
    '326': '雨 夕方から雪',
    '327': '雨 夜は雪',
    '328': '雨一時強く降る',
    '329': '雨一時みぞれ',
    '340': '雪か雨',
    '350': '雨で雷を伴う',
    '361': '雪か雨のち晴れ',
    '371': '雪か雨のちくもり',
    '400': '雪',
    '401': '雪時々晴れ',
    '402': '雪時々止む',
    '403': '雪時々雨',
    '404': '雪か雨',
    '405': '大雪',
    '406': '風雪ともに強い',
    '407': '暴風雪',
    '409': '雪一時雨',
    '411': '雪のち晴れ',
    '413': '雪のちくもり',
    '414': '雪のち雨',
    '420': '朝のうち雪 のち晴れ',
    '421': '朝のうち雪 のちくもり',
    '422': '雪 昼頃から雨',
    '423': '雪 夕方から雨',
    '424': '雪 夜半から雨',
    '425': '雪一時強く降る',
    '426': '雪のちみぞれ',
    '427': '雪一時みぞれ',
    '450': '雪で雷を伴う',
}

let global_datetime
//グローバル関数終わり


async function getWeatherInfo(areacode) { //最初に呼び出される部分
    //APIのURL
    const url = `${baseurl}forecast/${areacode}.json`;
    const overview_url = `${baseurl}overview_forecast/${areacode}.json`;

    //APIを取得
    document.getElementById('weather-info').innerHTML = '<p>Loading...<p>';
    let data, data_overview, data_amedas;
    //天気
    try {
        const response = await fetch(url);
        //レスポンスエラー
        if (!response.ok)
        {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        data = await response.json();
        console.log("data_forecast:",data);
    }
    catch (error) { //エラー処理
        console.error('There was a problem with the fetch operation:', error.message);
        document.getElementById('weather-info').innerHTML = '<p>error<p>';
        return;
    }
    //地点と解説
    try {
        const response_overview = await fetch(overview_url);
        //レスポンスエラー
        if (!response_overview.ok)
        {
            throw new Error(`HTTP error! status: ${response_overview.status}`);
        }
        data_overview = await response_overview.json();
        console.log("data_overview:",data_overview);
    }
    catch (error) { //エラー処理
        console.error('There was a problem with the fetch operation:', error.message);
        document.getElementById('weather-info').innerHTML = '<p>error<p>';
        return;
    }
    //アメダス
    const datetime = await getLatestTime();
    console.log("datetime:",datetime);
    url_amedas = `${baseurl_amedas}${datetime}.json`;
    try {
        const response_amedas = await fetch(url_amedas);
        //レスポンスエラー
        if (!response_amedas.ok)
        {
            throw new Error(`HTTP error! status: ${response_amedas.status}`);
        }
        data_amedas = await response_amedas.json();
        console.log("data_amedas:",data_amedas);
    }
    catch (error) { //エラー処理
        console.error('There was a problem with the fetch operation:', error.message);
        document.getElementById('weather-info').innerHTML = '<p>error<p>';
        return;
    }
    //取得関連終わり

    //表示
    if (data) {
        if (data_overview) {
            if (data_amedas) {
                displayWeatherInfo(data, data_overview,data_amedas); //メイン処理
            }
        }
    }
}


async function getLatestTime() {
    try {
        const response_latestdate = await fetch(dateurl);
        //レスポンスエラー
        if (!response_latestdate.ok)
        {
            throw new Error(`HTTP error! status: ${response_latestdate.status}`);
        }
        datetime_text = await response_latestdate.text();
        //日付のデータを変換
        const padTo2Digits = (num) => num.toString().padStart(2, '0');
        const datetime_data = new Date(datetime_text);
        global_datetime = datetime_data
        const year = datetime_data.getFullYear();
        const month = padTo2Digits(datetime_data.getMonth() + 1);  // 月は0から始まるので+1する
        const day = padTo2Digits(datetime_data.getDate());
        const hours = padTo2Digits(datetime_data.getHours());
        const minutes = padTo2Digits(datetime_data.getMinutes());
        const seconds = padTo2Digits(datetime_data.getSeconds());
        const datetime = `${year}${month}${day}${hours}${minutes}${seconds}`;
        //console.log("datetime:",datetime);
        return `${datetime}`;
    }

    catch (error) { //エラー処理
        console.error('There was a problem with the fetch operation:', error.message);
        document.getElementById('weather-info').innerHTML = '<p>error<p>';
        throw error;
    }
}


function judgeWeatherCode(weather_code) {
    return weather_codes[weather_code] || '不明';
}

function getWeatherIcon(weather_code) {
    if(weather_code === 350 || weather_code === 450) { return './images/tenki_mark07/kaminari.png'; }
    if(weather_code >= 100 && weather_code <= 181) { return './images/tenki_mark01_hare.png'; }
    if(weather_code >= 200 && weather_code <= 281) { return './images/tenki_mark05_kumori.png'; }
    if(weather_code >= 300 && weather_code <= 350) { return './images/tenki_mark02_ame.png'; }
    if(weather_code >= 361 && weather_code <= 450) { return './images/tenki_mark08_yuki.png'; }
}

function WeatherNum(time,weather_code) {
    if(weather_code === 350 || weather_code === 450) //雷
    {
        return 6
    }
    else if(weather_code >= 100 && weather_code <= 181) //晴れ
    {
        if(time >= 500 && time < 600)
        {
            return 0;
        }
        else if(time >= 1700 && time < 1900)
        {
            return 0;
        }
        else if(time >= 600 && time < 1700)
        {
            return 1;
        }
        else
        {
            return 2;
        }
    }
    else if(weather_code >= 200 && weather_code <= 281) //曇り
    {
        if(time>=500 && time < 1900)
        {
            return 3;
        }
        else
        {
            return 4;
        }
    }
    else if(weather_code >= 300 && weather_code <= 350) //雨
    {
        return 4;
    }
    else if(weather_code >= 361 && weather_code <= 450) //雪
    {
        return 5;
    }
    else //その他
    {
        return 1;
    }
}

function selectWallpaper(num) {
    if(num === 5) {
        return `${num}.png`
    }
    return `${num}.jpg`
}

function selectBackColor(num) { //没
    if(num === 0) {
        return "(1, 1, 1)"
    }
    else if(num === 1) {
        return "(29, 73, 123)"
    }
    else if(num === 2) {
        return "(2, 17, 38)"
    }
    else if(num === 3) {
        return "(87, 123, 143)"
    }
    else if(num === 4) {
        return "(12, 17, 30)"
    }
    else if(num === 5) {
        return "(77, 117, 175)"
    }
    else {
        return "(1, 1, 1)"
    }
}

function changeBackground(weather_num) {
    const newWallpaper = `./images/wallpaper/${selectWallpaper(weather_num)}`;
    document.body.style.backgroundImage = `url(${newWallpaper})`;

    // const newBackColor = `rgb${selectBackColor(weather_num)}`;
    // document.body.style.backgroundColor = newBackColor;
}


function displayWeatherInfo(data, data_overview,data_amedas) {
    console.log(`weather-code:${data[0].timeSeries[0].areas[0].weatherCodes[0]}`)
    const observation_point = data[0].timeSeries[2].areas[0].area.code;
    console.log("観測地点コード:",observation_point);
    let min_temp = data[0].timeSeries[2].areas[0].temps[0];
    let max_temp = data[0].timeSeries[2].areas[0].temps[1];
    //最低気温の表記があるか判別
    if (min_temp == max_temp)
    {
        min_temp = " - ";
    }


    //表示部分

    //背景
    const now_time = `${global_datetime.getHours()}${global_datetime.getMinutes()}`;
    console.log(`now_time:${now_time}`);
    const weather_num = WeatherNum(now_time,data[0].timeSeries[0].areas[0].weatherCodes[0]);

    //アニメーション
    changeBackground(weather_num)
    
    //今日の天気
    document.getElementById('weather-info').innerHTML = `
        <div class="fade-in-down">
            <h1 class="center-text">
                ${data_overview.targetArea}
            </h1>
            <img class="center-image" src="${getWeatherIcon(data[0].timeSeries[0].areas[0].weatherCodes[0])}">
            <h1 class="center-text h1-size">
                ${data_amedas[observation_point].temp[0]}℃
            </h1>
            <h2 class="center-text">
                ${judgeWeatherCode(data[0].timeSeries[0].areas[0].weatherCodes[0])}
            </h2>
            <h2 class="center-text">
                最高:${max_temp}℃ 最低:${min_temp}℃
                <br>
            </h2>
            <br>
            <br>
        </div>
    `;

    //明日の天気・気温
    const datetime_data_tommorow = new Date(data[0].timeSeries[2].timeDefines[0]);
    const tommorow_date = `${datetime_data_tommorow.getMonth() + 1}月${datetime_data_tommorow.getDate()}日`;
    console.log(tommorow_date);
    document.getElementById('after-weather').innerHTML = `
        <h2 style="vertical-align: middle; text-align:left;" class="fade-in-right delay-1">
            ${tommorow_date}&emsp;&emsp;&emsp;&emsp;
            <img class="inline inline_img" src="${getWeatherIcon(data[0].timeSeries[0].areas[0].weatherCodes[1])}">
            <p style="color:rgb(254, 107, 107); margin-left: 100px;" class="inline">
                ${data[0].timeSeries[2].areas[0].temps[1]}℃
            </p>
            <p style="color:rgb(107, 129, 254); float: right;" class="inline">
                &nbsp;${data[0].timeSeries[2].areas[0].temps[0]}℃
            </p>
        </h2>
    `;

    for (let i = 1; i < 7; i++) {
        const datetime_data = new Date(data[1].timeSeries[0].timeDefines[i]);
        const date = `${datetime_data.getMonth() + 1}月${datetime_data.getDate()}日`;
        const weatherIcon = getWeatherIcon(data[1].timeSeries[0].areas[0].weatherCodes[i]);
        const tempMax = data[1].timeSeries[1].areas[0].tempsMax[i];
        const tempMin = data[1].timeSeries[1].areas[0].tempsMin[i];
        const delay = `delay-${i+1}`
    
        const weatherHTML = `
            <hr>
            <h2 style="vertical-align: middle; text-align:left;" class="fade-in-right ${delay}">
                ${date}&emsp;&emsp;&emsp;&emsp;
                <img class="inline inline_img" src="${weatherIcon}">
                <p style="color:rgb(254, 107, 107); margin-left: 100px;" class="inline">
                    ${tempMax}℃
                </p>
                <p style="color:rgb(107, 129, 254); float: right;" class="inline">
                    &nbsp;${tempMin}℃
                </p>
            </h2>
        `;
    
        document.getElementById('after-weather').innerHTML += weatherHTML;
    }
    //表示部分終了

    if (document.getElementById('after-weather').innerHTML.trim() === "") {
        document.getElementById('after-weather').style.display = "none";
    } else {
        document.getElementById('after-weather').style.display = "block";
    }
}

//リスナーの配置
document.getElementById('weather-form').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('after-weather').style.display = "none";
    const areacode = document.getElementById('areacode-input').value;
    getWeatherInfo(areacode);
});