# PureRec 信息采集与政策核查

采集日期：2026-11-10（Asia/Shanghai）。本次只读应用仓库，没有读取 `.env`、签名密码、私钥或更改应用。

| 基线 | 值 |
| --- | --- |
| 工作区 | `D:\PureRec` |
| 分支／提交 | `main` / `0cc25cce0eeb2c414b66b4c2454ec05b1882cd42` |
| 工作区状态 | 采集时无未提交改动 |
| 应用 | PureRec，`app.purerec`，0.1.44（58） |
| 系统 | minSdk 26，compile/targetSdk 36 |
| 政策 | [中英隐私政策](../../purerec-index.html)／[专属条款](../../terms.html#purerec) |

## 功能与数据流

本地 WAV、M4A、MP3 录音，后台录制、暂停继续、播放、波形、重命名、删除、导出；Pro 包含归档、多选批量、裁切、增益保存、外部目录及实验性 Auto Shield。归档是列表分类，不自动压缩、删除或上传原音频。无 PureRec 账号和录音上传后端，未发现独立 Firebase／远程分析 SDK。依据：`README.md`、`app/build.gradle.kts` 及下表类文件。

Java/Kotlin 文件路径均相对 `app/src/main/java/app/purerec/`。

| 信息 | 处理与保存 | 证据 |
| --- | --- | --- |
| 音频及工作文件 | 麦克风采集后写本地私有工作副本，检查点与启动恢复；外部输出失败保留待重试文件，不能保证断电零丢失 | `RecordingStore.kt`、`AudioService.kt`、`docs/RELIABILITY.md` |
| 外部目录／分享 | 用户 SAF 授权和 FileProvider 只读分享；外部副本、接收者及云提供方各自管理，不随卸载统一清理 | `RecordingStore.kt`、`ProAccess.kt`、`LibraryPreferences.kt` |
| 波形及处理派生物 | 本地分析、包络缓存、裁切、转码、增益及抗干扰输出；派生文件不覆盖原始录音 | `PlayerModel.kt`、`LibraryWorkService.kt`、`AGENTS.md` |
| 路由／校准 | `device_profile.json` 保存输入路由、质量和校准结果；校准采样在内存分析，不保存探测 PCM | `AutoRouteProfile.kt`、`ShieldCapture.kt` |
| 完整性清单 | 私有 JSON 中的文件名、路由、设备时间与哈希；仅主动导出，不是可信时间戳或司法认证 | `CaptureAudit.kt`、`AGENTS.md` |
| 设置与关联 | 音频配置、存储余量、外部目录关联、命名归档、删除确认、划动、静音跳过、最近任务隐藏、语言、主题及 Shield 设置 | `LibraryPreferences.kt`、`Appearance.kt`、`StoragePolicy.kt`、`ShieldCapture.kt` |
| 权益及奖励 | 购买状态、订阅核验时间、奖励剩余时长／事件标识／墙钟和开机计时检查点 | `ProAccess.kt`、`ProBillingModel.kt`、`ProRewardModel.kt` |

## 权限与删除边界

源清单声明 RECORD_AUDIO、通知、前台 microphone/mediaPlayback/mediaProcessing/dataSync、WAKE_LOCK、VIBRATE、INTERNET、ACCESS_NETWORK_STATE；Google SDK 合并支付、广告相关权限。没有全盘管理权限。目录由系统选择器授权，用户可撤回。依据：`app/src/main/AndroidManifest.xml`。

应用关闭备份并排除配置的 cloud-backup/device-transfer。私有录音和偏好会随卸载／清数据移除；外部副本、导出清单及接收者副本需另行处理。删除确认默认开启，用户可主动关闭；关闭不会形成可恢复回收站或安全擦除保证。隐藏最近任务不等于隐藏系统录音通知。

## 广告与购买

- 当前固定 **传统 GMA 25.5.0、UMP 4.0.0、Billing 9.1.0**；MP3 使用本地 LAME 3.100 源码构建，另含本地播放组件 Media3。依据：`app/build.gradle.kts`、`third_party/lame/PUREREC-NOTICE.md`。
- 免费版首页、录音列表和原始文件页可以展示原生视频广告；列表按每 5 个逻辑录音组和非空末尾插入，原始页末尾一条。缓存键为内部索引，录音文件名、归档名和清单不传给广告 SDK。依据：`FeedAdPolicy.kt`、`ArchiveNativeAd.kt`、`AdSlotCache.kt`、`AGENTS.md`。
- UMP 管理请求门禁和设置中的隐私选项，广告忙碌／音频任务状态会限制展示；Pro 停止新广告请求并移除广告位，不承诺已经初始化的 SDK 立即停止一切通信。
- 激励广告只有用户主动选择才请求，仅 earned 回调授予 30 分钟本地 Pro，可累加，卸载／清数据可能丢失；**不同于 KeyDog 每周清零的单次操作奖励，也不同于 ZipFox 跨日累计次数**。依据：`ProRewardModel.kt`、`ProAccess.kt`。
- 商品：`purerec_pro`（月方案 monthly，资料基准 US$2.99/月）、`purerec_pro_lifetime`（非消耗买断，US$19.99/次），真实本地价格来自 Play。月订阅自动续订，买断不会取消原订阅。
- 客户端检查包名、RSA 签名、PURCHASED 与确认，订阅缓存 24 小时，永久购买无本地到期日；没有自建验证后端，离线退款和撤销不会即时反映。依据：`ProBillingModel.kt`、`ProAccess.kt`、`docs/BILLING.md`。

## 本次政策修正和待核实

1. 将公开政策从旧的 Next-Gen SDK 披露链接改为实际 GMA 25.5.0 对应页面，明确三个 SDK 版本和 0.1.44（58）基线。
2. 补充原始文件页广告、本地设置／波形缓存以及订阅与永久购买不同的缓存规则；专属条款补充 0.1.44 基线、归档／派生音频、增益、删除确认、外部保存和通知边界。中英文对应更新，保留既有消费者权利。
3. 应用 `docs/PRIVACY.md` 仍保留 0.1.37 草稿，含 Next-Gen 和“未接入购买”旧说法；`docs/BILLING.md` 也含 develop 对照阶段描述。采集以当前 main 源码为准，未修改这些应用文档。
4. 应用 README 的“首个正式版本”不等于已通过 Play 审核。真实交易、退款／撤销、目标国家、年龄、UMP、Data safety 和运营身份未独立核验。没有运行音频或支付测试。
5. 联系方式沿用现有政策；SDK、购买、公钥配置说明不等于已完成服务端验证和商店合规。

## 官方资料

2026-11-10 查阅：[GMA 25.5.0 数据披露](https://developers.google.com/admob/android/privacy/play-data-disclosure)、[Google Play 用户数据政策](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en)、[订阅取消说明](https://support.google.com/googleplay/answer/7018481?hl=en)。
