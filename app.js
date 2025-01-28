document.addEventListener('DOMContentLoaded', () => {
    const stockData = JSON.parse(stockContent);
    const userRecords = JSON.parse(userContent);
  
    const deleteBtn = document.querySelector('#btnDelete');
    const saveBtn = document.querySelector('#btnSave');
  
    renderUsers(userRecords, stockData);
  
    deleteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const userId = document.querySelector('#userID').value;
      const index = userRecords.findIndex((record) => record.id == userId);
  
      if (index !== -1) {
        userRecords.splice(index, 1);
        resetForm();
        resetPortfolio();
        renderUsers(userRecords, stockData);
      }
    });
  
    saveBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = document.querySelector('#userID').value;
  
      const userToUpdate = userRecords.find((record) => record.id == id);
      if (userToUpdate) {
        const updatedData = {
          firstname: document.querySelector('#firstname').value,
          lastname: document.querySelector('#lastname').value,
          address: document.querySelector('#address').value,
          city: document.querySelector('#city').value,
          email: document.querySelector('#email').value,
        };
        Object.assign(userToUpdate.user, updatedData);
        renderUsers(userRecords, stockData);
      }
    });
  });
  
  function renderUsers(users, stocks) {
    const userContainer = document.querySelector('.user-list');
    userContainer.innerHTML = '';
  
    for (const { user, id } of users) {
      const userItem = document.createElement('li');
      userItem.textContent = `${user.lastname}, ${user.firstname}`;
      userItem.dataset.userId = id;
      userContainer.appendChild(userItem);
    }
  
    userContainer.addEventListener('click', (e) => {
      const selectedId = e.target.dataset.userId;
      const selectedUser = users.find((record) => record.id == selectedId);
      if (selectedUser) {
        updateForm(selectedUser);
        showPortfolio(selectedUser, stocks);
      }
    });
  }
  
  function updateForm(record) {
    const { user, id } = record;
    document.querySelector('#userID').value = id;
    document.querySelector('#firstname').value = user.firstname;
    document.querySelector('#lastname').value = user.lastname;
    document.querySelector('#address').value = user.address;
    document.querySelector('#city').value = user.city;
    document.querySelector('#email').value = user.email;
  }
  
  function showPortfolio(record, stocks) {
    const portfolioList = document.querySelector('.portfolio-list');
    portfolioList.innerHTML = '';
  
    record.portfolio.forEach((entry) => {
      const stockSymbol = document.createElement('p');
      const stockShares = document.createElement('p');
      const viewButton = document.createElement('button');
  
      stockSymbol.textContent = `Stock: ${entry.symbol}`;
      stockShares.textContent = `Shares: ${entry.owned}`;
      viewButton.textContent = 'View Details';
      viewButton.dataset.stockSymbol = entry.symbol;
  
      portfolioList.appendChild(stockSymbol);
      portfolioList.appendChild(stockShares);
      portfolioList.appendChild(viewButton);
    });
  
    portfolioList.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        const stockSymbol = e.target.dataset.stockSymbol;
        if (stockSymbol) {
          displayStockDetails(stockSymbol, stocks);
        }
      }
    });
  }
  
  function displayStockDetails(symbol, stocks) {
    const stockInfo = stocks.find((stock) => stock.symbol == symbol);
    const stockArea = document.querySelector('.stock-form');
  
    if (stockInfo) {
      document.querySelector('#stockName').textContent = stockInfo.name;
      document.querySelector('#stockSector').textContent = stockInfo.sector;
      document.querySelector('#stockIndustry').textContent = stockInfo.subIndustry;
      document.querySelector('#stockAddress').textContent = stockInfo.address;
      document.querySelector('#logo').src = `logos/${symbol}.svg`;
      stockArea.style.display = 'block';
    }
  }
  
  function resetForm() {
    document.querySelector('#userID').value = '';
    document.querySelector('#firstname').value = '';
    document.querySelector('#lastname').value = '';
    document.querySelector('#address').value = '';
    document.querySelector('#city').value = '';
    document.querySelector('#email').value = '';
  }
  
  function resetPortfolio() {
    document.querySelector('.portfolio-list').innerHTML = '';
  }
  