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
      {
        time: "17:00 [JP]",
        title: "フライト",
        kind: "✈ フライト",
        location: "NRT",
        memo: "18:40 [JP] NRT → 23:59 [CT] DFW",
      },
      {
        time: "24:00 [CT]",
        title: "ホテル",
        kind: "🏨 ホテル",
        location: "場所未定",
        memo: "翌朝の移動に備えて休息をとります。",
      },
    ],
  },
  {
    date: "6/25",
    label: "観戦Day1 ★",
    items: [
      {
        time: "〜18:00 [CT]",
        title: "自由時間",
        kind: "🕒 自由時間",
        memo: "観光や食事、準備をゆったりと。",
      },
      {
        time: "18:00 [CT]",
        title: "JPN vs SWE",
        kind: "⚽ 試合",
        location: "AT&Tスタジアム",
        venue: "会場: AT&Tスタジアム",
        url: "https://www.fifa.com/ja/match-centre/match/17/285023/289273/400021471",
        mapUrl: "https://maps.app.goo.gl/GWrpF7GaZuK4A11z6",
      },
      {
        time: "ホテル",
        title: "ホテル",
        kind: "🏨 ホテル",
        location: "場所未定",
        memo: "試合後の休息を確保します。",
      },
    ],
  },
  {
    date: "6/26",
    label: "観戦Day2 ★",
    items: [
      {
        time: "06:00 [CT]",
        title: "フライト",
        kind: "✈ フライト",
        location: "DFW → BOS",
        memo: "07:05 [CT] DFW → 11:57 [ET] BOS",
      },
      {
        time: "12:00 [ET]",
        title: "ランチ",
        kind: "🍔 ランチ",
      },
      {
        time: "13:00〜14:00 [ET]",
        title: "移動",
        kind: "🚗 移動",
        memo: "会場周辺へ移動します。",
      },
      {
        time: "15:00 [ET]",
        title: "NOR vs FRA",
        kind: "⚽ 試合",
        location: "ジレットスタジアム",
        venue: "会場: ジレットスタジアム",
        url: "https://www.fifa.com/ja/match-centre/match/17/285023/289273/400021489",
        mapUrl: "https://maps.app.goo.gl/CMtnP3nN18XTN1tm8",
      },
      {
        time: "18:00 [ET]",
        title: "自由時間",
        kind: "🕒 自由時間",
        memo: "ホテルは未定のため、現地での移動は柔軟に。",
      },
      {
        time: "ホテル",
        title: "ホテル",
        kind: "🏨 ホテル",
        location: "場所未定",
      },
    ],
  },
  {
    date: "6/27",
    label: "ボストン観光Day",
    items: [
      {
        time: "〜17:00 [ET]",
        title: "自由時間",
        kind: "🕒 自由時間",
        memo: "街歩きや休憩を楽しみます。",
      },
      {
        time: "17:00 [ET]",
        title: "フライト",
        kind: "✈ フライト",
        location: "BOS → DFW",
        memo: "18:40 [ET] BOS → 21:57 [CT] DFW",
      },
      {
        time: "24:00 [CT]",
        title: "ホテル",
        kind: "🏨 ホテル",
        location: "場所未定",
        memo: "翌日以降の移動準備をします。",
      },
    ],
  },
  {
    date: "6/28",
    label: "GOLF Day",
    items: [
      {
        time: "終日",
        title: "ホテル",
        kind: "🏨 ホテル",
        location: "未定",
        memo: "移動先を柔軟に調整しながら過ごします。",
      },
    ],
  },
  {
    date: "6/29",
    label: "観戦Day3 ★",
    items: [
      {
        time: "12:00 [CT]",
        title: "F2位 vs C1位",
        kind: "⚽ 試合",
        location: "NRGスタジアム",
        venue: "会場: NRGスタジアム",
        url: "https://www.fifa.com/ja/match-centre/match/17/285023/289287/400021516",
        mapUrl: "https://maps.app.goo.gl/312VEhN9cPtHE8Xa7",
      },
    ],
  },
  {
    date: "6/30",
    label: "帰国Day",
    items: [
      {
        time: "〜19:00 [CT]",
        title: "自由時間",
        kind: "🕒 自由時間",
        memo: "荷物整理や最後の買い物をします。",
      },
      {
        time: "19:00 [CT]",
        title: "フライト",
        kind: "✈ フライト",
        location: "IAH → HND",
        memo: "20:12 [CT] IAH → 7/1 04:45 [JP] HND",
      },
    ],
  },
  {
    date: "7/1",
    label: "予備日",
    items: [
      {
        time: "終日",
        title: "予備日",
        kind: "🗓️ 予備日",
        memo: "予定の調整や休息に使います。",
      },
    ],
  },
];

const nearbyCategories = ["レストラン", "コンビニ", "カフェ"] as const;

const getItemIcon = (item: ScheduleItem) => {
  const text = `${item.title} ${item.kind ?? ""} ${item.venue ?? ""}`.toLowerCase();

  if (/フライト|飛行機/.test(text)) return "✈";
  if (/試合|vs/.test(text)) return "⚽";
  if (/ホテル/.test(text)) return "🏨";
  if (/ランチ/.test(text)) return "🍔";
  if (/移動/.test(text)) return "🚗";
  if (/自由時間/.test(text)) return "🕒";

  return "🗺️";
};

