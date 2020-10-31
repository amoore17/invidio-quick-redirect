chrome.webRequest.onBeforeRequest.addListener((details) => {
  const youtubeRegex = /youtube.com(\/?.*)/;
  const youtubeShortRegex = /youtu.be\/.+/;

  if (youtubeRegex.test(details.url) === true) {
    return {redirectUrl: 'https://invidious.snopyta.org' + youtubeRegex.exec(details.url)[1]};
  } else if (youtubeShortRegex.test(details.url) === true) {
    const youtubeShortCaptureRegex = /youtu.be\/(.+)/;
    return {redirectUrl: 'https://invidious.snopyta.org/watch?v=' + youtubeShortCaptureRegex.exec(details.url)[1]};
  } else {
    return {redirectUrl: 'https://invidious.snopyta.org'};
  }
},
{
  urls: [
    '*://*.youtube.com/*',
    '*://*.youtu.be/*'
  ],
  types: [
    'main_frame',
    'sub_frame'
  ]
},
['blocking']);
