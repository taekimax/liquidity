import { readFile } from "node:fs/promises";
import test from "node:test";
import assert from "node:assert/strict";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const css = await readFile(new URL("../styles.css", import.meta.url), "utf8");
const js = await readFile(new URL("../script.js", import.meta.url), "utf8");

test("uses the approved document-based hero message", () => {
  assert.match(html, /가변적 유동장으로 보는 주가 변동 예측/);
  assert.match(html, /예측은 특정 시점의 목표가를 맞히는 일이 아니다/);
  assert.match(html, /현재 가격 균형이 어느 방향으로 움직일 가능성이 커졌는지/);
  assert.match(html, /수급은 매수·매도 신호가 아니라 실행 가능한 가격 변동 가설/);
});

test("explains the core liquidity-field concepts from the source document", () => {
  for (const phrase of ["동질적 수급 주체", "수급 Delta", "투과도", "점성", "전이"]) {
    assert.match(html, new RegExp(phrase));
  }
});

test("includes an interactive liquidity-field animation with the required stages", () => {
  for (const stage of ["통상적 유동장", "수급 Delta", "민감도 상승", "전이 후 구조"]) {
    assert.match(html, new RegExp(stage));
  }

  assert.match(html, /class="field-animation"/);
  assert.match(html, /data-field-stage/);
  assert.match(css, /\.field-animation/);
  assert.match(css, /@keyframes flowPulse/);
  assert.match(js, /fieldStages/);
});

test("keeps the practical four-step application sequence", () => {
  for (const phrase of [
    "평상시 유동장을 정의한다",
    "수급 Delta를 찾는다",
    "변화의 성격을 해석한다",
    "가격 변동 가설로 정리한다",
  ]) {
    assert.match(html, new RegExp(phrase));
  }
});
