Angular2 Gallery
----------------
Application has just 1 view. It's divided in 2 columns:
- Left is the list of all Albums.
- Right is a horizontal divided view

Right column is divided in 2 parts: top and bottom.
- Top part shows Album's User info.
- Bottom shows a grid containing all the thumbnails of the selected Album.

User can select only Albums from the list.
 
AlbumList:
 - just a simple selectable vertical list of Albums
 - shows Album Title
 - path: "/"

Album:
 - Shows all the photo thumbnails of the album on a Grid
 - path: "/album/:id"

UserInfo:
 - A panel showing the Album's User information
