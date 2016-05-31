const addTime = (source, minutes) => {
  let newDate = new Date(source);

  let addHours = minutes % 60;
  let addMinutes = minutes - (addHours * 60);

  newDate.setHours(source.getHours() + addHours);
  newDate.setMinutes(source.getMinutes() + addMinutes);
  return newDate;
};

const removeBusyTerms = (terms, busyTerms) => {
  return terms.filter((term) => {
    for (let busy of busyTerms) {
      if ((busy.start <= term.start && term.start < busy.end) ||
        (busy.start < term.end && term.end <= busy.end)) {
        return false;
      }
    }
    return true;
  });
};

const generateTerms = (doctorWorkHours, busyTerms, time) => {
  time = Number(time);
  let freeTerms = [];
  let tempStart = new Date(0);
  let tempEnd = new Date(0);

  for (let workHours of doctorWorkHours) {
    let start = new Date(workHours.start);
    let end = new Date(workHours.end);

    tempStart.setTime(start.getTime());
    tempStart.setMinutes(0);
    tempEnd.setTime(start.getTime());
    tempEnd = addTime(start, time);

    while(tempStart >= start && tempEnd <= end) {
      freeTerms.push({
        id: freeTerms.length,
        start: tempStart,
        end: tempEnd,
        selected: false
      });

      tempStart = addTime(tempStart, 30);
      tempEnd = addTime(tempEnd, 30);
    }
  }
  let outData = removeBusyTerms(freeTerms, busyTerms);

  return outData.map((item, index) => {
    item.index = index;
    return item;
  });
};

export default generateTerms;