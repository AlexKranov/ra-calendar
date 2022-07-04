import moment from "moment";
import "moment/locale/ru";

import PropTypes from "prop-types";
const USID = require("usid");
const usid = new USID();

export default function Calendar(props) {
  const date = moment(props.date);

  const [currentDay, currentMonth, currentYear] = date.format("LL").split(" ");

  const curMonth = moment(new Date(date.year(), date.month())).daysInMonth(); //количество дней в текущем месяце

  let prevMonth = moment(new Date(date.year(), date.month() - 1)).daysInMonth(); //предыдущий месяц(количество дней)

  const startDayInMonth = moment(
    new Date(date.year(), date.month())
  ).isoWeekday(); //индекс 1 числа текущего месяца

  const rows = 6;
  const cols = 7;

  const index = (startDayInMonth + rows) % cols; //сколько дней предшествует 1 числу текущего месяца

  let tbody = [];
  let tr;
  let nextDay = 1;
  let count = 1 - index;

  for (let i = 0; i < rows; i++) {
    tr = [];
    for (let j = 0; j < cols; j++) {
      if (count <= 0) {
        tr.push(
          <td key={usid.rand()} className="ui-datepicker-other-month">
            {count + prevMonth}
          </td>
        );
      } else if (count === Number(currentDay)) {
        tr.push(
          <td key={usid.rand()} className="ui-datepicker-today">
            {count}
          </td>
        );
      } else if (count > 0 && count <= curMonth) {
        tr.push(<td key={usid.rand()}>{count}</td>);
      } else if (count > curMonth) {
        tr.push(
          <td key={usid.rand()} className="ui-datepicker-other-month">
            {nextDay++}
          </td>
        );
      }

      count++;
    }
    tbody.push(<tr key={usid.rand()}>{tr}</tr>);
  }

  return (
    <div className="ui-datepicker">
      <div className="ui-datepicker-material-header">
        <div className="ui-datepicker-material-day">{date.format("dddd")}</div>
        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">{currentDay}</div>
          <div className="ui-datepicker-material-month">{currentMonth}</div>
          <div className="ui-datepicker-material-year">{currentYear}</div>
        </div>
      </div>
      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month">{date.format("MMMM")}</span>
          &nbsp;
          <span className="ui-datepicker-year">{currentYear}</span>
        </div>
      </div>
      <table className="ui-datepicker-calendar">
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
          <col className="ui-datepicker-week-end" />
          <col className="ui-datepicker-week-end" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col" title="Понедельник">
              Пн
            </th>
            <th scope="col" title="Вторник">
              Вт
            </th>
            <th scope="col" title="Среда">
              Ср
            </th>
            <th scope="col" title="Четверг">
              Чт
            </th>
            <th scope="col" title="Пятница">
              Пт
            </th>
            <th scope="col" title="Суббота">
              Сб
            </th>
            <th scope="col" title="Воскресенье">
              Вс
            </th>
          </tr>
        </thead>
        <tbody>{tbody}</tbody>
      </table>
    </div>
  );
}

Calendar.propTypes = {
  item: PropTypes.shape({
    now: PropTypes.object,
  }),
};
