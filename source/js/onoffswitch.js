(function () {
  const DEFAULT_THEME_CLASS = `theme_color_project-default`;
  const INVERSE_THEME_CLASS = `theme_color_project-inverse`;
  const checkedSwitchButtonClassName = 'onoffswitch_checked';

  const switchButton = document.querySelector(`.onoffswitch`);

  function toggleClass (blocks, fromClassName, toClassName){
    blocks.forEach(block => {
      block.classList.toggle(fromClassName);
      block.classList.toggle(toClassName);
    });
  }

  function onChangeTheme() {
    const defaultThemeBlocks = document.querySelectorAll(`.${DEFAULT_THEME_CLASS}`);
    const inverseThemeBlocks = document.querySelectorAll(`.${INVERSE_THEME_CLASS}`);
    toggleClass(defaultThemeBlocks, DEFAULT_THEME_CLASS, INVERSE_THEME_CLASS);
    toggleClass(inverseThemeBlocks, INVERSE_THEME_CLASS, DEFAULT_THEME_CLASS);

    let classListOfSwitchButton = switchButton.classList;
    classListOfSwitchButton.contains(checkedSwitchButtonClassName) ? // TODO: возможно, стоит вынести в общий модуль, т.к. похожее в according.js
      classListOfSwitchButton.remove(checkedSwitchButtonClassName) :
      classListOfSwitchButton.add(checkedSwitchButtonClassName);
  }

  switchButton.addEventListener(`click`, onChangeTheme);
}) ();

// TODO: События на блоках должны делегироваться в один обработчик на теге <body>
