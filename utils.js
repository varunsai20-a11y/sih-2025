/* Small utility helpers */
export const $ = (s) => document.querySelector(s);
export const $$ = (s) => Array.from(document.querySelectorAll(s));
export const nowHM = () => dayjs().format("HH:mm");
export const addMinHM = (hm, mins) =>
  dayjs()
    .hour(+hm.slice(0, 2))
    .minute(+hm.slice(3, 5))
    .add(mins, "minute")
    .format("HH:mm");
