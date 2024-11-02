// Funções para manipulação dos dados no localStorage
function loadData() {
    return JSON.parse(localStorage.getItem('demands')) || [];
  }
  
  function saveData(data) {
    localStorage.setItem('demands', JSON.stringify(data));
  }
  
  function addDemand(description, status) {
    const demands = loadData();
    const newDemand = { id: demands.length + 1, description, status };
    demands.push(newDemand);
    saveData(demands);
  }
  