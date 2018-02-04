const MathService = {
  decimalPlaces: function (num) {
    let testNum = num.toString()
    return (testNum.split('.')[1] || []).length > 3
  }
}

export default MathService
