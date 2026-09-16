---
title: 诡异的ERR_SSL_PROTOCOL_ERROR
description: 一次仅在部分 Chrome 浏览器和域名上出现的 SSL 故障排查，最终定位到 Chromium 的 SHA1 策略变更与旧版 OpenSSL 的兼容问题。
date: '2023-10-06'
updated: '2023-10-06'
category: Building
tags:
  - Chrome
  - TLS
  - OpenSSL
  - Nginx
canonical: 'https://samanhappy.com/zh/writing/err-ssl-protocol-error'
sourceUrl: 'https://mp.weixin.qq.com/s/JEHU1URQQJqoU08OwI2sTA'
editionNote: 本文于 2023 年 10 月 6 日首发于微信公众号，此处保留当时的原文。
draft: false
---

假期刚刚平静了两天，同事就反馈说公司的部分网站打不开，页面提示ERR_SSL_PROTOCOL_ERROR

![Chrome 提示 ERR_SSL_PROTOCOL_ERROR](/images/err-ssl-protocol-error-error.png)

因为我的浏览器一直可以正常访问，所以我认为是短暂的网络故障，或者通过清理缓存就可以解决的“小问题”，却没想到一切才刚刚开始。

## 定位过程

一方面是同事回复试了多种办法依然无效，另一方面是陆续又有多个同事也遇到了同样的问题，而且经过统计和分析后发现，这个问题存在诸多诡异之处

- 只有部分Chrome浏览器有问题，其他浏览器都是好的
- 公司有很多域名，只有部分域名有问题
- 有同事尝试重装Chrome后问题解决，但也有同事反馈一开始好的，重装后反而不行了
- 同一台服务器部署了两个域名，Nginx配置几乎相同，一个有问题，另外一个正常

因为Chrome良好的使用体验和背后的Google，我们基本都推荐客户使用Chrome来访问我们的网站，所以第一时间我们并没有怀疑Chrome，尽管这个问题目前只在Chrome出现。我们先是尝试清除浏览器缓存、SSL状态，甚至更换了新的SSL证书，却发现问题依旧。

尝试了各种办法无果后，只能把目光慢慢聚焦在Chrome上。我先通过Chrome反馈了问题，但是一直得不到回复。这个时候我找到了Chromium官方的bug跟踪平台，通过搜索ERR_SSL_PROTOCOL_ERROR，发现有用户也反馈了同样的问题，而且就在这两天！

## 问题原因

仔细阅读了相关帖子后，真相慢慢浮出了水面，这又是一个多因素叠加的巧合事件，或者是一次正常上线引发的蝴蝶效应。

9月28日，Chromium提交了一个标题为`Disable SHA1 in TLS server handshakes by default`的部署，默认禁用了TLS握手时的SHA1加密方法，这本是一次正常且正确的发布，因为SHA1已经被公认为不安全的。但是却没想到有一些老旧的系统依然使用了较低版本的OpenSSL，而低版本的OpenSSL存在bug，会强制使用SHA1！真是无巧不成书，问题就这样合理又悄无声息地发生了。

## 解决办法

了解了问题发生的原因，解决办法也就呼之欲出了。

首先，可以通过`chrome://flags/#use-sha1-server-handshakes`修改Chrome的默认选项为`Enabled`

![Chrome 中的 SHA1 server handshakes 选项](/images/err-ssl-protocol-error-chrome-flags.png)

这样就可以正常访问了，但是修改Chrome选项对客户来说有些复杂了，而且使用SHA1也不安全。所以最好的办法是**更新服务端的OpenSSL版本**，以我们的服务器为例，把版本从1.0.1升级到1.1.1后，问题就解决了。

这里需要注意一点的是，如果网站使用了Nginx部署，可以通过`nginx -V`看一下依赖的OpenSSL版本

![nginx -V 显示依赖的 OpenSSL 版本](/images/err-ssl-protocol-error-nginx-version.png)

如果版本过低，则需要通过**重新编译Nginx使用新版本的OpenSSL**来替代升级，具体的步骤可以去网上搜索，这里就不赘述了。

## 总结

问题到此结束，总结一下经验教训

- 一些陈旧版本的库该升级还是要升级，不然问题早晚会发生
- 遇到问题，尤其是新出现的问题，最好还是到源头去搜索解决方案，这里的源头包括官网、GitHub主页、官方论坛、官方Bug反馈平台等

## 参考链接

1. <https://bugs.chromium.org/p/chromium/issues/detail?id=1488571>
2. <https://chromium-review.googlesource.com/c/chromium/src/+/4898836>
3. <https://github.com/openssl/openssl/issues/4554>
