$(document).ready(function(){
  async function getInfo () {
    let infos =  await fetch('https://simulados.evolucional.com.br/painel/json/get-evaluations-without-questions')
      .then(res => res.json())
      .then(response => response.getEvaluationsInfo)
    infos = infos.sort((a, b) => a.id - b.id)
    infos.forEach(x => {
      $('.table-body').append(`<tr><td>${x.id}</td><td>${x.name}</td></tr>`)
    })
    $('.table-1').removeClass('table').addClass('display').attr('id', 'table-1');
    $('.table-body').attr('id', 'value');
    $('#table-1').DataTable({
      paging: true,
      ordering:  false,
      select: true
    });
    const items = count(infos)
    items[0].forEach(x => {
      console.log(items)
      $('#count-tbody').append(`<tr><td>${x.name}</td><td>${x.count}</td></tr>`)
    })
    items[1].forEach(x => {
      $('#distint-tbody').append(`<tr><td>${x}</td></tr>`)
    })
  };
  getInfo()
});

const count = (list) => {
  let count = 0
  let arr = list
  let newArr = []
  for (let x of list) {
    count = 0
    for (let y of arr) {
      if (x.name === y.name) {
        count += 1
      }
    }
    newArr.push({
      'name': x.name,
      'count': count
    })
  }
  let filter = newArr.sort((a,b) => a.count - b.count)
  let filterArr = []
  let returnArr = []
  let distintName = []
  let countName = 5
  filter.map(x => {
    if (!filterArr.includes(x.name)) {
      filterArr.push(x.name)
      returnArr.push(x)
      if (countName != 0) {
        distintName.push(x.name)
        countName--
      }
    }
  })
  let highesValue = returnArr[returnArr.length - 1].count
  return [returnArr.filter(x => x.count === highesValue), distintName]
}