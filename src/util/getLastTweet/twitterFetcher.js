// Based on Jason Mayes Twitter Post Fetcher:
/** *******************************************************************
 *  #### Twitter Post Fetcher v18.0.3 ####
 *  Coded by Jason Mayes 2015. A present to all the developers out there.
 *  www.jasonmayes.com
 *  Please keep this disclaimer with my code if you use it. Thanks. :-)
 *  Got feedback or questions, ask here:
 *  http://www.jasonmayes.com/projects/twitterApi/
 *  Github: https://github.com/jasonmayes/Twitter-Post-Fetcher
 *  Updates will be posted to this site.
 ******************************************************************** */

/* eslint-disable */
let maxTweets = 20;
let parseLinks = true;
const queue = [];
let inProgress = false;
let printTime = true;
let printUser = true;
let formatterFunction = null;
let supportsClassName = true;
let showRts = true;
let customCallbackFunction = null;
let showInteractionLinks = true;
let showImages = false;
let useEmoji = false;
let targetBlank = true;
const lang = 'en';
let permalinks = true;
let dataOnly = false;
let script = null;

function handleTweets(tweets) {
  customCallbackFunction(tweets);
}

function strip(data) {
  return data
    .replace(/<b[^>]*>(.*?)<\/b>/gi, (a, s) => s)
    .replace(
      /class="(?!(tco-hidden|tco-display|tco-ellipsis))+.*?"|data-query-source=".*?"|dir=".*?"|rel=".*?"/gi,
      '',
    );
}

function targetLinksToNewWindow(el) {
  const links = el.getElementsByTagName('a');
  for (let i = links.length - 1; i >= 0; i--) {
    links[i].setAttribute('target', '_blank');
    links[i].setAttribute('rel', 'noopener');
  }
}

function getElementsByClassName(node, classname) {
  const a = [];
  const regex = new RegExp(`(^| )${classname}( |$)`);
  const elems = node.getElementsByTagName('*');
  for (let i = 0, j = elems.length; i < j; i++) {
    if (regex.test(elems[i].className)) {
      a.push(elems[i]);
    }
  }
  return a;
}

function extractImagesUrl(image_data) {
  if (image_data !== undefined && image_data.innerHTML.indexOf('data-image') >= 0) {
    const data_src = image_data.innerHTML.match(/data-image=\"([^"]+)\"/gi);
    for (let i = 0; i < data_src.length; i++) {
      data_src[i] = data_src[i].match(/data-image=\"([^"]+)\"/i)[1];
      data_src[i] = `${decodeURIComponent(data_src[i])}.jpg`;
    }
    return data_src;
  }
}

