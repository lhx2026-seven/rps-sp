# Default participant avatars

64 AI-generated portraits of fictional adult Taiwanese / East Asian women, created for this game. These are synthetic portraits, not photographs of real people.

- `avatar-01.webp`–`avatar-16.webp`: styling for adults aged 20–24.
- `avatar-17.webp`–`avatar-32.webp`: styling for adults aged 25–29.
- `avatar-33.webp`–`avatar-48.webp`: styling for adults aged 30–35.
- `avatar-49.webp`–`avatar-64.webp`: styling for adults aged 36–40.

Each is a 320 × 320 WebP image. Age ranges describe generation prompts, not verified ages of real people. Source artwork was generated as four 4 × 4 portrait sheets, then extracted into individual assets.

New participants are drawn without replacement using weights: each of the 64 numbered portraits has weight 1, and each of the four international characters has weight 1/4. Initial total weight is 65. Each draw removes the selected character and recalculates the remaining weights. A batch can include multiple distinct international characters (up to all four; up to 64 participants per batch). Existing/imported participants retain their saved avatar. Players can replace any assigned portrait using the existing upload and crop controls.

Keep the numbered filenames stable: saved games may refer to these relative paths.

## 新增國際角色

四位皆為 AI 生成的虛構成年女性，圖片生成時設定為 25 歲；遊戲新生成時年齡為 22～30 歲等機率隨機分配（含兩端）。先生成頭像，再參考頭像生成全身照，保留人物特徵與服裝。頭像為 320 × 320 WebP，四位全身照均為 512 × 1024 WebP。

| 人物 | 國籍／族裔設定 | 綁定姓氏 |
|---|---|---|
| avatar-jp | 日本人 | 佐藤 |
| avatar-kr | 韓國人 | 金 |
| avatar-vn | 越南人 | 阮 |
| avatar-us | 美國白人 | 史密斯 |

共 68 位角色，採加權不重複抽選：每位台灣人物權重為 1，4 位外國人物各為 1/4，初始總權重為 65。第一抽的外國人物合計機率為 1/65，指定外國人物為 1/260；每抽移除已選人物，後續依剩餘權重重新計算。同批可抽到多位不同外國人物，最多 4 位。新建參賽者與新回合的新人物會依頭像帶入上述姓氏，年齡則從 22～30 歲等機率隨機分配，姓名沿用「姓氏＋小姐」格式。既有／匯入人物保留已存姓名及年齡，仍可手動編輯
