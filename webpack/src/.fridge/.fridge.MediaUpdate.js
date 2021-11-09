


export function mediaWrapUpdate(newThreadData) {
  var prev = mediaWrap.firstChild;
  if (!newThreadData) {
    if (prev) {
      mediaWrap.className = "";
      easeOut(
        prev,
        function () {
          mediaWrap.removeChild(prev);
        },
        200
      );
    }
  } else {
    setThreadMedia(newThreadData);
  }
}