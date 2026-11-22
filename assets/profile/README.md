# Default participant avatars

64 AI-generated portraits of fictional adult Taiwanese / East Asian women, created for this game. These are synthetic portraits, not photographs of real people.

- `avatar-01.webp`–`avatar-16.webp`: styling for adults aged 20–24.
- `avatar-17.webp`–`avatar-32.webp`: styling for adults aged 25–29.
- `avatar-33.webp`–`avatar-48.webp`: styling for adults aged 30–35.
- `avatar-49.webp`–`avatar-64.webp`: styling for adults aged 36–40.

Each is a 320 × 320 WebP image. Age ranges describe generation prompts, not verified ages of real people. Source artwork was generated as four 4 × 4 portrait sheets, then extracted into individual assets.

New participants are drawn without replacement using weights: each of the 64 numbered portraits has weight 1, and each of the four international characters has weight 1/4. Initial total weight is 65. Each draw removes the selected character and recalculates the remaining weights. A batch can include multiple distinct international characters (up to all four; up to 64 participants per batch). Existing/imported participants retain their saved avatar. Players can replace any assigned portrait using the existing upload and crop controls.

Keep the numbered filenames stable: saved games may refer to these relative paths.

## Regenerated identities

- `avatar-35.webp`: refined feminine face, long black layered hair with wine-red highlights, glamorous rock-chic style.
- `avatar-38.webp`: delicate face, chestnut wispy bangs and low side ponytail, pearl earrings, fresh elegant style.

These two portraits were regenerated individually, replacing the original sheet-derived versions to distinguish them from avatar-33 and each other. Matching full-body images are in `../fullbody/`.

## Clothing and framing alignment

- 19, 27, 30, 56 and 57: visible headshot clothing updated to match their current full-body outfits.
- 17 and 33: reframed closer to align face scale with the other avatars.
- Full-body assets remain unchanged by this update.

## 新增國際角色

四位皆為 AI 生成的虛構成年女性，圖片生成時設定為 25 歲；遊戲新生成時年齡為 22～30 歲等機率隨機分配（含兩端）。先生成頭像，再參考頭像生成全身照，保留人物特徵與服裝。頭像為 320 × 320 WebP，四位全身照均為 512 × 1024 WebP。

| 人物 | 國籍／族裔設定 | 綁定姓氏 |
|---|---|---|
| avatar-jp | 日本人 | 佐藤 |
| avatar-kr | 韓國人 | 金 |
| avatar-vn | 越南人 | 阮 |
| avatar-us | 美國白人 | 史密斯 |

共 68 位角色，採加權不重複抽選：每位台灣人物權重為 1，4 位外國人物各為 1/4，初始總權重為 65。第一抽的外國人物合計機率為 1/65，指定外國人物為 1/260；每抽移除已選人物，後續依剩餘權重重新計算。同批可抽到多位不同外國人物，最多 4 位。新建參賽者與新回合的新人物會依頭像帶入上述姓氏，年齡則從 22～30 歲等機率隨機分配，姓名沿用「姓氏＋小姐」格式。既有／匯入人物保留已存姓名及年齡，仍可手動編輯。

## 04／42／18／25 臉部微調

- 04、42：自然臉頰酒窩。
- 18：嘴角旁小梨窩。
- 25：上唇中央微翹、略向前突出，嘴唇微啟，隱約露出兩顆上門牙。

先更新頭像，再以新版頭像對應全身照；服裝、鞋款與衣物分類維持原設定，18 保留黑絲襪。

### 原版身形對照修正

04、42、18、25 的全身照各自以臉部微調前原圖為基準修正，保留原本身形、腿部比例及服裝鞋款。25 頭像與全身照同步為自然微翹上唇與隱約兔牙感；04／42 酒窩、18 梨窩保留。

## 32 外型更新

`avatar-32` 頭像與全身照同步調整，以三立主播陳宥蓉的外型氣質為參考，採柔和五官與深色直短學生頭、自然薄瀏海。服裝仍為黑西裝外套、白色上衣、牛仔長褲及黑色高跟鞋；衣物分類不變。

32 頭像與全身照髮型同步改為下巴附近的直短學生頭及薄瀏海，五官、服裝與身形沿用目前設定。

## 07／31／45／47／59 髮色更新

五位角色的頭像與全身照同步改為淡栗棕、略帶自然金色光澤，沿用原有髮型、人物設定及服裝。檔名與圖片尺寸保持不變。

## 02 外型更新

`avatar-02.webp` 與全身照同步更新為虛構成年台灣與白人混血女性設定，較立體五官、偏白膚色及東亞面容，保留深色短髮，穿著米白一字領上衣。頭像由新版全身照裁切，尺寸維持 320 × 320。
