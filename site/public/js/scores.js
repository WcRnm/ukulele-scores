function Cell(type, text, url) {
  var cell = document.createElement(type);
  if (url) {
    var a = document.createElement('a');
    a.classList.add('hyperlink');
    a.href = url;
    a.innerHTML = text;
    a.target= '_tunes';
    cell.appendChild(a);
  } else {
    cell.textContent = text;
  }
  return cell;
}

function handleTableData(data) {
    data.forEach(function (item, index) {
      var content = document.getElementById('scores')
      var div = document.createElement('div');
      div.classList.add("card")
      content.appendChild(div);

      var h2 = document.createElement('H2');
      h2.innerHTML = item.genre;
      h2.classList.add("content-title");
      div.appendChild(h2);

      const table = document.createElement('table');
      table.classList.add("table");
      table.classList.add("table-hover");
      div.appendChild(table);
      const thead = document.createElement('thead');
      table.appendChild(thead);
      const tbody = document.createElement('tbody');
      table.appendChild(tbody);

      const headerRow = document.createElement('tr');
      headerRow.appendChild(Cell('th', 'Tune'));
      headerRow.appendChild(Cell('th', 'Composer'));
      headerRow.appendChild(Cell('th', 'Tuning'));
      headerRow.appendChild(Cell('th', 'Notes'));
      headerRow.appendChild(Cell('th', 'WIP'));
      thead.appendChild(headerRow);

      item.tunes.forEach(function(tune, index) {
        const tr = document.createElement('tr');
        tr.appendChild(Cell('th', tune.name, tune.pdf));
        tr.appendChild(Cell('td', tune.composer));
        tr.appendChild(Cell('td', tune.tuning));
        tr.appendChild(Cell('td', tune.notes));
        tr.appendChild(Cell('td', tune.wip ? "WIP" : ""));
        tbody.appendChild(tr);
      });
    });
}

function createTable() {
    try {
        fetch('ukulele.json')
        .then(response => response.json())
        .then(data => handleTableData(data))
        .catch(error => console.error(error));
    }
    catch (error) {
        console.error(error);
    }

  }
 
  halfmoon.toggleDarkMode();
  createTable();
  