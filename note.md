###     Ngày 12/7/2017: ###
Tiếp tục tái cấu trúc dự án:
Thư mục Shared là nơi chữa code chia sẻ xuyên suốt dự án cho mobile, server và trình duyệt
Thư mục Server là nơi chứa code chạy trên Server
Thư mục Server/src là nơi chứa code reactjs chạy trên trình duyệt
Thư mục Mobile là nơi chứa code chạy trên mobile
App.js là file đầu vào khi thực hiện lệnh 
```
npm run mobile
```
index.android.js là file đầu vào khi thực hiện lệnh:
```
react-native run-android
```
Server/index.js là điểm đầu vào khi chạy khởi động server bằng lệnh:
```
npm run server
```

###     Ngày 11/7/2017:     ###
Tái cấu trúc dự án giúp chia sẻ node_modules và giúp chia sẻ mã nguồn của các actions, reducers, validator ... giữa ứng dụng mobile và reactjs cũng như với Server