# KeyDog 信息采集与政策核查

采集日期：2026-11-10（Asia/Shanghai）。本次只读应用仓库，没有修改或构建应用。

| 基线 | 值 |
| --- | --- |
| 工作区 | `D:\KeyDog` |
| 分支／提交 | `develop` / `35a010d9db7820edc02ce3109cf223cbf6ac77ea` |
| 工作区状态 | 采集时无未提交改动 |
| 应用 | KeyDog／密钥狗，`app.keydog`，1.2.2（23） |
| 系统 | minSdk 28，compile/targetSdk 36 |
| 政策 | [隐私政策](../../keydog-index.html)（中英，2026-11-10）／[专属条款](../../terms.html#keydog)（公共条款含中英文） |

## 功能和数据流

本地文件／目录加解密；系统 SAF 选择器授予文件和目录访问，不申请所有文件访问、录音、相机、联系人或运行时位置权限。源 Manifest 只直接声明互联网、网络状态权限；Google SDK 会合并额外支付及广告相关权限。云文档提供方可以在自己的权限和同步规则下联网。

容器后缀 `.kdog`，Dog 密钥分片后缀 `.dog`，默认在应用私有密钥库中保存。文件名可能揭示原名。应用支持密码、公开预设混合口令和门限密钥分片；没有开发者密码找回或文件上传后端。算法和格式来源见应用的 `FORMAT.md`、`THIRD_PARTY.md`，不把算法名称当作独立安全审计证明。

| 信息 | 处理／保留／删除 | 主要源码依据（相对应用仓库） |
| --- | --- | --- |
| 文件内容、结构、大小及哈希 | 本机加解密、完整性检查；容器和恢复输出写入所选位置 | `app/src/main/java/com/keydog/Documents.java`、`README.md`、`FORMAT.md` |
| Dog | 私有密钥库；可免费导出、直接／批量只读分享和删除；卸载或清数据丢失未导出的分片 | `KeyRing.java`、`KeyProvider.java`、`MainActivity.java`（Java 路径同上） |
| 密码及混合完整口令 | 普通密码不落偏好；混合完整口令通过 Android Keystore 加密后保存至待确认操作记录；可由用户复制到剪贴板，API 33+ 标记敏感 | `PendingSecret.java`、`PendingOperation.java`、`MainActivity.java` |
| 待确认记录 | `pending-encryption.json` 包含 URI、路径、大小、哈希、输出及密钥引用；支持验证后删除源文件、撤销和未完成确认 | `PendingOperation.java` |
| 暂存与清理 | 私有缓存可能有明文；完成与启动清理；恢复成功后尝试清理输入容器及对应分片，权限失败需查看警告 | `MainActivity.java`、`README.md` |
| 偏好／额度 | 语言、保护提示、每日成功次数、每周广告余额、购买状态和订阅缓存时钟等仅在本机保存 | `LanguageSettings.java`、`ProAccess.java`、`MainActivity.java` |

`allowBackup=false`；主界面设置 FLAG_SECURE。后者不代表其他应用中的已分享副本或系统剪贴板受到同等保护。普通删除不保证闪存或备份安全擦除。

## 广告和购买

- Gradle 固定 GMA 25.5.0、UMP 4.0.0、Play Billing 9.1.0；Bouncy Castle 1.86 为本地密码库。依据：`app/build.gradle`、`THIRD_PARTY.md`。
- 每日成功加密、恢复各 3 次，先扣免费额度；失败不扣。激励广告回调按进入方向奖励一次加密或恢复，每周一按设备本地日期清零，不能兑换 Pro 时间或去广告。分享和导出不扣任务次数。依据：`ProAccess.java`、`AdsManager.java`、`release/MONETIZATION.md`。
- Pro 为不限次数和免原生广告；月订阅与永久买断分别为 `keydog_pro_monthly`、`keydog_pro_lifetime`。资料基准价 US$1.99/月、US$9.99/次，实际以 Play 页面为准。
- 订阅缓存最长 24 小时；永久购买状态不使用同样的本地到期计时。购买来源为 Billing 查询和回调，当前未见自建服务端验证；**不要套用 PureRec 的 RSA 客户端验证流程或 ZipFox 的“两类购买均缓存 24 小时”描述**。依据：`PlayBilling.java`、`ProAccess.java`。
- 隐私政策、服务条款、管理订阅入口已在 `Monetization.java` 中指向现有公共页面；UMP 相关选项由 `AdsManager.java` 管理。

## 本次对照结果

当前政策继续覆盖 1.2.2 的额度、每周奖励清零、免费分享、混合口令保存和密钥丢失风险。本轮按用户要求补充完整中文区段，明确订阅／永久缓存差异、购买后端边界及用户选择和跨境处理，并同步中英文专属条款；政策日期为 2026-11-10。

未独立验证商店是否已上架、真实支付／退款、后台商品价格、UMP 地区消息、目标市场和用户年龄；“production release”仅指项目发布基线。应用 README 仍有“目前尚未正式发布”等时间性措辞，发布状态应以后台为准。发布文档含历史奖励规则，采集以当前源码和顶部 1.2.2／1.2.0 说明为准。

运营者 KongQBin／once512 和邮箱 `kong5664246@gmail.com` 沿用现有政策；法定名称、地址、市场和法定保存义务仍需与实际运营核对。

## 复核依据

2026-11-10 查阅：[Google 广告 SDK 数据披露](https://developers.google.com/admob/android/privacy/play-data-disclosure)、[Google Play 用户数据政策](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en)、[订阅取消规则](https://support.google.com/googleplay/answer/7018481?hl=en)。第三方披露不等于应用商店 Data safety 答案已通过核验。
