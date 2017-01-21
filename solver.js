function checkArrayWorks(array) {
  var hashMap = {};
  for (var val of array) {
    if (hashMap[val] || val === 0) { // if something is already here (we found a duplicate)
      return false;
    } else { // if this value hasnt been added yet
      hashMap[val] = 1;
    }
  }
  return true;
}

export.module = {
  checkArrayWorks: checkArrayWorks
}
