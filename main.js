/* ====== Алматы сайтының скрипті ====== */
document.addEventListener('DOMContentLoaded', function () {

  /* 1. Мобильді мәзір (бургер) */
  var burger = document.querySelector('.burger');
  var links = document.querySelector('.nav-links');
  if (burger && links) {
    burger.addEventListener('click', function () {
      links.classList.toggle('open');
      var open = links.classList.contains('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  /* 2. Бет ішіндегі мәзірдің белсенді сілтемесін бөлектеу (scroll-spy) */
  var pageNavLinks = document.querySelectorAll('.page-nav a');
  if (pageNavLinks.length) {
    var sections = [];
    pageNavLinks.forEach(function (link) {
      var id = link.getAttribute('href');
      if (id && id.charAt(0) === '#') {
        var sec = document.querySelector(id);
        if (sec) sections.push({ link: link, sec: sec });
      }
    });
    function onScroll() {
      var pos = window.scrollY + 140;
      var current = null;
      sections.forEach(function (s) {
        if (s.sec.offsetTop <= pos) current = s;
      });
      pageNavLinks.forEach(function (l) { l.classList.remove('current'); });
      if (current) current.link.classList.add('current');
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* 3. Кері байланыс формасын тексеру */
  var form = document.getElementById('feedback-form');
  if (form) {
    var msg = document.getElementById('form-msg');
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function setInvalid(field, bad) {
      field.classList.toggle('invalid', bad);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      var name = form.querySelector('#f-name');
      var email = form.querySelector('#f-email');
      var text = form.querySelector('#f-msg');

      [[name, name.value.trim().length >= 2],
       [email, emailRe.test(email.value.trim())],
       [text, text.value.trim().length >= 5]
      ].forEach(function (pair) {
        var bad = !pair[1];
        setInvalid(pair[0].closest('.field'), bad);
        if (bad) ok = false;
      });

      if (ok) {
        form.reset();
        msg.textContent = 'Рақмет, ' + name.value.trim().split(' ')[0] +
          '! Хабарламаңыз қабылданды.';
        msg.classList.add('show');
        setTimeout(function () { msg.classList.remove('show'); }, 6000);
      }
    });

    form.querySelectorAll('input,textarea').forEach(function (el) {
      el.addEventListener('input', function () {
        el.closest('.field').classList.remove('invalid');
      });
    });
  }

  /* 4. Колонтитулдағы ағымдағы жыл */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});
