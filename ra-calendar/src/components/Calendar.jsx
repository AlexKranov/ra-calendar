import PropTypes from "prop-types";

const secondsPerDay = 999;

function CalendarFunc(props) {
    const { date } = props;
    const currentYear = date.getFullYear();
    const day = date.getDay();
    const month = date.getMonth();
    const currentDate = date.getDate();

    const currentMonth = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ][month];
    const currentDay = [
        'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'
    ][day];

    // Getting date just before first day:
    const firstDate = new Date(currentYear, month, 1 );
    const beforeFirstDate = new Date(firstDate.getTime() - secondsPerDay);
    const dateBeforeMonthStarts = beforeFirstDate.getDate();

    // Getting last date of the month:
    const firstDateOfNextMonth = new Date(currentYear, (month + 1) <= 11 ? month + 1 : 0, 1)
    const lastDateOfMonth = new Date(firstDateOfNextMonth.getTime() - secondsPerDay);
    const dateMonthEnds = lastDateOfMonth.getDate();

    // Put month dates into array:
    const monthDates = Array(dateMonthEnds).fill(0).map((x, index) => x = index + 1);

    // Find how many days needed to be added in front of the month:
    let daysToUnshift;
    const dayOfFirstDate = firstDate.getDay();
    if (dayOfFirstDate === 0) { // means Sunday
        daysToUnshift = 6;
    } else {
        daysToUnshift = dayOfFirstDate - 1;
    }

    // Add the days:
    for (let i = 0; i < daysToUnshift; i++) {
        monthDates.unshift('' + (dateBeforeMonthStarts - i));
    }

    // Find how many dates needs to be added with push:
    const daysToPush = 7 - monthDates.length % 7;

    // Add the days, if necessary
    for (let i = 0; i < daysToPush; i++) {
        monthDates.push('' + (1 + i));
    }

    // Combine weeks to sub arrays:
    const weeks = monthDates.length / 7;
    const weeksArray = [];
    for (let i = 0; i < weeks; i++) {
        weeksArray.push(monthDates.slice(i * 7, i*7 + 7));
    }

    // Returning component:
    return (
        <div className="ui-datepicker">
            <div className="ui-datepicker-material-header">
                <div className="ui-datepicker-material-day">{currentDay}</div>
                <div className="ui-datepicker-material-date">
                    <div className="ui-datepicker-material-day-num">{currentDate}</div>
                    <div className="ui-datepicker-material-month">{currentMonth}</div>
                    <div className="ui-datepicker-material-year">{currentYear}</div>
                </div>
            </div>
            <div className="ui-datepicker-header">
                <div className="ui-datepicker-title">
                    <span className="ui-datepicker-month">{currentMonth}</span>&nbsp;<span
                    className="ui-datepicker-year">{currentYear}</span>
                </div>
            </div>
            <table className="ui-datepicker-calendar">
                <colgroup>
                    <col/>
                    <col/>
                    <col/>
                    <col/>
                    <col/>
                    <col className="ui-datepicker-week-end"/>
                    <col className="ui-datepicker-week-end"/>
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col" title="Понедельник">Пн</th>
                        <th scope="col" title="Вторник">Вт</th>
                        <th scope="col" title="Среда">Ср</th>
                        <th scope="col" title="Четверг">Чт</th>
                        <th scope="col" title="Пятница">Пт</th>
                        <th scope="col" title="Суббота">Сб</th>
                        <th scope="col" title="Воскресенье">Вс</th>
                    </tr>
                </thead>
                <tbody>
                    {weeksArray.map((week, index) =>
                        <tr key={'week' + index}>
                            {week.map((date) =>
                                <td className={
                                    typeof date === 'string'? 'ui-datepicker-other-month' : '' +
                                    typeof date === 'number' && date === currentDate ? 'ui-datepicker-today' : ''
                                } key={date}>{date}</td>
                            )}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

CalendarFunc.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired
}

export default CalendarFunc;