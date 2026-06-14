"use client";

import { useEffect, useState } from "react";

type ScheduleItem = {
  time: string;
  title: string;
  kind?: string;
  location?: string;
  venue?: string;
  memo?: string;
  url?: string;
  mapUrl?: string;
  options?: Array<{
    label?: string;
    url?: string;
    mapUrl?: string;
    buttonLabel?: string;
  }>;
};

type TravelDay = {
  date: string;
  label: string;
  items: ScheduleItem[];
};

const schedule: TravelDay[] = [
  {
    date: "6/24",
    label: "移動Day",
    items: [
      { time: "15:40 [JP]", title: "NRT 第1ターミナル集合", kind: "集合", mapUrl: "https://maps.app.goo.gl/kYstFtFUcgC7KocZA" },
      { time: "16:00 [JP]", title: "肉料理やきすきやんま", kind: "食事", mapUrl: "https://maps.app.goo.gl/P95nLJRHeAAJnLdM7" },
      { time: "16:40 [JP]", title: "空港チェックイン 第1ターミナル", kind: "チェックイン" },
      { time: "17:00〜18:00 [JP]", title: "ラウンジ", kind: "ラウンジ", memo: "軽食あり", url: "https://www.saisoncard.co.jp/creditcard/benefits-service/lounge/" },
      { time: "18:10 [JP]", title: "搭乗準備", kind: "搭乗" },
      { time: "18:40 [JP]", title: "フライト NRT → LAX", kind: "フライト", memo: "18:40 [JP] NRT発\n↓\n12:50 [PST] LAX着" },
      { time: "12:50〜14:00 [PST]", title: "USA入国審査", kind: "入国審査" },
      { time: "14:00〜16:00 [PST]", title: "LAX ターミナルB ラウンジ", kind: "ラウンジ", memo: "軽食あり" },
      { time: "16:00〜17:00 [PST]", title: "国内線乗り換え移動", kind: "移動", memo: "LAX ターミナルB → ターミナル3" },
      { time: "17:00 [PST]", title: "空港チェックイン", kind: "チェックイン", memo: "LAX ターミナル3" },
      { time: "17:00〜18:15 [PST]", title: "ラウンジ", kind: "ラウンジ", memo: "軽食あり" },
      { time: "18:30 [PST]", title: "搭乗ゲート", kind: "搭乗" },
      { time: "18:53 [PST]", title: "フライト LAX → DFW", kind: "フライト", memo: "18:53 [PST] LAX発\n↓\n23:59 [CT] DFW着" },
      { time: "25:00 [CT]", title: "ホテルチェックイン", kind: "ホテル", location: "Super 8 by Wyndham Irving/DFW Apt/North", mapUrl: "https://maps.app.goo.gl/suYUgd7VPLuMp2Qy9" },
    ],
  },
  {
    date: "6/25",
    label: "観戦Day1 ★",
    items: [
      { time: "8:00 [CT]", title: "朝食", kind: "食事" },
      { time: "9:00〜13:00 [CT]", title: "Texas Card House", kind: "自由時間", mapUrl: "https://maps.app.goo.gl/5VP6x6zZBeonB2LcA" },
      { time: "13:00 [CT]", title: "友達ピックアップ", kind: "移動" },
      { time: "13:00 [CT]", title: "ランチ Texas Roadhouse", kind: "食事", mapUrl: "https://maps.app.goo.gl/39fidkkuZXzis9Fr5" },
      { time: "16:00 [CT]", title: "入場", kind: "観光", venue: "AT&Tスタジアム", mapUrl: "https://maps.app.goo.gl/GWrpF7GaZuK4A11z6" },
      { time: "18:00 [CT]", title: "キックオフ JPN vs SWE", kind: "試合", venue: "AT&Tスタジアム", url: "https://www.fifa.com/ja/match-centre/match/17/285023/289273/400021471", mapUrl: "https://maps.app.goo.gl/GWrpF7GaZuK4A11z6" },
      { time: "21:00 [CT]", title: "ホテルチェックイン", kind: "ホテル", location: "Super 8 by Wyndham Irving/DFW Apt/North", mapUrl: "https://maps.app.goo.gl/suYUgd7VPLuMp2Qy9" },
    ],
  },
  {
    date: "6/26",
    label: "観戦Day2 ★",
    items: [
      { time: "4:30 [CT]", title: "ホテルチェックアウト", kind: "ホテル" },
      { time: "5:30 [CT]", title: "空港チェックイン", kind: "チェックイン", memo: "DFW ターミナルE", mapUrl: "https://maps.app.goo.gl/gKDHQDLEsCXWkV2V7" },
      { time: "6:00 [CT]", title: "朝食 Drew Pearson's Sport 88", kind: "食事", mapUrl: "https://maps.app.goo.gl/oa4P6CnBCHLjGQRe8" },
      { time: "6:45 [CT]", title: "搭乗ゲート", kind: "搭乗" },
      { time: "07:05 [CT]", title: "フライト DFW → BOS", kind: "フライト", memo: "07:05 [CT] DFW発\n↓\n11:57 [ET] BOS着" },
      { time: "12:30 [ET]", title: "移動", kind: "移動", memo: "Uber利用予定\n電車：要確認", options: [{ label: "シャトルバス検索", url: "https://www.google.com/search?q=BOS%E7%A9%BA%E6%B8%AF%E2%86%92Hampton+Inn+Boston+Logan+Airport+%E3%82%B7%E3%83%A3%E3%83%88%E3%83%AB%E3%83%90%E3%82%B9", buttonLabel: "シャトルバス検索" }] },
      { time: "13:00 [ET]", title: "ホテルチェックイン", kind: "ホテル", location: "Hampton Inn Boston Logan Airport", mapUrl: "https://maps.app.goo.gl/kDtMLkQ859AKpLst7" },
      { time: "13:00 [ET]", title: "移動", kind: "移動", memo: "Uber利用予定\n電車：要確認" },
      { time: "14:00 [ET]", title: "入場", kind: "観光", venue: "ジレット・スタジアム", mapUrl: "https://maps.app.goo.gl/vM1JASkx3EV6YEDm8" },
      { time: "15:00 [ET]", title: "キックオフ NOR vs FRA", kind: "試合", url: "https://www.fifa.com/ja/match-centre/match/17/285023/289273/400021489" },
      { time: "19:00 [ET]", title: "夕食", kind: "食事" },
      { time: "20:00 [ET]", title: "ホテル帰還", kind: "ホテル", location: "Hampton Inn Boston Logan Airport", mapUrl: "https://maps.app.goo.gl/kDtMLkQ859AKpLst7" },
    ],
  },
  {
    date: "6/27",
    label: "ボストン観光Day",
    items: [
      { time: "9:00 [ET]", title: "朝食 in ホテル", kind: "食事" },
      { time: "11:00 [ET]", title: "ホテルチェックアウト", kind: "ホテル" },
      { time: "11:00〜17:00 [ET]", title: "自由時間", kind: "自由時間" },
      { time: "17:00 [ET]", title: "空港チェックイン", kind: "チェックイン", memo: "BOS ターミナルA", mapUrl: "https://maps.app.goo.gl/iqtrFWj1f9nY8A2KA" },
      { time: "18:10 [ET]", title: "搭乗ゲート", kind: "搭乗" },
      { time: "18:40 [ET]", title: "フライト BOS → DFW", kind: "フライト", memo: "18:40 [ET] BOS発\n↓\n21:57 [CT] DFW着" },
      { time: "22:30 [CT]", title: "移動", kind: "移動", memo: "車（友達）" },
      { time: "23:00 [CT]", title: "ホテルチェックイン", kind: "ホテル" },
    ],
  },
  {
    date: "6/28",
    label: "GOLF Day",
    items: [
      { time: "9:00 [CT]", title: "Fort Worth Stockyards", kind: "観光", mapUrl: "https://share.google/EqhKercWdOUAytMy1" },
      { time: "11:30 [CT]", title: "テキサスBBQランチ", kind: "食事", memo: "候補1：Cooper's Old Time Pit Bar-B-Que\n候補2：Riscky's BBQ", options: [
        { label: "Cooper's Old Time Pit Bar-B-Que", mapUrl: "https://maps.app.goo.gl/4KNGY568cF7hUXkP6", buttonLabel: "Google Maps" },
        { label: "Riscky's BBQ", mapUrl: "https://share.google/I6RJ64x90zuvPkO4O", buttonLabel: "Google Maps" },
      ] },
      { time: "13:30 [CT]", title: "ゴルフ", kind: "ゴルフ", options: [
        { label: "Texas Star Golf Course", url: "https://texasstar.cps.golf/onlineresweb/search-teetime?TeeOffTimeMin=0&TeeOffTimeMax=23.999722222222225", buttonLabel: "予約ページ" },
        { label: "Bear Creek Golf Club", url: "https://arcisgolf.com/clubs/bear_creek_golf_club/home?utm_source=chatgpt.com", buttonLabel: "予約ページ" },
        { label: "CEDAR CREST", url: "https://www.golfcedarcrest.com/book-a-tee-time", buttonLabel: "予約ページ" },
      ] },
      { time: "20:00 [CT]", title: "カジノ", kind: "カジノ", location: "Choctaw Casino & Resort", mapUrl: "https://maps.app.goo.gl/yvPExBzpzikLH3Hy6" },
      { time: "時間未定", title: "ホテル", kind: "ホテル", memo: "未定" },
    ],
  },
  {
    date: "6/29",
    label: "観戦Day3 ★",
    items: [
      { time: "7:00 [CT]", title: "レンタカーピック＆移動", kind: "移動" },
      { time: "11:00 [CT]", title: "入場", kind: "観光", venue: "NRGスタジアム", mapUrl: "https://maps.app.goo.gl/312VEhN9cPtHE8Xa7" },
      { time: "12:00 [CT]", title: "キックオフ F2位 vs C1位", kind: "試合", url: "https://www.fifa.com/ja/match-centre/match/17/285023/289287/400021516" },
      { time: "16:00 [CT]", title: "ホテルチェックイン", kind: "ホテル", location: "Wingate by Wyndham Humble/HIA", mapUrl: "https://maps.app.goo.gl/a7tP5sipSTC28owc9" },
      { time: "17:00 [CT]", title: "Space Center Houston", kind: "観光", mapUrl: "https://share.google/VNv9d4qSaUtCd9oOs" },
    ],
  },
  {
    date: "6/30",
    label: "帰国Day",
    items: [
      { time: "9:30 [CT]", title: "空港チェックイン（しげじP）", kind: "チェックイン" },
      { time: "11:00 [CT]", title: "搭乗ゲート（しげじP）", kind: "搭乗" },
      { time: "11:35 [CT]", title: "フライト IAH → 日本", kind: "フライト", memo: "11:35 [CT] IAH発\n↓\n15:25 日本着" },
      { time: "18:00 [CT]", title: "空港チェックイン（亮輔）", kind: "チェックイン", memo: "IAH ターミナルA", mapUrl: "https://maps.app.goo.gl/4RsQc9PJxjVWfFxw9" },
      { time: "19:45 [CT]", title: "搭乗ゲート（亮輔）", kind: "搭乗" },
      { time: "20:12 [CT]", title: "フライト IAH → HND", kind: "フライト", memo: "20:12 [CT] IAH発\n↓\n7/1（水）04:45 [JP] HND着" },
    ],
  },
];

