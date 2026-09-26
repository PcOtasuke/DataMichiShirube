"use strict";
// 事前作成したサンプルだけを切り替えます。ファイル選択・送信・計測は行いません。
const formatSelect = document.querySelector("#sample-format");
if (formatSelect) {
  const sizes = { png: 27898, jpg: 53392, webp: 16094 };
  formatSelect.addEventListener("change", () => {
    const format = formatSelect.value;
    if (!Object.hasOwn(sizes, format)) return;
    const image = document.querySelector("#format-image");
    image.src = `../samples/sample.${format}`;
    image.alt = `自作の形式比較サンプル（${format.toUpperCase()}）`;
    document.querySelector("#format-result").textContent = `${format.toUpperCase()}：${sizes[format].toLocaleString("ja-JP")}バイト / ${(sizes[format] / 1024).toFixed(1)} KiB / 1200 × 800 px`;
    document.querySelector("#format-download").href = image.src;
  });
}

// 画像の縦横比と画素数の計算。容量は画像の内容にも左右されるため予測しません。
const resizeForm = document.querySelector("#resize-form");
if (resizeForm) {
  resizeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const width = Number(document.querySelector("#original-width").value);
    const height = Number(document.querySelector("#original-height").value);
    const target = Number(document.querySelector("#target-width").value);
    const output = document.querySelector("#resize-result");
    if (![width, height, target].every(n => Number.isInteger(n) && n > 0 && n <= 100000)) {
      output.textContent = "1〜100,000の整数を入力してください。";
      return;
    }
    const resultHeight = Math.max(1, Math.round(height * target / width));
    const ratio = target * resultHeight / (width * height) * 100;
    output.textContent = `${target.toLocaleString("ja-JP")} × ${resultHeight.toLocaleString("ja-JP")} px。画素数は元の約${ratio.toFixed(1)}％です。ファイル容量が同じ割合になるわけではありません。${target > width ? "拡大しても失われた細部は戻りません。" : ""}`;
  });
}
