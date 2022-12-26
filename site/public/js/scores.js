const pages = [
  "ukulele",
  "bass",
  "about"
];

function onShow(page) {
  console.log(page);

  pages.forEach(p => {
    document.getElementById(p).style.display = (p == page) ? 'block' : 'none';
  });
}

function Cell(type, text, url, section) {
  var cell = document.createElement(type);
  if (url) {
    var a = document.createElement('a');
    a.classList.add('hyperlink');
    a.href = section + '/' + url;
    a.innerHTML = text;
    a.target= '_tunes';
    cell.appendChild(a);
  } else {
    cell.textContent = text;
  }
  return cell;
}

function handleTableData(section, data) {
    const isUkulele = (section === 'ukulele');
    data.forEach(function (item, index) {
      var content = document.getElementById(section)
      var div = document.createElement('div');
      div.classList.add("card")
      content.appendChild(div);

      var h2 = document.createElement('h3');
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
      if (isUkulele) {
        headerRow.appendChild(Cell('th', 'Tuning'));
        headerRow.appendChild(Cell('th', 'Notes'));
      }
      headerRow.appendChild(Cell('th', 'Version'));
      thead.appendChild(headerRow);

      item.tunes.forEach(function(tune, index) {
        const tr = document.createElement('tr');
        tr.appendChild(Cell('th', tune.name, tune.pdf, section));
        tr.appendChild(Cell('td', tune.composer));
        if (isUkulele) {
          tr.appendChild(Cell('td', tune.tuning));
          tr.appendChild(Cell('td', tune.notes));
        }
        tr.appendChild(Cell('td', tune.ver));
        tbody.appendChild(tr);
      });
    });
}

function createTable(name) {
    try {
        const json_file = `${name}/tunes.json`;
        fetch(json_file)
        .then(response => response.json())
        .then(data => handleTableData(name, data))
        .catch(error => console.error(error));
    }
    catch (error) {
        console.error(error);
    }
}

createTable('ukulele');
createTable('bass');
  