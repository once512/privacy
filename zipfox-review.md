# ZipFox 信息收集与政策核查记录

核查日期：2026-11-08（Asia/Shanghai）。范围：本地 `D:\ZipFox` 源码及已有 Debug 合并清单，不代表已发布版本或账号配置。应用仓库尚无首个提交，无法用 commit ID 固定版本。

## 已建立的文档

- `zipfox-index.html`：中英双语隐私政策。
- `terms.html#zipfox` / `terms.html#zipfox-zh`：公共条款下的英文／中文 ZipFox 专属章节；公共适用列表及政策链接已同步添加。
- 基准版本：ZipFox 0.1.0（versionCode 1），包名 `app.zipfox`，minSdk 26、targetSdk 36。

## 实现事实与证据

以下路径相对 `D:\ZipFox`，Java 类位于 `app/src/main/java/app/zipfox/`。

| 项目 | 核查结论 | 主要依据 |
| --- | --- | --- |
| 功能 | 创建 ZIP、7Z、TAR、TAR.GZ、TAR.BZ2；ZIP/7Z 支持 AES-256，7Z 加密归档头；RAR 等仅解压 | `ArchiveEngine.java`、`THIRD_PARTY.md` |
| 数据流 | 直接读写本地文件；未发现开发者文件上传端点、账户、云存储或购买验证后端 | `ArchiveEngine.java`、`FilePickerActivity.java`、`ProBilling.java` |
| 存储 | Android 11+ 使用所有文件访问；Android 8–10 使用存储读写；未接入 SAF 云端文档 | `app/src/main/AndroidManifest.xml`、`FilePickerActivity.java` |
| 其他权限 | 前台 dataSync 服务、通知、网络及网络状态；SDK 合并后还有 BILLING、AD_ID、广告服务和 WAKE_LOCK 等；不申请麦克风、相机、通讯录或运行时位置权限 | 源清单及 `app/build/intermediates/merged_manifest/debug/processDebugMainManifest/AndroidManifest.xml` |
| 密码 | 内存使用，不写偏好、Activity 保存状态或服务 Intent；任务 char[] 会清零，但原生接口存在 String 副本，不能保证全部副本立即擦除 | `ArchiveService.java`、`ArchiveEngine.java`、`MainActivity.java` |
| 过程文件 | 输出位置 `.zipfox-*` 目录可能包含明文、暂存归档及覆盖恢复备份；失败默认清理，关闭则保留，回滚失败可强制保留备份 | `ArchiveEngine.java`、`ExtractionPublisher.java` |
| 删除与覆盖 | 源删除默认关闭、按模式保存；完成和快照检查后尝试删除；分卷仅处理实际打开的源文件；压缩拒绝覆盖，解压可覆盖同名普通文件 | `SourceSnapshot.java`、`ArchiveEngine.java`、`ExtractionPublisher.java` |
| 本地设置 | 5 个持久化处理开关、关闭提示状态；Activity 状态包含路径、名称和格式等，不包含密码 | `MainActivity.java` |
| 次数 | 每日本地日期成功压缩／解压各 3 次，失败取消不扣；奖励在每日额度后消耗、跨日保留；有奖励去重标识 | `AccessStore.java`、`ArchiveService.java` |
| 广告 | GMA 25.5.0；原生视频及自愿激励广告；每次 SDK 确认奖励增加当前功能 1 次；Pro 隐藏广告并停止新广告加载 | `AdController.java`、`app/build.gradle` |
| 同意 | UMP 4.0.0，正式广告按 canRequestAds 决定初始化；需要时在 Pro 弹窗提供广告隐私设置；Debug 使用官方测试位 | `AdController.java`、`MainActivity.java` |
| 支付 | Billing 9.1.0；月订阅和永久 Pro；预设价 US$2.99/月、US$9.99/次，实际使用 Play 价格；未配置不收款 | `ProBilling.java`、`app/build.gradle`、`docs/MONETIZATION.md` |
| 验证 | 本地检查包名、商品、RSA 签名及确认状态；Pro 缓存最长 24 小时，两类购买均适用；没有后端实时退款／撤销验证 | `ProBilling.java`、`AccessStore.java` |
| 备份 | 关闭应用自动备份，排除配置的云备份／设备迁移；不涵盖共享文件被其他服务备份 | `AndroidManifest.xml`、`res/xml/data_extraction_rules.xml` |
| 防护 | 条目、目录、数据量、单文件、路径深度、膨胀率、空间和时间限制；不等于所有格式或设备均通过验证 | `ExtractionLimits.java`、`docs/ARCHIVE_SAFETY.md` |
| 开源 | Zip4j 2.11.6（Apache-2.0）、7-Zip-JBinding-4Android 16.02-2.03（LGPL/unRAR）；条款保留开源许可权利 | `THIRD_PARTY.md`、`app/src/main/assets/licenses/` |

