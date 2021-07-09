var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    theme: 'ios',
    // Add default routes
    routes: routes,
});

var mainView = app.views.create('.view-main');