const getActionLabel = (item: ScheduleItem, type: "url" | "map") => {
  if (type === "map") return "Google Maps";

  const text = `${item.title} ${item.kind ?? ""}`.toLowerCase();

  if (/試合|vs/.test(text)) return "マッチ情報";

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
    { label: "JP", flag: "🇯🇵", timeZone: "Asia/Tokyo" },
    { label: "CT", flag: "🇺🇸", timeZone: "America/Chicago" },
    { label: "ET", flag: "🇺🇸", timeZone: "America/New_York" },
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

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#ffffff_0%,_#f8fbff_38%,_#eef4ff_100%)] text-slate-900">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col pb-28">
        <section className="px-4 pt-4 sm:px-6 sm:pt-5">
          <div className="grid gap-3 md:grid-cols-[1.2fr_0.8fr]">
            <article className="rounded-[28px] border border-slate-200 bg-white/95 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.10)] backdrop-blur md:p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.25em] text-sky-700">World Clock</p>
                  <h2 className="text-lg font-bold text-slate-900">現在時刻</h2>
                  <p className="mt-1 text-sm text-slate-600">旅行中の各地域時間をすぐ確認できます。</p>
                </div>
              </div>

              <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] sm:gap-3 sm:overflow-visible">
                {timeZones.map((item) => (
                  <article
                    key={item.label}
                    className="min-w-[96px] flex-1 rounded-[18px] border border-slate-200 bg-[linear-gradient(135deg,#f8fafc_0%,#ffffff_100%)] p-2.5 shadow-sm sm:min-w-0"
                  >
                    <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">{item.label}</p>
                    <div className="mt-1 flex items-end gap-1.5">
                      <span className="text-base font-black text-slate-900">{item.flag}</span>
                      <span className="text-base font-black text-slate-900">{formatTime(item.timeZone)}</span>
                    </div>
                    <p className="mt-1 text-[10px] leading-4 text-slate-500">{item.label === "JP" ? "日本" : item.label === "CT" ? "ダラス" : "ボストン"}</p>
                  </article>
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
          <div className="rounded-[30px] border border-white/80 bg-white/90 p-4 shadow-[0_24px_50px_rgba(15,23,42,0.12)] backdrop-blur-xl md:p-5">
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
                      className={`w-full rounded-[24px] border p-4 text-left transition duration-200 ${
                        selected
                          ? "border-sky-500 bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_45%,#ecfeff_100%)] shadow-[0_18px_30px_rgba(56,189,248,0.18)]"
                          : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-sky-200 hover:bg-sky-50/70 hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">DATE</p>
                          <p className="mt-1 text-xl font-black tracking-[0.02em] text-slate-900">{day.date}</p>
                          <p className="mt-1 text-base font-semibold text-slate-700">{day.label}</p>
                        </div>
                        <span className="rounded-full bg-slate-900 px-3 py-1 text-[11px] font-semibold text-white shadow-sm">{day.items.length} 件</span>
                      </div>
                    </button>

                    {selected && (
                      <article className="rounded-[28px] border border-slate-200 bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] p-4 shadow-inner sm:p-5">
                        <div className="mb-3 flex items-center justify-between gap-2 rounded-[20px] border border-sky-100 bg-sky-50/80 px-3 py-2 text-xs font-semibold text-sky-800 sm:px-4">
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
                                className={`rounded-[24px] border p-4 shadow-sm ring-1 transition hover:border-sky-200 hover:shadow-md ${
                                  isMatchItem
                                    ? "border-amber-200 bg-[linear-gradient(135deg,#fffaf0_0%,#ffffff_60%,#fff7ed_100%)] ring-amber-100"
                                    : "border-slate-200 bg-white ring-slate-100"
                                }`}
                              >
                                <button
                                  type="button"
                                  onClick={() => toggleItem(key)}
                                  className="w-full text-left"
                                  aria-expanded={isOpen}
                                >
                                  <div className="flex items-start gap-3">
                                    <div className="flex min-w-[72px] flex-col items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#fef3c7_0%,#fde68a_100%)] px-3 py-3 text-center text-sm font-black text-amber-900 shadow-sm">
                                      <span className="text-base">{getItemIcon(item)}</span>
                                      <span className="mt-1 text-[10px] uppercase tracking-[0.2em] text-amber-800">{item.kind ? item.kind.replace(/^[^\p{L}]+/u, "") : "PLAN"}</span>
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2">
                                        <p className="text-base font-black text-slate-900">{item.title}</p>
                                      </div>
                                      <p className="mt-2 text-lg font-black tracking-[0.04em] text-slate-900">{item.time}</p>
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
              onClick={() => openNearbySearch(category)}
              className="flex flex-1 flex-col items-center rounded-2xl bg-slate-100 px-2 py-3 text-xs font-black text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-100 hover:text-emerald-800 sm:px-3 sm:py-3 sm:text-sm"
            >
              <span className="text-base">{category === "レストラン" ? "🍽️" : category === "コンビニ" ? "🏪" : "☕"}</span>
              <span>{category}</span>
            </button>
          ))}
        </div>
      </nav>
    </main>
  );
}
