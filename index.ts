import { strict as assert } from 'assert';

/** 要組合的對象 */
export interface Item {
  /** 種類，不得重複 */
  type: string;
  /** 數量，需為正整數 */
  amount: number;
}

/**
 * 列出所有組合
 * @param items 要撿的東西
 * @param pick 要挑幾個
 */
function combination<T extends Item = Item>(items: Array<T>, pick: number): Array<Array<T>> {
  const res: Array<Array<T>> = []

  function backtracking(curCombination: Array<T>, nextItemIdx: number, remain: number): void {

    // 剩下0個item可以用就放入答案
    if (remain === 0) {
      // shallow copy後在push進去res
      res.push([...curCombination])
      return
    }

    // 保險用，如果剩餘的數量變成負的，或是nextItexIdx out of bound，直接return
    if (remain < 0 || nextItemIdx >= items.length) {
      return
    }


    // 把現在輪到 type的資訊取出
    const { type: curType, amount: maxAmount } = items[nextItemIdx]

    // 從1個到 maxAmount個的 curType加入現在的combination，並把remain去除使用在curType上的數字後交給下個type
    for (let count = 0; count <= maxAmount; count++) {

      // 如果只有0個item，我們雖然還要跑別的item的backtracking，但我們不把count = 0的item顯示在array上面
      if (count === 0) {
        backtracking(curCombination, nextItemIdx + 1, remain - count)
      } else {
        curCombination.push({ type: curType, amount: count } as T)
        backtracking(curCombination, nextItemIdx + 1, remain - count)
        curCombination.pop()
      }
    }
  }

  backtracking([], 0, pick)
  return res
}


let result = combination([
  { type: 'Apple', amount: 2 },
  { type: 'Banana', amount: 3 },
  { type: 'Cat', amount: 2 },
  { type: 'Dog', amount: 4 },
  { type: 'Egg', amount: 1 },
], 12);
assert(result.length === 1);

result = combination([
  { type: 'Apple', amount: 2 },
  { type: 'Banana', amount: 3 },
  { type: 'Cat', amount: 2 },
  { type: 'Dog', amount: 4 },
  { type: 'Egg', amount: 1 },
], 7);
result.forEach(ans => {
  const sum = ans.reduce((prev, curr) => {
    return prev + curr.amount;
  }, 0);
  assert(sum === 7);
});

result = combination([
  { type: 'Apple', amount: 2 },
  { type: 'Banana', amount: 3 },
  { type: 'Cat', amount: 2 },
  { type: 'Dog', amount: 4 },
  { type: 'Egg', amount: 1 },
], 13);
assert(result.length === 0);

result = combination([
  { type: 'Apple', amount: 1 },
  { type: 'Banana', amount: 2 },
  { type: 'Cat', amount: 3 },
], 2);
/** A1B1 A1C1 B1C1 B2 C2 */
assert(result.length === 5);