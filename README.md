## Getting Started

Initialize or reset the Sqlite database via:
```
node connect.js
```

Run the development Server
```bash
npm run dev
```


## Pages
[http://localhost:3000/assessment](http://localhost:3000/assessment) for the assessment form

[http://localhost:3000/admin](http://localhost:3000/admin) for admin view of leads list




## Misc info
- `/` will redirect to `/assessment`
- `/admin` is protected via middleware that checks the 'role' cookie to be 'admin'
- login is hardcoded to always succeed and set the role to admin
- In the admin page, you can click the logout button on the bottom right to check authentication is working correctly


