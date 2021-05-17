// -----------------  Слайдера --------------------

const Sliders = {
  INFORM: {
    ELEMENT: $('.inform-slider'),
    SETTINGS: {
      slidesToShow: 2,
      slidesToScroll: 1,
      prevArrow: '<div class="novelty-slider-left novelty-slider__button"><img src="img/slider-left.svg" alt="Слайд"></div>',
      nextArrow: '<div class="novelty-slider-right novelty-slider__button"><img src="img/slider-right.svg" alt="Слайд"></div>',
      dotsClass: "baner-slider__dots",
      responsive: [{
          breakpoint: 1150,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
          },
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
          },
        },
      ],
    },
    //BREAKPOINT: 768,
    //CLASSNAME: 'inform-slider--flex',
  },
}


function initialazeSlickSlider(slider) {
  const {
    BREAKPOINT,
    SETTINGS,
    ELEMENT
  } = slider;
  (document.documentElement.clientWidth <= BREAKPOINT || BREAKPOINT === undefined) && ELEMENT.slick(SETTINGS);
}

function toggleSlider(slider) {
  const {
    BREAKPOINT,
    ELEMENT,
    SETTINGS
  } = slider;
  document.documentElement.clientWidth > BREAKPOINT && ELEMENT.hasClass('slick-initialized') && ELEMENT.slick('unslick');
  document.documentElement.clientWidth <= BREAKPOINT && !ELEMENT.hasClass('slick-initialized') && ELEMENT.slick(SETTINGS);
}

function toggleExtraClass(slider) {
  const {
    BREAKPOINT,
    ELEMENT,
    CLASSNAME
  } = slider;
  document.documentElement.clientWidth > BREAKPOINT && !ELEMENT.hasClass(CLASSNAME) && ELEMENT.addClass(CLASSNAME);
  document.documentElement.clientWidth <= BREAKPOINT && ELEMENT.hasClass(CLASSNAME) && ELEMENT.removeClass(CLASSNAME);
}

initialazeSlickSlider(Sliders.INFORM);
initialazeSlickSlider(Sliders.NAVBAR);
initialazeSlickSlider(Sliders.FIRST_SLIDER);
initialazeSlickSlider(Sliders.BRAND_SLIDER);
initialazeSlickSlider(Sliders.HOT_SLIDER);
initialazeSlickSlider(Sliders.LIDERS_SLIDER);
initialazeSlickSlider(Sliders.NOVELTY_SLIDER);
initialazeSlickSlider(Sliders.PROD_SLIDER);
initialazeSlickSlider(Sliders.NAV_SLIDER);

window.addEventListener('resize', () => {
  toggleSlider(Sliders.INFORM);
  toggleExtraClass(Sliders.INFORM);
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

document.addEventListener('DOMContentLoaded', () => {

  // --------Burger menu---------
  let burgerCtr = document.querySelector("#burger-menu");
  let menuCtr = document.querySelector("#mobile-menu");
  let body = document.querySelector("body");
  burgerCtr.addEventListener("click", function () {
    this.classList.toggle("active");
    menuCtr.classList.toggle("show_mobile_menu");
    body.classList.toggle("lock");
  });
  // --------Burger menu END---------

})

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
