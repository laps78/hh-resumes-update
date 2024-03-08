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

// init app
const w = window;
const d = document;
const targetClass = "f-test-button-Podnyat_v_poiske";
const intervalToUpdate = 1000 * 60 * 10;

const updater = () => {
  console.info(`[${getTimeStamp()}]:\n Запускаем SJ кликер по расписанию...`);
  const closeBanner = () => {
    try {
      console.info(
        `[${getTimeStamp()}]: Ищу рекламный баннер автоподнятия от superjob.ru`
      );
      const btns = d.querySelectorAll(".f-test-button-Obnovit");
      if (btns) {
        btns.forEach((btn) => btn.click());
        console.info(`Баннер обнаружен, кнопка [ поднять ] обработана`);
        window.location.reload();
      } else {
        console.info(
          `[ ${getTimeStamp()} ]:\n Баннер не обнаружен. Игнорирую.`
        );
      }
    } catch (error) {
      console.error(
        `[ ${getTimeStamp} ] ошибка функции обработки баннера`,
        error
      );
    }
  };

  const all_btns = d.querySelectorAll("button");

  all_btns.forEach((btn) => {
    try {
      if (btn.classList.contains(targetClass)) {
        btn.click();
        console.info("resume updated!");
        setTimeout(closeBanner, 2500);
      } else {
        console.info(`update buttons not found`);
      }
    } catch (error) {
      console.error(`[ ${getTimeStamp} ] ошибка функции автокликера`, error);
    }
  });
};

const updateSheduler = () => {
  try {
    updater();
    setInterval(updater, intervalToUpdate);
    console.info(
      `update sheduled for every ${intervalToUpdate / (1000 * 60)} minutes`
    );
  } catch (error) {
    console.error(`[ ${getTimeStamp} ] ошибка функции планировшика`, error);
  }
};

w.addEventListener("load", updateSheduler);