var twitterFetcher = {
  fetch(config) {
    if (config.maxTweets === undefined) {
      config.maxTweets = 20;
    }
    if (config.enableLinks === undefined) {
      config.enableLinks = true;
    }
    if (config.showUser === undefined) {
      config.showUser = true;
    }
    if (config.showTime === undefined) {
      config.showTime = true;
    }
    if (config.dateFunction === undefined) {
      config.dateFunction = 'default';
    }
    if (config.showRetweet === undefined) {
      config.showRetweet = true;
    }
    if (config.customCallback === undefined) {
      config.customCallback = null;
    }
    if (config.showInteraction === undefined) {
      config.showInteraction = true;
    }
    if (config.showImages === undefined) {
      config.showImages = false;
    }
    if (config.useEmoji === undefined) {
      config.useEmoji = false;
    }
    if (config.linksInNewWindow === undefined) {
      config.linksInNewWindow = true;
    }
    if (config.showPermalinks === undefined) {
      config.showPermalinks = true;
    }
    if (config.dataOnly === undefined) {
      config.dataOnly = false;
    }

    if (inProgress) {
      queue.push(config);
    } else {
      inProgress = true;
      maxTweets = config.maxTweets;
      parseLinks = config.enableLinks;
      printUser = config.showUser;
      printTime = config.showTime;
      showRts = config.showRetweet;
      formatterFunction = config.dateFunction;
      customCallbackFunction = config.customCallback;
      showInteractionLinks = config.showInteraction;
      showImages = config.showImages;
      useEmoji = config.useEmoji;
      targetBlank = config.linksInNewWindow;
      permalinks = config.showPermalinks;
      dataOnly = config.dataOnly;

      const head = document.getElementsByTagName('head')[0];
      if (script !== null) {
        head.removeChild(script);
      }
      script = document.createElement('script');
      script.type = 'text/javascript';
      if (config.list !== undefined) {
        script.src = 'https://syndication.twitter.com/timeline/list?'
          + `callback=__twttrf.callback&dnt=false&list_slug=${
            config.list.listSlug
          }&screen_name=${
            config.list.screenName
          }&suppress_response_codes=true&lang=${
            config.lang || lang
          }&rnd=${
            Math.random()}`;
      } else if (config.profile !== undefined) {
        script.src = 'https://syndication.twitter.com/timeline/profile?'
          + 'callback=__twttrf.callback&dnt=false'
          + `&screen_name=${
            config.profile.screenName
          }&suppress_response_codes=true&lang=${
            config.lang || lang
          }&rnd=${
            Math.random()}`;
      } else if (config.likes !== undefined) {
        script.src = 'https://syndication.twitter.com/timeline/likes?'
          + 'callback=__twttrf.callback&dnt=false'
          + `&screen_name=${
            config.likes.screenName
          }&suppress_response_codes=true&lang=${
            config.lang || lang
          }&rnd=${
            Math.random()}`;
      } else if (config.collection !== undefined) {
        script.src = 'https://syndication.twitter.com/timeline/collection?'
          + 'callback=__twttrf.callback&dnt=false'
          + `&collection_id=${
            config.collection.collectionId
          }&suppress_response_codes=true&lang=${
            config.lang || lang
          }&rnd=${
            Math.random()}`;
      } else {
        script.src = `https://cdn.syndication.twimg.com/widgets/timelines/${
          config.id
        }?&lang=${
          config.lang || lang
        }&callback=__twttrf.callback&`
          + `suppress_response_codes=true&rnd=${
            Math.random()}`;
      }
      head.appendChild(script);
    }
  },
  callback(data) {
    if (data === undefined || data.body === undefined) {
      inProgress = false;

      if (queue.length > 0) {
        twitterFetcher.fetch(queue[0]);
        queue.splice(0, 1);
      }
      return;
    }

    // Remove emoji and summary card images.
    if (!useEmoji) {
      data.body = data.body.replace(
        /(<img[^c]*class="Emoji[^>]*>)|(<img[^c]*class="u-block[^>]*>)/g,
        '',
      );
    }

    // Remove display images.
    if (!showImages) {
      data.body = data.body.replace(
        /(<img[^c]*class="NaturalImage-image[^>]*>|(<img[^c]*class="CroppedImage-image[^>]*>))/g,
        '',
      );
    }
    // Remove avatar images.
    if (!printUser) {
      data.body = data.body.replace(/(<img[^c]*class="Avatar"[^>]*>)/g, '');
    }

    const div = document.createElement('div');
    div.innerHTML = data.body;
    if (typeof div.getElementsByClassName === 'undefined') {
      supportsClassName = false;
    }

    function swapDataSrc(element) {
      const avatarImg = element.getElementsByTagName('img')[0];
      if (avatarImg) {
        avatarImg.src = avatarImg.getAttribute('data-src-2x');
      } else {
        const screenName = element
          .getElementsByTagName('a')[0]
          .getAttribute('href')
          .split('twitter.com/')[1];
        const img = document.createElement('img');
        img.setAttribute('src', `https://twitter.com/${screenName}/profile_image?size=bigger`);
        element.prepend(img);
      }
      return element;
    }

    const tweets = [];
    const authors = [];
    const times = [];
    const images = [];
    const rts = [];
    const tids = [];
    const permalinksURL = [];
    var x = 0;

    if (supportsClassName) {
      var tmp = div.getElementsByClassName('timeline-Tweet');
      while (x < tmp.length) {
        if (tmp[x].getElementsByClassName('timeline-Tweet-retweetCredit').length > 0) {
          rts.push(true);
        } else {
          rts.push(false);
        }
        if (!rts[x] || (rts[x] && showRts)) {
          tweets.push(tmp[x].getElementsByClassName('timeline-Tweet-text')[0]);
          tids.push(tmp[x].getAttribute('data-tweet-id'));
          if (printUser) {
            authors.push(swapDataSrc(tmp[x].getElementsByClassName('timeline-Tweet-author')[0]));
          }
          times.push(tmp[x].getElementsByClassName('dt-updated')[0]);
          permalinksURL.push(tmp[x].getElementsByClassName('timeline-Tweet-timestamp')[0]);
          if (tmp[x].getElementsByClassName('timeline-Tweet-media')[0] !== undefined) {
            images.push(tmp[x].getElementsByClassName('timeline-Tweet-media')[0]);
          } else {
            images.push(undefined);
          }
        }
        x++;
      }
    } else {
      var tmp = getElementsByClassName(div, 'timeline-Tweet');
      while (x < tmp.length) {
        if (getElementsByClassName(tmp[x], 'timeline-Tweet-retweetCredit').length > 0) {
          rts.push(true);
        } else {
          rts.push(false);
        }
        if (!rts[x] || (rts[x] && showRts)) {
          tweets.push(getElementsByClassName(tmp[x], 'timeline-Tweet-text')[0]);
          tids.push(tmp[x].getAttribute('data-tweet-id'));
          if (printUser) {
            authors.push(swapDataSrc(getElementsByClassName(tmp[x], 'timeline-Tweet-author')[0]));
          }
          times.push(getElementsByClassName(tmp[x], 'dt-updated')[0]);
          permalinksURL.push(getElementsByClassName(tmp[x], 'timeline-Tweet-timestamp')[0]);
          if (getElementsByClassName(tmp[x], 'timeline-Tweet-media')[0] !== undefined) {
            images.push(getElementsByClassName(tmp[x], 'timeline-Tweet-media')[0]);
          } else {
            images.push(undefined);
          }
        }
        x++;
      }
    }

    if (tweets.length > maxTweets) {
      tweets.splice(maxTweets, tweets.length - maxTweets);
      authors.splice(maxTweets, authors.length - maxTweets);
      times.splice(maxTweets, times.length - maxTweets);
      rts.splice(maxTweets, rts.length - maxTweets);
      images.splice(maxTweets, images.length - maxTweets);
      permalinksURL.splice(maxTweets, permalinksURL.length - maxTweets);
    }

    const arrayTweets = [];
    var x = tweets.length;
    let n = 0;
    if (dataOnly) {
      while (n < x) {
        arrayTweets.push({
          tweet: tweets[n].innerHTML,
          tweetText: tweets[n].textContent,
          author: authors[n] ? authors[n].innerHTML : 'Unknown Author',
          author_data: {
            profile_url: authors[n]
              ? authors[n].querySelector('[data-scribe="element:user_link"]').href
              : null,
            profile_image: authors[n]
              ? `https://twitter.com/${
                authors[n]
                  .querySelector('[data-scribe="element:screen_name"]')
                  .title.split('@')[1]
              }/profile_image?size=bigger`
              : null,
            profile_image_2x: authors[n]
              ? `https://twitter.com/${
                authors[n]
                  .querySelector('[data-scribe="element:screen_name"]')
                  .title.split('@')[1]
              }/profile_image?size=original`
              : null,
            screen_name: authors[n]
              ? authors[n].querySelector('[data-scribe="element:screen_name"]').title
              : null,
            name: authors[n] ? authors[n].querySelector('[data-scribe="element:name"]').title : null,
          },
          time: times[n].textContent,
          timestamp: times[n]
            .getAttribute('datetime')
            .replace('+0000', 'Z')
            .replace(/([\+\-])(\d\d)(\d\d)/, '$1$2:$3'),
          image: extractImagesUrl(images[n]) ? extractImagesUrl(images[n])[0] : undefined,
          images: extractImagesUrl(images[n]),
          rt: rts[n],
          tid: tids[n],
          permalinkURL: permalinksURL[n] === undefined ? '' : permalinksURL[n].href,
        });
        n++;
      }
    } else {
      while (n < x) {
        if (typeof formatterFunction !== 'string') {
          const datetimeText = times[n].getAttribute('datetime');
          const newDate = new Date(
            times[n].getAttribute('datetime').replace(/-/g, '/').replace('T', ' ').split('+')[0],
          );
          const dateString = formatterFunction(newDate, datetimeText);
          times[n].setAttribute('aria-label', dateString);

          if (tweets[n].textContent) {
            // IE hack.
            if (supportsClassName) {
              times[n].textContent = dateString;
            } else {
              const h = document.createElement('p');
              const t = document.createTextNode(dateString);
              h.appendChild(t);
              h.setAttribute('aria-label', dateString);
              times[n] = h;
            }
          } else {
            times[n].textContent = dateString;
          }
        }
        let op = '';
        if (parseLinks) {
          if (targetBlank) {
            targetLinksToNewWindow(tweets[n]);
            if (printUser) {
              targetLinksToNewWindow(authors[n]);
            }
          }
          if (printUser) {
            op += `<div class="user">${strip(authors[n].innerHTML)}</div>`;
          }
          op += `<p class="tweet">${strip(tweets[n].innerHTML)}</p>`;
          if (printTime) {
            if (permalinks) {
              op
                += `<p class="timePosted"><a href="${
                  permalinksURL[n]
                }">${
                  times[n].getAttribute('aria-label')
                }</a></p>`;
            } else {
              op += `<p class="timePosted">${times[n].getAttribute('aria-label')}</p>`;
            }
          }
        } else if (tweets[n].textContent) {
          if (printUser) {
            op += `<p class="user">${authors[n].textContent}</p>`;
          }
          op += `<p class="tweet">${tweets[n].textContent}</p>`;
          if (printTime) {
            op += `<p class="timePosted">${times[n].textContent}</p>`;
          }
        } else {
          if (printUser) {
            op += `<p class="user">${authors[n].textContent}</p>`;
          }
          op += `<p class="tweet">${tweets[n].textContent}</p>`;
          if (printTime) {
            op += `<p class="timePosted">${times[n].textContent}</p>`;
          }
        }
        if (showInteractionLinks) {
          op
            += '<p class="interact"><a href="https://twitter.com/intent/'
            + `tweet?in_reply_to=${
              tids[n]
            }" class="twitter_reply_icon"${
              targetBlank ? ' target="_blank" rel="noopener">' : '>'
            }Reply</a><a href="https://twitter.com/intent/retweet?`
            + `tweet_id=${
              tids[n]
            }" class="twitter_retweet_icon"${
              targetBlank ? ' target="_blank" rel="noopener">' : '>'
            }Retweet</a>`
            + `<a href="https://twitter.com/intent/favorite?tweet_id=${
              tids[n]
            }" class="twitter_fav_icon"${
              targetBlank ? ' target="_blank" rel="noopener">' : '>'
            }Favorite</a></p>`;
        }
        if (showImages && images[n] !== undefined && extractImagesUrl(images[n]) !== undefined) {
          const extractedImages = extractImagesUrl(images[n]);
          for (let i = 0; i < extractedImages.length; i++) {
            op
              += '<div class="media">'
              + `<img src="${
                extractedImages[i]
              }" alt="Image from tweet" />`
              + '</div>';
          }
        }
        if (showImages) {
          arrayTweets.push(op);
        } else if (!showImages && tweets[n].textContent.length) {
          arrayTweets.push(op);
        }

        n++;
      }
    }
    inProgress = false;
    handleTweets(arrayTweets);

    if (queue.length > 0) {
      twitterFetcher.fetch(queue[0]);
      queue.splice(0, 1);
    }
    return 'a';
  },
};

// It must be a global variable because it will be called by JSONP.
window.__twttrf = twitterFetcher;
// window.twitterFetcher = twitterFetcher;
export default twitterFetcher;
