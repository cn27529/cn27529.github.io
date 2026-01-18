// Taiji Store
const TaijiStore = (function () {
  const tiangans = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
  const dizhis = [
    "子",
    "丑",
    "寅",
    "卯",
    "辰",
    "巳",
    "午",
    "未",
    "申",
    "酉",
    "戌",
    "亥",
  ];
  const zodiacs = [
    "鼠",
    "牛",
    "虎",
    "兔",
    "龍",
    "蛇",
    "馬",
    "羊",
    "猴",
    "雞",
    "狗",
    "豬",
  ];

  function get60Jiazi() {
    const jiazi60 = [];
    for (let i = 0; i < 60; i++) {
      const tianganIndex = i % 10;
      const dizhiIndex = i % 12;
      jiazi60.push(tiangans[tianganIndex] + dizhis[dizhiIndex]);
    }
    return jiazi60;
  }

  return {
    tiangans,
    dizhis,
    zodiacs,
    get60Jiazi,
  };
})();

// Clock Controller
const ClockController = (function () {
  const clockSize = 600;
  const outerRadius = 170;
  const middleRadius = 120;
  const middleRadius24 = 120;
  const keRadius96 = 120;
  const taijiRadius = 50;

  let currentTime = new Date();
  let currentHour = 0;
  let currentMinute = 0;
  let currentSecond = 0;
  let timer = null;

  const dizhis = TaijiStore.dizhis;
  const jiazi60 = TaijiStore.get60Jiazi();

  // 調整地支順序，讓"午"在12點鐘方向，"子"在6點鐘方向
  function getAdjustedDizhis() {
    const rotateBy = 6;
    const rotated = [...dizhis];
    for (let i = 0; i < rotateBy; i++) {
      rotated.push(rotated.shift());
    }
    return rotated;
  }

  const adjustedDizhis = getAdjustedDizhis();

  function getTickPath(radius, index, total, length) {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    const x1 = 200 + radius * Math.cos(angle);
    const y1 = 200 + radius * Math.sin(angle);
    const x2 = 200 + (radius - length) * Math.cos(angle);
    const y2 = 200 + (radius - length) * Math.sin(angle);
    return `M ${x1} ${y1} L ${x2} ${y2}`;
  }

  function getTextPosition(radius, index, total) {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    return {
      x: 200 + radius * Math.cos(angle),
      y: 200 + radius * Math.sin(angle),
    };
  }

  function isCurrentSecond(index) {
    return index === currentSecond;
  }

  function isCurrentMinute(index) {
    return index === currentMinute;
  }

  function isCurrentHour(index) {
    const hourIndex = Math.floor(((currentHour + 1) % 24) / 2);
    const currentDizhi = dizhis[hourIndex];
    const adjustedIndex = adjustedDizhis.indexOf(currentDizhi);
    return index === adjustedIndex;
  }

  function isCurrentHour24(index) {
    return index === currentHour;
  }

  function isCurrentKe96(index) {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const totalMinutes = currentHour * 60 + currentMinute;
    const currentKe = Math.floor(totalMinutes / 15);
    return index === currentKe;
  }

  function renderJiazi60() {
    const group = document.getElementById("jiazi60Group");
    group.innerHTML = "";

    for (let i = 0; i < 60; i++) {
      const tickClasses = ["tick", "tick-60"];
      if (isCurrentSecond(i)) tickClasses.push("tick-second-highlight");
      if (isCurrentMinute(i)) tickClasses.push("tick-minute-highlight");

      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
      );
      path.setAttribute("d", getTickPath(outerRadius, i, 60, 10));
      path.setAttribute("class", tickClasses.join(" "));
      group.appendChild(path);

      const textClasses = ["tick-text", "tick-text-60"];
      if (isCurrentSecond(i)) textClasses.push("text-second-highlight");
      if (isCurrentMinute(i)) textClasses.push("text-minute-highlight");

      const pos = getTextPosition(outerRadius - 24, i, 60);
      const text = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text",
      );
      text.setAttribute("x", pos.x);
      text.setAttribute("y", pos.y);
      text.setAttribute("class", textClasses.join(" "));
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("dominant-baseline", "middle");
      text.textContent = jiazi60[i];
      group.appendChild(text);
    }
  }

  function renderDizhi() {
    const group = document.getElementById("dizhiGroup");
    group.innerHTML = "";

    for (let i = 0; i < 12; i++) {
      const tickClasses = ["tick", "tick-12"];
      if (isCurrentHour(i)) tickClasses.push("tick-hour");

      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
      );
      path.setAttribute("d", getTickPath(middleRadius, i, 12, 10));
      path.setAttribute("class", tickClasses.join(" "));
      group.appendChild(path);

      const textClasses = ["tick-text", "tick-text-12"];
      if (isCurrentHour(i)) textClasses.push("text-hour-highlight");

      const pos = getTextPosition(middleRadius - 24, i, 12);
      const text = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text",
      );
      text.setAttribute("x", pos.x);
      text.setAttribute("y", pos.y);
      text.setAttribute("class", textClasses.join(" "));
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("dominant-baseline", "middle");
      text.textContent = adjustedDizhis[i];
      group.appendChild(text);
    }
  }

  function renderHour24() {
    const group = document.getElementById("hour24Group");
    group.innerHTML = "";

    for (let i = 0; i < 24; i++) {
      const tickClasses = ["tick", "tick-text-24"];
      if (isCurrentHour24(i)) tickClasses.push("tick-hour-highlight");

      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
      );
      path.setAttribute("d", getTickPath(middleRadius24, i, 24, 10));
      path.setAttribute("class", tickClasses.join(" "));
      group.appendChild(path);

      if (i % 2 === 1) {
        const textClasses = ["tick-text", "tick-text-24"];
        if (isCurrentHour24(i)) textClasses.push("text-hour24-highlight");

        const pos = getTextPosition(middleRadius24 - 15, i, 24);
        const text = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text",
        );
        text.setAttribute("x", pos.x);
        text.setAttribute("y", pos.y);
        text.setAttribute("class", textClasses.join(" "));
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("dominant-baseline", "middle");
        text.textContent = "\u00A0";
        group.appendChild(text);
      }
    }
  }

  function renderKe96() {
    const group = document.getElementById("ke96Group");
    group.innerHTML = "";

    for (let i = 0; i < 96; i++) {
      const tickClasses = ["tick", "tick-ke"];
      if (isCurrentKe96(i)) tickClasses.push("tick-ke-highlight");

      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
      );
      path.setAttribute("d", getTickPath(keRadius96, i, 96, 5));
      path.setAttribute("class", tickClasses.join(" "));
      group.appendChild(path);
    }
  }

  function updateTimeDisplay() {
    const timeStr = currentTime.toLocaleString("zh-TW", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    const hourIndex = Math.floor(((currentHour + 1) % 24) / 2);
    const dizhiHour = dizhis[hourIndex];
    const startHour = (hourIndex * 2 - 1 + 24) % 24;
    const endHour = (startHour + 2) % 24;

    document.getElementById("currentTime").textContent = `目前時間 ${timeStr}`;
    document.getElementById("ganzhiTime").textContent =
      `${dizhiHour}時時辰 ${startHour}點-${endHour}點`;
  }

  function updateTime() {
    currentTime = new Date();
    currentHour = currentTime.getHours();
    currentMinute = currentTime.getMinutes();
    currentSecond = currentTime.getSeconds();

    renderJiazi60();
    renderDizhi();
    renderHour24();
    renderKe96();
    updateTimeDisplay();

    console.log("當前時間:", currentHour + ":" + currentMinute);
    console.log("當前時辰:", dizhis[Math.floor(((currentHour + 1) % 24) / 2)]);
  }

  function start() {
    updateTime();
    timer = setInterval(updateTime, 1000);
  }

  function stop() {
    if (timer) {
      clearInterval(timer);
    }
  }

  return {
    start,
    stop,
  };
})();

// 初始化
document.addEventListener("DOMContentLoaded", function () {
  ClockController.start();
});

// 清理
window.addEventListener("beforeunload", function () {
  ClockController.stop();
});
