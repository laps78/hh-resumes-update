console.info("Hello from L.A.P.S. Lab!");
console.info(
  "Хочешь разрабатывать с нами новые полезные приложения для пользователей, браузерные расширения, новые фичи? Заходи на сайт проекта https://prolaps.ru! Там можно найти всю требуемую информацию! Присоединяйся к команде!"
);

const intervalTime = 10 * 60 * 1000;

function hhRuResumeUpdater() {
  console.log("Запускаем кликер по расписанию...");
  const resumeUpdateLinks = document.querySelectorAll(".bloko-link");
  if (resumeUpdateLinks) {
    resumeUpdateLinks.forEach((link) => {
      if (link.textContent === "Поднять в поиске") {
        link.click();
        console.log("Успешно поднял ваше резюме!");
      } else {
        console.log(
          `Не найдены ссылки со словами "Поднять в поиске", пропускаю до следущей проверки через ${
            intervalTime / 60000
          } минут.`
        );
      }
    });
  }

  function closeFuckenBanner() {
    const fuckenBannerCloseButton = document.querySelector(
      ".bloko-modal-close-button"
    );
    if (fuckenBannerCloseButton) {
      console.log(`Вижу рекламный баннер автоподнятия от hh.ru.`);
      fuckenBannerCloseButton.click();
      console.log(`Баннер hh.ru закрыт.`);
    } else {
      console.log(`Баннер не обнаружен. Игнорирую.`);
    }
  }
  setTimeout(closeFuckenBanner, 2500);
}

const sendStats = async () => {
  try {
  } catch (err) {
    console.error(`Ошибка при отправке обезличенной статистики`, error);
  }
};

setInterval(hhRuResumeUpdater, intervalTime);
