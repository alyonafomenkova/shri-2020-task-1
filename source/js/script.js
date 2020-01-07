(function () {
  const ACCORDION_CLASS = 'e-accordion';
  const ACCORDION_MORE_CLASS = 'e-accordion__more';
  const TOGGLE_ACCORDION_CLASS = 'e-accordion__more_show';
  const SWITCH_BUTTON_CLASS = 'onoffswitch';
  const CHECKED_SWITCH_BUTTON_CLASS = 'onoffswitch_checked';
  const DEFAULT_THEME_CLASS = 'theme_color_project-default';
  const INVERSE_THEME_CLASS = 'theme_color_project-inverse';
  const body = document.querySelector('body');
  const switchButton = body.querySelector('.onoffswitch');

  function replaceClassElements(elements, fromClassName, toClassName) {
    elements.forEach((element) => {
      element.classList.toggle(fromClassName);
      element.classList.toggle(toClassName);
    });
  }

  function switchTheme() {
    const defaultThemeBlocks = body.querySelectorAll(`.${DEFAULT_THEME_CLASS}`);
    const inverseThemeBlocks = body.querySelectorAll(`.${INVERSE_THEME_CLASS}`);
    replaceClassElements(defaultThemeBlocks, DEFAULT_THEME_CLASS, INVERSE_THEME_CLASS);
    replaceClassElements(inverseThemeBlocks, INVERSE_THEME_CLASS, DEFAULT_THEME_CLASS);
    switchButton.classList.toggle(CHECKED_SWITCH_BUTTON_CLASS);
  }

  function toggleAccordionListElement(parent) {
    const accordingClassList = parent.querySelector(`.${ACCORDION_MORE_CLASS}`).classList;
    accordingClassList.toggle(TOGGLE_ACCORDION_CLASS);
  }

  function checkSwitchThemeClick(element) {
    const consumed = element.closest(`.${SWITCH_BUTTON_CLASS}`) != null;
    if (consumed) {
      switchTheme();
    }
    return consumed;
  }

  function checkAccordionListElementClick(element) {
    const parent = element.closest(`.${ACCORDION_CLASS}`);
    if (parent != null) {
      toggleAccordionListElement(parent);
      return true;
    }
    return false;
  }

  function onBodyClick(event) {
    const element = event.target;
    if (element != null) {
      if (checkSwitchThemeClick(element)) return;
      checkAccordionListElementClick(element);
    }
  }

  body.addEventListener('click', onBodyClick);
}());
