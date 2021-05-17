$(".catalog__menu-btn").on("click", function () {
  $(this).toggleClass("active");
  $(".catalog__menu-list").toggleClass("active");
  $(".overlay").toggleClass("active");
});

$(".overlay,.mobile__menu-close").on("click", function () {
  $(".overlay").removeClass("active");
  $(".catalog__menu-btn").removeClass("active");
  $(".catalog__menu-list").removeClass("active");
  $(".mobile__menu").removeClass("active");
});

$(".mobile__menu-btn").on("click", function () {
  $(".mobile__menu").toggleClass("active");
  $(".overlay").toggleClass("active");
});

// -----------------  Слайдера --------------------


var swiperMain = new Swiper('.swiper-container.main-slider', {
  pagination: '.swiper-pagination',
  paginationClickable: true,
  effect: 'coverflow',
  loop: true,
  centeredSlides: true,
  slidesPerView: 3,
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 40,
    modifier: 15,
    slideShadows: true,
  }
});






// -----------------  Селект  --------------------

// переменная не переназначается, поэтому используем const
// используем querySelectorAll, чтобы собрать массив со всеми сущностями .select
const select = document.querySelectorAll(".select");

// если массив не пустой, пробегаемся в цикле по каждой найденой сущности
if (select.length) {
  select.forEach((item) => {
    // достаем из текущей сущности .select__current
    const selectCurrent = item.querySelector(".select__current");

    item.addEventListener("click", (event) => {
      const el = event.target.dataset.choice;
      const text = event.target.innerText;

      // Проверяем является ли это choosen и не выбрано ли его значение уже
      if (el === "choosen" && selectCurrent.innerText !== text) {
        selectCurrent.innerText = text;
      }

      item.classList.toggle("is-active");
    });
  });
}
// ---------------- Счетчик ---------------------
$(function () {
  (function quantityProducts() {
    var $quantityArrowMinus = $(".block-count__minus");
    var $quantityArrowPlus = $(".block-count__plus");

    $quantityArrowMinus.click(quantityMinus);
    $quantityArrowPlus.click(quantityPlus);

    function quantityMinus() {
      var $quantityNum = $(this).siblings('.block-count__input');
      if ($quantityNum.val() > 1) {
        $quantityNum.val(+$quantityNum.val() - 1);
      }
    }

    function quantityPlus() {
      var $quantityNum = $(this).siblings('.block-count__input');
      $quantityNum.val(+$quantityNum.val() + 1);
    }
  })();
});

// document.addEventListener('DOMContentLoaded', () => {

//   // --------Burger menu---------
//   let burgerCtr = document.querySelector("#burger-menu");
//   let menuCtr = document.querySelector("#mobile-menu");
//   let body = document.querySelector("body");
//   burgerCtr.addEventListener("click", function () {
//     this.classList.toggle("active");
//     menuCtr.classList.toggle("show_mobile_menu");
//     body.classList.toggle("lock");
//   });
//   // --------Burger menu END---------

// })

// ----------------- Аккордион --------------------
/**
 * Классы для аккордиона
 */
const accordeon = {
  CLASS: 'accordion',
  CLASS_ACTIVE: 'accordion__active',
}

/**
 * acc - неизменная переменная для работы с аккордионом
 */
const acc = document.querySelectorAll(`.${accordeon.CLASS}`);
let openedAccordeon = null;

/**
 * использует nextElementSibling для открытия или закрытия аккордиона
 */
function closeAccordeon(acc) {
  acc.nextElementSibling.style.maxHeight = 0;
  acc.classList.remove(accordeon.CLASS_ACTIVE);
}


function openAccordeon(acc) {
  acc.nextElementSibling.style.maxHeight = `${acc.nextElementSibling.scrollHeight}px`;
  acc.classList.add(accordeon.CLASS_ACTIVE);
}

/**
 * Проверка на открытие аккордиона !nextElementSibling!
 */
function isAccordeonOpen(acc) {
  acc.nextElementSibling && !acc.nextElementSibling.style.maxHeight
}

/**
 * Итерация, реализация переключения открытого аккордиона
 *
 */
for (const accordeon of acc) {
  accordeon.addEventListener("click", function () {
    const currentAccordeon = this;

    openedAccordeon && closeAccordeon(openedAccordeon);

    if (isAccordeonOpen(currentAccordeon)) {
      closeAccordeon(currentAccordeon);
    } else {
      openAccordeon(currentAccordeon);
      openedAccordeon = currentAccordeon;
    }
  });
};

// --------------

const accordionList = document.getElementsByClassName("accordion--multiple");
const classNameActive = "accordion--active";

for (const accordion of accordionList) {
  accordion.addEventListener("click", function () {
    this.classList.toggle(classNameActive);
    const panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}


//tabs
var $tabs = function (target) {
  var
    _elemTabs = (typeof target === 'string' ? document.querySelector(target) : target),
    _eventTabsShow,
    _showTab = function (tabsLinkTarget) {
      var tabsPaneTarget, tabsLinkActive, tabsPaneShow;
      tabsPaneTarget = document.querySelector(tabsLinkTarget.getAttribute('href'));
      tabsLinkActive = tabsLinkTarget.parentElement.querySelector('.tabs__link_active');
      tabsPaneShow = tabsPaneTarget.parentElement.querySelector('.tabs__pane_show');
      // если следующая вкладка равна активной, то завершаем работу
      if (tabsLinkTarget === tabsLinkActive) {
        return;
      }
      // удаляем классы у текущих активных элементов
      if (tabsLinkActive !== null) {
        tabsLinkActive.classList.remove('tabs__link_active');
      }
      if (tabsPaneShow !== null) {
        tabsPaneShow.classList.remove('tabs__pane_show');
      }
      // добавляем классы к элементам (в завимости от выбранной вкладки)
      tabsLinkTarget.classList.add('tabs__link_active');
      tabsPaneTarget.classList.add('tabs__pane_show');
      document.dispatchEvent(_eventTabsShow);
    },
    _switchTabTo = function (tabsLinkIndex) {
      var tabsLinks = _elemTabs.querySelectorAll('.tabs__link');
      if (tabsLinks.length > 0) {
        if (tabsLinkIndex > tabsLinks.length) {
          tabsLinkIndex = tabsLinks.length;
        } else if (tabsLinkIndex < 1) {
          tabsLinkIndex = 1;
        }
        _showTab(tabsLinks[tabsLinkIndex - 1]);
      }
    };

  _eventTabsShow = new CustomEvent('tab.show', {
    detail: _elemTabs
  });

  _elemTabs.addEventListener('click', function (e) {
    var tabsLinkTarget = e.target;
    // завершаем выполнение функции, если кликнули не по ссылке
    if (!tabsLinkTarget.classList.contains('tabs__link')) {
      return;
    }
    // отменяем стандартное действие
    e.preventDefault();
    _showTab(tabsLinkTarget);
  });

  return {
    showTab: function (target) {
      _showTab(target);
    },
    switchTabTo: function (index) {
      _switchTabTo(index);
    }
  }

};

//tabs
