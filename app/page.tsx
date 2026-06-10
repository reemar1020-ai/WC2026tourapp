"use client";

import { useState } from "react";

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
  summary: string;
  items: ScheduleItem[];
};

const schedule: TravelDay[] = [
  {
    date: "6/24",
    label: "移動日",
    summary: "日本からダラスへ。初日は移動とホテル移動中心です。",
    items: [
      {
        time: "18:40",
        title: "日本→ダラス",
        kind: "飛行機",
        location: "NRT → DFW",
        memo: "出発は18:40、到着は23:59。",
        url: "https://www.skyscanner.jp/transport/flights/dfw/bos/260626/260627/config/10968-2606260705--32385-0-10081-2606261157%7C10081-2606271840--32385-0-10968-2606272157?adultsv2=3&cabinclass=economy&childrenv2=&ref=home&rtn=1&",
      },
      {
        time: "24:00〜",
        title: "ホテル",
        memo: "場所未定。翌朝の移動に備えて休息をとります。",
      },
    ],
  },
  {
    date: "6/25",
    label: "ダラス",
    summary: "自由時間のあと、夕方に試合観戦です。",
    items: [
      {
        time: "〜18:00",
        title: "自由時間",
        memo: "観光や食事、準備をゆったりと。",
      },
      {
        time: "18:00〜",
        title: "試合 日本 vs スウェーデン",
        location: "AT&Tスタジアム",
        venue: "会場: AT&Tスタジアム",
        url: "https://www.fifa.com/ja/match-centre/match/17/285023/289273/400021471",
        mapUrl: "https://maps.app.goo.gl/GWrpF7GaZuK4A11z6",
      },
    ],
  },
  {
    date: "6/26",
    label: "ボストン",
    summary: "ダラスからボストンへ移動し、試合観戦がメインです。",
    items: [
      {
        time: "07:05",
        title: "飛行機 ダラス→ボストン",
        kind: "飛行機",
        location: "DFW → BOS",
        memo: "朝のフライトでボストンへ移動します。",
      },
      {
        time: "12:00〜",
        title: "ランチ",
        memo: "観光と移動の合間に軽めに。",
      },
      {
        time: "13:00〜14:00",
        title: "移動：車",
        memo: "会場周辺へ移動します。",
      },
      {
        time: "15:00〜",
        title: "試合 フランス vs ノルウェー",
        location: "ジレットスタジアム",
        venue: "会場: ジレットスタジアム",
        url: "https://www.fifa.com/ja/match-centre/match/17/285023/289273/400021489",
        mapUrl: "https://maps.app.goo.gl/CMtnP3nN18XTN1tm8",
      },
      {
        time: "18:00〜",
        title: "自由時間",
        memo: "ホテルは未定のため、現地での移動は柔軟に。",
      },
    ],
  },
  {
    date: "6/27",
    label: "ボストン",
    summary: "朝までゆっくり過ごし、夜にダラスへ戻ります。",
    items: [
      {
        time: "〜17:00",
        title: "自由時間",
        memo: "街歩きや休憩を楽しみます。",
      },
      {
        time: "18:40",
        title: "飛行機 ボストン→ダラス",
        kind: "飛行機",
        location: "BOS → DFW",
        memo: "夜のフライトでダラスへ戻ります。",
        url: "https://www.skyscanner.jp/transport/flights/dfw/bos/260626/260627/config/10968-2606260705--32385-0-10081-2606261157%7C10081-2606271840--32385-0-10968-2606272157?adultsv2=3&cabinclass=economy&childrenv2=&ref=home&rtn=1&",
      },
      {
        time: "22:00〜",
        title: "ホテル",
        memo: "未定。翌日以降の移動準備をします。",
      },
    ],
  },
  {
    date: "6/28",
    label: "ダラス or ヒューストン",
    summary: "移動先を柔軟に調整しながら、自由時間を確保します。",
    items: [
      {
        time: "終日",
        title: "自由時間",
        memo: "ホテルは未定。現地での流れに合わせて過ごします。",
      },
    ],
  },
  {
    date: "6/29",
    label: "ヒューストン",
    summary: "空港から会場へ移動し、決勝トーナメントの重要な試合です。",
    items: [
      {
        time: "08:00〜12:00",
        title: "移動 DFW空港→試合会場",
        memo: "空港から会場までの移動日程です。",
      },
      {
        time: "12:00〜",
        title: "試合 F2位 vs C1位",
        location: "NRGスタジアム",
        venue: "会場: NRGスタジアム",
        url: "https://www.fifa.com/ja/match-centre/match/17/285023/289287/400021516",
        mapUrl: "https://maps.app.goo.gl/312VEhN9cPtHE8Xa7",
      },
    ],
  },
  {
    date: "6/30",
    label: "亮輔帰国",
    summary: "帰国準備を整えて、夜に日本へ向かいます。",
    items: [
      {
        time: "〜19:00",
        title: "自由時間",
        memo: "荷物整理や最後の買い物をします。",
      },
      {
        time: "20:12",
        title: "飛行機 ヒューストン→羽田空港",
        kind: "飛行機",
        location: "IAH → HND",
        memo: "20:12出発、7/1 04:45到着です。",
        url: "https://jp.trip.com/online/orderdetail/index?orderid=1385432769124440&from=email&template=TRIP_BOOKING_CONFIRMED&locale=ja-JP&channel=email&subChannel=TRIP_BOOKING_CONFIRMED&oid=1385432769124440&orderId=1385432769124440&redirectFromOnline=1&accesstoken=",
      },
    ],
  },
  {
    date: "7/1",
    label: "予備日",
    summary: "移動や天候の影響に備える予備日です。",
    items: [
      {
        time: "終日",
        title: "予備日",
        memo: "予定の調整や休息に使います。",
      },
    ],
  },
];

