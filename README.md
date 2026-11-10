# 应用隐私政策与服务条款

统一维护 KeyDog、PureRec、ZipFox 的政策和源码核查资料。最近整理：**2026-11-10**。运营者及联系邮箱沿用现有政策：KongQBin（once512），kong5664246@gmail.com。

## 政策入口

| 应用 | 当前源码 | 隐私政策 | 专属服务条款 | 核查状态 |
| --- | --- | --- | --- | --- |
| KeyDog／密钥狗 | 1.2.2（23） | [本地](keydog-index.html) · [公开地址](https://once512.github.io/privacy/keydog-index.html)（中英） | [英文](terms.html#keydog) · [中文](terms.html#keydog-zh) | [2026-11-10 已采集](docs/reviews/keydog.md)，政策日期 2026-11-10 |
| PureRec | 0.1.44（58） | [本地](purerec-index.html) · [公开地址](https://once512.github.io/privacy/purerec-index.html)（中英） | [英文](terms.html#purerec) · [中文](terms.html#purerec-zh) | [2026-11-10 已采集](docs/reviews/purerec.md)，本轮更新政策 |
| ZipFox | 0.1.5（6） | [本地](zipfox-index.html) · [公开地址](https://once512.github.io/privacy/zipfox-index.html)（中英） | [英文](terms.html#zipfox) · [中文](terms.html#zipfox-zh) | [2026-11-10 已复核](docs/reviews/zipfox.md)，本轮更新政策 |

公共服务条款：[本地](terms.html) · [公开地址](https://once512.github.io/privacy/terms.html)，含英文及简体中文。表中公开地址为固定发布路径，线上生效以公开页面版本和日期为准。源码版本不代表商店上架版本，也不代表对应政策已经复核。

## 目录

- 根目录 HTML：公开隐私政策和公共条款，保持已发布文件名及路径。
- [docs/reviews/](docs/reviews/)：项目事实、源码证据、版本和未核实事项。
- [docs/history/](docs/history/)：历史记录，仅作追溯。
- [docs/MAINTENANCE.md](docs/MAINTENANCE.md)：维护流程和待办。
- [scripts/validate.mjs](scripts/validate.mjs)：政策结构及文档本地链接校验。

## 不同应用的规则

| 项目 | KeyDog | PureRec | ZipFox |
| --- | --- | --- | --- |
| 权限 | SAF 文档／目录 | 麦克风、前台服务、SAF 目录 | 所有文件访问／旧版存储 |
| 激励奖励 | 一次对应加密／恢复，每周一清零 | 30 分钟本地 Pro，可累加 | 一次对应压缩／解压，每周一清零 |
| 免费使用 | 每天成功加密／恢复各 3 次 | 基础录音免费，部分工具需 Pro | 每天成功压缩／解压各 3 次 |
| 购买离线缓存 | 订阅 24 小时，永久无计时到期 | 订阅 24 小时，永久无计时到期 | 两类均 24 小时 |
| 主要风险 | 密码／分片遗失、恢复后清理 | 私有录音随卸载丢失、外部副本独立保留 | 覆盖、源删除、共享目录明文残留 |

## 维护入口

先核对源码和实际发布配置，再更新对应隐私政策及必要的专属条款；将证据、版本和待核实事项写入核查记录。在根目录运行 `node scripts/validate.mjs` 及 `git diff --check` 后再发布，发布后验证匿名可访问的实际政策页面。

本轮更新说明见 [2026-11-10 政策同步记录](docs/history/2026-11-10-policy-update.md)。四份公开 HTML 均为中英文，日期为 2026-11-10。

历史维护内容已归档至 [原 README 记录](docs/history/policy-notes-through-2026-11-09.md)。本地内容处理与 Google 广告、同意、支付的数据处理需分别披露；联系身份、目标市场、年龄和后台 Data safety 仍需与实际运营核对。
