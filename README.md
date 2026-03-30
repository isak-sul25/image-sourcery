# Image Sourcery

Reverse image searching made (mostly) simple: add a menu option on posts one can
use to reverse image search image posts, or automate a comment that links to 
selected engines (multi-image posts are supported!).

![1](https://files.catbox.moe/7mtynx.png)

![2](https://files.catbox.moe/ewa102.png)

# What's New?

### New Search Engine Available: ArtResearch.net

[ArtResearch.net](https://artresearch.net) is a reverse image search engine specialising
in artworks. It is available as both a menu option and as an automated comment engine.

### New Search Engines Available: TinEye and Bing

### Select Form for Image Galleries
You can now optionally toggle a new way to reverse image search gallery 
posts through the menu option - you can choose the number of the image to be 
searched instead of just searching the first image.

The reason this is optional is that it doesn't consistently work for me - 
it's fine on the Reddit site, but it's giving me an error on the app. Do let 
me know how it works (or doesn't work) for you, so I can know for sure if 
it's just a *me* issue.

# Reverse Image Search Engine Menu Option

It takes the direct image link of an image post (if available) or thumbnail 
and redirects the user to an external reverse image search engine to see what 
similar media can be found.

## Configuration

Currently, the only available configuration option has to do with choosing 
the reverse image search engine to be used by the app on your subreddit.

![3](https://files.catbox.moe/vfnidp.png)

The currently available engines are: Google Images, Google Lens, SauceNAO,
IQDB, Yandex, TinEye, Bing and ArtResearch.net.

# Reverse Image Search Comment

[comment]: https://files.catbox.moe/ctje1u.png
[rise_options]: https://files.catbox.moe/lxbg92.png
[rise_lists]: https://files.catbox.moe/y45bxz.png

The app can add a comment under posts linking to one or more reverse 
image search engines. Posts with multiple images are supported and an 
optional header can be added that supports most [AutoModerator placeholders](https://www.reddit.com/r/reddit.com/wiki/automoderator/full-documentation/) 
except media placeholders, match placeholders and ``{{author_flair_template_id}}``.

![comment]

## Configuration

Currently, you can set:

- **the comment trigger.**
- **the optional comment header.**
- **the reverse image search engines to use.**
- **whether the reminder should be stickied or/and distinguished.**

![rise_options]

On the given trigger/s, the posts are checked against the following given 
white/black list criteria before making a comment:
- **Title Regex**
- **Flair Text** 
- **Flair ID**

If all fields are left empty, a comment will be made on all posts for the 
given trigger. If a comment already exists, it will be edited instead.

![rise_lists]

# Feedback

You can contact me (u/EternalGreenX) if you have any feedback or suggestions.
You can also check my spaghetti code on [GitHub](https://github.com/isak-sul25/image-sourcery).

# Changelog

* v1: Basic reverse image search menu option implemented.
* v1.1: Added an app config option that lets moderators select one of several
  search engines.
* v1.2: Switched to using enriched thumbnails - the app can now handle SFW 
  and NSFW galleries.
* v2.0: Added the reverse image search comment function.
* v2.1: the "*RIP Google Images*" update:
  * Google Images has been retired as an option. 
  * Implemented some crosspost compatibility
  * Published GitHub repository
* v2.1.1: the "*unRIP Google Images*" update
* v3.0: the "*Galleries!*" update:
  * Added an optional select form for Gallery posts.
  * Added two new reverse image search engines: TinEye and Bing.
* v3.0.1: Fixed Bing so it can work on mobile.
* v3.1: Added ArtResearch.net as a reverse image search engine.