const nearbyCategories = ["レストラン", "カフェ", "WC2026最新結果"] as const;

const getDayThemeIcon = (label: string) => {
  if (/移動/.test(label)) return "✈";
  if (/観戦Day1|観戦Day2|観戦Day3/.test(label)) return "⚽";
  if (/ボストン観光/.test(label)) return "🏙️";
  if (/GOLF/.test(label)) return "⛳";
  if (/帰国/.test(label)) return "🛫";
  if (/予備/.test(label)) return "📝";

  return "📅";
};

const getItemIcon = (item: ScheduleItem) => {
  const text = `${item.title} ${item.kind ?? ""} ${item.venue ?? ""}`.toLowerCase();

  if (/集合|チェックイン/.test(text)) return "📍";
  if (/朝食|ランチ|夕食|食事|bbq/.test(text)) return "🍖";
  if (/ラウンジ/.test(text)) return "☕";
  if (/搭乗|搭乗ゲート|搭乗準備/.test(text)) return "🛫";
  if (/フライト|飛行機/.test(text)) return "✈";
  if (/入国審査/.test(text)) return "🛂";
  if (/移動|ピックアップ/.test(text)) return "🚗";
  if (/ホテル/.test(text)) return "🏨";
  if (/自由時間/.test(text)) return "🕒";
  if (/試合|vs/.test(text)) return "⚽";
  if (/観光|stockyards|space center/.test(text)) return "📍";
  if (/ゴルフ/.test(text)) return "⛳";
  if (/カジノ/.test(text)) return "🎰";

  return "📅";
};

