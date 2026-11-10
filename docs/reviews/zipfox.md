# ZipFox 当前政策核查

核查日期：2026-11-10（Asia/Shanghai）。只读应用源码，未读取本地商品配置、签名资料或运行真实广告、交易及文件操作。

| 基线 | 内容 |
| --- | --- |
| 工作区 | `D:\ZipFox`，采集时无未提交改动 |
| 提交 | `f2246d61c25ee76f4ecf2c1784cc4140afda2833`，Release ZipFox 0.1.5 (6) |
| 应用 | `app.zipfox`，0.1.5（6），minSdk 26，targetSdk 36 |
| 文档 | [隐私政策](../../zipfox-index.html) · [英文专属条款](../../terms.html#zipfox) · [中文专属条款](../../terms.html#zipfox-zh) |
| 上次记录 | [2026-11-08 的 0.1.0 历史快照](zipfox-2026-11-08.md)，不覆盖当前版本 |

## 变化与本次修订

1. **奖励变为每周清零**：成功任务先使用每日压缩／解压各 3 次免费额度，再使用所选功能广告余额。余额在当周可跨日，设备本地日历每周一 00:00 到期，下次读取、扣减或发奖时结算；回拨不会恢复已过期奖励。`AccessStore.java` 的 `rollWeek`、`remaining`、`recordSuccess`、`grantReward` 均参与控制。SDK 发奖回调仍是授予依据，失败、取消不扣任务次数。政策及两种语言的条款已移除“永久跨日保留至用完”描述。
2. **发布配置已接入**：`docs/MONETIZATION.md` 记录商品 `zipfox_pro_monthly`、`zipfox_pro_lifetime` 及正式广告配置。当前压缩和解压各有原生广告位，激励位独立；`AdController.java` 分别检查配置，并按 UMP `canRequestAds` 初始化。政策不再将应用整体描述为仅预览、等待全部配置。未独立验证平台可售性、填充和后台消息。
3. **版本与语言**：`app/build.gradle` 为 0.1.5（6），GMA 25.5.0、UMP 4.0.0、Billing 9.1.0，另有 Fragment 1.9.1 约束；Zip4j 2.11.6、7-Zip 绑定 16.02-2.03 保留。`ZipFoxApplication.java` 与资源直接跟随系统语言，未新增用户语言账户或远程翻译服务。
4. **本地状态**：奖励偏好增加周边界；输出名可根据所选名称自动填充但可修改，不形成新的对外数据传输。当前服务通知显示模式、实际进度、文件／结果或错误；名称和错误路径可能在通知出现，已有披露保留。

## 继续成立的实现事实

Java 路径均在 `app/src/main/java/app/zipfox/`。

| 项目 | 当前行为／证据 |
| --- | --- |
| 文件数据流 | `ArchiveEngine.java` 直接本地读写，未发现文件、密码或路径向开发者服务器上传；Google SDK 独立联网 |
| 权限 | Manifest：所有文件访问、旧版读写存储、dataSync 前台服务、通知、互联网及网络状态；SDK 还会合并广告、支付权限，无麦克风／相机／运行时位置授权 |
| 密码 | `MainActivity.java`、`ArchiveService.java` 不写密码入保存状态或服务 Intent；任务 char[] 清零不代表所有 String／原生内存副本立即擦除 |
| 暂存与覆盖 | `ArchiveEngine.java`、`ExtractionPublisher.java` 在目标位置建立 `.zipfox-*`，可能保留明文、归档和回滚备份；压缩拒绝覆盖已有归档，解压可覆盖同名普通文件 |
| 删除 | `SourceSnapshot.java` 参与成功后源删除检查；默认关闭源删除，默认开启失败清理，各模式持久化；回滚失败可保留备份，卸载不清理共享存储 |
| 购买 | `ProBilling.java` 检查包名、商品、RSA 签名、PURCHASED 和确认；无自建验证后端。`AccessStore.java` 对订阅及永久购买均缓存最长 24 小时，不可套用另外两款应用永久状态无到期计时的规则 |
| 备份 | `allowBackup=false`、`fullBackupContent=false`、`data_extraction_rules.xml` 排除配置的云备份和设备迁移；不阻止其他服务备份共享文件 |
| 安全限制 | `ExtractionLimits.java` 保留数据量、单文件、路径深度、膨胀率、空间及时间限制，Pro 不绕过；不能承诺所有恶意归档安全或所有格式均验证 |

## 未验证事项

尚未核验实际商店轨道、商品价格、续订、退款、广告填充、UMP 地区配置、目标年龄／市场、所有文件访问审核、运营身份或最新发布包权限。商品资料基准 US$2.99/月、US$9.99/次，仅作为产品说明，购买以 Play 展示为准。README 部分“当前边界”仍保留旧的等待配置措辞，已用当前代码及 MONETIZATION 交叉核对，不把旧文字写成现状。

应用文档指出旧 7-Zip 引擎和开源许可分发事项仍需关注。本次政策同步不替代引擎审查、开源许可履行或设备验证。

## 来源与验证

官方资料沿用同日核对的 [GMA 数据披露](https://developers.google.com/admob/android/privacy/play-data-disclosure)、[Google Play 用户数据政策](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en)、[订阅取消规则](https://support.google.com/googleplay/answer/7018481?hl=en)。本次生成中英文本并通过仓库结构／本地链接检查；线上新页面在推送部署后另行检查。
