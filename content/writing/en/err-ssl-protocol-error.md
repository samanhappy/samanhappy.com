---
title: The Mysterious ERR_SSL_PROTOCOL_ERROR
description: Tracing an SSL failure affecting only some Chrome browsers and domains to a Chromium SHA1 policy change and a compatibility bug in older OpenSSL versions.
date: '2023-10-06'
updated: '2023-10-06'
category: Building
tags:
  - Chrome
  - TLS
  - OpenSSL
  - Nginx
canonical: 'https://samanhappy.com/en/writing/err-ssl-protocol-error'
sourceUrl: 'https://mp.weixin.qq.com/s/JEHU1URQQJqoU08OwI2sTA'
editionNote: English translation of my Chinese article originally published on WeChat on October 6, 2023. The account below preserves the original context.
draft: false
---

After just two quiet days of the holiday, a colleague reported that some of our company's websites would not open. The browser displayed ERR_SSL_PROTOCOL_ERROR.

![Chrome displaying ERR_SSL_PROTOCOL_ERROR](/images/err-ssl-protocol-error-error.png)

Since everything still worked in my browser, I assumed it was a temporary network issue or a minor problem that clearing the cache would fix. Little did I know, this was only the beginning.

## The Investigation

My colleague tried several approaches without success, and more colleagues began reporting the same issue. As we gathered and analyzed their reports, several strange patterns emerged:

- Only some Chrome browsers were affected. Other browsers worked fine.
- Our company had many domains, but only some were affected.
- Reinstalling Chrome fixed the issue for one colleague, while another reported that a previously working installation stopped working after a reinstall.
- Two domains hosted on the same server, with almost identical Nginx configurations, behaved differently: one failed while the other worked.

Because Chrome offered a good user experience and had Google behind it, we generally recommended it to customers accessing our websites. So we did not initially suspect Chrome, even though the problem only appeared there. We tried clearing the browser cache and SSL state, and even replaced the SSL certificate. The problem persisted.

After exhausting those options, we gradually turned our attention to Chrome. I first submitted feedback through Chrome but received no reply. Then I found Chromium's official bug tracker. Searching for ERR_SSL_PROTOCOL_ERROR turned up reports from other users describing the same problem—and they had been posted in the last couple of days!

## The Cause

After reading those discussions carefully, the picture became clearer. Several factors had coincided, turning an otherwise routine rollout into a butterfly effect.

On September 28, Chromium rolled out a change titled `Disable SHA1 in TLS server handshakes by default`. It disabled SHA1 during TLS handshakes by default. This was a normal and reasonable change, since SHA1 was already recognized as insecure. However, some older systems were still running old versions of OpenSSL, and those versions had a bug that forced the use of SHA1. The two conditions came together, and the failure quietly followed.

## The Fix

Once we understood the cause, the solution became clear.

First, we could open `chrome://flags/#use-sha1-server-handshakes` and change Chrome's default setting to `Enabled`.

![The SHA1 server handshakes option in Chrome](/images/err-ssl-protocol-error-chrome-flags.png)

That restored access, but asking customers to change Chrome's settings was cumbersome, and using SHA1 was insecure. The better solution was to **update OpenSSL on the server**. In our case, upgrading from 1.0.1 to 1.1.1 resolved the issue.

One detail to watch: if the website is deployed with Nginx, run `nginx -V` to check the OpenSSL version it depends on.

![nginx -V showing the OpenSSL version](/images/err-ssl-protocol-error-nginx-version.png)

If that version is too old, you need to **recompile Nginx against a newer version of OpenSSL** rather than simply upgrade the library. The specific steps are available online, so I will not repeat them here.

## Lessons Learned

With the issue resolved, here are my takeaways:

- Old libraries still need to be upgraded when appropriate. Otherwise, problems will surface sooner or later.
- When investigating a problem, especially a newly emerging one, look for answers at the source: the official website, GitHub repository, official forum, or official bug tracker.

## References

1. <https://bugs.chromium.org/p/chromium/issues/detail?id=1488571>
2. <https://chromium-review.googlesource.com/c/chromium/src/+/4898836>
3. <https://github.com/openssl/openssl/issues/4554>