const nearbyCategories = ["レストラン", "コンビニ", "カフェ"] as const;

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

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
        <section className="px-4 sm:px-6">
          <div className="rounded-[30px] border border-white/80 bg-white/90 p-4 shadow-[0_24px_50px_rgba(15,23,42,0.12)] backdrop-blur-xl md:p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-sky-700">Schedule</p>
                <h2 className="text-lg font-bold text-slate-900">タイムスケジュール表</h2>
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
                          <p className="mt-1 text-base font-semibold text-slate-700">{day.label}{isMatchDay ? " ★" : ""}</p>
                        </div>
                        <span className="rounded-full bg-slate-900 px-3 py-1 text-[11px] font-semibold text-white shadow-sm">{day.items.length} 件</span>
                      </div>
                    </button>

                    {selected && (
                      <article className="rounded-[28px] border border-slate-200 bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] p-4 shadow-inner sm:p-5">
                        <div className="space-y-3">
                          {day.items.map((item, index) => {
                            const key = `${day.date}-${index}`;
                            const isOpen = Boolean(openItems[key]);

                            return (
                              <article
                                key={key}
                                className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm ring-1 ring-slate-100 transition hover:border-sky-200 hover:shadow-md"
                              >
                                <button
                                  type="button"
                                  onClick={() => toggleItem(key)}
                                  className="w-full text-left"
                                  aria-expanded={isOpen}
                                >
                                  <div className="flex items-start gap-3">
                                    <div className="min-w-[72px] rounded-2xl bg-[linear-gradient(135deg,#fef3c7_0%,#fde68a_100%)] px-3 py-2 text-center text-sm font-black text-amber-900 shadow-sm">{item.time}</div>
                                    <div className="flex-1">
                                      <p className="text-base font-black text-slate-900">{item.title}</p>
                                      {item.kind && <p className="text-xs text-emerald-700">{item.kind}</p>}
                                      {item.venue ? (
                                        <p className="mt-1 text-sm text-slate-600">{item.venue}</p>
                                      ) : item.location ? (
                                        <p className="mt-1 text-sm text-slate-600">場所: {item.location}</p>
                                      ) : null}
                                    </div>
                                    <span className="text-xs font-semibold text-sky-700">{isOpen ? "閉じる" : "詳細"}</span>
                                  </div>
                                </button>

                                {isOpen && (
                                  <div className="mt-4 rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
                                    {item.memo && <p className="leading-6">{item.memo}</p>}
                                    {item.url && (
                                      <div className="mt-3 flex flex-wrap gap-2">
                                        <a
                                          href={item.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-700"
                                        >
                                          詳細ページを開く
                                        </a>
                                      </div>
                                    )}
                                    {item.mapUrl && (
                                      <div className="mt-2 flex flex-wrap gap-2">
                                        <a
                                          href={item.mapUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500"
                                        >
                                          地図を開く
                                        </a>
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
