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

Worth mentioning
----------------
I took a different approach for how the application flows from one screen to another.
On most tutorials and docs it's recommended to use `Router` & `ActiveRoute` to drive the navigation.
I instead I created an `AppModel` shared by all components. In `AppModel` there are many `Observable` properties
on which other components can Subscribe to. There's also a `AppRouting` class that subscribes to changes on
`AppModel.currentAlbum$` and uses the `Router.navigate` to update the URL.

I also choose to make very simple View Components. They only have `@Input` properties and `@Output` events. All data
has to be injected on then to be displayed. I haven't got the whole picture of Angular2 apps with Routing - still a n00b - so I created a flag `useAppModel` on the View Components that enables them to show the relevant data present on shared
`AppModel`.

For instance, when an album is selected from the list:
 - the `AppComponent` updates the `AppModel.currentAlbum` and fetches related data using `JsonPlaceHolderService`.
 - `AppRouting` is subscribed to `AppModel.currentAlbum$` and sees the change initiating a `Router.navigate`
 - The `AlbumComponent` is aded to the screen. It contains the `UserInfoComponent` & `MediaGridComponent`.
 - These two components were created with `[useAppModel]=true` so the former subscribes to `AppModel.currentUser$` and the latter to `AppModel.photos$`.
 - Once `JsonPlaceHolderService` returns the data to `AppComponent`, it updates the model accordingly
 - View components update automatically

 This is a very common pattern among Flex developers so I tried to implement it with Angular2. I think it makes the app
 and its components very reusable and simple since they are so dumb. All this binding and reactiveness makes a bit hard to find where stuff happens, how information flows inside the app.

 Install
 -------
 You just need NodeJS and Gulp installed.
 `npm install`

 Open browser on localhost:8000
