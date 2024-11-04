console.info("Hello from L.A.P.S. Lab!");
console.info(
  "Хочешь разрабатывать с нами новые полезные приложения для пользователей, браузерные расширения, новые фичи? Заходи на сайт проекта https://prolaps.ru! Там можно найти всю требуемую информацию! Присоединяйся к команде!"
);

// init app
const intervalTime = 1 * 60 * 1000;

const getTimeStamp = () => {
  const now = new Date();
  const timestamp = now.toLocaleString("ru-RU");
  return timestamp;
};

// полезные действия расширения
function hhRuResumeUpdater() {
  try {
    console.info(
      `[${getTimeStamp()}]:\n Запускаем HH.RU кликер по расписанию...`
    );
    const resumeUpdateLinks = document.querySelectorAll("div");
    if (resumeUpdateLinks) {
      resumeUpdateLinks.forEach((link) => {
        if (link.textContent.toLowerCase() === "поднять") {
          const timestamp = getTimeStamp();
          link.click();
          console.info(`[${getTimeStamp()}]:\n Успешно поднял ваше резюме!`);
        } else {
          console.info(
            `[${getTimeStamp()}]:\n Не найдены целевые ссылки, до следущей проверки через ${
              intervalTime / 60000
            } минут.`
          );
        }
      });
    }
  } catch (error) {
    console.error(`Ошибка кликера: `, error);
  }

  function closeFuckenBanner() {
    try {
      const fuckenBannerCloseButton = document.querySelector(
        ".bloko-modal-close-button"
      );
      if (fuckenBannerCloseButton) {
        console.info(
          `[${getTimeStamp()}]: Вижу рекламный баннер автоподнятия от hh.ru.`
        );
        fuckenBannerCloseButton.click();
        console.info(`[${getTimeStamp()}]:\n Баннер hh.ru закрыт.`);
      } else {
        console.info(`[${getTimeStamp()}]:\n Баннер не обнаружен. Игнорирую.`);
      }
    } catch (error) {
      console.error(
        `[${getTimeStamp()}]:\n Ошибка функции работы с баннером hh.ru: `,
        error
      );
    }
  }
  setTimeout(closeFuckenBanner, 2500);
}

window.addEventListener("load", () => {
  // сразу запускаем работу основных функций
  hhRuResumeUpdater();

  // планируем дежурство в заданном интервале
  setInterval(hhRuResumeUpdater, intervalTime);
});
