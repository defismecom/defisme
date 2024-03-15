window.onload = keepLangPrefOnReload;

function localize(language, changeHref) {
  if (changeHref) {
    if (['en', 'ru', 'id', 'esp', 'fr', 'ger', 'ita', 'ban', 'ind'].includes(language)) {
      document.cookie = `lang=${language}; expires=Sun, 1 Jan 2030 00:00:00 UTC; path=/`;
    }
    let location = window.location.href;
    window.location.href = location.replace('index-ar', 'index');
  }
  if (['en', 'ru', 'id', 'esp', 'fr', 'ger', 'ita', 'ban', 'ind'].includes(language)) {
    let lang = ':lang(' + language + ')';
    let hide = '[lang]:not(' + lang + ').localized';
    document.querySelectorAll(hide).forEach(function (node) {
      node.style.display = 'none';
    });
    let show = '[lang]' + lang + '.localized';
    document.querySelectorAll(show).forEach(function (node) {
      if (node.className.startsWith('block ')) {
        node.style.display = 'block';
      } else if (node.className.startsWith('inline-block ')) {
        node.style.display = 'inline-block';
      } else if (node.className.startsWith('list-item ')) {
        node.style.display = 'list-item';
      } else if (node.className.startsWith('flex ')) {
        node.style.display = 'flex';
      } else {
        node.style.display = 'unset';
      }
    });
    changeLangFlag(language);
    setCookie('lang', language);
  }
}

function keepLangPrefOnReload() {
  let location = window.location.href;
  if (location.includes('index-ar')) {
    setCookie('lang', 'ar');
  }
  let lang = getCookie('lang');
  if (lang) {
    if (lang === 'ar') {
      changeLangFlag(lang);
    } else if (['en', 'ru', 'id', 'esp', 'fr', 'ger', 'ita', 'ban', 'ind'].includes(lang)) {
      localize(lang);
    }
  } else {
    localize('en')
  }
}

function getCookie(name) {
  function escape(s) {
    return s.replace(/([.*+?^$(){}|\[\]\/\\])/g, '\\$1');
  }

  let match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
  return match ? match[1] : null;
}

function setCookie(name, value) {
  document.cookie = `${name}=${value}; expires=Sun, 1 Jan 2030 00:00:00 UTC; path=/`;
}

function changeLangFlag(language) {
  let flag = 'img.change_lang'
  document.querySelectorAll(flag).forEach(function (node) {
    node.src = 'assets/images/lang/' + language + '.png';
  });
}
