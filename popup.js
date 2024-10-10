document.getElementById('interested').addEventListener('click', function() {
  saveBookmark(true);
});

document.getElementById('notInterested').addEventListener('click', function() {
  saveBookmark(false);
});

function saveBookmark(isInterested) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    if (isInterested) {
      chrome.storage.local.get({bookmarks: []}, function(result) {
        var bookmarks = result.bookmarks;
        bookmarks.push({url: activeTab.url, title: activeTab.title});
        chrome.storage.local.set({bookmarks: bookmarks}, function() {
          document.getElementById('status').innerText = 'Bookmark saved!';
        });
      });
    } else {
      document.getElementById('status').innerText = 'Not interested.';
    }
  });
}
