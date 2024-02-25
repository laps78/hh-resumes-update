console.info("Hello from L.A.P.S. Lab!");
console.info(
  "Хочешь разрабатывать с нами новые полезные приложения для пользователей, браузерные расширения, новые фичи? Заходи на сайт проекта https://prolaps.ru! Там можно найти всю требуемую информацию! Присоединяйся к команде!"
);

// init app
const intervalTime = 15 * 60 * 1000;

const getTimeStamp = () => {
  const now = new Date();
  const timestamp = now.toLocaleString("ru-RU");
  return timestamp;
};

// полезные действия расширения
function hhRuResumeUpdater() {
  try {
    console.info(
      `[${getTimeStamp()}]: Запускаем HH.RU кликер по расписанию...`
    );
    const resumeUpdateLinks = document.querySelectorAll(".bloko-link");
    if (resumeUpdateLinks) {
      resumeUpdateLinks.forEach((link) => {
        if (link.textContent === "Поднять в поиске") {
          const timestamp = getTimeStamp();
          link.click();
          console.info(`[${getTimeStamp()}]: Успешно поднял ваше резюме!`);
        } else {
          console.info(
            `[${getTimeStamp()}]: Не найдены ссылки со словами "Поднять в поиске", пропускаю до следущей проверки через ${
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
        console.info(`[${getTimeStamp()}]: Баннер hh.ru закрыт.`);
      } else {
        console.info(`[${getTimeStamp()}]: Баннер не обнаружен. Игнорирую.`);
      }
    } catch (error) {
      console.error(
        `[${getTimeStamp()}]: Ошибка функции работы с баннером hh.ru: `,
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
