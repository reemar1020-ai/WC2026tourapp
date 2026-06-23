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
      { time: "15:40", title: "NRT 第1ターミナル集合", mapUrl: "https://maps.app.goo.gl/kYstFtFUcgC7KocZA" },
      { time: "16:00", title: "肉料理やきすきやんま", mapUrl: "https://maps.app.goo.gl/P95nLJRHeAAJnLdM7" },
      { time: "16:40", title: "空港チェックイン 第1ターミナル" },
      { time: "17:00〜18:00", title: "ラウンジ", memo: "軽食あり", url: "https://www.saisoncard.co.jp/creditcard/benefits-service/lounge/" },
      { time: "18:10", title: "搭乗準備" },
      { time: "18:40", title: "NRT発 → 12:50 LAX着", kind: "フライト", memo: "18:40 [JP] NRT発\n↓\n12:50 [PST] LAX着" },
      { time: "12:50〜14:00", title: "USA入国審査" },
      { time: "14:00〜16:00", title: "LAX ターミナルB ラウンジ", memo: "軽食あり" },
      { time: "16:00〜17:00", title: "国内線乗り換え移動", memo: "LAX ターミナルB → ターミナル3" },
      { time: "17:00", title: "空港チェックイン LAX ターミナル3" },
      { time: "17:00〜18:15", title: "ラウンジ", memo: "軽食あり" },
      { time: "18:30", title: "搭乗ゲート" },
      { time: "18:53", title: "LAX発 → 23:59 DFW着", kind: "フライト", memo: "18:53 [PST] LAX発\n↓\n23:59 [CT] DFW着" },
      { time: "25:00", title: "ホテルチェックイン", location: "Holiday Inn Express & Suites DFW Airport Southwest - Euless", mapUrl: "https://maps.app.goo.gl/7bWPRhjLrQJmid7J9" },
    ],
  },
  {
    date: "6/25",
    label: "観戦Day1 ★",
    items: [
      { time: "08:00", title: "朝食" },
      { time: "09:00〜13:00", title: "Texas Card House", mapUrl: "https://maps.app.goo.gl/5VP6x6zZBeonB2LcA" },
      { time: "13:00", title: "友達ピックアップ" },
      { time: "13:00", title: "ランチ Texas Roadhouse", mapUrl: "https://maps.app.goo.gl/39fidkkuZXzis9Fr5" },
      { time: "16:00", title: "AT&Tスタジアム入場", mapUrl: "https://maps.app.goo.gl/GWrpF7GaZuK4A11z6" },
      { time: "18:00", title: "JPN vs SWE キックオフ", kind: "試合", url: "https://www.fifa.com/ja/match-centre/match/17/285023/289273/400021471" },
      { time: "21:00", title: "ホテルチェックイン", location: "Holiday Inn Express & Suites DFW Airport Southwest - Euless", mapUrl: "https://maps.app.goo.gl/7bWPRhjLrQJmid7J9" },
    ],
  },
  {
    date: "6/26",
    label: "観戦Day2 ★",
    items: [
      { time: "04:30", title: "ホテルチェックアウト" },
      { time: "05:30", title: "DFW ターミナルE 空港チェックイン", mapUrl: "https://maps.app.goo.gl/gKDHQDLEsCXWkV2V7" },
      { time: "06:00", title: "朝食 Drew Pearson's Sport 88", mapUrl: "https://maps.app.goo.gl/oa4P6CnBCHLjGQRe8" },
      { time: "06:45", title: "搭乗ゲート" },
      { time: "07:05", title: "DFW発 → 11:57 BOS着", kind: "フライト", memo: "07:05 [CT] DFW発\n↓\n11:57 [ET] BOS着" },
      { time: "12:30", title: "ホテルへ移動", memo: "移動手段：\n・Uber Taxi\n・シャトルバス" },
      { time: "13:00", title: "ホテルチェックイン", location: "Hampton Inn Boston Logan Airport", mapUrl: "https://maps.app.goo.gl/kDtMLkQ859AKpLst7" },
      { time: "13:00", title: "ジレットスタジアムへ移動", memo: "移動手段：\n・Uber Taxi\n・電車" },
      { time: "14:00", title: "ジレットスタジアム入場", mapUrl: "https://maps.app.goo.gl/vM1JASkx3EV6YEDm8" },
      { time: "15:00", title: "NOR vs FRA キックオフ", kind: "試合", url: "https://www.fifa.com/ja/match-centre/match/17/285023/289273/400021489" },
      { time: "19:00", title: "夕食" },
      { time: "20:00", title: "ホテル帰還", location: "Hampton Inn Boston Logan Airport", mapUrl: "https://maps.app.goo.gl/kDtMLkQ859AKpLst7" },
    ],
  },
  {
    date: "6/27",
    label: "ボストン観光Day",
    items: [
      { time: "09:00", title: "朝食（ホテル）" },
      { time: "11:00", title: "ホテルチェックアウト" },
      { time: "11:00〜17:00", title: "自由時間" },
      { time: "17:00", title: "BOS ターミナルA 空港チェックイン", mapUrl: "https://maps.app.goo.gl/iqtrFWj1f9nY8A2KA" },
      { time: "18:10", title: "搭乗ゲート" },
      { time: "18:40", title: "BOS発 → 21:57 DFW着", kind: "フライト", memo: "18:40 [ET] BOS発\n↓\n21:57 [CT] DFW着" },
      { time: "22:30", title: "移動（友達の車）" },
      { time: "23:00", title: "ホテルチェックイン", location: "Holiday Inn Express & Suites DFW Airport Southwest - Euless", mapUrl: "https://maps.app.goo.gl/7bWPRhjLrQJmid7J9" },
    ],
  },
  {
    date: "6/28",
    label: "GOLF Day",
    items: [
      { time: "09:00", title: "Fort Worth Stockyards", mapUrl: "https://share.google/EqhKercWdOUAytMy1" },
      { time: "11:30", title: "テキサスBBQランチ", memo: "候補①\nCooper's Old Time Pit Bar-B-Que\n\n候補②\nRiscky's BBQ", options: [
        { label: "Cooper's Old Time Pit Bar-B-Que", mapUrl: "https://maps.app.goo.gl/4KNGY568cF7hUXkP6", buttonLabel: "Google Maps" },
        { label: "Riscky's BBQ", mapUrl: "https://share.google/I6RJ64x90zuvPkO4O", buttonLabel: "Google Maps" },
      ] },
      { time: "12:30", title: "Bear Creek Golf Club へ移動" },
      { time: "13:22", title: "ゴルフスタート", location: "Bear Creek Golf Club", url: "https://arcisgolf.com/clubs/bear_creek_golf_club/home", mapUrl: "https://share.google/CcacpJxXFvC0hOpOR" },
      { time: "20:00", title: "Choctaw Casino & Resort", mapUrl: "https://maps.app.goo.gl/yvPExBzpzikLH3Hy6" },
    ],
  },
  {
    date: "6/29",
    label: "観戦Day3 ★",
    items: [
      { time: "07:00", title: "レンタカーピックアップ・移動" },
      { time: "11:00", title: "NRGスタジアム入場", mapUrl: "https://maps.app.goo.gl/312VEhN9cPtHE8Xa7" },
      { time: "12:00", title: "F2位 vs C1位 キックオフ", kind: "試合", url: "https://www.fifa.com/ja/match-centre/match/17/285023/289287/400021516" },
      { time: "16:00", title: "ホテルチェックイン", location: "Wingate by Wyndham Humble/HIA", mapUrl: "https://maps.app.goo.gl/a7tP5sipSTC28owc9" },
      { time: "17:00", title: "Space Center Houston", mapUrl: "https://share.google/VNv9d4qSaUtCd9oOs" },
    ],
  },
  {
    date: "6/30",
    label: "帰国Day",
    items: [
      { time: "09:30", title: "空港チェックイン（しげじ）" },
      { time: "11:00", title: "搭乗ゲート（しげじ）" },
      { time: "11:35", title: "IAH発 → 15:25 日本着（しげじ）", kind: "フライト" },
      { time: "18:00", title: "IAH ターミナルA 空港チェックイン（亮輔）", mapUrl: "https://maps.app.goo.gl/4RsQc9PJxjVWfFxw9" },
      { time: "19:45", title: "搭乗ゲート（亮輔）" },
      { time: "20:12", title: "IAH発 → 7/1 04:45 HND着（亮輔）", kind: "フライト" },
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

        globalThis.location.assign(mapsUrl);
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
    globalThis.location.assign("https://www.google.com/search?q=%E3%83%AF%E3%83%BC%E3%83%AB%E3%83%89%E3%82%AB%E3%83%83%E3%83%97+2026");
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(160deg,#ffffff_0%,#f7fbff_35%,#edf4ff_100%)] text-slate-900">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col pb-28">
        <section className="px-4 pt-3 sm:px-6 sm:pt-4">
          <div className="grid gap-3 md:grid-cols-[1.1fr_0.9fr] md:gap-4">
            <article className="rounded-[28px] border border-slate-200 bg-white/95 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.10)] backdrop-blur md:p-5">
              <div className="hidden"></div>

              <div className="mt-4 grid grid-cols-4 gap-1">
                {timeZones.map((item) => (
                  <article
                    key={item.label}
                    className="min-w-0 flex-1 rounded-[18px] border border-slate-200 bg-[linear-gradient(135deg,#f8fafc_0%,#ffffff_100%)] p-2.5 shadow-sm"
                  >
                    <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">{item.label}</p>
                    <div className="mt-1 flex items-end gap-1.5">
                      <span className="text-sm font-black text-slate-900">{item.flag}</span>
                      <span className="text-sm font-black text-slate-900">{formatTime(item.timeZone)}</span>
                    </div>
                    <p className="mt-1 text-[10px] leading-4 text-slate-500">{item.name}</p>
                  </article>
                ))}
              </div>
            </article>

            <article className="rounded-[28px] border border-slate-200 bg-white/95 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.10)] backdrop-blur md:p-5">
              <div className="mt-3 rounded-[24px] border border-emerald-100 bg-emerald-50 p-4 shadow-sm">
                <p className="text-xs uppercase tracking-[0.25em] text-emerald-800">USD / JPY</p>
                <p className="mt-2 text-3xl font-black text-emerald-900">1ドル = {usdJpyRate.toFixed(2)}円</p>
              </div>
            </article>
          </div>
        </section>

        <section className="px-4 sm:px-6">
          <div className="rounded-[30px] border border-slate-200/90 bg-white/95 p-4 shadow-[0_24px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl md:p-5">
            <div className="hidden"></div>

            <div className="mt-4 flex flex-col gap-3">
              {schedule.map((day) => {
                const selected = day.date === selectedDate;

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
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">DATE</p>
                          <span className="rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-semibold text-sky-700">{day.date}</span>
                        </div>
                        <p className="mt-2 text-2xl font-black tracking-[0.03em] text-slate-900 sm:text-[28px]">{day.date}（{getWeekdayLabel(day.date)}）</p>
                        <p className="mt-1 text-base font-semibold text-slate-800">{getDayThemeIcon(day.label)} {day.label}</p>
                      </div>
                    </button>

                    {selected && (
                      <article className="rounded-[28px] border border-slate-200 bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] p-4 shadow-inner sm:p-5">


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
                                          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-700 max-w-full break-words allow-break"
                                        >
                                          {getActionLabel(item, "url")}
                                        </a>
                                      )}
                                      {item.mapUrl && (
                                        <a
                                          href={item.mapUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 max-w-full break-words allow-break"
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
                                                  className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-700 max-w-full break-words allow-break"
                                                >
                                                  {option.buttonLabel ?? getActionLabel(item, "url")}
                                                </a>
                                              ) : null}
                                              {option.mapUrl ? (
                                                <a
                                                  href={option.mapUrl}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 max-w-full break-words allow-break"
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
