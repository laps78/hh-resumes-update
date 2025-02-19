console.info("Hello from L.A.P.S. Lab!");
console.info(
  "Хочешь разрабатывать с нами новые полезные приложения для пользователей, браузерные расширения, новые фичи? Заходи на сайт проекта https://prolaps.ru! Там можно найти всю требуемую информацию! Присоединяйся к команде!"
);

// init app
const w = window;
const d = document;
//const targetClass = "f-test-button-Podnyat_v_poiske";
const intervalToUpdate = 1000 * 60 * 1;

//init functions
const getTimeStamp = () => {
  const now = new Date();
  const timestamp = now.toLocaleString("ru-RU");
  return timestamp;
};

const closeBanner = () => {
  try {
    console.info(
      `[${getTimeStamp()}] Ищу целевые элементы...`
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
      `[ ${getTimeStamp} ] ошибка функции обработки баннера <${closeBanner.name}>`,
      error
    );
  }
};

const updater = () => {
  console.info(`[${getTimeStamp()}]:\n Запускаем SJ кликер по расписанию...`);
  const all_btns = d.querySelectorAll("span");

  all_btns.forEach((btn) => {
    try {
      const btnTextContent = btn.textContent.toLowerCase();
      if ( btnTextContent === "обновить все резюме" || btnTextContent === "поднять в поиске") {
        btn.click();
        console.info("Успешно нажал кнопку [ Обновить все резюме ]!");
        setTimeout(closeBanner, 2500);
        w.location.reload();
      } else {
        console.info(`[${getTimeStamp()}] Целевые элементы не найдены.`);
      }
    } catch (error) {
      console.error(`[ ${getTimeStamp} ] ошибка функции автокликера <${updater.name}>`, error);
    }
  });
};

const updateSheduler = () => {
  try {
    updater();
    setInterval(updater, intervalToUpdate);
    console.info(
      `[${getTimeStamp()}] update sheduled for every ${intervalToUpdate / (1000 * 60)} minutes`
    );
  } catch (error) {
    console.error(`[ ${getTimeStamp} ] ошибка функции планировшика <${updateSheduler.name}>`, error);
  }
};

w.addEventListener("load", updateSheduler);
