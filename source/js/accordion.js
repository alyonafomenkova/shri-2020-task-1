`use strict`;

(function () {
  const accordionList = document.querySelectorAll(`.e-accordion`);

  function onAccordionClick(accordion) {
    const toggleAccordionClassName = `e-accordion__more_show`;
    const accordingClassList = accordion.querySelector('.e-accordion__more').classList;

    return function () {
      accordingClassList.contains(toggleAccordionClassName) ?
      accordingClassList.remove(toggleAccordionClassName) :
      accordingClassList.add(toggleAccordionClassName);
    };
  }

  accordionList.forEach(accordion => {
    accordion.addEventListener(`click`, onAccordionClick(accordion));
  });
}) ();
