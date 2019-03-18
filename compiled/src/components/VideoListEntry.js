var VideoListEntry = ({ video, handleVideoListEntryTitleClick }) => React.createElement(
  "div",
  { className: "video-list-entry media" },
  React.createElement(
    "div",
    { className: "media-left media-middle" },
    React.createElement("img", { className: "media-object", src: video.snippet.thumbnails.default.url, alt: "" })
  ),
  React.createElement(
    "div",
    { className: "media-body" },
    React.createElement(
      "div",
      { className: "video-list-entry-title", onClick: () => handleVideoListEntryTitleClick(video) },
      video.snippet.title
    ),
    React.createElement(
      "div",
      { className: "video-list-entry-detail" },
      video.snippet.description
    )
  )
);
// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
VideoListEntry.propTypes = {
  video: React.PropTypes.object.isRequired
};

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default VideoListEntry;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZpZGVvTGlzdEVudHJ5LmpzeCJdLCJuYW1lcyI6WyJWaWRlb0xpc3RFbnRyeSIsInZpZGVvIiwiaGFuZGxlVmlkZW9MaXN0RW50cnlUaXRsZUNsaWNrIiwic25pcHBldCIsInRodW1ibmFpbHMiLCJkZWZhdWx0IiwidXJsIiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsInByb3BUeXBlcyIsIlJlYWN0IiwiUHJvcFR5cGVzIiwib2JqZWN0IiwiaXNSZXF1aXJlZCJdLCJtYXBwaW5ncyI6IkFBQUEsSUFBSUEsaUJBQWlCLENBQUMsRUFBQ0MsS0FBRCxFQUFRQyw4QkFBUixFQUFELEtBQ25CO0FBQUE7QUFBQSxJQUFLLFdBQVUsd0JBQWY7QUFDRTtBQUFBO0FBQUEsTUFBSyxXQUFVLHlCQUFmO0FBQ0UsaUNBQUssV0FBVSxjQUFmLEVBQThCLEtBQUtELE1BQU1FLE9BQU4sQ0FBY0MsVUFBZCxDQUF5QkMsT0FBekIsQ0FBaUNDLEdBQXBFLEVBQXlFLEtBQUksRUFBN0U7QUFERixHQURGO0FBSUU7QUFBQTtBQUFBLE1BQUssV0FBVSxZQUFmO0FBQ0U7QUFBQTtBQUFBLFFBQUssV0FBVSx3QkFBZixFQUF3QyxTQUFTLE1BQU1KLCtCQUErQkQsS0FBL0IsQ0FBdkQ7QUFBK0ZBLFlBQU1FLE9BQU4sQ0FBY0k7QUFBN0csS0FERjtBQUVFO0FBQUE7QUFBQSxRQUFLLFdBQVUseUJBQWY7QUFBMENOLFlBQU1FLE9BQU4sQ0FBY0s7QUFBeEQ7QUFGRjtBQUpGLENBREY7QUFXQTtBQUNBO0FBQ0FSLGVBQWVTLFNBQWYsR0FBMkI7QUFDekJSLFNBQU9TLE1BQU1DLFNBQU4sQ0FBZ0JDLE1BQWhCLENBQXVCQztBQURMLENBQTNCOztBQUlBO0FBQ0E7QUFDQSxlQUFlYixjQUFmIiwiZmlsZSI6IlZpZGVvTGlzdEVudHJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFZpZGVvTGlzdEVudHJ5ID0gKHt2aWRlbywgaGFuZGxlVmlkZW9MaXN0RW50cnlUaXRsZUNsaWNrfSkgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT1cInZpZGVvLWxpc3QtZW50cnkgbWVkaWFcIj5cbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm1lZGlhLWxlZnQgbWVkaWEtbWlkZGxlXCI+XG4gICAgICA8aW1nIGNsYXNzTmFtZT1cIm1lZGlhLW9iamVjdFwiIHNyYz17dmlkZW8uc25pcHBldC50aHVtYm5haWxzLmRlZmF1bHQudXJsfSBhbHQ9XCJcIiAvPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3NOYW1lPVwibWVkaWEtYm9keVwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2aWRlby1saXN0LWVudHJ5LXRpdGxlXCIgb25DbGljaz17KCkgPT4gaGFuZGxlVmlkZW9MaXN0RW50cnlUaXRsZUNsaWNrKHZpZGVvKX0+e3ZpZGVvLnNuaXBwZXQudGl0bGV9PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInZpZGVvLWxpc3QtZW50cnktZGV0YWlsXCI+e3ZpZGVvLnNuaXBwZXQuZGVzY3JpcHRpb259PC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuKTtcbi8vIFByb3BUeXBlcyB0ZWxsIG90aGVyIGRldmVsb3BlcnMgd2hhdCBgcHJvcHNgIGEgY29tcG9uZW50IGV4cGVjdHNcbi8vIFdhcm5pbmdzIHdpbGwgYmUgc2hvd24gaW4gdGhlIGNvbnNvbGUgd2hlbiB0aGUgZGVmaW5lZCBydWxlcyBhcmUgdmlvbGF0ZWRcblZpZGVvTGlzdEVudHJ5LnByb3BUeXBlcyA9IHtcbiAgdmlkZW86IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZFxufTtcblxuLy8gSW4gdGhlIEVTNiBzcGVjLCBmaWxlcyBhcmUgXCJtb2R1bGVzXCIgYW5kIGRvIG5vdCBzaGFyZSBhIHRvcC1sZXZlbCBzY29wZVxuLy8gYHZhcmAgZGVjbGFyYXRpb25zIHdpbGwgb25seSBleGlzdCBnbG9iYWxseSB3aGVyZSBleHBsaWNpdGx5IGRlZmluZWRcbmV4cG9ydCBkZWZhdWx0IFZpZGVvTGlzdEVudHJ5O1xuIl19