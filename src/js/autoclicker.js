console.info("Hello from L.A.P.S. Lab!");
console.info(
  "Хочешь разрабатывать с нами новые полезные приложения для пользователей, браузерные расширения, новые фичи? Заходи на сайт проекта https://prolaps.ru! Там можно найти всю требуемую информацию! Присоединяйся к команде!"
);

// init app
const intervalTime = 0.5 * 60 * 1000;

const getTimeStamp = () => {
  const now = new Date();
  const timestamp = now.getTime();
  return timestamp;
};

// Временное местообитания логгера

const writeDataToStorage = async (data) => {
  try {
    const writtenData = await chrome.storage.local.set({ "hh-ak": data });
    if (writtenData) {
      //
      console.log("WRITTEN TO LS!");
    }
  } catch (error) {
    console.error(`Ошибка работы с локальным хранищищем (запись): `, error);
  }
};

const checkInstall = async () => {
  try {
    //
    console.log("storage: ", chrome.storage);
    const readData = await chrome.storage.local.get(["hh_ak"]);
    if (readData) {
      //
      console.log("data LS found: ", readData);
      return true;
    }
  } catch (error) {
    console.error(`Ошибка работы с локальным хранищищем (чтение): `, error);
  }
  return false;
};

const readDataFromStorage = async () => {
  try {
    const readData = await chrome.storage.local.get(["hh_ak"]);
    if (readData) {
      //
      console.log("data LS found: ", readData);
      return readData;
    }
  } catch (error) {
    console.error(`Ошибка работы с локальным хранищищем (чтение): `, error);
  }
};
/**
 * Готовим данные для отправки
 * @param {string} action
 * @returns {object} data
 */
const collectPrepareData = (action) => {
  try {
    const userAgent = window.clientInformation.userAgent;
    const timestamp = getTimeStamp();
    const data = {
      user: `${userAgent}_${timestamp}`,
      action: action,
    };
    //
    console.log("Log подготовил data: ", data);
    return data;
  } catch (error) {
    console.error(`Ошибка функции подготовки статистических данных: `, error);
  }
};
/**
 * Отсылаем анонимную статистику использоания разработчикам
 * @param {string} url
 * @param {string} method
 * @param {object} data
 */
const sendStats = async (url, method = "POST", data) => {
  try {
    await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });
  } catch (error) {
    console.error(`Ошибка при отправке обезличенной статистики: `, error);
  }
};

const logger = (action) => {
  try {
    const data = collectPrepareData(action);
  } catch (error) {
    console.error(`Ошибка при работе логгера:  `, error);
  }
};

// полезные действия расширения
function hhRuResumeUpdater() {
  try {
    console.log("Запускаем кликер по расписанию...");
    const resumeUpdateLinks = document.querySelectorAll(".bloko-link");
    if (resumeUpdateLinks) {
      resumeUpdateLinks.forEach((link) => {
        if (link.textContent === "Поднять в поиске") {
          link.click();
          console.info("Успешно поднял ваше резюме!");
          logger(`Успешно поднял резюме клиента!`);
        } else {
          //
          logger("update link not found");
          console.info(
            `Не найдены ссылки со словами "Поднять в поиске", пропускаю до следущей проверки через ${
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
        console.log(`Вижу рекламный баннер автоподнятия от hh.ru.`);
        fuckenBannerCloseButton.click();
        console.info(`Баннер hh.ru закрыт.`);
      } else {
        console.info(`Баннер не обнаружен. Игнорирую.`);
      }
    } catch (error) {
      console.error(`Ошибка функции работы с баннером hh.ru: `, error);
    }
  }
  setTimeout(closeFuckenBanner, 2500);
}

window.addEventListener("load", () => {
  //
  console.log("load!");
  //
  console.log("window: ", window);
  // add app LS installation mark
  if (!checkInstall()) {
    const data = getTimeStamp();
    writeDataToStorage(data);
  }
  setInterval(hhRuResumeUpdater, intervalTime);
});
