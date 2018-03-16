const fs = require('fs');

/* function loadImages(location) {
  fs.reddir(location, (err, files) => {
    if (err) {
      throw err;
    }
    // Scanning the files in the folder and display them as an image
    for (file of files) {
      $('#img-overview').append(`<img class="image" src="file://${`${__dirname}/../images/${file}`}">`);
    }
    // Show as bigger image when clicking on it.
    $('.image').on('click', e => {
      // shell.openExternal(e.target.currentSrc);
      $('#wrapper-img-view').css('display', 'flex');
      // $('body').css('overflow-y', 'hidden');
      $('#wrapper-img-view').append(`<img id="image-view-full" src="${e.target.currentSrc}">`);
    });
    // triggers when big image is beeing closed.
    $('#close-img-view').on('click', () => {
      $('#image-view-full').remove();
      $('#wrapper-img-view').css('display', 'none');
      // $('body').css('overflow-y', 'auto');
    });
  });
} */

let workingDirectory = '';

/*
function renderFolder(file) {
  console.log('filefilefile.zip');
  fs.stat(`${workingDirectory}/${file}`, (err, stats) => {
    // log the error if error occours
    if (err) throw err;

    // If file is directory, make a new element for it in the DOM
    if (stats.isDirectory() === true) {
      // lol
      $('#file-overview').append(`<p class="browsed-file">${file}</p>`);
    }
  });
} */

function loadFolder(directory) {
  // set working directory
  workingDirectory = directory;

  // empty div for new dirs
  $('#file-overview').empty();
  $('#file-overview').append(`<p>Folder: ${__dirname}</p>
  <p class="browsed-file" id="folder-one-back"> ... </p>`);

  // read given dir
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error(err);
      if (err.code === 'ENOTDIR') {
        newErrorMessage('Not a directory');
        const newDir = workingDirectory.split('/');
        newDir.pop();
        loadFolder(newDir.join('/'));
      }
    }

    for (let i = 0; i < files.length; i++) {
      // test of dir for if elements are dir's or not
      console.log(`checking ${files[i]}`);
      // renderFolder(files[i]);
      $('#file-overview').append(`<p class="browsed-file">${files[i]}</p>`);
    }

    $('.browsed-file').on('click', e => {
      if (e.target.id === 'folder-one-back') {
        const newDir = workingDirectory.split('/');
        newDir.pop();
        loadFolder(newDir.join('/'));
      } else {
        loadFolder(workingDirectory.concat(`/${e.target.innerHTML}`));
      }
    });
  });
}


// load dir when clicking the load button
$('#open-folder').on('click', () => {
  loadFolder(__dirname);
});
