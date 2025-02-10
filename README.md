# Image Sourcery

Reverse image searching made (mostly) simple: add a menu option on posts one can
use to reverse image search image posts, or automate a comment that links to 
selected engines (multi-image posts are supported!).

![1](https://i.imgur.com/dHewG8u.png)

![2](https://i.imgur.com/A1PCBWp.png)

# What's New - Reverse Image Search Comment

[comment]: https://i.imgur.com/JuZn56Z.png
[rise_options]: https://i.imgur.com/eeMfQbp.png
[rise_lists]: https://i.imgur.com/mLkRlVC.png

The app can now add a comment under posts linking to one or more reverse 
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

# Reverse Image Search Engine Menu Option

It takes the direct image link of an image post (if available) or thumbnail 
and redirects the user to an external reverse image search engine to see what 
similar media can be found.

## Configuration

Currently, the only available configuration option has to do with choosing 
the reverse image search engine to be used by the app on your subreddit.

![3](https://i.imgur.com/R2q0dED.png)

The currently available engines are: Google Images (default), Google 
Lens, SauceNAO, IQDB and Yandex.

# Feedback

You can contact me (u/EternalGreenX) if you have any feedback or suggestions.

# Changelog

* v1: Basic reverse image search menu option implemented.
* v1.1: Added an app config option that lets moderators select one of several
  search engines.
* v1.2: Switched to using enriched thumbnails - the app can now handle SFW 
  and NSFW galleries.
* v2.0: Added the reverse image search comment function.