## 发布前待核实与已知问题

1. **运营信息**：沿用隐私仓库现有的 KongQBin（once512）及 `kong5664246@gmail.com`，未独立核验法定身份、邮箱可用性、商店展示或应公开地址；上线前保持一致并补充目标地区要求的信息。
2. **市场和年龄**：按通用文件工具起草，未核实分发国家、年龄范围及 Play 受众设置。面向儿童或特定法域时需另行评估广告、同意与法律依据，不能仅凭此文案认定合规。
3. **正式配置**：说明显示正式广告和商品配置待完成；启用前核查 release 合并清单、实际依赖、UMP 地区消息和真实支付、续订、恢复、退款、撤销。未读取账号后台或测试真实扣费。
4. **购买后端**：`docs/MONETIZATION.md` 已要求正式收费前补充 Play Developer API 与实时开发者通知。文案如实披露本地验证，不声称已完成后端验证。
5. **旧说明冲突**：README“当前实现”仍写“不申请网络权限”，与当前 Manifest、广告及支付实现冲突。应改为“文件本机处理，广告与购买联网”。本次未修改应用仓库。
6. **持久化与明文**：源删除开启后跨重启／覆盖安装延续；重置提示不重置处理开关。过程目录位于共享存储，可能残留明文，不可描述为只在私有缓存中处理。
7. **引擎和许可**：应用说明指出 7-Zip 16.02 较旧，要求正式发布前升级／审查和设备验证；还需落实对应源码、构建材料等适用许可义务。政策起草不替代这些工作。
8. **支持邮件**：政策建立按需保存及处理删除请求的规则，运营时需实际执行；没有虚构固定删除天数、境内存储或全面合规承诺。
9. **发布与入口**：本次仅生成本地文件，未发布、提交或推送。当前应用未发现独立隐私政策／服务条款链接；上线后先验证匿名可访问的 HTTPS 渲染页面，再加入应用及商店。

## 官方资料（2026-11-08 查阅）

- [Google Mobile Ads 数据披露，25.5.0](https://developers.google.com/admob/android/privacy/play-data-disclosure)：核对 SDK 数据类型、用途及传输保护。
- [Google Play 用户数据政策](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en)：核对访问、共享、联系、保存和删除披露。
- [Google Play 取消订阅说明](https://support.google.com/googleplay/answer/7018481?hl=en)：核对卸载不取消及取消后的已付费周期权益。
- [Google 隐私政策](https://policies.google.com/privacy)：政策中提供第三方链接，具体处理依当时政策与产品配置。

## 后续维护

文件访问、临时目录／清理、删除默认值、密码保存、联网、SDK、广告、同意、额度、购买或市场／年龄范围变化时，同步复核隐私政策、ZipFox 专属条款及 Play Data safety；同时检查正式构建和后台配置。

## 本次文档验证

已检查两个 HTML 页面的标签嵌套、唯一 ID、本地链接及片段锚点、中英语言区段和 UTF-8 编码；`git diff --check` 通过。统一换行后，与仓库原版逐段比对确认 KeyDog、PureRec 中英文专属条款内容保留。未进行浏览器视觉验收、线上 URL 可访问性验证或真实设备／支付测试。

本记录区分实现事实、沿用的运营信息及待核实事项，不是商店审核通过或所有法域合规的证明。
