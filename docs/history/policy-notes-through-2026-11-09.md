# 历史维护记录（截至 2026-11-09）

> 原 README 完整归档；版本、链接和结论仅反映当时记录，不作为当前事实来源。当前状态见 [仓库首页](../../README.md)。

# App policies and terms

- [Common Terms of Service / 公共服务条款](../../terms.html): shared English and Simplified Chinese terms for KeyDog, PureRec and ZipFox, with app-specific sections.
- [KeyDog / 密钥狗](../../keydog-index.html): policy for KeyDog 1.2.2 (23), including Google ads, consent, Billing and local Pro/usage records; last updated November 9, 2026.
- [PureRec](../../purerec-index.html): separate policy for PureRec.
- [ZipFox](../../zipfox-index.html): bilingual policy for ZipFox 0.1.0 (1), covering local archives, working files, broad storage access, Google ads, privacy choices and Play Billing; last updated November 9, 2026.
- [ZipFox review / 信息收集与核查记录](../reviews/zipfox-2026-11-08.md): implementation evidence, official sources and release items to verify.

The KeyDog policy describes the current app implementation. Review it and the Play Console Data safety declarations whenever file handling, permissions or third-party SDKs change, especially before adding advertising or billing.

Repository files are not automatically a published website. If using GitHub Pages, configure and verify public access to the HTML policy URL before adding it to the app or store listing.

Reference: [Google Play User Data policy](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en).

## Maintaining the common terms

Add a new app to the explicit scope list and review its specific risks before using these terms for it. Review actual purchase screens and subscription conditions before adding paid features. Maintain the provider identity and contact details consistently with the store listing. The common terms preserve mandatory consumer rights and do not replace app-specific privacy policies.

Publish and verify a publicly accessible HTML URL for terms.html before entering it as the Terms of Service link for each covered app in Play Console. A GitHub source-file URL is not a substitute for checking the rendered policy page.

References: [Google Play trader status declaration](https://support.google.com/googleplay/android-developer/answer/17594752), [EU guidance on unfair contract terms](https://europa.eu/youreurope/citizens/consumers/unfair-treatment/unfair-contract-terms/index_en.htm).


## PureRec policy review — November 7, 2026

The PureRec privacy policy is now bilingual (English / Simplified Chinese) and covers the current AdMob/GMA, UMP and Play Billing implementation, local audio and calibration metadata, exports, retention/deletion, support and privacy choices. The common terms retain their existing consumer protections and KeyDog-specific text; new PureRec-only terms cover monthly renewal, one-time purchases, restoring access, the 24-hour subscription verification cache, 30-minute local rewarded access and experimental processing limits.

Checked against PureRec develop 4f3da3b and Google’s mobile ads data disclosure and subscription cancellation guidance. HTML nesting, language sections and local links were checked. Contact details remain as previously supplied: kong5664246@gmail.com. Store identity, contact mailbox operation, regional consent messages, target-audience declarations and Play Data safety answers must reflect the actual distribution configuration; this edit does not modify those consoles or verify legal compliance in every jurisdiction. No KeyDog implementation review was performed. Publishing and checking the live URLs is a separate step.

## KeyDog policy review — November 8, 2026

Updated KeyDog privacy and both language versions of the KeyDog-specific terms for 1.1.14 (19): Dog/share terminology, release as deletion, separate management and internal selection, independent shares and backups, local warning preferences, recovery cleanup and monthly renewal versus one-time purchase. Rechecked current Google Mobile Ads 25.5.0 data disclosure and Google Play cancellation guidance. PureRec-specific sections and its separate privacy policy are unchanged. Cosmetic home animation changes introduce no additional data processing.

## KeyDog reward update — November 9, 2026

KeyDog 1.2.0 replaces thirty-minute rewarded Pro with one operation-specific ad credit, reset each Monday using the device’s local calendar. Updated local storage, retention and both KeyDog terms sections. The old timer no longer activates Pro. PureRec still uses its own thirty-minute reward policy; its sections are unchanged.

## KeyDog free feature access — November 9, 2026

KeyDog 1.2.2 removes the Pro gate from direct and batch Dog-file sharing. Free users have access to encryption/recovery features within their usage allowance; sharing and export consume no task uses. Paid Pro retains unlimited tasks and no native ads. Updated KeyDog privacy and both language versions of its terms; PureRec-specific sections are unchanged.
