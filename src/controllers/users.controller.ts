import { Request, Response } from 'express';
import { UpdateOptions, DestroyOptions } from 'sequelize';
import { User } from '../models/User';
import bcrypt from 'bcrypt';

export class UsersController {
  public getLogin(_req: Request, res: Response) {
    res.render("login");
  }
  public async register(req: Request, res: Response) {
    try {
      // tslint:disable-next-line:no-console
      console.log(req.body);
      const userData = await User.create({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        isAdmin: req.body.isAdmin,
      });
      res.status(200).send({
        email: userData.email,
        name: userData.name,
      });
    }catch(err) {
      res.status(500).send({
        message: err.message,
      });
    }
  }

  public async login(req: Request, res: Response) {
    try {
      if(!req.body.email || !req.body.password) {
        throw new Error('Require email or password');
      }
      if(req.session.email) {
        if(req.body.email === req.session.email) {
          // tslint:disable-next-line:no-console
          // console.log(req.body.email + '\n' + req.session.email)
            return res.status(200).send({
              message: `User: ${req.session.email} are already logined.`,
            });
        }
      }

      const userData = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      if(!userData) {
        throw new Error('User not found');
      } else {
        const match = await bcrypt.compare(req.body.password, userData.password);
        if(!match) {
          throw new Error('Incorrect password');
        } else {
          req.session.regenerate((err) => {
            if(err){
              return res.status(500).send({
                message: "Login failed",
              });
            }
            req.session.email = req.body.email;
            req.session.isLogin = true;
            return res.status(200).send({
              message: `User ${req.session.email} login with sessionId=${req.session.id}`,
            });
          });

        }
      }
    } catch(err) {
      return res.status(500).send({
        message: err.message,
      });
    }

  }

  public logout(req: Request, res: Response) {
    if(req.session.isLogin){
      req.session.destroy((err) => {
        if(err) {
          return res.status(500).send({
            message: "Error when destroy session",
          });
        }
        res.status(200).send({
          message: "Logout",
        });
      });
    }else {
      res.render('login');
    }


  }

  public async isAuth(req: Request, res: Response, next: any) {
    try {
      if(req.session.isLogin){
        // tslint:disable-next-line:no-console
        console.log(req.session);
        next();
      }
      else{
        throw new Error('Not login');
      }
    }catch(err) {
      res.status(500).send({
        message: err.message,
      });
    }
  }

}