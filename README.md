# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# Góc Đọc Truyện

Ứng dụng gồm React frontend và Express API backend.

## Chạy local

Terminal 1, chạy backend:

```bash
npm run server
```

API chạy tại `http://localhost:5000`. Kiểm tra bằng `GET /api/health`.

Terminal 2, chạy frontend:

```bash
npm start
```

Frontend chạy tại `http://localhost:3000` và CRA proxy các request `/api` sang backend.

## Khôi phục mật khẩu qua email

Copy `server/.env.example` thành `server/.env`, sau đó điền thông tin SMTP. Với Gmail, cần bật xác minh 2 bước và tạo Google App Password, không dùng mật khẩu Gmail chính.

Nếu chưa cấu hình SMTP ở môi trường development, backend sẽ in mã OTP trong terminal server để test. Mã có hiệu lực 10 phút.

API chính:

- `POST /api/manga/register`
- `POST /api/manga/login`
- `POST /api/manga/forgot-password`
- `POST /api/manga/verify-reset-code`
- `POST /api/manga/reset-password`
- `GET /api/manga`
- `GET /api/manga/:id/chapters`
- `GET /api/manga/:id/chapter/:chapter`
