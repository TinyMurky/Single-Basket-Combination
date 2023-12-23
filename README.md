# 單籃組合

## 簡述
這是解決單籃組合的function，給定不重複正整數 m 種類型 m1 m2 m3 ...，每種類型對應正整數數量為 n1 n2 n3 ...，需要取出正整數 p 個任意類型，要列出所有取法

## 舉例
- Apple 有三個、Banana 有兩個、Citron 有四個，要取出三個，則取法有 Apple x 3、Apple x 2 + Banana x 1、Apple x 2 + Citron x 1、Apple x 1 + Banana x 2、Apple x 1 + Banana x 1 + Citron x 1、等等。
- 以上述例子 p 為 3，m1 為 Apple，n1 為 3，m2 為 Banana，n2 為 2，m3 為 Citron，n3 為 4。
- 另外，取法是無順序的，舉例：Apple x 2 + Banana x 1 和 Banana x 1 + Apple x 2 算是同一種取法

## 程式碼
請參考檔案 `index.ts`的`function combination`

## 如何執行程式碼
可以直接用 `bun`執行`index.ts`
```bash
bun run index.ts
```

## Function解說

### 功能
`function combination` 用於生成所有可能的物品組合，其中每種物品的數量不超過其最大可用數量。該函數適用於生成在給定物品限制和總數量限制下的所有組合。

### argument
- items: 一個包含item type及其最大數量 `amount` 的array。每個物品由 `type`（類型）和 `amount`（最大數量）構成。
- pick: 需要選擇的物品總數。

### return
返回一個array，包含所有可能的組合。每個組合是一個包含一定數量item的array。

### function流程

- 使用`backtracking` 來生成組合。
- backtracking 函數逐一檢查每種item，並嘗試不同的數量，從0到該物品的最大數量。

#### backtracking

backtracking 函數透過recursive的方式探索所有可能的組合。

##### Arguments
  - `curCombination`: 現階段正在組的組合。
  - `nextItemIdx`: 本次要加入組合的 item id。
  - `remain`: 本次backtracking，還剩下多少次抽取可以使用。

##### 流程

- return條件：
  - 如果 `remain` 等於 0，表示已經選擇足夠的 `item` ，當前組合被添加到結果中。
  - 如果 `remain` 小於 0 或 `nextItemIdx` 超出 `items` 範圍，代表超出範圍立刻中止。

- recursive
  - 對於`nextItemIdx`指向的`item`，從 0 個到`item`最大數量`amount`逐一加入backtracking（用`count`紀錄）。
  - 如果選擇 0 個當前物品，我們跳過直接進入下一個`nextItemIdx`（`nextItemIdx` + 1），不讓它顯示在答案中。
  - 如果選擇超過0個，將該`item`及數量添加到當前組合中，`nextItemIdx + 1`進入下一層 backtracking。
  - 進入下一層backtracking前，要把這次backtracking出來的item放到`curCombination`，進入到下層之後，因為有`count`個數量已經被這一輪的item用掉，所以要將remain減掉count之後給下一輪item使用