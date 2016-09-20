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
 - path: "/album/:albumId"

UserInfo:
 - A panel showing the Album's User information

 PhotoModal
 - A modal screen that shows the selected Photo from Album.
 - path: /album/:albumId/photo/:photoId

Worth mentioning
----------------
I took a different approach for how the application flows from one screen to another.
On most tutorials and docs it's recommended to use `Router` & `ActiveRoute` to drive the navigation.
I instead I created an `AppModel` shared by all components. In `AppModel` there are many `Observable` properties
on which other components can Subscribe to. There's also a `AppRouting` class which listen to `Router Events` and uses the `Router.navigate` to update the URL. If data is missing it uses `JsonPlaceHolderService` to fetch it and later
update `AppModel`.

I also choose to make very simple View Components. They only have `@Input` properties and `@Output` events. All data
has to be injected on then to be displayed. I haven't got the whole picture of Angular2 apps with Routing - still a n00b - so I created a flag `useAppModel` on the View Components that enables them to show the relevant data present on shared
`AppModel`.

For instance, when an album is selected from the list:
 - the `AlbumListComponent` updates the `AppModel.currentAlbum` and dispatches a `onSelected` event
 - `AppComponent` hears the `onSelected` event and tells `AppRouter` to navigate
 - `AppRouter` determines which `Album` to load and fetches related data using `JsonPlaceHolderService`.
 - The `AlbumComponent` is added to the screen. It contains the `UserInfoComponent` & `MediaGridComponent`.
 - These two components were created with `[useAppModel]=true` so the former subscribes to `AppModel.currentUser$` and the latter to `AppModel.photos$`.
 - Once `JsonPlaceHolderService` returns the data to `AppRouter`, it updates the model accordingly
 - View components update automatically

I tried using `AppModel.currentAlbum` to be the main app driver but it turned out to be very hard. There where many infinite loops of ( model update > router update > navigate > model update ... ) in a single interaction. This code has mixed
techniques in place for interacting with other modules and components on purpose so that I can test the APIs.

But I guess I now found another decent way of doing it instead of using `ActivatedRoute`. The components are very simple since they are so dumb. All this binding and reactiveness makes a bit hard to find where stuff happens and see how information flows inside the app, but if you keep your code consistent, it's really easy to understand and to add
new features. I'm not sure if it's better but at least it shows that Angular 2 is also flexible.

Bootstarp 4 Alpha just for fun! jQuery needed =/

Install
-------
You just need NodeJS and Gulp installed. From terminal on the root source folder:

`npm install`


Open browser on localhost:8000

Distribution
------------
The app can benefit of the Ahead-of-Time Compilation! 
`node_modules/.bin/ngc -p tsconfig.aot.json`

`node_modules/.bin/rollup -c rollup.js`

`gulp dist`

Open browser on localhost:8000
