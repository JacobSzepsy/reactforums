# React Forums

## How To Run
Clone files
```bash
git@github.com:js-cookie/js-cookie.git
```
Create SQL user
```bash
GRANT ALL PRIVILEGES ON 'reactforums_production'.* TO 'username'@'localhost' IDENTIFIED BY 'password';
```
CD into frontend
```bash
cd ./reactforums
```
Install dependencies
```bash
npm install
```
CD into backend
```bash
cd ../reactforumsbackend
```
Install dependencies
```bash
bundle install
```
Run Foreman
```bash
foreman start -p 3000
```
## TODO
- Allow users to edit and delete posts
- Create user profiles
- Add admin accounts
- Add Redux to clean up state management
- Clean up code
- Improve stylizing
