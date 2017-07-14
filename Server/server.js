import express from  'express';
import path from 'path';
const app = express();
import { appConfig, databaseConfig, passportConfig} from './config';
import { AuthRoutes, IndexRouter } from './routes';

// databaseConfig();

//=========
//config aplication
//=========
appConfig(app);

//=========
//Passport config
//=========


// passportConfig();

// app.use(cartQuantity);

// app.use(async function(req, res, next){
//     res.locals.currenUser = req.user;
//     res.locals.session = req.session;
//     res.locals.error = req.flash("errors");
//     res.locals.message = req.flash("messages");
//     preFillCategories(req, res, next);
// });
//=========
//router
//=========
// app.use('/', IndexRouter);
// app.use('/api/auth', AuthRoutes);
import {UserRouters} from './routes/UserRouters';
app.use('/api/users', UserRouters);
import {RequestHandler} from'./requestHandler';
app.use( RequestHandler);
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;