const getActionLabel = (item: ScheduleItem, type: "url" | "map") => {
  const text = `${item.title} ${item.kind ?? ""}`.toLowerCase();

  if (type === "map") return "Google Maps";
  if (/ラウンジ/.test(text)) return "ラウンジ情報";
  if (/試合|vs/.test(text)) return "マッチ情報";
  if (/ゴルフ|予約/.test(text)) return "予約ページ";
  if (/シャトル/.test(text)) return "シャトルバス検索";

  return "詳細を見る";
};

const getFlightRoute = (item: ScheduleItem) => {
  const text = item.memo ?? "";
  const match = text.match(/(\d{1,2}:\d{2}\s*\[[^\]]+\]\s*[^→]+?)\s*→\s*(\d{1,2}:\d{2}\s*\[[^\]]+\]\s*.*)/);

  if (!match) return null;

  return {
    departure: match[1].trim(),
    arrival: match[2].trim(),
  };
};

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [now, setNow] = useState<Date>(new Date());
  const usdJpyRate = 157.2;

  const travelSummary = [
    { label: "日数", value: "7日間" },
    { label: "主な移動", value: "NRT / LAX / DFW / BOS" },
    { label: "観戦", value: "3試合" },
  ];

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60_000);

    return () => window.clearInterval(timer);
  }, []);

  const timeZones = [
    { label: "JP", name: "日本時間", flag: "🇯🇵", timeZone: "Asia/Tokyo" },
    { label: "PST", name: "ロサンゼルス時間", flag: "🇺🇸", timeZone: "America/Los_Angeles" },
    { label: "CT", name: "ダラス / ヒューストン時間", flag: "🇺🇸", timeZone: "America/Chicago" },
    { label: "ET", name: "ボストン時間", flag: "🇺🇸", timeZone: "America/New_York" },
  ] as const;

  const formatTime = (timeZone: string) =>
    new Intl.DateTimeFormat("ja-JP", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(now);

  const selectedDay = selectedDate
    ? schedule.find((day) => day.date === selectedDate) ?? null
    : null;

  const getWeekdayLabel = (dateText: string) => {
    const [month, day] = dateText.split("/").map(Number);
    const weekday = new Date(2026, month - 1, day).getDay();

    return ["日", "月", "火", "水", "木", "金", "土"][weekday];
  };

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate((prev) => (prev === date ? null : date));
    setOpenItems({});
  };

  const openNearbySearch = (category: string) => {
    if (!navigator.geolocation) {
      window.alert("この端末では位置情報が使えないため、Google Maps検索を開始できません。別の端末やブラウザでお試しください。");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(6);
        const lng = position.coords.longitude.toFixed(6);
        const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(category)}/@${lat},${lng},15z`;

        window.location.href = mapsUrl;
      },
      (error) => {
        const message =
          error.code === 1
            ? "位置情報の許可がオフです。Safariやブラウザ設定で位置情報を許可してから再度お試しください。"
            : "現在地の取得に失敗しました。通信環境や端末設定を確認してから再度お試しください。";

        window.alert(message);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const openWorldCupResults = () => {
    window.location.href = "https://www.google.com/search?q=%E3%83%AF%E3%83%BC%E3%83%AB%E3%83%89%E3%82%AB%E3%83%83%E3%83%97+2026";
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(160deg,#ffffff_0%,#f7fbff_35%,#edf4ff_100%)] text-slate-900">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col pb-28">
        <section className="px-4 pt-4 sm:px-6 sm:pt-5">
          <div className="grid gap-3 md:grid-cols-[1.15fr_0.95fr_0.9fr]">
            <article className="rounded-[28px] border border-slate-200 bg-white/95 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.10)] backdrop-blur md:p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.25em] text-sky-700">World Clock</p>
                  <h2 className="text-lg font-bold text-slate-900">現在時刻</h2>
                  <p className="mt-1 text-sm text-slate-600">旅行中の各地域時間をすぐ確認できます。</p>
                </div>
              </div>

              <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] sm:gap-3 sm:overflow-visible md:flex-nowrap md:overflow-visible">
                {timeZones.map((item) => (
                  <article
                    key={item.label}
                    className="min-w-[96px] shrink-0 rounded-[18px] border border-slate-200 bg-[linear-gradient(135deg,#f8fafc_0%,#ffffff_100%)] p-2.5 shadow-sm sm:min-w-0 sm:flex-1"
                  >
                    <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">{item.label}</p>
                    <div className="mt-1 flex items-end gap-1.5">
                      <span className="text-base font-black text-slate-900">{item.flag}</span>
                      <span className="text-sm font-black text-slate-900 sm:text-base">{formatTime(item.timeZone)}</span>
                    </div>
                    <p className="mt-1 text-[10px] leading-4 text-slate-500">{item.name}</p>
                  </article>
                ))}
              </div>
            </article>

            <article className="rounded-[28px] border border-slate-200 bg-white/95 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.10)] backdrop-blur md:p-5">
              <p className="text-[11px] uppercase tracking-[0.25em] text-amber-700">Itinerary</p>
              <h2 className="text-lg font-bold text-slate-900">旅行しおり</h2>
              <p className="mt-2 text-sm text-slate-600">出発〜帰国までの主要な流れをひと目で確認できます。</p>
              <div className="mt-4 space-y-3">
                {travelSummary.map((item) => (
                  <div key={item.label} className="rounded-[20px] border border-slate-200 bg-[linear-gradient(135deg,#fffef7_0%,#ffffff_100%)] p-3 shadow-sm">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">{item.label}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">{item.value}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[28px] border border-slate-200 bg-white/95 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.10)] backdrop-blur md:p-5">
              <p className="text-[11px] uppercase tracking-[0.25em] text-emerald-700">Exchange</p>
              <h2 className="text-lg font-bold text-slate-900">ドル円レート</h2>
              <p className="mt-2 text-sm text-slate-600">現在の目安レートです。</p>
              <div className="mt-4 rounded-[24px] border border-emerald-100 bg-emerald-50 p-4 shadow-sm">
                <p className="text-xs uppercase tracking-[0.25em] text-emerald-800">USD / JPY</p>
                <p className="mt-2 text-3xl font-black text-emerald-900">1ドル = {usdJpyRate.toFixed(2)}円</p>
              </div>
            </article>
          </div>
        </section>

        <section className="px-4 sm:px-6">
          <div className="rounded-[30px] border border-slate-200/90 bg-white/95 p-4 shadow-[0_24px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl md:p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-sky-700">Schedule</p>
                <h2 className="text-lg font-bold text-slate-900">旅行しおり</h2>
                <p className="mt-1 text-sm text-slate-600">日ごとの移動・観戦・宿泊がひと目で確認できる旅程表です。</p>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              {schedule.map((day) => {
                const selected = day.date === selectedDate;
                const isMatchDay = ["6/25", "6/26", "6/29"].includes(day.date);

                return (
                  <div key={day.date} className="flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={() => handleDateSelect(day.date)}
                      className={`w-full rounded-[24px] border p-3 text-left transition duration-200 sm:p-4 ${
                        selected
                          ? "border-sky-400 bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_45%,#f0fdf4_100%)] shadow-[0_18px_30px_rgba(56,189,248,0.18)]"
                          : "border-slate-200/90 bg-white hover:-translate-y-0.5 hover:border-sky-200 hover:bg-[linear-gradient(135deg,#ffffff_0%,#f8fbff_50%,#f0fdfa_100%)] hover:shadow-[0_16px_28px_rgba(15,23,42,0.08)]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">DATE</p>
                            <span className="rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-semibold text-sky-700">{day.date}</span>
                          </div>
                          <p className="mt-2 text-2xl font-black tracking-[0.03em] text-slate-900 sm:text-[28px]">{day.date}（{getWeekdayLabel(day.date)}）</p>
                          <p className="mt-1 text-base font-semibold text-slate-800">{getDayThemeIcon(day.label)} {day.label}</p>
                        </div>
                        <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-700 shadow-sm">🗓 {day.items.length}件</span>
                      </div>
                    </button>

                    {selected && (
                      <article className="rounded-[28px] border border-slate-200 bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] p-4 shadow-inner sm:p-5">
                        <div className="mb-3 flex items-center justify-between gap-2 rounded-[20px] border border-sky-100 bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_70%,#ecfeff_100%)] px-3 py-2 text-xs font-semibold text-sky-800 shadow-sm sm:px-4">
                          <span>旅程カード</span>
                          <span>{day.items.length} 件</span>
                        </div>

                        <div className="space-y-3">
                          {day.items.map((item, index) => {
                            const key = `${day.date}-${index}`;
                            const isOpen = Boolean(openItems[key]);
                            const isMatchItem = /試合|vs/.test(`${item.title} ${item.kind ?? ""}`.toLowerCase());
                            const isFlightItem = /フライト|飛行機/.test(`${item.title} ${item.kind ?? ""}`.toLowerCase());
                            const shouldShowUrlButton = Boolean(item.url) && !isFlightItem;
                            const flightRoute = isFlightItem ? getFlightRoute(item) : null;

                            return (
                              <article
                                key={key}
                                className={`rounded-[24px] border p-4 shadow-[0_12px_24px_rgba(15,23,42,0.06)] ring-1 transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-[0_18px_30px_rgba(15,23,42,0.10)] ${
                                  isMatchItem
                                    ? "border-amber-200 bg-[linear-gradient(135deg,#fffaf0_0%,#ffffff_55%,#fff7ed_100%)] ring-amber-100"
                                    : "border-slate-200/90 bg-white ring-slate-100"
                                }`}
                              >
                                <button
                                  type="button"
                                  onClick={() => toggleItem(key)}
                                  className="w-full text-left"
                                  aria-expanded={isOpen}
                                >
                                  <div className="flex items-start gap-3">
                                    <div className="flex min-w-[72px] flex-col items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#fef3c7_0%,#fde68a_100%)] px-3 py-3 text-center text-amber-900 shadow-sm">
                                      <span className="text-xl leading-none">{getItemIcon(item)}</span>
                                    </div>
                                    <div className="flex-1">
                                      <p className="text-xl font-black tracking-[0.08em] text-slate-900 sm:text-2xl">{item.time}</p>
                                      <p className="mt-1 text-base font-semibold text-slate-800">{item.title}</p>
                                      {item.venue ? (
                                        <p className="mt-1 text-sm text-slate-600">{item.venue}</p>
                                      ) : item.location ? (
                                        <p className="mt-1 text-sm text-slate-600">{item.location}</p>
                                      ) : null}
                                    </div>
                                    <span className="text-xs font-semibold text-sky-700">{isOpen ? "閉じる" : "詳細"}</span>
                                  </div>
                                </button>

                                {isOpen && (
                                  <div className="mt-4 rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
                                    {flightRoute ? (
                                      <div className="rounded-2xl border border-sky-100 bg-sky-50/90 p-3">
                                        <p className="text-[11px] uppercase tracking-[0.24em] text-sky-700">出発</p>
                                        <p className="mt-1 text-base font-black text-slate-900">{flightRoute.departure}</p>
                                        <p className="mt-2 text-center text-sky-700">↓</p>
                                        <p className="mt-2 text-[11px] uppercase tracking-[0.24em] text-sky-700">到着</p>
                                        <p className="mt-1 text-base font-black text-slate-900">{flightRoute.arrival}</p>
                                      </div>
                                    ) : item.memo ? (
                                      <p className="leading-6">{item.memo}</p>
                                    ) : null}
                                    <div className="mt-3 flex flex-wrap gap-2">
                                      {shouldShowUrlButton && (
                                        <a
                                          href={item.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-700"
                                        >
                                          {getActionLabel(item, "url")}
                                        </a>
                                      )}
                                      {item.mapUrl && (
                                        <a
                                          href={item.mapUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500"
                                        >
                                          {getActionLabel(item, "map")}
                                        </a>
                                      )}
                                    </div>

                                    {item.options && item.options.length > 0 && (
                                      <div className="mt-3 space-y-2">
                                        {item.options.map((option, optionIndex) => (
                                          <div key={`${key}-option-${optionIndex}`} className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                                            {option.label ? <p className="text-sm font-semibold text-slate-800">{option.label}</p> : null}
                                            <div className="mt-2 flex flex-wrap gap-2">
                                              {option.url ? (
                                                <a
                                                  href={option.url}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-700"
                                                >
                                                  {option.buttonLabel ?? getActionLabel(item, "url")}
                                                </a>
                                              ) : null}
                                              {option.mapUrl ? (
                                                <a
                                                  href={option.mapUrl}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500"
                                                >
                                                  {option.buttonLabel ?? getActionLabel(item, "map")}
                                                </a>
                                              ) : null}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </article>
                            );
                          })}
                        </div>
                      </article>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </section>

      <nav className="fixed inset-x-0 bottom-0 z-10 border-t border-slate-200 bg-white/95 shadow-[0_-12px_35px_rgba(15,23,42,0.10)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-around gap-2 px-2 py-2 sm:gap-4 sm:px-4">
          {nearbyCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => (category === "WC2026最新結果" ? openWorldCupResults() : openNearbySearch(category))}
              className="flex flex-1 flex-col items-center rounded-2xl bg-slate-100 px-2 py-3 text-xs font-black text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-100 hover:text-emerald-800 sm:px-3 sm:py-3 sm:text-sm"
            >
              <span className="text-base">{category === "レストラン" ? "🍽️" : category === "WC2026最新結果" ? "⚽" : "☕"}</span>
              <span>{category}</span>
            </button>
          ))}
        </div>
      </nav>
    </main>
  );
}
